# Deploying to Vercel

Follow these steps to connect this repository to Vercel and enable deployments.

- **Import repository:** Sign in to Vercel and import this repository from GitHub/GitLab/Bitbucket.
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:** Add `NOTION_API_TOKEN` in the Vercel Project Settings (Environment Variables) for production and preview deployments.

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel will run `npm run build` and use the `dist` directory per `vercel.json`.

### CI / Git integration

To automatically deploy on push, add these repository secrets in GitHub Settings → Secrets → Actions:

- `VERCEL_TOKEN` — a Vercel Personal Token (create at https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` — your Vercel Organization ID (found in project settings or the Vercel dashboard)
- `VERCEL_PROJECT_ID` — your Vercel Project ID (found in project settings)

A GitHub Actions workflow is included at `.github/workflows/vercel-deploy.yml` which builds and deploys on pushes to `main`/`master`.

