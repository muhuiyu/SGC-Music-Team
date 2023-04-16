type Permission = 'editMembers' | 'editPlanner'
export type UserRole = 'lead' | 'piano' | 'drums' | 'pa' | 'guitar' | 'bass' | 'vocal'

export const roleInfo: Record<
  UserRole,
  { colorCode: string; textColorCode: string; iconName: string }
> = {
  lead: {
    colorCode: '#031',
    textColorCode: '#fff',
    iconName: 'microphone',
  },
  piano: {
    colorCode: '#ee0',
    textColorCode: '#000',
    iconName: 'keyboard',
  },
  drums: {
    colorCode: '#f00',
    textColorCode: '#fff',
    iconName: 'drums',
  },
  pa: {
    colorCode: '#f81',
    textColorCode: '#fff',
    iconName: 'pa',
  },
  guitar: {
    colorCode: '#2e4',
    textColorCode: '#000',
    iconName: 'guitar',
  },
  bass: {
    colorCode: '#5af',
    textColorCode: '#fff',
    iconName: 'bass',
  },
  vocal: {
    colorCode: '#82c',
    textColorCode: '#fff',
    iconName: 'vocal',
  },
}

export default interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  permissions?: Permission[]
  roles: UserRole[]
}
