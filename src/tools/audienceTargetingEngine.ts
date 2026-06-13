import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function audienceTargetingEngine(worker: Worker) {
  worker.tool("audienceTargetingEngine", {
    title: "Audience Targeting Engine",
    description: "Determines the ideal audience segment based on behavior, intent, and performance.",
    schema: j.object({
      behavior: j.object({
        watchTime: j.number().optional().describe("Average watch time in seconds."),
        clicks: j.number().optional(),
        conversions: j.number().optional(),
      }).optional(),
      intent: j.string().optional().describe("earn, save, invest, credit, budget, or unknown."),
      experience: j.string().optional().describe("beginner, intermediate, advanced"),
      risk: j.string().optional().describe("low, medium, high"),
    }),
    execute: async ({ behavior, intent, experience, risk }) => {
      const segment = determineSegment({ behavior, intent, experience, risk });
      const recommendation = generateRecommendation(segment);

      return {
        status: "success",
        segment,
        recommendation,
      };
    },
  });
}

function determineSegment({ behavior, intent, experience, risk }: any) {
  const segment: any = {
    intent: intent || "unknown",
    level: experience || "beginner",
    risk: risk || "low",
    type: "general",
  };

  if (behavior) {
    if (behavior.watchTime > 20) segment.type = "engaged";
    if (behavior.clicks > 3) segment.type = "high-interest";
    if (behavior.conversions > 0) segment.type = "buyer";
  }

  return segment;
}

function generateRecommendation(segment: any) {
  if (segment.type === "buyer") return "Send high-value offers and deeper funnels.";
  if (segment.type === "high-interest") return "Retarget with stronger CTAs.";
  if (segment.type === "engaged") return "Push educational or trust-building content.";
  if (segment.intent === "invest") return "Focus on low-risk beginner investing content.";
  if (segment.intent === "earn") return "Show fast-start earning methods.";
  return "Use broad, high-level content to identify intent.";
}
