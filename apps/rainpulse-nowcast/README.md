# RainPulse Nowcast (Chrome Extension MVP)

Fast-follower MVP for weather badge pain points:
- real-time visibility in badge
- minute countdown to rain start/end in next 60 minutes

## Badge semantics
- `Rxx`: rain starts in xx minutes
- `Exx`: rain ends in xx minutes
- `CLR`: no rain in next 60m
- `ERR`: API/network error

## Local run
1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder
4. Pin extension and test city search in popup

## Minimal permissions
- `alarms`
- `storage`
- host permissions only for Open-Meteo APIs

## Next monetizable upgrade (v0.2)
- 5-min push pre-rain alerts
- dark/light adaptive badge contrast presets
- commute presets (home/work)
