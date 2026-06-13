import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function viralPredictionEngine(worker: Worker) {
  worker.tool("viralPredictionEngine", {
    title: "Viral Prediction Engine",
    description: "Predicts viral potential of content based on structure, tone, and historical patterns.",
    schema: j.object({
      content: j.string().describe("Raw content or script to evaluate."),
      platform: j.string().describe("tiktok, instagram, youtube, x, reddit."),
      analytics: j.object({
        avgCTR: j.number().optional(),
        avgWatchTime: j.number().optional(),
        avgConversionRate: j.number().optional(),
      }).optional(),
    }),
    execute: async ({ content, platform, analytics }) => {
      const baseScore = scoreContent(content);
      const platformBoost = platformModifier(platform);
      const analyticsBoost = analyticsModifier(analytics);

      const finalScore = Math.min(
        100,
        Math.round(baseScore + platformBoost + analyticsBoost)
      );

      return {
        status: "success",
        score: finalScore,
        rating: rating(finalScore),
        recommendations: generateRecommendations(finalScore, platform),
      };
    },
  });
}

function scoreContent(content: string) {
  let score = 40;

  if (content.length < 80) score -= 5;
  if (content.length > 200) score += 5;

  if (/[!?]/.test(content)) score += 5;
  if (/secret|nobody|mistake|hack|stop|start/i.test(content)) score += 10;

  if (content.split(" ").length <= 12) score += 5;

  return score;
}

function platformModifier(platform: string) {
  const boosts: Record<string, number> = {
    tiktok: 15,
    instagram: 10,
    youtube: 5,
    x: 8,
    reddit: 12,
  };
  return boosts[platform] || 0;
}

function analyticsModifier(analytics?: any) {
  if (!analytics) return 0;

  let boost = 0;

  if (analytics.avgCTR > 0.08) boost += 10;
  if (analytics.avgWatchTime > 15) boost += 10;
  if (analytics.avgConversionRate > 0.12) boost += 10;

  return boost;
}

function rating(score: number) {
  if (score >= 85) return "viral-ready";
  if (score >= 70) return "strong";
  if (score >= 50) return "decent";
  return "weak";
}

function generateRecommendations(score: number, platform: string) {
  if (score >= 85)
    return [`Post immediately on ${platform}.`, "Use a strong CTA.", "Double down on this style."];

  if (score >= 70)
    return [
      "Add a stronger hook.",
      "Increase emotional intensity.",
      "Try a shorter version for TikTok.",
    ];

  if (score >= 50)
    return [
      "Rewrite the first 3 seconds.",
      "Add urgency or curiosity.",
      "Use a more emotional angle.",
    ];

  return [
    "Completely rewrite the hook.",
    "Add a bold claim or surprising insight.",
    "Shorten the content significantly.",
  ];
}
