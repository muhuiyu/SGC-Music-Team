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
import {
  detailPageSecondaryButtonStyle,
  detailPageFormRowStyle,
  detailPageHeaderDivStyle,
  detailPagePrimaryButtonStyle,
  detailPageTextFieldLabelStyle,
  detailPageTextFieldStyle,
  pageContentDivStyle,
  detailPageInfoDivStyle,
  detailPageInfoTitleStyle,
  detailPageInfoContentStyle,
} from '../../common/styles/ComponentStyles'

interface Props {
  userId: User['id']
}

export default function UserDetailPageContent({ userId }: Props) {
  const { user, isFetching } = useUser(userId)
  const { updateUser } = useUpdateUser()
  const [isEditing, setEditing] = useState(false)

  const [editingUser, setEditingUser] = useState<Partial<User>>({})
  const resolvedUser = useMemo(
    (): User | undefined =>
      user
        ? {
            ...user,
            ...editingUser,
          }
        : undefined,
    [user, editingUser],
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
      [key]: typeof value === 'function' ? value(prevUser[key] ?? user?.[key]) : value,
    }))
  }

  const onChangeUserDetail =
    <K extends keyof Omit<User, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateUserDetail(key, e.target.value as User[K])
    }

  const onChangeRoles = (roles: UserRole[] | ((prevRoles: UserRole[] | undefined) => UserRole[])) => {
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

  if (isFetching || user === null) {
    return <Spinner />
  }

  if (!user || !resolvedUser) {
    return <Spinner />
  }
  return (
    <>
      <div className={pageContentDivStyle}>
        <div className="w-full mt-4">
          {isEditing ? (
            <div className="flex flex-col gap-8">
              {/* header */}
              <div className={classNames(detailPageHeaderDivStyle, 'justify-between')}>
                <div className="flex flex-row flex-1">
                  <img className="h-24 w-24 rounded-full" src={user.imageUrlString ?? ''} alt="" />
                </div>
                <div className="flex flex-row gap-4">
                  <button
                    type="button"
                    className={detailPageSecondaryButtonStyle}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setEditing(false)
                    }}
                    disabled={!areDetailsValid}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={detailPagePrimaryButtonStyle}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onSaveUser()
                      clearResolvedUser()
                      setEditing(false)
                    }}
                    disabled={!areDetailsValid}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className={detailPageFormRowStyle}>
                {/* first name */}
                <div className="flex-1">
                  <label htmlFor="firstName" className={detailPageTextFieldLabelStyle}>
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={detailPageTextFieldStyle}
                    placeholder="Enter first name"
                    required
                    value={resolvedUser.firstName}
                    onChange={onChangeUserDetail('firstName')}
                  />
                </div>
                {/* last name */}
                <div className="flex-1">
                  <label htmlFor="lastName" className={detailPageTextFieldLabelStyle}>
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={detailPageTextFieldStyle}
                    placeholder="Enter first name"
                    required
                    value={resolvedUser.lastName}
                    onChange={onChangeUserDetail('lastName')}
                  />
                </div>
              </div>
              <div className={detailPageFormRowStyle}>
                {/* email */}
                <div className="flex-1">
                  <label htmlFor="email" className={detailPageTextFieldLabelStyle}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={detailPageTextFieldStyle}
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

              <div className={detailPageFormRowStyle}>
                {/* musician group */}
                <div className="flex-1">
                  <label htmlFor="role" className={detailPageTextFieldLabelStyle}>
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
                        <label htmlFor="musician-group" className="ml-2 text-sm font-medium text-gray-900">
                          {group}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* role */}
                <div className="flex-1">
                  <label htmlFor="role" className={detailPageTextFieldLabelStyle}>
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

              <div className={detailPageFormRowStyle}>
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
                        <label htmlFor={option.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
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
              {/* header */}
              <div className={classNames(detailPageHeaderDivStyle, 'justify-between')}>
                <div className="flex flex-row flex-1">
                  <img className="h-24 w-24 rounded-full" src={user.imageUrlString ?? ''} alt="" />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold leading-7 text-gray-900 px-10">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">{user.email}</p>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 px-10">
                      {user.countryCode} {user.phoneNumber}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className={detailPageSecondaryButtonStyle}
                  onClick={() => {
                    setEditing(true)
                  }}
                >
                  Edit
                </button>
              </div>

              <div className="mt-6">
                <div className={detailPageFormRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Service for</div>
                    <div className={detailPageInfoContentStyle}>
                      {_.isEmpty(user.musicianGroups) ? '-' : user.musicianGroups.join(', ')}
                    </div>
                  </div>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Roles</div>
                    <div className={detailPageInfoContentStyle}>
                      {_.isEmpty(user.availableRoles)
                        ? '-'
                        : user.availableRoles.map((role) => roleInfo[role].name).join(', ')}
                    </div>
                  </div>
                </div>
                <div className={detailPageFormRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Available as music lead</div>
                    <div className={detailPageInfoContentStyle}>{user.isLead ? 'Yes' : 'No'}</div>
                  </div>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Is in Singapore now</div>
                    <div className={detailPageInfoContentStyle}>{user.isInSingapore ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                <div className={detailPageFormRowStyle}>
                  <div className={detailPageInfoDivStyle}>
                    <div className={detailPageInfoTitleStyle}>Note</div>
                    <div className={detailPageInfoContentStyle}>
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
