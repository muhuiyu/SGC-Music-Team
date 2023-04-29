import { DateTime } from 'luxon'
import Service from '../models/service/Service'
import User from '../models/user/User'

export const services: Service[] = [
  {
    id: 'service-1',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 5,
        day: 7,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
    topic: 'Easter',
    songs: [],
    assignments: {},
    note: 'nothing',
    lead: undefined,
    songNotes: {},
  },
  {
    id: 'service-2',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 5,
        day: 14,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
    topic: 'Easter',
    songs: [],
    lead: 'user-2',
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-3',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 5,
        day: 21,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
    topic: 'Easter',
    songs: [],
    assignments: {},
    note: 'nothing',
    songNotes: {},
    lead: undefined,
  },
  {
    id: 'service-4',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 5,
        day: 28,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
    topic: 'Easter',
    songs: [],
    assignments: {},
    lead: undefined,
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-5',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 6,
        day: 4,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
    topic: 'Easter',
    songs: [],
    lead: undefined,
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-6',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 6,
        day: 11,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
    topic: 'Easter',
    songs: [],
    lead: 'user-5',
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-7',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 6,
        day: 18,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
    topic: 'Easter',
    songs: [],
    lead: 'user-2',
    assignments: {},
    note: 'nothing',
    songNotes: {},
  },
  {
    id: 'service-8',
    dateTime: DateTime.fromObject(
      {
        year: 2023,
        month: 6,
        day: 25,
        hour: 10,
        minute: 15,
      },
      { zone: 'Asia/Singapore' },
    ),
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
