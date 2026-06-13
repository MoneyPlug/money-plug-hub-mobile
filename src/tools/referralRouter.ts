import { j } from "@notionhq/workers/schema-builder";
import type { Worker } from "@notionhq/workers";

export default function referralRouter(worker: Worker) {
  worker.tool("referralRouter", {
    title: "Referral Router",
    description: "Returns referral links for supported services.",
    schema: j.object({
      service: j.string().describe("The service name to retrieve a referral link for."),
    }),
    execute: async ({ service }: { service: string }) => {
      const links: Record<string, string> = {
        acorns: "https://acorns.com/share/?shareable_code=AXWRDW3&first_name=Shane&friend_reward=5",
        ibotta: "https://ibotta.com/r/SPKGLXJ",
        rakuten: "https://www.rakuten.com/r/CASHPL19",
        swagbucks: "https://www.swagbucks.com/profile/r_235418044?rp=1"
      };

      const key = service.toLowerCase();

      if (links[key]) {
        return {
          service: key,
          referralLink: links[key],
          status: "success",
          message: ""
        };
      }

      return {
        service: key,
        referralLink: null,
        status: "not_found",
        message: `No referral link found for '${service}'.`
      };
    },
  });
}
