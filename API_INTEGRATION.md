# API Integration Guide

Your API routes are now structured to call your Notion Worker tools. Here's how to wire them up properly.

## Current Setup

All API routes have mock/placeholder implementations. They return realistic data but don't actually call your worker tools yet.

## Connecting Real Worker Tools

### Option 1: Import Tools Directly (Local Development)

For testing locally, import tools and execute them:

```typescript
// app/api/referrals/route.ts
import referralRouter from "@/worker/tools/referralRouter";

export async function POST(request: NextRequest) {
  const { service } = await request.json();
  
  // Create a mock Worker context if needed, or refactor tools as pure functions
  const result = await referralRouter({ service });
  
  return NextResponse.json({ success: true, data: result });
}
```

### Option 2: Call Deployed Worker (Production)

Once deployed to Vercel, call your Notion Worker endpoints:

```typescript
// app/api/referrals/route.ts
export async function POST(request: NextRequest) {
  const { service } = await request.json();
  
  // Call your deployed Notion Worker
  const response = await fetch("https://your-worker-url/exec/referralRouter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NOTION_API_TOKEN}`,
    },
    body: JSON.stringify({ service }),
  });
  
  const result = await response.json();
  return NextResponse.json({ success: true, data: result });
}
```

### Option 3: Refactor Tools as Pure Functions

For maximum reusability, convert tools to pure functions:

```typescript
// worker/tools/referralRouter.ts
export async function getReferralLink(service: string): Promise<ReferralResult> {
  const links: Record<string, string> = {
    acorns: "https://acorns.com/share/?...",
    ibotta: "https://ibotta.com/r/...",
    // ...
  };
  
  return {
    service,
    referralLink: links[service.toLowerCase()] || null,
    status: "success",
  };
}
```

Then import and use anywhere:

```typescript
// app/api/referrals/route.ts
import { getReferralLink } from "@/worker/tools/referralRouter";

export async function POST(request: NextRequest) {
  const { service } = await request.json();
  const result = await getReferralLink(service);
  return NextResponse.json({ success: true, data: result });
}
```

## Available API Endpoints

### Referrals

**GET** `/api/referrals`  
List all available referral services.

**POST** `/api/referrals`  
Get a specific referral link.
```bash
curl -X POST http://localhost:3000/api/referrals \
  -H "Content-Type: application/json" \
  -d '{"service": "acorns"}'
```

### Deals

**GET** `/api/deals?segment=buyer`  
Fetch active deals, optionally filtered by audience segment.

Tool: `offerRotationEngine`  
Params: `segment`, `history` (optional)

### Analytics

**GET** `/api/analytics?period=month`  
Get performance data and insights.

Tool: `analyticsEngine`  
Params: `events`, `period` (optional)

## Which Tool for Each Endpoint

| Endpoint | Worker Tool | Purpose |
|----------|------------|---------|
| `/api/referrals` | `referralRouter` | Get/manage referral links |
| `/api/deals` | `offerRotationEngine` | Rotate offers based on performance |
| `/api/analytics` | `analyticsEngine` | Analyze performance metrics |

## Adding More Endpoints

To add an endpoint for another tool:

1. Create route: `touch app/api/new-tool/route.ts`
2. Import tool and implement GET/POST handlers
3. Test locally with `npm run dev`
4. Deploy to Vercel

Example for `viralPredictionEngine`:

```typescript
// app/api/viral-score/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    // TODO: Call viralPredictionEngine with content
    const viralScore = calculateViralScore(content);
    
    return NextResponse.json({ success: true, score: viralScore }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate viral score" }, { status: 500 });
  }
}
```

## Testing

### Locally

```bash
npm run dev
# Then in another terminal:
curl http://localhost:3000/api/referrals
curl -X POST http://localhost:3000/api/referrals -d '{"service":"ibotta"}'
```

### After Deployment

```bash
curl https://your-app.vercel.app/api/referrals
curl -X POST https://your-app.vercel.app/api/referrals \
  -H "Content-Type: application/json" \
  -d '{"service":"rakuten"}'
```

## Environment Variables

Add to `.env.local` (locally) and Vercel (production):

```env
NOTION_API_TOKEN=your_token_here
WORKER_URL=https://your-worker-url (if calling deployed worker)
```

## Error Handling

All routes include try-catch and return appropriate HTTP status codes:

- `200` — Success
- `400` — Bad request (missing required params)
- `404` — Resource not found
- `500` — Server error

## Next Steps

1. **Test locally** with `npm run dev`
2. **Connect one tool** (e.g., referralRouter)
3. **Deploy to Vercel**
4. **Add remaining tools** one at a time
5. **Update frontend pages** to call the real APIs instead of mock data
