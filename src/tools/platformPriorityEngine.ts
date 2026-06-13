import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function platformPriorityEngine(worker: Worker) {
  worker.tool("platformPriorityEngine", {
    title: "Platform Priority Engine",
    description: "Determines which platforms should be prioritized based on analytics, virality, and audience behavior.",
    schema: j.object({
      analytics: j.object({
        tiktokCTR: j.number().optional(),
        instagramCTR: j.number().optional(),
        youtubeCTR: j.number().optional(),
        xCTR: j.number().optional(),
        redditCTR: j.number().optional(),

        tiktokWatch: j.number().optional(),
        instagramWatch: j.number().optional(),
        youtubeWatch: j.number().optional(),
        xWatch: j.number().optional(),
        redditWatch: j.number().optional(),
      }).optional(),

      viralScores: j.object({
        tiktok: j.number().optional(),
        instagram: j.number().optional(),
        youtube: j.number().optional(),
        x: j.number().optional(),
        reddit: j.number().optional(),
      }).optional(),
    }),
    execute: async ({ analytics, viralScores }) => {
      const platforms = ["tiktok", "instagram", "youtube", "x", "reddit"];

      const results = platforms.map((p) => {
        const ctr = analytics?.[`${p}CTR`] || 0;
        const watch = analytics?.[`${p}Watch`] || 0;
        const viral = viralScores?.[p] || 0;

        const score = Math.round(ctr * 40 + watch * 30 + viral * 30);

        return {
          platform: p,
          score,
        };
      });

      const sorted = results.sort((a, b) => b.score - a.score);

      return {
        status: "success",
        priorityOrder: sorted,
        topPlatform: sorted[0]?.platform || "tiktok",
        recommendations: generateRecommendations(sorted[0]?.platform),
      };
    },
  });
}

function generateRecommendations(platform: string) {
  switch (platform) {
    case "tiktok":
      return ["Post short, high‑energy content.", "Use strong hooks in the first 2 seconds."];
    case "instagram":
      return ["Use clean captions.", "Add a save‑worthy tip."];
    case "youtube":
      return ["Use longer educational content.", "Add a strong CTA at the end."];
    case "x":
      return ["Use punchy one‑liners.", "Leverage curiosity and controversy."];
    case "reddit":
      return ["Use long‑form breakdowns.", "Provide value and detail."];
    default:
      return ["Post consistently.", "Test multiple formats."];
  }
}
