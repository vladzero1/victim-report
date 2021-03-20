import { Session, SessionData } from 'express-session';
import { Request, Response } from "express";
import firebaseAdmin from 'firebase-admin'
import { Redis } from 'ioredis';

export type MyContext = {
  firestore: firebaseAdmin.firestore.Firestore;
  req: Request & {
    session: Session & Partial<SessionData> & { phoneNumber?: string };
  };
  res: Response;
  redis: Redis;
};
