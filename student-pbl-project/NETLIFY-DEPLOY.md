# Deploy to Netlify – Get a Live URL

## Method 1: Netlify Drop (easiest)

1. Go to **https://app.netlify.com** and sign in (free).
2. Click **Add new site** → **Deploy manually** (or go to **https://app.netlify.com/drop**).
3. **Drag the whole `student-pbl-project` folder** into the drop zone (the folder that contains `index.html`).
4. Wait for deploy. Netlify will show a URL like `https://something.netlify.app`.
5. **DSA version:** `https://your-site.netlify.app/dsa-version/`

## Method 2: Netlify CLI

```bash
cd student-pbl-project
npx netlify login
npx netlify deploy --dir=. --prod
```

Use the URL Netlify gives you.
