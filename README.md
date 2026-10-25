# Driftline

A line-art racing game that mixes F1 and drifting. Every circuit is randomly generated. You race AI rivals or up to 3 friends online, manage tyre wear and make pit stops.

## What's in this folder

| File | What it does |
| --- | --- |
| `index.html` | The whole game: graphics, physics, AI and multiplayer |
| `manifest.webmanifest` | Lets players install Driftline to their home screen |
| `sw.js` | Offline support, so the game opens without internet after the first visit |
| `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | App and browser icons |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Publish on GitHub Pages

1. Sign in to GitHub and create a new **public** repository, for example `driftline`.
2. On the repository page, choose **Add file → Upload files**. Drag in everything from this folder. Some systems hide `.nojekyll`, so if it doesn't show up, the game still works.
3. Click **Commit changes**.
4. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick the `main` branch and the `/ (root)` folder, then click **Save**.
5. After about a minute the game is live at `https://<your-username>.github.io/driftline/`. The link also appears at the top of the Pages settings.

### Using your own domain later

1. Buy a domain from a registrar such as Cloudflare, Namecheap or Porkbun.
2. In **Settings → Pages → Custom domain**, enter the domain and save.
3. At your registrar, add the DNS records GitHub shows you. GitHub's guide is under "Managing a custom domain for your GitHub Pages site".
4. Turn on **Enforce HTTPS** once it becomes available. Multiplayer and offline mode need HTTPS.

## Publishing updates

1. Upload the new `index.html` over the old one.
2. Open `sw.js` and change `driftline-v1` to `driftline-v2`, then `v3` the next time, and so on. This makes players' devices fetch the new version.

## How multiplayer works

- There's no game server to run. The host's device runs the race, and friends connect directly to it.
- **Hosting:** tap **Multiplayer → Host a race**, then **Copy link** and send it to friends. They can also type the race code, for example `drift-70851`.
- **Lobby:** everyone picks a car. The host picks the laps (3–10 or random), the track, and whether AI rivals fill empty spots.
- **Connecting:** players find each other through PeerJS's free public service. After that, race data goes directly between devices.
- **Networks:** it works best on the same Wi-Fi. Across different networks it usually works, but some strict mobile or office networks block direct connections. Fixing that needs a relay (TURN) server, which costs money to run.
- **If the host closes the game,** the race ends for everyone.

## Credits

- Fonts: Bungee Hairline and IBM Plex Mono, from Google Fonts (SIL Open Font License).
- Multiplayer: PeerJS 1.5.4 (MIT License), loaded from unpkg.
