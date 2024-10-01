document.addEventListener("DOMContentLoaded", function () {
    // Add a timestamp to the JSON request to prevent caching
    const jsonUrl = `data/events.json?t=${new Date().getTime()}`;

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            const eventWidgetsContainer = document.getElementById('event-widgets');
            
            data.events.forEach(event => {
                const widget = document.createElement('div');
                widget.classList.add('event-container');

                widget.innerHTML = `
                    <div class="date">
                        <div>${event.month}</div>
                        <span>${event.day}</span>
                    </div>
                    <div class="details">
                        <h1>${event.type}</h1>
                        <h2>${event.title}</h2>
                        <p>${event.speaker} &middot; ${event.location}</p>
                        <div class="info">
                            <span><i class="fas fa-clock"></i> ${event.time}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${event.hall}</span>
                        </div>
                    </div>
                `;

                eventWidgetsContainer.appendChild(widget);
            });
        })
        .catch(error => console.error('Error loading event data:', error));
});
