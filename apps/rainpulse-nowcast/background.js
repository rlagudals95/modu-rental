const DEFAULTS = {
  location: { name: 'Seoul', latitude: 37.5665, longitude: 126.9780 },
  thresholdMm: 0.1
};

const ALARM = 'rainpulse-refresh';

chrome.runtime.onInstalled.addListener(async () => {
  const { location } = await chrome.storage.local.get('location');
  if (!location) {
    await chrome.storage.local.set({ location: DEFAULTS.location, thresholdMm: DEFAULTS.thresholdMm });
  }
  await schedule();
  await refreshBadge();
});

chrome.runtime.onStartup.addListener(async () => {
  await schedule();
  await refreshBadge();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM) await refreshBadge();
});

chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === 'local' && (changes.location || changes.thresholdMm)) {
    await refreshBadge();
  }
});

async function schedule() {
  chrome.alarms.create(ALARM, { periodInMinutes: 5 });
}

async function refreshBadge() {
  try {
    const { location = DEFAULTS.location, thresholdMm = DEFAULTS.thresholdMm } = await chrome.storage.local.get(['location', 'thresholdMm']);
    const data = await fetchNowcast(location.latitude, location.longitude);
    const status = computeCountdown(data, thresholdMm);

    if (!status) {
      await setBadge('CLR', '#1f2937');
      await chrome.storage.local.set({ lastStatus: { type: 'clear', updatedAt: Date.now(), location } });
      return;
    }

    if (status.type === 'start') {
      await setBadge(`R${String(status.minutes).padStart(2, '0')}`, '#0ea5e9');
    } else {
      await setBadge(`E${String(status.minutes).padStart(2, '0')}`, '#f97316');
    }

    await chrome.storage.local.set({
      lastStatus: {
        ...status,
        location,
        updatedAt: Date.now()
      }
    });
  } catch (err) {
    await setBadge('ERR', '#dc2626');
    await chrome.storage.local.set({ lastStatus: { type: 'error', message: String(err), updatedAt: Date.now() } });
  }
}

async function setBadge(text, color) {
  await chrome.action.setBadgeText({ text });
  await chrome.action.setBadgeBackgroundColor({ color });
}

async function fetchNowcast(latitude, longitude) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', latitude);
  url.searchParams.set('longitude', longitude);
  url.searchParams.set('minutely_15', 'precipitation');
  url.searchParams.set('forecast_days', '1');
  url.searchParams.set('timezone', 'auto');

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast API ${res.status}`);
  return res.json();
}

function computeCountdown(data, threshold) {
  const now = new Date();
  const times = data?.minutely_15?.time || [];
  const precip = data?.minutely_15?.precipitation || [];
  if (!times.length || !precip.length) return null;

  // Build 15-minute buckets ahead of now (next 60m only)
  const buckets = times
    .map((t, i) => ({ at: new Date(t), mm: Number(precip[i] ?? 0) }))
    .filter((x) => !Number.isNaN(x.at.getTime()) && x.at >= now)
    .slice(0, 5);

  if (!buckets.length) return null;

  const currentlyRaining = buckets[0].mm >= threshold;

  if (!currentlyRaining) {
    const nextRain = buckets.find((b) => b.mm >= threshold);
    if (!nextRain) return null;
    return { type: 'start', minutes: diffMinutes(now, nextRain.at), at: nextRain.at.toISOString() };
  }

  const rainEnd = buckets.find((b) => b.mm < threshold);
  if (!rainEnd) {
    return { type: 'end', minutes: 60, at: null };
  }
  return { type: 'end', minutes: diffMinutes(now, rainEnd.at), at: rainEnd.at.toISOString() };
}

function diffMinutes(from, to) {
  const ms = to.getTime() - from.getTime();
  return Math.max(0, Math.round(ms / 60000));
}

// For popup testing
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === 'refresh') {
    refreshBadge().then(() => sendResponse({ ok: true })).catch((e) => sendResponse({ ok: false, error: String(e) }));
    return true;
  }
});
