import express from "express";
import session from "express-session";
import cors from "cors";
import { PrismaSessionStore } from "@quixo3/prisma-session-store/dist/index";
import prisma from "./config/Db";

import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import ConversationRoute from "./routes/ConversationRoute";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const whitelist = ["http://localhost:5173"];

app.use(
  cors({
    credentials: true,
    origin: whitelist,
  })
);

app.use(
  session({
    secret:
      "c55d4b175d3188962ee6d2c21144a43007591141b88d04f16c39d4d855776370a06296cc611be357e0c3da8c654d51ff3c8ae618d0dd61fdc6713ad0cc738718",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      secure: "auto",
      maxAge: 7 * 24 * 60 * 1000,
    },
  })
);

app.use(AuthRoute);

app.use(UserRoute);

app.use(ConversationRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("connected to prisma sql --- chat-app");
});
