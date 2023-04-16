import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithRedirect, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBW830MCh3XcxkCM7qVSi1xukbZHqb9ZA4',
  authDomain: 'music-team-roster.firebaseapp.com',
  projectId: 'music-team-roster',
  storageBucket: 'music-team-roster.appspot.com',
  messagingSenderId: '949364282512',
  appId: '1:949364282512:web:ec4582017533fe1d1d3415',
}

const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getFirestore(app)

export const signInWithGoogle = async () => {
  const result = await signInWithRedirect(auth, googleProvider)
  console.log(result)
}

export const logout = () => {
  signOut(auth)
}
