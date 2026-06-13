import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function abTestingEngine(worker: Worker) {
  worker.tool("abTestingEngine", {
    title: "A/B Testing Engine",
    description: "Tests multiple variations of content, hooks, CTAs, or offers and selects the winner.",
    schema: j.object({
      variants: j.array(
        j.object({
          id: j.string(),
          content: j.string(),
          impressions: j.number().default(0),
          clicks: j.number().default(0),
          conversions: j.number().default(0),
        })
      ).describe("List of content variants to test."),
      metric: j.string().default("ctr").describe("ctr, conversion, or engagement."),
    }),
    execute: async ({ variants, metric }) => {
      const scored = variants.map((v) => {
        const ctr = v.impressions ? v.clicks / v.impressions : 0;
        const conv = v.clicks ? v.conversions / v.clicks : 0;
        const engagement = ctr * 0.5 + conv * 0.5;

        let score = 0;
        if (metric === "ctr") score = ctr;
        else if (metric === "conversion") score = conv;
        else score = engagement;

        return {
          ...v,
          score,
        };
      });

      const winner = scored.sort((a, b) => b.score - a.score)[0];

      return {
        status: "success",
        metric,
        winner,
        ranked: scored.sort((a, b) => b.score - a.score),
        recommendation: generateRecommendation(metric, winner),
      };
    },
  });
}

function generateRecommendation(metric: string, winner: any) {
  if (metric === "ctr")
    return `Use variant ${winner.id} — it has the strongest hook.`;

  if (metric === "conversion")
    return `Use variant ${winner.id} — it converts the best.`;

  return `Use variant ${winner.id} — it has the best overall engagement.`;
}
