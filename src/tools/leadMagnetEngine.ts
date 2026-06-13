import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function leadMagnetEngine(worker: Worker) {
  worker.tool("leadMagnetEngine", {
    title: "Lead Magnet Engine",
    description: "Assigns and optimizes lead magnets based on intent, segment, and behavior.",
    schema: j.object({
      intent: j.string().optional().describe("earn, save, invest, credit, budget."),
      segment: j.string().optional().describe("buyer, high-interest, engaged, general."),
      behaviorScore: j.number().optional().describe("0–100 engagement score."),
      platform: j.string().optional().describe("tiktok, instagram, youtube, x, reddit."),
    }),
    execute: async ({ intent, segment, behaviorScore, platform }) => {
      const magnet = chooseLeadMagnet(intent, segment);
      const format = chooseFormat(platform, behaviorScore);
      const aggressiveness = chooseAggressiveness(segment, behaviorScore);

      return {
        status: "success",
        leadMagnet: magnet,
        format,
        aggressiveness,
        cta: generateCTA(magnet, aggressiveness),
      };
    },
  });
}

function chooseLeadMagnet(intent?: string, segment?: string) {
  if (segment === "buyer") return "High‑Value Money Toolkit";
  if (segment === "high-interest") return "Fast‑Start Money Guide";

  const magnets: Record<string, string> = {
    earn: "Side Hustle Starter Kit",
    save: "Budgeting Cheat Sheet",
    invest: "Beginner Investing Blueprint",
    credit: "Credit Score Repair Guide",
    budget: "Expense Tracker Template",
  };

  return magnets[intent || "earn"];
}

function chooseFormat(platform?: string, score?: number) {
  if (platform === "tiktok" || platform === "instagram") return "1‑page cheat sheet";
  if (platform === "x") return "thread‑style mini guide";
  if (platform === "youtube") return "full PDF guide";
  if (platform === "reddit") return "long‑form breakdown";

  if (score && score > 70) return "full guide";
  return "short checklist";
}

function chooseAggressiveness(segment?: string, score?: number) {
  if (segment === "buyer") return "high";
  if (score && score > 70) return "medium";
  return "low";
}

function generateCTA(magnet: string, level: string) {
  if (level === "high") return `Grab the ${magnet} — you’re ready.`;
  if (level === "medium") return `Download the ${magnet} today.`;
  return `Check out the ${magnet}.`;
}
