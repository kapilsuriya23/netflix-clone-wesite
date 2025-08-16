import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDkv6tfR-mRW_NO1VzCTDq5CpxXwK2QrYU",
  authDomain: "netflix-clone-29a2a.firebaseapp.com",
  projectId: "netflix-clone-29a2a",
  storageBucket: "netflix-clone-29a2a.firebasestorage.app",
  messagingSenderId: "573238766983",
  appId: "1:573238766983:web:31d669c72808bc10d0f722",
  measurementId: "G-S4SCRHY2BF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup= async (name, email, password)=>{
    try {
        const res= await createUserWithEmailAndPassword(auth, email, password);
        const user=res.user;    
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};