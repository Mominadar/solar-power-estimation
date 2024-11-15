// src/components/SearchBox.js
import React from 'react';
import {
  TextField,
  List,
  ListItem,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

function SearchBox({ onPlaceSelected }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();
    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);
    onPlaceSelected({
      geometry: { location: { lat: () => lat, lng: () => lng } },
    });
  };

  return (
    <div>
      <TextField
        fullWidth
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter an address"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {status === 'OK' && (
        <List
          style={{
            border: '1px solid #ccc',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {data.map(({ place_id, description }) => (
            <ListItem
              button
              key={place_id}
              onClick={() => handleSelect(description)}
            >
              {description}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default SearchBox;