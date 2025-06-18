import { ApolloServer } from "apollo-server-express";
import { Database } from "arangojs";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { userResolvers } from "./resolvers/userResolvers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ▶️ cria conexão global com ArangoDB ◀️ */
const db = new Database({
  url: process.env.ARANGO_URL || "http://127.0.0.1:8529",
});
db.useBasicAuth(
  process.env.ARANGO_USER || "root",
  process.env.ARANGO_PASS || "test",
);

async function bootstrap() {
  const typeDefs = readFileSync(join(__dirname, "schema/user.graphql"), "utf8");

  const apollo = new ApolloServer({
    typeDefs,
    resolvers: [userResolvers],
    context: () => ({ db }), // ⬅️ passa o db pro resolver
  });
  await apollo.start();

  const app = express();
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  apollo.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(
      `🚀 GraphQL ready at http://localhost:${PORT}${apollo.graphqlPath}`,
    ),
  );
}

bootstrap().catch(console.error);
