// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA0J8TCjU2wxDNmT2O4VMfchY06arTO-O0",
  authDomain: "gram-shakti-app-2367b.firebaseapp.com",
  databaseURL: "https://gram-shakti-app-2367b-default-rtdb.firebaseio.com",
  projectId: "gram-shakti-app-2367b",
  storageBucket: "gram-shakti-app-2367b.firebasestorage.app",
  messagingSenderId: "606732424351",
  appId: "1:606732424351:web:5802ac51402c6921233eaa",
  measurementId: "G-NCEP6BBTWQ"
};

// Firebase Start
firebase.initializeApp(firebaseConfig);

// Database
const db = firebase.database();
