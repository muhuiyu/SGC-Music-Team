export type Permission = 'editMembers' | 'editPlanner'
export type UserRole = 'piano' | 'drums' | 'pa' | 'guitar' | 'bass' | 'vocal'
export const allRoles: UserRole[] = ['piano', 'drums', 'pa', 'guitar', 'bass', 'vocal']

export const roleInfo: Record<
  UserRole,
  { colorCode: string; textColorCode: string; iconName: string; name: string }
> = {
  piano: {
    colorCode: '#ee0',
    textColorCode: '#000',
    iconName: 'keyboard',
    name: 'Piano',
  },
  drums: {
    colorCode: '#f00',
    textColorCode: '#fff',
    iconName: 'drums',
    name: 'Drums',
  },
  pa: {
    colorCode: '#f81',
    textColorCode: '#fff',
    iconName: 'pa',
    name: 'PA',
  },
  guitar: {
    colorCode: '#2e4',
    textColorCode: '#000',
    iconName: 'guitar',
    name: 'Guitar',
  },
  bass: {
    colorCode: '#5af',
    textColorCode: '#fff',
    iconName: 'bass',
    name: 'Bass',
  },
  vocal: {
    colorCode: '#82c',
    textColorCode: '#fff',
    iconName: 'microphone',
    name: 'Vocal',
  },
}

export default interface User {
  id: string
  firstName: string
  lastName: String
  email: string
  countryCode: string
  phoneNumber: string
  permissions?: Permission[]
  availableRoles: UserRole[]
  isLead: boolean
  isInSingapore: boolean
  imageUrlString?: string
}
