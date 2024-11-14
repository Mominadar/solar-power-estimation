#!/bin/bash

# Ensure .env is in .gitignore
if ! grep -q ".env" .gitignore; then
    echo ".env" >> .gitignore
    echo "Added .env to .gitignore"
fi

# Array of commit messages with emojis
commit_messages=(
    "✨ Initialize project structure and dependencies"
    "🔧 Configure project settings and environment"
    "📁 Add main application components"
    "🗃️ Set up initial data structure and utilities"
    "🎨 Implement theme and styling setup"
    "📍 Integrate Google Maps component with basic setup"
    "🔍 Add search functionality to map with search box"
    "✏️ Add placeholder input fields for user data entry"
    "🚀 Add Map component with drawing manager for polygons"
    "💾 Implement save location functionality"
    "🔄 Add load functionality for saved locations"
    "🖼️ Enhance UI layout with Material-UI components"
    "📐 Adjust map and layout styling for responsiveness"
    "🔁 Add tab navigation for Map and Saved Locations"
    "🛠️ Refactor code for better modularity"
    "🔗 Link map state with input fields"
    "📝 Improve map interaction and polygon management"
    "📊 Display calculation results in Results section"
    "⚙️ Update calculation algorithm for accuracy"
    "📌 Add markers for selected locations on map"
    "🧹 Clean up unused variables and minor fixes"
    "💡 Improve error handling for edge cases"
    "⚡ Optimize component rendering performance"
    "🔒 Ensure secure handling of environment variables"
    "🌐 Enable satellite and roadmap toggle on map"
    "💻 Add Save button functionality for locations"
    "📦 Set up local storage for saved locations"
    "🔄 Implement Load functionality from saved data"
    "🎉 Add clear functionality for polygons on map"
    "🧩 Refactor components for readability"
    "📝 Update Footer and header components"
    "📚 Add documentation for components"
    "🔍 Add focus to search box for user input"
    "🚧 Fix bugs related to polygon rendering"
    "💅 Standardize button and component styles"
    "🌍 Update map initialization and centering logic"
    "📱 Improve mobile responsiveness"
    "🚀 Finalize main app logic"
    "🌟 Final UI adjustments and code clean-up"
    "✅ Project ready for initial review"
)

# Split files into 40 chunks and commit each chunk with a unique message
files=($(git ls-files --others --exclude-standard)) # List untracked files
total_files=${#files[@]}
files_per_commit=$((total_files / 40 + 1))

for ((i=0; i<40 && i*files_per_commit<total_files; i++)); do
    start=$((i * files_per_commit))
    end=$((start + files_per_commit))
    chunk=("${files[@]:start:files_per_commit}")

    # Stage and commit the files in the current chunk
    git add "${chunk[@]}"
    git commit -m "${commit_messages[$i]}"
done

echo "All files have been committed in 40 chunks. 🎉"