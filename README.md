# Brookies Cafe QR Menu

## Build for Netlify Drop

1. Open this project folder in a terminal.
2. Run `npm install` once.
3. Run `npm run build`.
4. In Netlify, drag the generated `dist` folder into the deploy area. Do not drag the source project folder.

The production build uses Vite (`npm run build`) and writes the static site to `dist/`. All logo and food photos are local imports under `src/assets/images/`, so Vite fingerprints and copies them into the build output.

## Netlify Git deployment

If you connect this project repository to Netlify, the included `netlify.toml` sets the build command to `npm run build` and the publish directory to `dist`.
