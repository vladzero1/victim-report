import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import admin from "firebase-admin";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import {
  COOKIE_NAME,
  __prod__,
} from "./constant";
import { AdminResolver } from "./resolvers/admin";
import { MeResolver } from "./resolvers/me";
import { UserResolver } from "./resolvers/user";
import { VictimResolver } from "./resolvers/victim";
import { MyContext } from "./types";

var ServiceAccount = require("./service-account.json");

const main = async () => {
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax", //to fight csrf
        secure: __prod__, //cookie for https
      },
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    }),
  );
  const firebaseClient = admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  const firestore = firebaseClient.firestore();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, VictimResolver, MeResolver, AdminResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
      firestore,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
    },
  });

  app.listen(4000, () => {
    console.log(`server is running on localhost:4000`);
  });
};

main().catch((err) => {
  console.error(err);
});
