import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore/lite"
import { db } from "./config"


export const createUser = async ({fullName,email,uid}) => {
    try{

        const data = {
            id: uid,
            fullName,
            email
        }
        const res = await addDoc(collection(db,"users"), {
            id: uid,
            fullName,
            email
        });
        console.log(res.firestore.toJSON)
        return data;
    } catch (err) {
        alert(err.message)
        return;
    }
}

export const getUser = async(uid) => {
    try {

        const q = query(collection(db,'users'),where('id','==',uid))
        
        const userSnapshot = await getDocs(q)

        return userSnapshot.docs[0].data();

    } catch (error) {
        alert(error.message)
        return
    }
}

export const getAllQuizzes = async () => {
    try{
        const qs = await getDocs(collection(db,'quizzes'));
        const data = qs.docs.map(doc => ({id: doc.id, ...doc.data()}))
        return data
    }catch(err){
        console.log(err.message)
    }
}