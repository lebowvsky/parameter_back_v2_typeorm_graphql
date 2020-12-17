import "reflect-metadata";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { createConnection } from "typeorm";

// construct a schema, using graphql language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolvers functions for schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world",
  },
};

const main = async () => {
  await createConnection();
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

main();
