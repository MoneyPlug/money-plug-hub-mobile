# Setup Guide: Next.js + Notion Worker

This project combines a **Next.js web application** with a **Notion Worker backend**.

## Project Structure

```
├── app/                          # Next.js app (React pages, API routes)
│   ├── api/                      # API routes (call worker tools)
│   ├── page.tsx                  # Landing page
│   ├── referrals/                # Referral dashboard
│   ├── deals/                    # Deals & offers page
│   ├── analytics/                # Analytics dashboard
│   ├── growth/                   # Growth tools
│   ├── lead-magnets/             # Lead magnet management
│   ├── sync/                     # Multi-platform sync
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── worker/                       # Notion Worker (backend)
│   ├── index.ts                  # Worker definition
│   └── tools/                    # Tool implementations
├── public/                       # Static assets
├── next.config.js                # Next.js configuration
├── vercel.json                   # Vercel deployment config
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your values:
- `NOTION_API_TOKEN`: Get from https://app.notion.com/developers/connections

### 3. Development

Start the Next.js dev server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app.

### 4. Type Check

```bash
npm run check
```

## Next.js App Features

### Pages

- **Home** (`/`) - Landing page with service overview
- **Referrals** (`/referrals`) - Referral dashboard and link sharing
- **Deals** (`/deals`) - Browse exclusive offers with commission rates
- **Analytics** (`/analytics`) - Track performance and earnings
- **Growth** (`/growth`) - AI-powered growth tools (forecasting, content rewriting, A/B testing)
- **Lead Magnets** (`/lead-magnets`) - Manage lead capture campaigns
- **Sync** (`/sync`) - Multi-platform content synchronization

### API Routes

- `POST /api/worker` - Execute worker tools/actions
- `GET/POST /api/referrals` - Manage referrals
- `GET /api/deals` - Fetch active deals
- `GET /api/analytics` - Get analytics data

## Connecting to Notion Worker

The API routes in `app/api/` are placeholder endpoints. To connect them to your actual Notion Worker tools:

1. Import your worker tools in `app/api/*/route.ts`
2. Call the appropriate tool in the handler
3. Return the result to the frontend

Example:

```typescript
// app/api/referrals/route.ts
import referralRouter from "@/worker/tools/referralRouter";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await referralRouter(body);
  return NextResponse.json({ success: true, data: result });
}
```

## Deployment to Vercel

### Prerequisites

1. Push code to GitHub
2. Create a Vercel project at https://vercel.com
3. Set up GitHub integration
4. Add environment secrets in Vercel:
   - `NOTION_API_TOKEN` - Your Notion API token
   - `VERCEL_ORG_ID` - From Vercel settings
   - `VERCEL_PROJECT_ID` - From Vercel project settings

### Deploy

Push to `main` or `master` branch to automatically deploy:

```bash
git push origin main
```

Preview deployments are created for pull requests.

## Building

```bash
npm run build
npm start
```

## Customization

### Styling

Global styles are in `app/globals.css`. Customize colors, fonts, and spacing there.

### Adding Pages

Create new directories in `app/` with `page.tsx`:

```bash
mkdir -p app/new-page
touch app/new-page/page.tsx
```

### Adding API Routes

Create new files in `app/api/`:

```bash
touch app/api/new-endpoint/route.ts
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion Workers Guide](../DEPLOYING.md)
- [React Documentation](https://react.dev)

## Support

For issues or questions, refer to:
- Next.js: https://nextjs.org/docs
- Notion Workers: https://developers.notion.com/workers
- Vercel: https://vercel.com/docs
