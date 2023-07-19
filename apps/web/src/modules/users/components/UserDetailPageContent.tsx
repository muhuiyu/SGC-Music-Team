import { useMemo, useState } from 'react'
import useUser from '../../../api/providers/useUser'
import User, { UserRole, allRoles, musicLeadOptions, roleInfo } from '../../../models/user/User'
import _ from 'lodash'
import PhoneTextField from '../../common/components/PhoneTextField'
import { singaporeCountryDialCode } from '../../common/pages/CountryCode'
import classNames from 'classnames'
import { MusicianGroup, allMusicianGroups } from '../../../models/user/MusicianGroup'
import useUpdateUser from '../../../api/providers/useUpdateUser'
import Spinner from '../../common/components/Spinner'

interface Props {
  userId: User['id']
}

const labelStyle = 'block mb-2 text-sm font-medium text-gray-900'

const textFieldStyle =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'

export default function UserDetailPageContent({ userId }: Props) {
  const { userData, isFetching } = useUser(userId)
  const { updateUser } = useUpdateUser()
  const [isEditing, setIsEditing] = useState(false)

  const [editingUser, setEditingUser] = useState<Partial<User>>({})
  const resolvedUser = useMemo(
    (): User | undefined =>
      userData
        ? {
            ...userData,
            ...editingUser,
          }
        : undefined,
    [userData, editingUser],
  )

  const clearResolvedUser = () => {
    setEditingUser({})
  }

  const updateUserDetail = <K extends keyof User>(
    key: K,
    value: User[K] | ((prevValue: User[K] | undefined) => User[K]),
  ) => {
    setEditingUser((prevUser) => ({
      ...prevUser,
      [key]: typeof value === 'function' ? value(prevUser[key] ?? userData?.[key]) : value,
    }))
  }

  const onChangeUserDetail =
    <K extends keyof Omit<User, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateUserDetail(key, e.target.value as User[K])
    }

  const onChangeRoles = (
    roles: UserRole[] | ((prevRoles: UserRole[] | undefined) => UserRole[]),
  ) => {
    updateUserDetail('availableRoles', roles)
  }

  const onChangeMusicianGroup = (
    groups: MusicianGroup[] | ((prevGroups: MusicianGroup[] | undefined) => MusicianGroup[]),
  ) => {
    updateUserDetail('musicianGroups', groups)
  }

  const onSaveUser = () => {
    if (resolvedUser === undefined || resolvedUser.id === undefined) {
      return
    }
    updateUser(resolvedUser.id, resolvedUser)
  }

  const areDetailsValid = useMemo(() => {
    return !_.isEmpty(resolvedUser?.firstName)
  }, [resolvedUser])

  if (isFetching || userData === null) {
    return <Spinner />
  }

  if (!userData || !resolvedUser) {
    return <Spinner />
  }
  return (
    <>
      <div className="flex flex-row gap-4 pr-4">
        <div className="w-full mt-4">
          {isEditing ? (
            <div className="flex flex-col gap-8">
              {/* header */}
              <div className="flex flex-row justify-between px-10">
                <div className="flex flex-row flex-1">
                  <img
                    className="h-24 w-24 rounded-full"
                    src={userData.imageUrlString ?? ''}
                    alt=""
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <button
                    type="button"
                    className={classNames(
                      'block h-10 rounded-md  px-4 py-2 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      'bg-gray-200 text-gray-600 hover:bg-gray-300 focus-visible: outline-gray-500',
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsEditing(false)
                    }}
                    disabled={!areDetailsValid}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      'block h-10 rounded-md  px-4 py-2 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      'bg-indigo-500 text-white hover:bg-indigo-600 focus-visible: outline-indigo-600',
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onSaveUser()
                      clearResolvedUser()
                      setIsEditing(false)
                    }}
                    disabled={!areDetailsValid}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-8 px-10">
                {/* first name */}
                <div className="flex-1">
                  <label htmlFor="firstName" className={labelStyle}>
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={textFieldStyle}
                    placeholder="Enter first name"
                    required
                    value={resolvedUser.firstName}
                    onChange={onChangeUserDetail('firstName')}
                  />
                </div>
                {/* last name */}
                <div className="flex-1">
                  <label htmlFor="lastName" className={labelStyle}>
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={textFieldStyle}
                    placeholder="Enter first name"
                    required
                    value={resolvedUser.lastName}
                    onChange={onChangeUserDetail('lastName')}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-8 px-10">
                {/* email */}
                <div className="flex-1">
                  <label htmlFor="email" className={labelStyle}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={textFieldStyle}
                    placeholder="Enter email"
                    required
                    value={resolvedUser.email}
                    onChange={onChangeUserDetail('email')}
                  />
                </div>
                {/* phone */}
                <div className="flex-1">
                  <PhoneTextField
                    countryCode={resolvedUser.countryCode ?? singaporeCountryDialCode}
                    phoneNumber={resolvedUser.phoneNumber ?? ''}
                    setCountryCode={(value) => updateUserDetail('countryCode', value)}
                    setPhoneNumber={(value) => updateUserDetail('phoneNumber', value)}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-8 px-10">
                {/* musician group */}
                <div className="flex-1">
                  <label htmlFor="role" className={labelStyle}>
                    Time
                  </label>
                  <div className="flex flex-row gap-6">
                    {allMusicianGroups.map((group, index) => (
                      <div key={group} className="relative flex items-center py-4">
                        <input
                          id={group}
                          type="checkbox"
                          name={group}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2"
                          checked={resolvedUser.musicianGroups?.includes(group) ?? false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChangeMusicianGroup((groups) => [...(groups ?? []), group])
                            } else {
                              onChangeMusicianGroup((groups) => _.without(groups, group))
                            }
                          }}
                        />
                        <label
                          htmlFor="musician-group"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          {group}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* role */}
                <div className="flex-1">
                  <label htmlFor="role" className={labelStyle}>
                    Role
                  </label>
                  <div className="flex flex-row gap-6">
                    {allRoles.map((role, index) => (
                      <div key={index} className="relative flex items-center py-4">
                        <input
                          id={role}
                          type="checkbox"
                          name={roleInfo[role].name}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2"
                          checked={resolvedUser.availableRoles.includes(role)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChangeRoles((roles) => [...(roles ?? []), role])
                            } else {
                              onChangeRoles((roles) => _.without(roles ?? [], role))
                            }
                          }}
                        />
                        <label htmlFor="role" className="ml-2 text-sm font-medium text-gray-900">
                          {roleInfo[role].name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row px-10">
                <div className="flex-1">
                  <label htmlFor="role" className="block mb-4 text-sm font-medium text-gray-900">
                    Available to lead music
                  </label>
                  <div className="flex flex-row gap-8">
                    {musicLeadOptions.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="notification-method"
                          type="radio"
                          checked={option.value === resolvedUser.isLead}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={(e) => {
                            if (e.target.value && option.title == 'yes') {
                              updateUserDetail('isLead', true)
                            } else if (e.target.value && option.title == 'no') {
                              updateUserDetail('isLead', false)
                            }
                          }}
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                        >
                          {option.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row justify-between px-10">
                <div className="flex flex-row flex-1">
                  <img
                    className="h-24 w-24 rounded-full"
                    src={userData.imageUrlString ?? ''}
                    alt=""
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold leading-7 text-gray-900 px-10">
                      {userData.firstName} {userData.lastName}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">
                      {userData.email}
                    </p>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">
                      {userData.countryCode} {userData.phoneNumber}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className={classNames(
                    'block h-10 rounded-md  px-4 py-2 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    'bg-gray-200 text-gray-600 hover:bg-gray-300 focus-visible: outline-gray-500',
                  )}
                  onClick={() => {
                    setIsEditing(true)
                  }}
                >
                  Edit
                </button>
              </div>

              <div className="mt-6">
                <div className="flex flex-row px-10">
                  <div className="flex-1 py-6 border-t border-gray-100">
                    <div className="text-sm font-medium leading-6 text-gray-900">Service for</div>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                      {_.isEmpty(userData.musicianGroups)
                        ? '-'
                        : userData.musicianGroups.join(', ')}
                    </div>
                  </div>
                  <div className="flex-1 py-6 border-t border-gray-100">
                    <div className="text-sm font-medium leading-6 text-gray-900">Roles</div>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                      {_.isEmpty(userData.availableRoles)
                        ? '-'
                        : userData.availableRoles.map((role) => roleInfo[role].name).join(', ')}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row px-10">
                  <div className="flex-1 py-6 border-t border-gray-100">
                    <div className="text-sm font-medium leading-6 text-gray-900">
                      Available as music lead
                    </div>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                      {userData.isLead ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div className="flex-1 py-6 border-t border-gray-100">
                    <div className="text-sm font-medium leading-6 text-gray-900">
                      Is in Singapore now
                    </div>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                      {userData.isInSingapore ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row px-10">
                  <div className="flex-1 py-6 border-t border-gray-100">
                    <div className="text-sm font-medium leading-6 text-gray-900">Note</div>
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                      {/* {getServiceNoteString()} */}
                      something
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
