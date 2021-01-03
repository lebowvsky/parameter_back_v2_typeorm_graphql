import "reflect-metadata";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";

import DiverResolver from "./resolvers/DiverResolver";
import DiveResolver from "./resolvers/DiveResolvers";



const main = async () => {
  await createConnection();

  const schema = await buildSchema({resolvers: [
    DiverResolver,
    DiveResolver
  ]})
  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

main();
