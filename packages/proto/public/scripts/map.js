import { horrorLocations } from './location.js';
console.log("Imported horrorLocations:", horrorLocations);
// Initialize the map
var map = L.map('map').setView([39.8283, -98.5795], 4); // Center on the USA

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define a custom "cooler red" icon
const redIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=10137&format=png&color=FA5252',
    iconSize: [35, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [30, 45]
});

// Function to convert Web Mercator (x, y) to LatLng
function webMercatorToLatLng(x, y) {
    const RADIUS = 6378137; // Earth's radius in meters for Web Mercator
    const lon = (x / RADIUS) * (180 / Math.PI);
    const lat = (Math.atan(Math.exp(y / RADIUS)) * 2 - Math.PI / 2) * (180 / Math.PI);
    return [lat, lon];
}

// Use MarkerCluster to handle large numbers of markers
const markers = L.markerClusterGroup();

// Variables to manage location and routing
let userLocation = null;
let routingControl = null;
let liveLocationMarker = null;
let currentActiveMarker = null; // Track the currently enlarged marker

// Track user's live location
map.locate({ watch: true, setView: true, maxZoom: 16 });

map.on('locationfound', (e) => {
    userLocation = e.latlng;

    if (!liveLocationMarker) {
        liveLocationMarker = L.circleMarker(e.latlng, {
            radius: 10,
            fillColor: "#3388ff",
            color: "#3388ff",
            weight: 2,
            fillOpacity: 0.8,
        }).addTo(map).bindPopup("You are here!").openPopup();
    } else {
        liveLocationMarker.setLatLng(e.latlng);
    }
});

map.on('locationerror', () => {
    alert("Could not find your location. Please enable location services.");
});

// Function to clear the routing control
function clearRouting() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    document.querySelector('.cancel-routing-button')?.remove();

    // Reset the size of the active marker
    if (currentActiveMarker) {
        currentActiveMarker.setIcon(redIcon);
        currentActiveMarker = null;
    }
}

horrorLocations.forEach((location) => {
    const { x, y } = location.geometry;


    if (!x || !y) return; // Skip locations without valid geometry

    const latLng = webMercatorToLatLng(x, y);

    const marker = L.marker(latLng, {
        icon: redIcon,
        riseOnHover: true,
        riseOffset: 300,
    }).bindPopup(() => {
        const div = document.createElement('div');
        div.style.padding = "10px";
        div.style.borderRadius = "8px";
        div.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
        div.style.backgroundColor = "#ffffff";

        div.innerHTML = `
            <strong style="font-size: 16px;">${location.api_data.title}</strong><br>
            <em style="color: gray;">${location.api_data.location_type} in ${location.api_data.city}, ${location.api_data.state}</em><br>
            <p style="font-size: 14px; color: #555;">${location.api_data.description}</p>
            <button class="get-directions-button" style="
                background-color: #4285F4;
                color: #fff;
                padding: 8px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;">Get Directions</button>
        `;

        const getDirectionsButton = div.querySelector('.get-directions-button');

        getDirectionsButton.onclick = function () {
            if (!userLocation) {
                alert("Your location is not available. Please allow location access.");
                return;
            }

            // Disable the "Get Directions" button
            getDirectionsButton.style.display = "none";

            // Clear any existing routing
            clearRouting();

            // Add routing control
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(userLocation),
                    L.latLng(latLng)
                ],
                routeWhileDragging: true,
            }).addTo(map);

            // Dynamically add "Cancel Directions" button
            const cancelButton = L.control({ position: 'topright' });
            cancelButton.onAdd = function () {
                const div = L.DomUtil.create('div', 'cancel-routing-button');
                div.innerHTML = `
                    <button style="
                        background-color: #FF5252;
                        color: #fff;
                        padding: 8px 12px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;">Cancel Directions</button>`;
                div.onclick = function () {
                    clearRouting();
                    // Re-enable the "Get Directions" button
                    getDirectionsButton.style.display = "inline-block";
                };
                return div;
            };
            cancelButton.addTo(map);
        };

        return div;
    });

    marker.city = location.api_data.city; // Add a city property for search functionality
    markers.addLayer(marker);

    // Enlarge marker on click and reset others
    marker.on('click', function () {
        if (currentActiveMarker) {
            currentActiveMarker.setIcon(redIcon);
        }

        this.setIcon(L.icon({
            ...redIcon.options,
            iconSize: [50, 50]
        }));

        currentActiveMarker = this;
    });
});

// Add all clustered markers to the map
map.addLayer(markers);

// Add a search control
var searchControl = new L.Control.Search({
    layer: markers,
    propertyName: 'city', // Search based on the title property
    initial: false,
    zoom: 10,
    textPlaceholder: "Search horror locations...",
});
map.addControl(searchControl);


// Handle search input
document.getElementById('search').addEventListener('click', function () {
    const query = document.getElementById('search-input').value.trim().toLowerCase();

    const foundLocation = horrorLocations.find(loc =>
        loc.api_data?.city?.toLowerCase().includes(query) || 
        loc.api_data?.title?.toLowerCase().includes(query)
    );

    if (foundLocation) {
        const { x, y } = foundLocation.geometry;
        const [latitude, longitude] = webMercatorToLatLng(x, y);

        map.setView([latitude, longitude], 12);
        L.marker([latitude, longitude], { icon: redIcon })
            .addTo(map)
            .bindPopup(`
                <strong>${foundLocation.api_data.title}</strong><br>
                ${foundLocation.api_data.description}`)
            .openPopup();
    } else {
        alert('Location not found!');
    }
});
document.getElementById('add-location-btn').addEventListener('click', () => {
    // Show the form
    document.getElementById('location-form').style.display = 'block';
});

document.getElementById('cancel-form').addEventListener('click', () => {
    // Hide the form
    document.getElementById('location-form').style.display = 'none';
});

document.getElementById('add-location-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('location-name').value;
    const description = document.getElementById('location-description').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const [x, y] = latLngToWebMercator(latitude, longitude);

    const newLocation = {
        original: { ObjectId: horrorLocations.length + 1, location_type: "unknown" },
        geometry: { x, y },
        api_data: {
            title: name,
            description,
            city: "Unknown",
            state: "Unknown",
        },
    };

    try {
        const response = await fetch('/add-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLocation),
        });

        if (!response.ok) {
            throw new Error('Failed to save location');
        }

        // Update the map immediately
        L.marker([latitude, longitude], { icon: redIcon })
            .addTo(map)
            .bindPopup(`<strong>${name}</strong><br>${description}`)
            .openPopup();

        // Reset the form
        document.getElementById('add-location-form').reset();
        document.getElementById('location-form').style.display = 'none';

        Toastify({
            text: "New haunted location added!",
            backgroundColor: "linear-gradient(to right, #FF5252, #FF8A80)",
            duration: 3000,
        }).showToast();
    } catch (error) {
        alert('Error: ' + error.message);
    }
    function latLngToWebMercator(lat, lon) {
        const RADIUS = 6378137; // Earth's radius in meters for Web Mercator
        const x = lon * (Math.PI / 180) * RADIUS;
        const y = Math.log(Math.tan((Math.PI / 4) + (lat * (Math.PI / 180) / 2))) * RADIUS;
        return [x, y];
    }
});
