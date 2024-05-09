import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfigRealTime = {
  apiKey: 'AIzaSyBeMyr5JKwJYGv2rWnIR0tgtqQj1FMLQ7w',
  authDomain: 'ecothon-11b92.firebaseapp.com',
  databaseURL:
    'https://ecothon-11b92-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ecothon-11b92',
  storageBucket: 'ecothon-11b92.appspot.com',
  messagingSenderId: '882497002031',
  appId: '1:882497002031:web:dd139ca8062885f17544da',
}

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3Gbl30BpwUa5_K0JnTA1PAvZUYrwND0w',
  authDomain: 'd-urja.firebaseapp.com',
  databaseURL:
    'https://d-urja-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'd-urja',
  storageBucket: 'd-urja.appspot.com',
  messagingSenderId: '487284048888',
  appId: '1:487284048888:web:cbc50633d9ff4020740c0d',
}

// Initialize Firebase
const appRealTime = initializeApp(firebaseConfigRealTime, 'realtime')
const app = initializeApp(firebaseConfig, 'firestore')
export const db = getDatabase(appRealTime)
export const firestore = getFirestore(app)
