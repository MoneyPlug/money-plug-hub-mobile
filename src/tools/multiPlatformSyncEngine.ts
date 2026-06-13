import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function multiPlatformSyncEngine(worker: Worker) {
  worker.tool("multiPlatformSyncEngine", {
    title: "Multi-Platform Sync Engine",
    description: "Keeps posting schedules, cooldowns, and content variations synced across all platforms.",
    schema: j.object({
      schedule: j.array(
        j.object({
          platform: j.string(),
          contentId: j.string(),
          scheduledAt: j.string(),
        })
      ).describe("List of scheduled posts across platforms."),
      cooldownMinutes: j.number().default(60),
    }),
    execute: async ({ schedule, cooldownMinutes }) => {
      const sorted = schedule.sort(
        (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );

      const synced = [];
      const lastPostTime: Record<string, number> = {};

      for (const item of sorted) {
        const platform = item.platform;
        const scheduledTime = new Date(item.scheduledAt).getTime();

        const lastTime = lastPostTime[platform] || 0;
        const minGap = cooldownMinutes * 60 * 1000;

        let finalTime = scheduledTime;

        if (scheduledTime - lastTime < minGap) {
          finalTime = lastTime + minGap;
        }

        lastPostTime[platform] = finalTime;

        synced.push({
          platform,
          contentId: item.contentId,
          scheduledAt: new Date(finalTime).toISOString(),
        });
      }

      return {
        status: "success",
        syncedSchedule: synced,
        summary: generateSummary(synced),
      };
    },
  });
}

function generateSummary(synced: any[]) {
  const platforms = [...new Set(synced.map((s) => s.platform))];

  return platforms.map((p) => {
    const posts = synced.filter((s) => s.platform === p);
    return {
      platform: p,
      totalPosts: posts.length,
      firstPost: posts[0]?.scheduledAt,
      lastPost: posts[posts.length - 1]?.scheduledAt,
    };
  });
}
