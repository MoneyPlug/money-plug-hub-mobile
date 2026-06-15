import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    // This is where you'd call your Notion Worker tools
    // For now, return a success response
    
    console.log(`Calling worker action: ${action}`, data);

    return NextResponse.json(
      {
        success: true,
        action,
        result: `${action} executed successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to execute action" },
      { status: 500 }
    );
  }
}
