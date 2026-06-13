import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function monetizationEngine(worker: Worker) {
  worker.tool("monetizationEngine", {
    title: "Monetization Engine",
    description: "Selects the best offer, CTA, and funnel based on user intent and behavior.",
    schema: j.object({
      intent: j.string().describe("earn, save, invest, credit, budget, or unknown."),
      segment: j.string().optional().describe("audience segment from audienceTargetingEngine."),
      behaviorScore: j.number().optional().describe("0–100 score based on engagement."),
    }),
    execute: async ({ intent, segment, behaviorScore }) => {
      const offer = chooseOffer(intent, segment, behaviorScore);
      const cta = chooseCTA(segment, behaviorScore);
      const funnel = chooseFunnel(intent);

      return {
        status: "success",
        offer,
        cta,
        funnel,
      };
    },
  });
}

function chooseOffer(intent: string, segment?: string, score?: number) {
  const offers = {
    earn: "Ibotta Cashback — SPKGLXJ",
    save: "Acorns — AXWRDW3",
    invest: "Acorns — AXWRDW3",
    credit: "Credit Builder Tools",
    budget: "Budgeting Apps Starter Pack",
    unknown: "General Money Starter Kit",
  };

  let selected = offers[intent] || offers.unknown;

  if (segment === "buyer") selected = "High‑value offer bundle";
  if (score && score > 70) selected = "Premium earning/investing offer";

  return selected;
}

function chooseCTA(segment?: string, score?: number) {
  if (segment === "buyer") return "Start now — you’re ready.";
  if (score && score > 70) return "This is your next move.";
  if (score && score < 20) return "Try this — low effort, high reward.";
  return "Tap to get started.";
}

function chooseFunnel(intent: string) {
  const funnels = {
    earn: "https://moneyplughub.com/funnels/earn",
    save: "https://moneyplughub.com/funnels/save",
    invest: "https://moneyplughub.com/funnels/invest",
    credit: "https://moneyplughub.com/funnels/credit",
    budget: "https://moneyplughub.com/funnels/budget",
    unknown: "https://moneyplughub.com/funnels/start",
  };

  return funnels[intent] || funnels.unknown;
}
