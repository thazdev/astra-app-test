import { ApolloServer } from "apollo-server-express";
import express from "express";
import { readFileSync } from "fs";
import path from "path";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { userResolvers } from "../../resolvers/userResolvers";
import { clearCollections, startArango, stopArango } from "../helpers";

let server: express.Express;

beforeAll(async () => {
  await startArango();
  await clearCollections();

  const typeDefs = readFileSync(
    path.join(__dirname, "../../schema/user.graphql"),
    "utf8",
  );

  const apollo = new ApolloServer({ typeDefs, resolvers: [userResolvers] });
  await apollo.start();

  const app = express();
  apollo.applyMiddleware({ app });
  server = app;
});

afterAll(async () => await stopArango());

const mutation = `
  mutation($input: CreateUserInput!) {
    createUser(input: $input) { _key }
  }
`;

describe("Mutation createUser – email duplicado", () => {
  it("retorna erro quando email já existe", async () => {
    const vars = {
      input: { name: "Alice", email: "dup@test.dev", password: "123" },
    };

    // 1ª chamada — cria usuário
    await request(server)
      .post("/graphql")
      .send({ query: mutation, variables: vars });

    // 2ª chamada — deve falhar
    const res = await request(server)
      .post("/graphql")
      .send({ query: mutation, variables: vars });

    expect(res.body.errors?.[0].message).toMatch(/E-mail already in use/);
  });
});
