// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDOkiLsiK4uw44W___EJukgPE37tS6abyc',
  authDomain: 'myshop-portfolio.firebaseapp.com',
  projectId: 'myshop-portfolio',
  storageBucket: 'myshop-portfolio.appspot.com',
  messagingSenderId: '580271558095',
  appId: '1:580271558095:web:ad66cbd6587eb94f0c96ba',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()



export { db, auth, GoogleAuthProvider, googleProvider }