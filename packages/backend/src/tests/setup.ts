import { beforeAll, afterAll, beforeEach } from 'vitest';
import { startArango, stopArango, clearCollections } from './helpers';

beforeAll(async () => await startArango());
afterAll(async () => await stopArango());
beforeEach(async () => await clearCollections());
