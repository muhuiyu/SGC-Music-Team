import { initializeApp } from 'firebase/app'
import {
  User as FirebaseUser,
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import { DocumentData, DocumentSnapshot, doc, getDoc, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../../FirebaseConfig'
import User, { Permission, UserRole } from '../../models/User'
import { usersReference } from '../constants/FirebaseKeys'

// Set up
const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getFirestore(app)

// Sign in
export const signInWithGoogle = async () => {
  const result = await signInWithRedirect(auth, googleProvider)
  console.log(result)
}
// Sign out
export const logout = () => {
  signOut(auth)
}

// user
interface RawUser {
  email: string
  isLead: boolean
  name: string
  permissions: Permission[]
  phoneNumber: string
  availableRoles: UserRole[]
  userId: User['id']
}

export function userFromSnapshot(snapshot: DocumentSnapshot<DocumentData>): User {
  const { ...docData } = snapshot.data() as RawUser
  return {
    ...docData,
    id: snapshot.id,
  }
}

export async function getUserProfile(userId: FirebaseUser['uid']): Promise<User | null> {
  const snapshot = await getDoc(doc(db, usersReference, userId))
  if (!snapshot.exists()) return null
  return userFromSnapshot(snapshot)
}

// song
interface RawSong {
  id: Song['id']
  name: string
  author: string
  key: Song['key']
  tempo: number
  songUrlString: string
  sheetUrlString: string
}

export function songFromSnapshot(snapshot: DocumentSnapshot<DocumentData>): Song {
  const { ...docData } = snapshot.data() as RawSong
  return {
    ...docData,
    id: snapshot.id,
  }
}
