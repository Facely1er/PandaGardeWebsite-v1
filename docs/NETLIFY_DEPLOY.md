# Deploy PandaGarde on Netlify

**GitHub repo:** [https://github.com/Facely1er/PandaGardeWebsite-v1](https://github.com/Facely1er/PandaGardeWebsite-v1)

**Remote:** `origin` → `https://github.com/Facely1er/PandaGardeWebsite-v1.git`

---

## Update / sync with remote repo

From the project root:

```bash
# Pull latest from GitHub
git pull origin main

# After making changes: stage, commit, then push
git add .
git commit -m "Your message"
git push origin main
```

If the remote was ever wrong, set it to the correct URL:

```bash
git remote set-url origin https://github.com/Facely1er/PandaGardeWebsite-v1.git
git push -u origin main
```

---

The project already has a **`netlify.toml`** at the repo root with:

- **Build:** `npm run build`
- **Publish:** `dist`
- **Node:** 18
- SPA redirects, security headers, and asset caching

---

## Option 1: Connect via Netlify UI (recommended)

1. Push your code to GitHub (if not already).
2. Go to **[app.netlify.com](https://app.netlify.com)** → **Add new site** → **Import an existing project**.
3. Choose **GitHub** and select **Facely1er/PandaGardeWebsite-v1** (`https://github.com/Facely1er/PandaGardeWebsite-v1`).
4. Netlify will use `netlify.toml` automatically. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add **Environment variables** if needed (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GA4_MEASUREMENT_ID`, `VITE_SENTRY_DSN`). Use the same names as in your `.env` or Vercel.
6. Click **Deploy site**. Future pushes to your main branch will trigger automatic deploys.

---

## Option 2: Netlify CLI (manual deploy)

1. **Install and log in** (one-time):

   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Link this folder to a Netlify site** (one-time):

   ```bash
   cd C:\Users\facel\Downloads\GitHub\FamilyHub\PandaGardeWebsite-v1
   netlify link
   ```

   Choose “Create & configure a new site” or “Link to existing site” and follow the prompts.

3. **Deploy to production:**

   ```bash
   npm run deploy:netlify
   ```

   Or:

   ```bash
   netlify deploy --prod
   ```

   Netlify will run `npm run build` and publish the `dist` folder.

---

## First-time site creation via CLI

To create a new Netlify site and deploy in one go:

```bash
cd C:\Users\facel\Downloads\GitHub\FamilyHub\PandaGardeWebsite-v1
netlify deploy --prod --create-site
```

You’ll be prompted for a site name (e.g. `pandagarde`). After that, the folder is linked and the deploy runs.

---

## Environment variables

If the app needs Supabase, GA4, or Sentry, set them in Netlify:

- **Site settings** → **Environment variables** → **Add a variable** (or **Import from .env**).

Use the same variable names as in your local `.env` (e.g. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
