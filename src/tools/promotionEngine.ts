import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function promotionEngine(worker: Worker) {
  worker.tool("promotionEngine", {
    title: "Social Promotion Engine",
    description: "Generates a promotion plan for TikTok, IG Reels, YouTube Shorts, X, and Reddit.",
    schema: j.object({
      content: j.string().describe("The content or hook to promote."),
      priority: j.string().optional().describe("Optional: 'speed', 'reach', or 'evergreen'."),
    }),
    execute: async ({ content, priority }) => {
      const now = new Date().toISOString();

      const platforms = [
        { name: "TikTok", cooldown: 120, best: "high‑energy, fast hooks" },
        { name: "Instagram Reels", cooldown: 180, best: "aesthetic, polished" },
        { name: "YouTube Shorts", cooldown: 240, best: "tutorial, value‑dense" },
        { name: "X", cooldown: 30, best: "short text, punchy" },
        { name: "Reddit", cooldown: 300, best: "informational, helpful" }
      ];

      const plan = platforms.map((p) => ({
        platform: p.name,
        recommendedStyle: p.best,
        cooldownMinutes: p.cooldown,
        scheduledAt: now,
        caption: generateCaption(content, p.name),
      }));

      return {
        status: "success",
        priority: priority || "balanced",
        plan,
      };
    },
  });
}

function generateCaption(content: string, platform: string) {
  const base = content.trim();

  switch (platform) {
    case "TikTok":
      return `${base} 🔥\nFollow for more money hacks.`;
    case "Instagram Reels":
      return `${base}\nSave this for later.`;
    case "YouTube Shorts":
      return `${base}\nFull breakdown coming soon.`;
    case "X":
      return `${base} — more tips dropping daily.`;
    case "Reddit":
      return `${base}\nHere’s what actually works:`;
    default:
      return base;
  }
}
