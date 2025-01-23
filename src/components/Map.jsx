// src/components/Map.js
import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  DrawingManager,
  Polygon,
  Marker,
} from '@react-google-maps/api';
import { Box, CircularProgress, Paper, Button } from '@mui/material';
import SearchBox from './SearchBox';

const libraries = ['places', 'drawing', 'geometry'];
const mapContainerStyle = { width: '100%', height: '500px' };

function Map({ setSelectedArea, center, polygons: loadedPolygons = [] }) {
  const [mapCenter, setMapCenter] = useState(center);
  const [polygons, setPolygons] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (center) setMapCenter(center);
  }, [center]);

  useEffect(() => {
    if (loadedPolygons.length > 0) {
      const formattedPolygons = loadedPolygons.map((path) => ({
        path: path.map((point) => ({ lat: point.lat, lng: point.lng })),
        area: window.google.maps.geometry.spherical.computeArea(
          new window.google.maps.MVCArray(path.map((point) => new window.google.maps.LatLng(point.lat, point.lng)))
        ),
      }));
      setPolygons(formattedPolygons);
      const totalArea = formattedPolygons.reduce((acc, poly) => acc + poly.area, 0);
      setSelectedArea(totalArea);
    }
  }, [loadedPolygons, setSelectedArea]);

  const onPolygonComplete = (polygon) => {
    const area = window.google.maps.geometry.spherical.computeArea(polygon.getPath());
    const path = polygon.getPath().getArray().map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    setPolygons((prev) => [...prev, { path, area }]);
    setSelectedArea((prevArea) => prevArea + area);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return <CircularProgress />;

  return (
    <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
      <Box mb={2}>
        <SearchBox onPlaceSelected={(place) => setMapCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })} />
      </Box>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={mapCenter.lat !== 0 ? 18 : 2}
        center={mapCenter.lat !== 0 ? mapCenter : { lat: 0, lng: 0 }}
      >
        {mapCenter.lat !== 0 && <Marker position={mapCenter} />}

        {polygons.map((poly, index) => (
          <Polygon
            key={index}
            path={poly.path}
            options={{
              fillColor: "#2196F3",
              fillOpacity: 0.3,
              strokeColor: "#2196F3",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        ))}

        <DrawingManager
          onPolygonComplete={onPolygonComplete}
          options={{
            drawingControl: true,
            drawingControlOptions: { drawingModes: ['polygon'] },
          }}
        />
      </GoogleMap>

      <Box mt={2} textAlign="center">
        <Button variant="outlined" color="secondary" onClick={() => setPolygons([]) & setSelectedArea(0)}>
          Clear All Polygons
        </Button>
      </Box>
    </Paper>
  );
}

export default Map;