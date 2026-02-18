const q = document.getElementById('q');
const btnSearch = document.getElementById('search');
const results = document.getElementById('results');
const statusEl = document.getElementById('status');
const refreshBtn = document.getElementById('refresh');

btnSearch.addEventListener('click', onSearch);
q.addEventListener('keydown', (e) => { if (e.key === 'Enter') onSearch(); });
refreshBtn.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ type: 'refresh' });
  await renderStatus();
});

init();

async function init() {
  await renderStatus();
}

async function renderStatus() {
  const { lastStatus } = await chrome.storage.local.get('lastStatus');
  if (!lastStatus) {
    statusEl.textContent = 'No weather data yet. Click Refresh.';
    return;
  }

  const loc = lastStatus.location?.name ? ` @ ${lastStatus.location.name}` : '';
  if (lastStatus.type === 'start') {
    statusEl.textContent = `Rain starts in ${lastStatus.minutes} min${loc}`;
  } else if (lastStatus.type === 'end') {
    statusEl.textContent = `Rain ends in ${lastStatus.minutes} min${loc}`;
  } else if (lastStatus.type === 'clear') {
    statusEl.textContent = `No rain in next 60 min${loc}`;
  } else {
    statusEl.textContent = `Error: ${lastStatus.message || 'unknown'}`;
  }
}

async function onSearch() {
  const term = q.value.trim();
  if (!term) return;
  results.innerHTML = '<div class="muted">Searching...</div>';

  try {
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.searchParams.set('name', term);
    url.searchParams.set('count', '5');
    url.searchParams.set('language', 'en');
    const res = await fetch(url);
    const data = await res.json();
    const list = data?.results || [];
    if (!list.length) {
      results.innerHTML = '<div class="muted">No results</div>';
      return;
    }

    results.innerHTML = '';
    list.forEach((item) => {
      const b = document.createElement('button');
      const name = [item.name, item.admin1, item.country].filter(Boolean).join(', ');
      b.textContent = name;
      b.addEventListener('click', async () => {
        await chrome.storage.local.set({
          location: { name, latitude: item.latitude, longitude: item.longitude }
        });
        await chrome.runtime.sendMessage({ type: 'refresh' });
        results.innerHTML = '<div class="muted">Location saved</div>';
        await renderStatus();
      });
      results.appendChild(b);
    });
  } catch (e) {
    results.innerHTML = `<div class="muted">Search failed: ${String(e)}</div>`;
  }
}
