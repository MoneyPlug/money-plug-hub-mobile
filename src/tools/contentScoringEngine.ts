import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function contentScoringEngine(worker: Worker) {
  worker.tool("contentScoringEngine", {
    title: "Content Scoring Engine",
    description: "Scores content 0–100 based on clarity, hook strength, structure, and viral potential.",
    schema: j.object({
      content: j.string().describe("Raw content or script to evaluate."),
      platform: j.string().optional().describe("Optional: tiktok, instagram, youtube, x, reddit."),
    }),
    execute: async ({ content, platform }) => {
      const clarity = scoreClarity(content);
      const hook = scoreHook(content);
      const structure = scoreStructure(content);
      const emotion = scoreEmotion(content);
      const platformFit = platform ? scorePlatformFit(content, platform) : 10;

      const total = Math.min(
        100,
        clarity + hook + structure + emotion + platformFit
      );

      return {
        status: "success",
        score: total,
        breakdown: {
          clarity,
          hook,
          structure,
          emotion,
          platformFit,
        },
        rating: rating(total),
        recommendations: generateRecommendations(total),
      };
    },
  });
}

function scoreClarity(content: string) {
  if (content.length < 40) return 5;
  if (content.length > 300) return 10;
  return 20;
}

function scoreHook(content: string) {
  const hookWords = ["stop", "start", "secret", "nobody", "hack", "mistake"];
  return hookWords.some((w) => content.toLowerCase().includes(w)) ? 25 : 10;
}

function scoreStructure(content: string) {
  const sentences = content.split(/[.!?]/).filter(Boolean).length;
  if (sentences >= 3) return 20;
  return 10;
}

function scoreEmotion(content: string) {
  const emotionalWords = ["crazy", "insane", "wild", "unbelievable", "shocking"];
  return emotionalWords.some((w) => content.toLowerCase().includes(w)) ? 20 : 10;
}

function scorePlatformFit(content: string, platform: string) {
  const short = content.length < 150;
  const long = content.length > 250;

  switch (platform) {
    case "tiktok":
      return short ? 20 : 5;
    case "instagram":
      return short ? 15 : 10;
    case "youtube":
      return long ? 20 : 10;
    case "x":
      return short ? 20 : 5;
    case "reddit":
      return long ? 20 : 10;
    default:
      return 10;
  }
}

function rating(score: number) {
  if (score >= 85) return "excellent";
  if (score >= 70) return "strong";
  if (score >= 50) return "average";
  return "weak";
}

function generateRecommendations(score: number) {
  if (score >= 85)
    return ["Post immediately.", "Use this as a template for future content."];

  if (score >= 70)
    return ["Strengthen the hook.", "Add a more emotional angle."];

  if (score >= 50)
    return ["Rewrite the first sentence.", "Increase clarity and structure."];

  return ["Completely rewrite the hook.", "Shorten the content.", "Increase emotional charge."];
}
