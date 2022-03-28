import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBc0trB_5hWPAQhwEnqrht4BlqgoqNuQBM",
    authDomain: "tfg-arturo.firebaseapp.com",
    projectId: "tfg-arturo",
    storageBucket: "tfg-arturo.appspot.com",
    messagingSenderId: "388959240870",
    appId: "1:388959240870:web:4f82fd4bbd71790482ea67",
};

export const firebaseApp = initializeApp(firebaseConfig);
