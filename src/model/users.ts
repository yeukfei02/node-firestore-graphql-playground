import env from 'dotenv';
env.config();

import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};
const serviceAccountStr = JSON.stringify(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccountStr)),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();
const usersDb = db.collection('users');

export const createUser = async (email: string, password: string, name: string): Promise<void> => {
  if (email && password && name) {
    const newUser = usersDb.doc(`${uuidv4()}`);
    await newUser.set({
      id: uuidv4(),
      email: email,
      password: password,
      name: name,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
    });
  }
};

export const getUserByEmail = async (email: string): Promise<FirebaseFirestore.DocumentData> => {
  let result = null;

  if (email) {
    const user = await usersDb.where('email', '==', email).get();
    if (!user.empty && user.size === 1) {
      const item = user.docs[0];
      result = item.data();
    }
  }

  return result;
};

export const getUsers = async (): Promise<FirebaseFirestore.DocumentData[]> => {
  const users = await usersDb.get();

  const usersList = users.docs.map((item, i) => {
    const data = item.data();
    return data;
  });

  return usersList;
};

export const getUserById = async (id: string): Promise<FirebaseFirestore.DocumentData> => {
  let result = null;

  const user = await usersDb.where('id', '==', id).get();
  if (!user.empty && user.size === 1) {
    const item = user.docs[0];
    result = item.data();
  }

  return result;
};

export const updateUserById = async (id: string, email: string, password: string, name: string): Promise<void> => {
  const usersList = await usersDb.listDocuments();
  if (usersList) {
    for (let index = 0; index < usersList.length; index++) {
      const item = usersList[index];
      const itemGet = await item.get();
      const itemId = itemGet.data().id;
      if (itemId === id) {
        item.update({
          email: email,
          password: password,
          name: name,
        });
      }
    }
  }
};

export const deleteUserById = async (id: string): Promise<void> => {
  const usersList = await usersDb.listDocuments();
  if (usersList) {
    for (let index = 0; index < usersList.length; index++) {
      const item = usersList[index];
      const itemGet = await item.get();
      const itemId = itemGet.data().id;
      if (itemId === id) {
        item.delete();
      }
    }
  }
};
