// import { createApp } from 'vue'
// import App from './App.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

// import 'firebase/auth'
// import router from './router'
// import store from './store'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1fPW4ufRNsk1SHL9dY6T5A0A_stFHPjk",
  authDomain: "active-consult.firebaseapp.com",
  projectId: "active-consult",
  storageBucket: "active-consult.appspot.com",
  messagingSenderId: "151663800700",
  appId: "1:151663800700:web:e0e1e408640836a2a3b4f9",
  measurementId: "G-YHR0SF9ZBJ"
  };
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  // let app;
  // firebase.auth().onAuthStateChanged(user => {
  //   console.log(user);
  //   if(!app) {
  //     app = createApp(App).use(store).use(router).mount('#app')
  //   }
  // });


  export default db;
