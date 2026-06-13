import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function contentRewriteEngine(worker: Worker) {
  worker.tool("contentRewriteEngine", {
    title: "Content Rewrite Engine",
    description: "Rewrites content into stronger hooks, shorter formats, and platform-optimized versions.",
    schema: j.object({
      content: j.string().describe("Original content to rewrite."),
      style: j.string().optional().describe("short, punchy, emotional, educational, viral."),
      platform: j.string().optional().describe("tiktok, instagram, youtube, x, reddit."),
    }),
    execute: async ({ content, style, platform }) => {
      const rewritten = rewriteContent(content, style);
      const platformVersion = platform ? platformOptimize(rewritten, platform) : rewritten;

      return {
        status: "success",
        original: content,
        rewritten,
        platformVersion,
        hooks: generateHooks(content),
        variations: generateVariations(content),
      };
    },
  });
}

function rewriteContent(content: string, style?: string) {
  switch (style) {
    case "short":
      return shorten(content);
    case "punchy":
      return punchify(content);
    case "emotional":
      return emotionalize(content);
    case "educational":
      return explain(content);
    case "viral":
      return viralize(content);
    default:
      return punchify(content);
  }
}

function shorten(content: string) {
  return content.split(" ").slice(0, 12).join(" ") + "...";
}

function punchify(content: string) {
  return `Stop scrolling. ${content.replace(/\./g, "")}!`;
}

function emotionalize(content: string) {
  return `${content} This will change everything.`;
}

function explain(content: string) {
  return `Here’s the breakdown: ${content}`;
}

function viralize(content: string) {
  return `${content} Nobody talks about this — but they should.`;
}

function platformOptimize(content: string, platform: string) {
  switch (platform) {
    case "tiktok":
      return `${content} 🔥`;
    case "instagram":
      return `${content}\n\nSave this for later 🔖`;
    case "youtube":
      return `${content}\n\nSubscribe for the full breakdown.`;
    case "x":
      return `${content} — more coming soon`;
    case "reddit":
      return `${content}\n\nHere’s what actually works:`;
    default:
      return content;
  }
}

function generateHooks(content: string) {
  return [
    `You’re doing this wrong: ${content}`,
    `Nobody told you this: ${content}`,
    `The fastest way to start: ${content}`,
  ];
}

function generateVariations(content: string) {
  return [
    shorten(content),
    punchify(content),
    emotionalize(content),
    viralize(content),
  ];
}
