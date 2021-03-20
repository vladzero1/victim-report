import 'reflect-metadata'
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import admin from 'firebase-admin'
import { buildSchema } from "type-graphql";
import { MyContext } from "./types";
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/user';

var  ServiceAccount= require('./service-account.json');

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const firebaseClient = admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  const firestore = firebaseClient.firestore();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, HelloResolver],
      validate: false
    }),
    context: (): MyContext => ({
      firestore,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log(`server is running on localhost:4000`);
  });
};

main().catch((err) => {
  console.error(err);
});