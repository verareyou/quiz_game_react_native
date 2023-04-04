import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../env";


const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID,
    appId: env.APP_ID
};

const app = initializeApp(firebaseConfig);
// export const authentication = getAuth(app);
export const authentication = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app);
