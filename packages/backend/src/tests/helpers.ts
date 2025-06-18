// packages/backend/src/tests/helpers.ts
import { Database } from "arangojs";
import { GenericContainer, StartedTestContainer } from "testcontainers";

let container: StartedTestContainer;
export let db: Database;

/**
 * Sobe um ArangoDB em Docker, conecta e garante que a collection `users` exista.
 */
export async function startArango() {
  container = await new GenericContainer("arangodb:3.11")
    .withEnvironment({ ARANGO_ROOT_PASSWORD: "test" })
    .withExposedPorts(8529)
    .start();

  const host = container.getHost();
  const port = container.getMappedPort(8529);

  db = new Database({ url: `http://${host}:${port}` });
  db.useBasicAuth("root", "test");

  // ⚠️ garante que a collection `users` exista (cria se ainda não existir)
  await db
    .collection("users")
    .create()
    .catch(() => {});
}

/** Encerra o container após todos os testes */
export async function stopArango() {
  if (container) await container.stop();
}

/** Limpa todas as coleções não-sistêmicas entre testes */
export async function clearCollections() {
  const collections = await db.listCollections();
  for (const c of collections) {
    if (!c.isSystem) await db.collection(c.name).truncate();
  }
}
