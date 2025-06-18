import { ApolloServer } from "apollo-server-express";
import express from "express";
import { readFileSync } from "fs";
import path from "path";
import request from "supertest";
import { afterAll, beforeAll, expect, it } from "vitest";
import { userResolvers } from "../../resolvers/userResolvers";
import { clearCollections, startArango, stopArango } from "../helpers";

let srv: express.Express;

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
  srv = app;
});

afterAll(stopArango);

it("returns token and user on valid login", async () => {
  // 1. cria usuário
  const createMutation = `
    mutation($i:CreateUserInput!){ createUser(input:$i){_key} }
  `;
  await request(srv)
    .post("/graphql")
    .send({
      query: createMutation,
      variables: { i: { name: "Bob", email: "bob@test.dev", password: "123" } },
    });

  // 2. login
  const loginMutation = `
    mutation($i:LoginInput!){ login(input:$i){ token user{email} } }
  `;
  const res = await request(srv)
    .post("/graphql")
    .send({
      query: loginMutation,
      variables: { i: { email: "bob@test.dev", password: "123" } },
    });

  expect(res.body.data.login.token).toBeDefined();
  expect(res.body.data.login.user.email).toBe("bob@test.dev");
});
