import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function syncPlugInOS(worker: Worker) {
  worker.tool("syncPlugInOS", {
    title: "Sync Plug In OS",
    description: "Retrieves a Notion page by ID.",
    schema: j.object({
      pageId: j.string().describe("The Notion page ID to sync."),
    }),
    execute: async ({ pageId }: { pageId: string }) => {
      return {
        synced: true,
        id: pageId,
        object: "page"
      };
    },
  });
}
