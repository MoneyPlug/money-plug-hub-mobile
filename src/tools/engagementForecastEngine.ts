import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function engagementForecastEngine(worker: Worker) {
  worker.tool("engagementForecastEngine", {
    title: "Engagement Forecast Engine",
    description: "Predicts future engagement based on analytics, content structure, and platform trends.",
    schema: j.object({
      content: j.string().describe("Content to forecast."),
      platform: j.string().describe("tiktok, instagram, youtube, x, reddit."),
      analytics: j.object({
        avgCTR: j.number().optional(),
        avgWatchTime: j.number().optional(),
        avgConversionRate: j.number().optional(),
        avgViews: j.number().optional(),
      }).optional(),
      score: j.number().optional().describe("Content score from contentScoringEngine."),
      viralScore: j.number().optional().describe("Viral score from viralPredictionEngine."),
    }),
    execute: async ({ content, platform, analytics, score, viralScore }) => {
      const base = baseForecast(content);
      const platformBoost = platformModifier(platform);
      const analyticBoost = analyticsModifier(analytics);
      const scoreBoost = score ? score * 0.3 : 0;
      const viralBoost = viralScore ? viralScore * 0.4 : 0;

      const final = Math.min(
        100,
        Math.round(base + platformBoost + analyticBoost + scoreBoost + viralBoost)
      );

      return {
        status: "success",
        forecastScore: final,
        predicted: generatePredictions(final, platform),
        recommendedPostTime: bestTimeToPost(platform),
      };
    },
  });
}

function baseForecast(content: string) {
  let score = 20;
  if (content.length > 150) score += 10;
  if (/[!?]/.test(content)) score += 5;
  if (/secret|hack|mistake|stop/i.test(content)) score += 10;
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
  if (analytics.avgViews > 5000) boost += 10;

  return boost;
}

function generatePredictions(score: number, platform: string) {
  return {
    expectedViews: Math.round(score * 120),
    expectedCTR: +(0.01 + score / 2000).toFixed(3),
    expectedWatchTime: Math.round(score / 3),
    expectedConversions: Math.round(score / 10),
    platform,
  };
}

function bestTimeToPost(platform: string) {
  switch (platform) {
    case "tiktok":
      return "4–7 PM";
    case "instagram":
      return "11 AM – 2 PM";
    case "youtube":
      return "3–6 PM";
    case "x":
      return "8–11 AM";
    case "reddit":
      return "6–10 AM";
    default:
      return "Anytime between 10 AM – 6 PM";
  }
}
