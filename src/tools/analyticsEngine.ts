import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function analyticsEngine(worker: Worker) {
  worker.tool("analyticsEngine", {
    title: "Analytics Engine",
    description: "Analyzes performance data and returns insights for optimization.",
    schema: j.object({
      events: j.array(
        j.object({
          platform: j.string(),
          clicks: j.number().default(0),
          views: j.number().default(0),
          conversions: j.number().default(0),
          timestamp: j.string(),
        })
      ).describe("List of performance events from your content."),
    }),
    execute: async ({ events }) => {
      if (!events.length) {
        return {
          status: "no-data",
          message: "No analytics events provided.",
        };
      }

      const summary: Record<string, any> = {};

      for (const e of events) {
        if (!summary[e.platform]) {
          summary[e.platform] = {
            platform: e.platform,
            totalViews: 0,
            totalClicks: 0,
            totalConversions: 0,
            ctr: 0,
            conversionRate: 0,
          };
        }

        summary[e.platform].totalViews += e.views;
        summary[e.platform].totalClicks += e.clicks;
        summary[e.platform].totalConversions += e.conversions;
      }

      const insights = Object.values(summary).map((p: any) => {
        p.ctr = p.totalViews ? p.totalClicks / p.totalViews : 0;
        p.conversionRate = p.totalClicks ? p.totalConversions / p.totalClicks : 0;

        let recommendation = "Maintain current strategy.";

        if (p.ctr > 0.08) recommendation = "Double down — high engagement.";
        if (p.ctr < 0.02) recommendation = "Try new hooks or formats.";
        if (p.conversionRate > 0.15) recommendation = "Strong conversions — scale this platform.";
        if (p.conversionRate < 0.03) recommendation = "Weak conversions — refine CTA.";

        return {
          ...p,
          recommendation,
        };
      });

      return {
        status: "success",
        insights,
      };
    },
  });
}
