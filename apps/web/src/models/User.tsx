type Permission = 'editMembers' | 'editPlanner'
export type UserRole = 'lead' | 'piano' | 'drums' | 'pa' | 'guitar' | 'bass' | 'vocal'

export const roleInfo: Record<
  UserRole,
  { colorCode: string; textColorCode: string; iconName: string; name: string }
> = {
  lead: {
    colorCode: '#031',
    textColorCode: '#fff',
    iconName: 'microphone',
    name: 'Lead',
  },
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
    iconName: 'vocal',
  },
}

export default interface UserModel {
  id: string
  name: string
  email: string
  phoneNumber: string
  permissions?: Permission[]
  roles: UserRole[]
  imageUrlString?: string
}
