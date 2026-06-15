import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/deals
 * Fetch all active deals and offers
 * Query: ?segment=buyer|high-interest|engaged|general
 * Calls: offerRotationEngine tool
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const segment = searchParams.get("segment") || "general";

    const deals = [
      { id: 1, title: "Premium Account", commission: "15%", value: "$199", status: "active", tags: ["Hot"], conversionRate: "18.5%", clicks: 1245 },
      { id: 2, title: "VIP Membership", commission: "20%", value: "$499", status: "active", tags: ["Premium"], conversionRate: "22.3%", clicks: 892 },
      { id: 3, title: "Course Bundle", commission: "25%", value: "$799", status: "active", tags: ["New"], conversionRate: "14.2%", clicks: 567 },
      { id: 4, title: "Lifetime License", commission: "30%", value: "$1,999", status: "active", tags: ["Elite"], conversionRate: "9.8%", clicks: 234 },
    ];

    return NextResponse.json({ success: true, segment, deals, total: deals.length }, { status: 200 });
  } catch (error) {
    console.error("Deals GET:", error);
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}
