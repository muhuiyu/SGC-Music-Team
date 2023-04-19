import { DateTime } from 'luxon'
import Service from '../models/Service'
import User from '../models/User'

export const testUser: User = {
  id: 'user-1',
  name: 'Grace Yu',
  email: 'muyuhello@gmail.com',
  phoneNumber: '89516033',
  availableRoles: ['drums', 'piano'],
  isLead: false,
}

export const services: Service[] = [
  {
    id: 'service-1',
    dateTime: DateTime.fromJSDate(new Date(2023, 5, 12, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    assignments: {},
    note: 'nothing',
    lead: undefined,
    songNotes: {},
  },
  {
    id: 'service-2',
    dateTime: DateTime.fromJSDate(new Date(2023, 5, 19, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    lead: 'user-2',
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-3',
    dateTime: DateTime.fromJSDate(new Date(2023, 5, 26, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    assignments: {},
    note: 'nothing',
    songNotes: {},
    lead: undefined,
  },
  {
    id: 'service-4',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 5, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    assignments: {},
    lead: undefined,
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-5',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 10, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    lead: undefined,
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-6',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 17, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    lead: 'user-5',
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-7',
    dateTime: DateTime.fromJSDate(new Date(2023, 6, 24, 10, 0, 0, 0)),
    topic: 'Easter',
    songs: [],
    lead: 'user-2',
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
]

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Grace Yu',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    availableRoles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLead: false,
  },
  {
    id: 'user-2',
    name: 'James Tomlins',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    availableRoles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLead: true,
  },
  {
    id: 'user-3',
    name: 'Jeff',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    availableRoles: ['drums', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLead: true,
  },
  {
    id: 'user-4',
    name: 'John',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    availableRoles: ['drums', 'piano'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLead: false,
  },
  {
    id: 'user-5',
    name: 'Lean',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    availableRoles: ['guitar', 'bass'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLead: true,
  },
  {
    id: 'user-6',
    name: 'Peter',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    availableRoles: ['vocal'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLead: true,
  },
  {
    id: 'user-7',
    name: 'Mary',
    email: 'muyuhello@gmail.com',
    phoneNumber: '89516033',
    permissions: [],
    availableRoles: ['piano', 'vocal'],
    imageUrlString:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLead: true,
  },
]

const songs: Song[] = [
  {
    id: 'song-1',
    name: '10,000 reasons',
    author: 'Matt Redman',
    tempo: 73,
    key: 'D',
    sheetUrlString:
      'https://drive.google.com/file/d/1XNuqZDNr68Ab-L1zChZcXSTrYsIOJiHI/view?usp=share_link',
    songUrlString: 'https://www.youtube.com/watch?v=DXDGE_lRI0E',
  },
  {
    id: 'song-2',
    name: 'Blessed Be Your Name',
    author: 'Matt Redman',
    tempo: 116,
    key: 'A',
    sheetUrlString:
      'https://drive.google.com/file/d/13GB-j8kFLj-M2mvIEwopinCSA9XbvxO7/view?usp=share_link',
    songUrlString: 'https://www.youtube.com/watch?v=tTpTQ4kBLxA',
  },
  {
    id: 'song-3',
    name: 'Mighty to Save',
    author: 'Hillsong',
    tempo: 74,
    key: 'G',
    sheetUrlString:
      'https://drive.google.com/file/d/1eoSE8E89fflSFJgqCBgfdJJ_9JQdR3-i/view?usp=share_link',
    songUrlString: 'https://www.youtube.com/watch?v=GEAcs2B-kNc',
  },
]
