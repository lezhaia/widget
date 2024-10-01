// 假設從 events.json 中獲取數據
fetch('events.json')
  .then(response => response.json())
  .then(events => {
    
    // 將事件分成置頂和非置頂
    const pinnedEvents = events.filter(event => event.pinned);
    const nonPinnedEvents = events.filter(event => !event.pinned);

    // 將所有事件按照 priority 排序
    pinnedEvents.sort((a, b) => a.priority - b.priority);
    nonPinnedEvents.sort((a, b) => a.priority - b.priority);

    // 渲染事件
    renderEvents(pinnedEvents, nonPinnedEvents);
  })
  .catch(error => console.log('Error fetching events:', error));

function renderEvents(pinnedEvents, nonPinnedEvents) {
    const eventContainer = document.getElementById('event-widgets');
    eventContainer.innerHTML = ''; // 清空容器

    // 渲染置頂事件
    pinnedEvents.forEach(event => {
        const eventElement = createEventElement(event);
        eventContainer.appendChild(eventElement);
    });

    // 渲染非置頂事件
    nonPinnedEvents.forEach(event => {
        const eventElement = createEventElement(event);
        eventContainer.appendChild(eventElement);
    });
}

function createEventElement(event) {
    // 創建事件卡片的 HTML 結構
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-container');

    eventDiv.innerHTML = `
        <div class="date">${event.date}</div>
        <div class="details">
            <h1>${event.category}</h1>
            <h2>${event.title}</h2>
            <p>${event.speaker} · ${event.room}</p>
            <div class="info">
                <span><i class="fas fa-clock"></i> ${event.time}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
            </div>
        </div>
    `;

                eventWidgetsContainer.appendChild(widget);
            });
        })
        .catch(error => console.error('Error loading event data:', error));
});
