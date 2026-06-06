import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server)
);

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000/graphql");
});