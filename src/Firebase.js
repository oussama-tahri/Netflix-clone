// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import {initializeApp} from "firebase/app";

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBaFTaMTwngKiku_3TgR9PRsG-NTV3934U",
    authDomain: "netflix-clone-b6469.firebaseapp.com",
    projectId: "netflix-clone-b6469",
    storageBucket: "netflix-clone-b6469.appspot.com",
    messagingSenderId: "22315279421",
    appId: "1:22315279421:web:46314a3a0d31a39abef654"
  };



  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;







//   //to initialize our app
//   const firebaseApp = initializeApp(firebaseConfig);
//   //our actual db
//   const db = getFirestore(firebaseApp);
//   // for auth
// export  const auth = getAuth(firebaseApp);

//   //having many explicit exports
//   // export { auth };
//   //having one default export
//   export default db;