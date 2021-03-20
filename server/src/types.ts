import firebaseAdmin from 'firebase-admin'
export type MyContext = {
  firestore: firebaseAdmin.firestore.Firestore;
};
