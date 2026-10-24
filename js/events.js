/*
    Author: Maria Albano
    Date: October 15, 2026
    Project: Campus Life Super App
    Description: JavaScript for the Events page.
*/

// Test that the JavaScript file is connected
console.log("Events JavaScript is connected!");
// Ticketmaster API endpoint
const apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
// Ticketmaster API key for searching events
const apiKey = "pGAOALpDfzQEbIxAWYmEO9R5ErfsSM71";
// Get the search button and input field
const searchButton = document.getElementById("search-button");
const eventSearch = document.getElementById("event-search");
const eventsResults = document.getElementById("events-results");

// Run this code when the user clicks Search Events
searchButton.addEventListener("click", function () {
    const city = eventSearch.value.trim();

    if (city === "") {
        eventsResults.textContent = "Please enter a city.";
    } else {
        eventsResults.textContent = "Searching for events in " + city + "...";

        // Build the Ticketmaster API URL using the city entered by the user.
        const url = apiUrl + "?apikey=" + apiKey +
            "&city=" + encodeURIComponent(city) +
            "&countryCode=US&size=30";
        // Fetch event data from the Ticketmaster API and check for errors.
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load events.");
                }
                return response.json();
            })
            // Process the Ticketmaster response and display the event results.
            .then(data => {
                console.log("Ticketmaster events:", data);
                eventsResults.textContent = "";

                const events = data._embedded?.events || [];

                if (events.length === 0) {
                    eventsResults.textContent = "No events found for this city.";
                } else {

                    // Loop through the events and create a card for each result.
                    events.forEach(event => {
                        const card = document.createElement("div");
                        card.className = "col-md-6 mb-3";
                        // Create the event title, date, and link using Ticketmaster data.
                        const title = document.createElement("h3");
                        title.textContent = event.name;

                        const date = document.createElement("p");
                        date.textContent = "Date: " + (event.dates?.start?.localDate || "Not available");

                        const link = document.createElement("a");
                        link.textContent = "View Event";
                        link.href = event.url;
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                        // Add the event details to the card and display it on the page.
                        card.appendChild(title);
                        card.appendChild(date);
                        card.appendChild(link);


                        eventsResults.appendChild(card);
                    })
                }
            })
            // Handle API errors and display a message to the user. 
            .catch(error => {
                eventsResults.textContent = "Could not load events. Please try again.";
                console.error(error);
            });
    }
});

