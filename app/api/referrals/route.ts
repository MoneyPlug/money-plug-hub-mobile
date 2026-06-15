import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/referrals
 * Fetch all available referral links
 * Calls: referralRouter tool
 */
export async function GET(request: NextRequest) {
  try {
    const services = ["acorns", "ibotta", "rakuten", "swagbucks"];
    
    const referrals = services.map((service) => ({
      service,
      referralLink: `https://moneyplughub.com/ref/${service}`,
      status: "active",
    }));

    return NextResponse.json({ success: true, referrals, total: referrals.length }, { status: 200 });
  } catch (error) {
    console.error("Referrals GET:", error);
    return NextResponse.json({ error: "Failed to fetch referrals" }, { status: 500 });
  }
}

/**
 * POST /api/referrals
 * Get a referral link for a specific service
 * Body: { service: string }
 * Calls: referralRouter tool
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service } = body;

    if (!service) {
      return NextResponse.json({ error: "Service name required" }, { status: 400 });
    }

    const links: Record<string, string> = {
      acorns: "https://acorns.com/share/?shareable_code=AXWRDW3&first_name=Shane",
      ibotta: "https://ibotta.com/r/SPKGLXJ",
      rakuten: "https://www.rakuten.com/r/CASHPL19",
      swagbucks: "https://www.swagbucks.com/profile/r_235418044?rp=1",
    };

    const key = service.toLowerCase();
    const referralLink = links[key];

    if (!referralLink) {
      return NextResponse.json({ error: `No link for '${service}'` }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, service: key, referralLink, shareUrl: `https://moneyplughub.com/ref/${key}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Referrals POST:", error);
    return NextResponse.json({ error: "Failed to get referral" }, { status: 500 });
  }
}
