import { Song } from './models/song/Song'
import User, { UserRole } from './models/user/User'

export const firebaseConfig = {
  apiKey: 'AIzaSyBW830MCh3XcxkCM7qVSi1xukbZHqb9ZA4',
  authDomain: 'music-team-roster.firebaseapp.com',
  projectId: 'music-team-roster',
  storageBucket: 'music-team-roster.appspot.com',
  messagingSenderId: '949364282512',
  appId: '1:949364282512:web:ec4582017533fe1d1d3415',
}

export interface FirebaseService {
  id: string
  year: number
  month: number
  dateTime: string
  topic: string
  lead: User['id'] | undefined
  assignments: { [userId: User['id']]: UserRole }
  songs: Song['id'][]
  songNotes: { [songId: Song['id']]: string }
  note: string
}
