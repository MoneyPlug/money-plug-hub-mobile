import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function contextEngine(worker: Worker) {
  worker.tool("contextEngine", {
    title: "Context Engine",
    description: "Analyzes content and returns intent, tone, complexity, risk, and category.",
    schema: j.object({
      content: j.string().describe("Content to analyze."),
    }),
    execute: async ({ content }) => {
      return {
        status: "success",
        intent: detectIntent(content),
        tone: detectTone(content),
        complexity: detectComplexity(content),
        risk: detectRisk(content),
        category: detectCategory(content),
        emotionalCharge: detectEmotion(content),
        platformFit: detectPlatformFit(content),
      };
    },
  });
}

function detectIntent(content: string) {
  if (/earn|side hustle|money online|cashback/i.test(content)) return "earn";
  if (/save|budget|cut costs/i.test(content)) return "save";
  if (/invest|portfolio|stocks|etf/i.test(content)) return "invest";
  if (/credit|score|report/i.test(content)) return "credit";
  if (/debt|bills|expenses/i.test(content)) return "budget";
  return "general";
}

function detectTone(content: string) {
  if (/crazy|insane|wild|unbelievable/i.test(content)) return "hype";
  if (/simple|easy|calm|slow/i.test(content)) return "calm";
  if (/here’s how|step by step|tutorial/i.test(content)) return "educational";
  if (/warning|mistake|stop/i.test(content)) return "urgent";
  return "neutral";
}

function detectComplexity(content: string) {
  const words = content.split(" ").length;
  if (words < 40) return "beginner";
  if (words < 120) return "intermediate";
  return "advanced";
}

function detectRisk(content: string) {
  if (/invest|crypto|stocks|options/i.test(content)) return "medium";
  if (/high risk|leverage|options trading/i.test(content)) return "high";
  return "low";
}

function detectCategory(content: string) {
  if (/hack|tip|trick/i.test(content)) return "tip";
  if (/story|experience/i.test(content)) return "story";
  if (/mistake|warning|stop/i.test(content)) return "warning";
  if (/tutorial|guide|steps/i.test(content)) return "tutorial";
  return "general";
}

function detectEmotion(content: string) {
  let score = 0;
  if (/crazy|insane|wild|shocking/i.test(content)) score += 30;
  if (/secret|nobody|mistake|stop/i.test(content)) score += 20;
  if (/[!?]/.test(content)) score += 10;
  return Math.min(100, score);
}

function detectPlatformFit(content: string) {
  if (content.length < 120) return "tiktok / instagram / x";
  if (content.length < 250) return "instagram / youtube";
  return "youtube / reddit";
}
