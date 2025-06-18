import { afterAll, beforeAll, beforeEach } from "vitest";
import { clearCollections, startArango, stopArango } from "./helpers";

beforeAll(async () => await startArango());
afterAll(async () => await stopArango());
beforeEach(async () => await clearCollections());
