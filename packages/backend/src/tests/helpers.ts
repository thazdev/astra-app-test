import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Database } from 'arangojs';

let container: StartedTestContainer;
export let db: Database;

export async function startArango() {
  container = await new GenericContainer('arangodb:3.11')
    .withEnvironment({ ARANGO_ROOT_PASSWORD: 'test' })
    .withExposedPorts(8529)
    .start();

  const port = container.getMappedPort(8529);
  const host = container.getHost();

  db = new Database({ url: `http://${host}:${port}` });
  db.useBasicAuth('root', 'test');
}

export async function stopArango() {
  if (container) {
    await container.stop();
  }
}

export async function clearCollections() {
  const collections = await db.listCollections();
  for (const c of collections) {
    if (!c.isSystem && c.name) {
      await db.collection(c.name).truncate();
    }
  }
}
