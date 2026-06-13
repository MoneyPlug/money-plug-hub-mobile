import { Worker } from "@notionhq/workers";

import syncPlugInOS from "./tools/syncPlugInOS";
import loopManager from "./tools/loopManager";
import referralRouter from "./tools/referralRouter";
import promotionEngine from "./tools/promotionEngine";
import autoScheduler from "./tools/autoScheduler";
import analyticsEngine from "./tools/analyticsEngine";
import audienceTargetingEngine from "./tools/audienceTargetingEngine";
import monetizationEngine from "./tools/monetizationEngine";
import viralPredictionEngine from "./tools/viralPredictionEngine";
import contentScoringEngine from "./tools/contentScoringEngine";
import hybridPromotionEngine from "./tools/hybridPromotionEngine";
import platformPriorityEngine from "./tools/platformPriorityEngine";
import offerRotationEngine from "./tools/offerRotationEngine";
import contentRewriteEngine from "./tools/contentRewriteEngine";
import engagementForecastEngine from "./tools/engagementForecastEngine";
import contentLibraryManager from "./tools/contentLibraryManager";
import multiPlatformSyncEngine from "./tools/multiPlatformSyncEngine";
import contextEngine from "./tools/contextEngine";
import leadMagnetEngine from "./tools/leadMagnetEngine";
import abTestingEngine from "./tools/abTestingEngine";

const worker = new Worker();
export default worker;

syncPlugInOS(worker);
loopManager(worker);
referralRouter(worker);
promotionEngine(worker);
autoScheduler(worker);
funnelRouter(worker);
analyticsEngine(worker);
audienceTargetingEngine(worker);
monetizationEngine(worker);
viralPredictionEngine(worker);
contentScoringEngine(worker);
hybridPromotionEngine(worker);
platformPriorityEngine(worker);
offerRotationEngine(worker);
contentRewriteEngine(worker);
engagementForecastEngine(worker);
contentLibraryManager(worker);
multiPlatformSyncEngine(worker);
contextEngine(worker);
leadMagnetEngine(worker);
abTestingEngine(worker);




