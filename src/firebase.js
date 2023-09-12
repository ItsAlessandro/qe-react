import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBclz4cA6ObUSD5u55Te1W0dL_RlXEp34k",
  authDomain: "reactqe.firebaseapp.com",
  projectId: "reactqe",
  storageBucket: "reactqe.appspot.com",
  messagingSenderId: "654101023941",
  appId: "1:654101023941:web:30646d403591f36da9b4ac"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)