document.addEventListener("DOMContentLoaded", function () {
    const config = {
        enableRanking: true,  // 開關：是否根據rank屬性進行排序
        enablePinning: true   // 開關：是否允許置頂功能
    };

    const jsonUrl = `data/events.json?t=${new Date().getTime()}`;

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            let events = data.events;

            // 根據 `pinned` 和 `rank` 進行排序
            if (config.enablePinning) {
                events.sort((a, b) => b.pinned - a.pinned);
            }

            if (config.enableRanking) {
                events.sort((a, b) => a.rank - b.rank);
            }

            const eventWidgetsContainer = document.getElementById('event-widgets');
            
            events.forEach(event => {
                const widget = document.createElement('div');
                widget.classList.add('event-container');

                // 如果活動置頂，添加一個樣式標記
                if (event.pinned) {
                    widget.classList.add('pinned');
                }

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
