import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function hybridPromotionEngine(worker: Worker) {
  worker.tool("hybridPromotionEngine", {
    title: "Hybrid Promotion Engine",
    description: "Combines scoring, virality, audience targeting, and monetization to choose the best promotion strategy.",
    schema: j.object({
      content: j.string().describe("Raw content to evaluate."),
      platform: j.string().describe("tiktok, instagram, youtube, x, reddit."),
      analytics: j.object({
        avgCTR: j.number().optional(),
        avgWatchTime: j.number().optional(),
        avgConversionRate: j.number().optional(),
      }).optional(),
      intent: j.string().optional().describe("earn, save, invest, credit, budget."),
      segment: j.string().optional().describe("audience segment from audienceTargetingEngine."),
    }),
    execute: async ({ content, platform, analytics, intent, segment }) => {
      const score = scoreContent(content);
      const viral = viralPotential(content, platform, analytics);
      const audience = audienceBoost(segment);
      const monetization = monetizationBoost(intent, segment);

      const finalScore = Math.min(
        100,
        Math.round(score + viral + audience + monetization)
      );

      return {
        status: "success",
        finalScore,
        rating: rating(finalScore),
        strategy: chooseStrategy(finalScore),
        recommendedCTA: chooseCTA(finalScore),
        recommendedOffer: chooseOffer(intent, segment),
        recommendedPlatform: platform,
      };
    },
  });
}

function scoreContent(content: string) {
  return content.length > 150 ? 20 : 10;
}

function viralPotential(content: string, platform: string, analytics?: any) {
  let base = 20;
  if (/[!?]/.test(content)) base += 5;
  if (/secret|hack|mistake|stop/i.test(content)) base += 10;

  const platformBoost = {
    tiktok: 10,
    instagram: 8,
    youtube: 5,
    x: 6,
    reddit: 7,
  }[platform] || 0;

  let analyticsBoost = 0;
  if (analytics) {
    if (analytics.avgCTR > 0.08) analyticsBoost += 10;
    if (analytics.avgWatchTime > 15) analyticsBoost += 10;
    if (analytics.avgConversionRate > 0.12) analyticsBoost += 10;
  }

  return base + platformBoost + analyticsBoost;
}

function audienceBoost(segment?: string) {
  if (!segment) return 5;
  if (segment === "buyer") return 20;
  if (segment === "high-interest") return 15;
  if (segment === "engaged") return 10;
  return 5;
}

function monetizationBoost(intent?: string, segment?: string) {
  if (segment === "buyer") return 20;
  if (intent === "earn") return 10;
  if (intent === "invest") return 10;
  return 5;
}

function rating(score: number) {
  if (score >= 85) return "high-priority";
  if (score >= 70) return "strong";
  if (score >= 50) return "medium";
  return "low";
}

function chooseStrategy(score: number) {
  if (score >= 85) return "aggressive";
  if (score >= 70) return "balanced";
  return "slow";
}

function chooseCTA(score: number) {
  if (score >= 85) return "Do this now — don’t wait.";
  if (score >= 70) return "Try this today.";
  return "Check this out.";
}

function chooseOffer(intent?: string, segment?: string) {
  if (segment === "buyer") return "High‑value offer bundle";

  const offers = {
    earn: "Ibotta Cashback — SPKGLXJ",
    save: "Acorns — AXWRDW3",
    invest: "Acorns — AXWRDW3",
    credit: "Credit Builder Tools",
    budget: "Budgeting Apps Starter Pack",
  };

  return offers[intent || "earn"];
}
