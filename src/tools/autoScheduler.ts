import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function autoScheduler(worker: Worker) {
  worker.tool("autoScheduler", {
    title: "Auto Scheduler",
    description: "Generates an optimized posting schedule for all platforms.",
    schema: j.object({
      plan: j.array(
        j.object({
          platform: j.string(),
          cooldownMinutes: j.number(),
        })
      ).describe("The promotion plan returned by promotionEngine."),
      strategy: j.string().optional().describe("Optional: 'aggressive', 'balanced', or 'slow'."),
    }),
    execute: async ({ plan, strategy }) => {
      const now = Date.now();

      const multiplier = {
        aggressive: 0.5,
        balanced: 1,
        slow: 1.5,
      }[strategy || "balanced"];

      const schedule = plan.map((item, index) => {
        const delay = item.cooldownMinutes * multiplier * 60 * 1000;
        const scheduledAt = new Date(now + delay + index * 5000).toISOString();

        return {
          platform: item.platform,
          scheduledAt,
          cooldownMinutes: item.cooldownMinutes,
        };
      });

      return {
        status: "success",
        strategy: strategy || "balanced",
        schedule,
      };
    },
  });
}
