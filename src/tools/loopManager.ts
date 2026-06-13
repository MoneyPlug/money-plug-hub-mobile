import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function loopManager(worker: Worker) {
  worker.tool("loopManager", {
    title: "Loop Manager",
    description: "Controls Plug In OS automation loops and returns loop status.",
    schema: j.object({
      action: j.string().describe("The loop action to perform: start, stop, status."),
    }),
    execute: async ({ action }: { action: string }) => {
      if (action === "status") {
        return {
          loopManager: "online",
          status: "idle",
          message: "Loop Manager is ready for instructions."
        };
      }

      if (action === "start") {
        return {
          loopManager: "online",
          status: "starting",
          message: "Loop Manager will begin executing loops once logic is added."
        };
      }

      if (action === "stop") {
        return {
          loopManager: "online",
          status: "stopped",
          message: "Loop Manager has stopped all loop activity."
        };
      }

      return {
        loopManager: "online",
        status: "unknown",
        message: `Unknown action: ${action}`
      };
    },
  });
}

