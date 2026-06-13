import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function offerRotationEngine(worker: Worker) {
  worker.tool("offerRotationEngine", {
    title: "Offer Rotation Engine",
    description: "Rotates offers based on performance, fatigue, and audience segment.",
    schema: j.object({
      history: j.array(
        j.object({
          offer: j.string(),
          clicks: j.number().default(0),
          conversions: j.number().default(0),
          impressions: j.number().default(0),
          timestamp: j.string(),
        })
      ).describe("Past offer performance data."),
      segment: j.string().optional().describe("Audience segment: buyer, high-interest, engaged, general."),
    }),
    execute: async ({ history, segment }) => {
      const offers = getOffers();
      const performance = calculatePerformance(history);
      const fatigue = calculateFatigue(history);

      const ranked = offers
        .map((offer) => {
          const perf = performance[offer] || 0;
          const fat = fatigue[offer] || 0;
          const segBoost = segmentBoost(segment);

          const score = Math.round(perf * 0.6 + segBoost * 0.3 - fat * 0.4);

          return { offer, score };
        })
        .sort((a, b) => b.score - a.score);

      return {
        status: "success",
        rotationOrder: ranked,
        recommendedOffer: ranked[0]?.offer || offers[0],
      };
    },
  });
}

function getOffers() {
  return [
    "Ibotta Cashback — SPKGLXJ",
    "Acorns — AXWRDW3",
    "Credit Builder Tools",
    "Budgeting Apps Starter Pack",
    "High‑value offer bundle",
  ];
}

function calculatePerformance(history: any[]) {
  const perf: Record<string, number> = {};

  for (const h of history) {
    const ctr = h.impressions ? h.clicks / h.impressions : 0;
    const conv = h.clicks ? h.conversions / h.clicks : 0;

    const score = ctr * 50 + conv * 50;

    perf[h.offer] = (perf[h.offer] || 0) + score;
  }

  return perf;
}

function calculateFatigue(history: any[]) {
  const fatigue: Record<string, number> = {};

  for (const h of history) {
    fatigue[h.offer] = (fatigue[h.offer] || 0) + 1;
  }

  return fatigue;
}

function segmentBoost(segment?: string) {
  if (!segment) return 5;
  if (segment === "buyer") return 20;
  if (segment === "high-interest") return 15;
  if (segment === "engaged") return 10;
  return 5;
}
