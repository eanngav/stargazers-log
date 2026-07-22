async function loadEvents() {
  const list = document.getElementById('events-list');

  if (!list) {
    return;
  }

  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error('Unable to load starred repositories.');
    }

    const events = await response.json();

    list.innerHTML = events
      .map(
        (event) => `
          <li class="event-item">
            <h3 class="event-title">${event.name}</h3>
            <p>${event.description}</p>
            <div class="event-meta">
              <span>${event.language}</span>
              <span>•</span>
              <span>${event.stars.toLocaleString()} stars</span>
              <span>•</span>
              <span>Starred ${event.starredAt}</span>
            </div>
          </li>
        `
      )
      .join('');
  } catch (error) {
    list.innerHTML = `<li class="event-item">${error.message}</li>`;
  }
}

document.addEventListener('DOMContentLoaded', loadEvents);
