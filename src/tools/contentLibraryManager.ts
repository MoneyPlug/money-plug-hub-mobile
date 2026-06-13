import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function contentLibraryManager(worker: Worker) {
  worker.tool("contentLibraryManager", {
    title: "Content Library Manager",
    description: "Stores, tags, retrieves, and ranks content for the entire OS.",
    schema: j.object({
      action: j.string().describe("add, get, search, rank, unused"),
      content: j.string().optional().describe("Content to add or analyze."),
      tags: j.array(j.string()).optional().describe("Tags to assign or search."),
      history: j.array(
        j.object({
          content: j.string(),
          views: j.number().default(0),
          clicks: j.number().default(0),
          conversions: j.number().default(0),
          timestamp: j.string(),
        })
      ).optional().describe("Performance history for ranking."),
    }),
    execute: async ({ action, content, tags, history }) => {
      switch (action) {
        case "add":
          return addContent(content, tags);
        case "search":
          return searchContent(tags);
        case "rank":
          return rankContent(history);
        case "unused":
          return findUnused(history);
        case "get":
        default:
          return getAllContent();
      }
    },
  });
}

const library: { content: string; tags: string[]; addedAt: string }[] = [];

function addContent(content?: string, tags?: string[]) {
  if (!content) return { status: "error", message: "No content provided." };

  const entry = {
    content,
    tags: tags || autoTag(content),
    addedAt: new Date().toISOString(),
  };

  library.push(entry);

  return {
    status: "success",
    message: "Content added to library.",
    entry,
  };
}

function autoTag(content: string) {
  const tags: string[] = [];

  if (/money|cash|earn/i.test(content)) tags.push("earn");
  if (/save|budget/i.test(content)) tags.push("save");
  if (/invest|portfolio/i.test(content)) tags.push("invest");
  if (/credit|score/i.test(content)) tags.push("credit");
  if (content.length < 120) tags.push("short");
  if (content.length > 200) tags.push("long");

  return tags.length ? tags : ["general"];
}

function searchContent(tags?: string[]) {
  if (!tags || !tags.length) return { status: "success", results: library };

  const results = library.filter((item) =>
    tags.every((t) => item.tags.includes(t))
  );

  return {
    status: "success",
    results,
  };
}

function rankContent(history?: any[]) {
  if (!history || !history.length)
    return { status: "error", message: "No history provided." };

  const ranked = history
    .map((h) => {
      const ctr = h.views ? h.clicks / h.views : 0;
      const conv = h.clicks ? h.conversions / h.clicks : 0;
      const score = Math.round(ctr * 50 + conv * 50);

      return { ...h, score };
    })
    .sort((a, b) => b.score - a.score);

  return {
    status: "success",
    ranked,
    topContent: ranked[0],
  };
}

function findUnused(history?: any[]) {
  if (!history) return { status: "success", unused: library };

  const used = new Set(history.map((h) => h.content));

  const unused = library.filter((item) => !used.has(item.content));

  return {
    status: "success",
    unused,
  };
}

function getAllContent() {
  return {
    status: "success",
    library,
  };
}
