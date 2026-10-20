/*
    Author: Maria Albano
    Date: October 15, 2026
    Project: Campus Life Super App
    Description: JavaScript for the Dining page.
*/

// Test that JavaScript is connected
console.log("Dining JavaScript is connected!");
/// Geoapify Places API configuration
const geoapifyUrl = "https://api.geoapify.com/v2/places";
// College locations: latitude and longitude
const colleges = {
    aic: [42.1127, -72.5583],
    springfield: [42.1040, -72.5550],
    western: [42.1157, -72.5190],
    stcc: [42.1085, -72.5795]
};

// Get the dropdown, button, and results area
const collegeSelect = document.getElementById("college-select");
const diningButton = document.getElementById("dining-button");
const diningResults = document.getElementById("dining-results");

// Run when the user clicks Find Dining
diningButton.addEventListener("click", function() {
    const college = collegeSelect.options[collegeSelect.selectedIndex].text;

    diningResults.textContent = "Searching for restaurants near " + college + "...";
    // Get the selected college's coordinates
const location = colleges[collegeSelect.value];
const latitude = location[0];
const longitude = location[1];

// Search for restaurants and cafes within 5000 meters using Geoapify.
const url = geoapifyUrl +
    "?categories=catering.restaurant,catering.cafe" +
    "&filter=circle:" + longitude + "," + latitude + ",5000" +
    "&limit=20" +
    "&apiKey=" + "b6d5bf71fc40437ab2d27ad10c350bbe"; 
 
// Request nearby restaurant data from the Geoapify API.
fetch(url)
.then(response => {
    if (!response.ok) {
        throw new Error("Unable to load dining locations.");
    }
    return response.json();
})
.then(data => {
    console.log("Dining locations:", data);
    diningResults.textContent =
        "Found " + data.features.length + " nearby dining locations.";
        // Display the name of each restaurant.
data.features.forEach(place => {
    const restaurant = document.createElement("p");
    restaurant.textContent = place.properties.name || place.properties.address_line1 || "Dining location";
    diningResults.appendChild(restaurant);
});
})
.catch(error => {
    diningResults.textContent =
    "Dining search is currently unavailable. This feature is still being developed for the final project.";
    console.error(error);
});
});