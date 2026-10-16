/*
    Author: Maria Albano
    Date: October 15, 2026
    Project: Campus Life Super App
    Description: JavaScript for the Dining page.
*/

// Test that JavaScript is connected
console.log("Dining JavaScript is connected!");
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

// Search for restaurants and cafes within 1500 meters
const query = `
    [out:json][timeout:25];
    (
        node["amenity"~"^(restaurant|cafe|fast_food)$"]
        (around:1500,${latitude},${longitude});
    );
    out body;
`;

// Request dining locations using GET
const url = "https://overpass.private.coffee/api/interpreter?data="
    + encodeURIComponent(query);

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
        "Found " + data.elements.length + " nearby dining locations.";
})
.catch(error => {
    diningResults.textContent =
        "Could not load dining locations. Please try again.";
    console.error(error);
});
});