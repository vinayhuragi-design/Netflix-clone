// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut,  } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiiMIijbIgRFU9QkWtRQfZWDnIDgGdTf8",
  authDomain: "netflix-clone-3290a.firebaseapp.com",
  projectId: "netflix-clone-3290a",
  storageBucket: "netflix-clone-3290a.firebasestorage.app",
  messagingSenderId: "585859643586",
  appId: "1:585859643586:web:da989cbd9246f0e131635b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize authentication
const auth=getAuth(app);
// initialize firestore
const db =getFirestore(app);

// signup function
const signup= async(name,email,password)=>{
    try{
      const res =  await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
      });
    }catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// login function
const login =async(email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);

        
    } catch (error) {
        console.log(error)
        toast.error(error.code .split('/')[1].split('-').join(" "));
    }
}

// logout function
const logout =()=>{
    signOut(auth);
}

export {app,auth,db,signup,login,logout};
