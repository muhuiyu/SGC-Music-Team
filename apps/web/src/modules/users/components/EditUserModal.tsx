import { XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import produce from 'immer'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import User, { UserRole, allRoles, musicLeadOptions, roleInfo } from '../../../models/user/User'
import PhoneTextField from '../../common/components/PhoneTextField'

interface Props {
  isShowingEditUserModal: boolean
  user: User
  onSaveUser(details: User): void
  onDismiss(): void
  className?: string
}

export default function EditUserModal({ isShowingEditUserModal, user, onSaveUser, onDismiss, className }: Props) {
  // User
  const [editingUser, setEditingUser] = useState<Partial<User>>({})
  const resolvedUser = useMemo(
    () => ({
      ...user,
      ...editingUser,
    }),
    [user, editingUser],
  )

  useEffect(() => {
    if (isShowingEditUserModal) {
      return
    }
    setEditingUser({})
  }, [isShowingEditUserModal])

  const clearResolvedUser = () => {
    setEditingUser({})
  }

  const updateUserDetail = <K extends keyof User>(key: K, value: User[K]) => {
    setEditingUser(
      produce((draft) => {
        draft[key] = value
      }),
    )
  }

  const onChangeUserDetail =
    <K extends keyof Omit<User, 'id'>>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      updateUserDetail(key, e.target.value as User[K])
    }

  const onChangeRoles = (roles: UserRole[]) => {
    updateUserDetail('availableRoles', roles)
  }

  const areDetailsValid = useMemo(() => {
    return !_.isEmpty(resolvedUser.name)
  }, [resolvedUser])

  return (
    <div
      className={classNames(
        'relative w-full max-w-2xl max-h-full',
        {
          hidden: !isShowingEditUserModal,
        },
        className,
      )}
    >
      <div className="relative bg-white rounded-lg shadow">
        <div className="px-6 py-6 lg:px-8">
          {/* close button */}
          <XMarkIcon
            className="absolute top-8 right-6"
            width={24}
            height={24}
            onClick={() => {
              clearResolvedUser()
              onDismiss()
            }}
          />
          {/* title */}
          <div className="py-4 border-b rounded-t">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
              {user.id === '' ? 'Add user' : 'Edit user'}
            </h3>
          </div>

          <form className="space-y-6 text-left pt-6" action="#">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter name"
                required
                value={resolvedUser.name}
                onChange={onChangeUserDetail('name')}
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter email"
                required
                value={resolvedUser.email}
                onChange={onChangeUserDetail('email')}
              />
            </div>
            {/* Phone */}
            <PhoneTextField
              countryCode={resolvedUser.countryCode}
              phoneNumber={resolvedUser.phoneNumber}
              setCountryCode={(value) => updateUserDetail('countryCode', value)}
              setPhoneNumber={(value) => updateUserDetail('phoneNumber', value)}
            />

            <div className="mt-4 divide-gray-200">
              <label htmlFor="role" className="block text-sm font-medium text-gray-900">
                Role
              </label>
              <div className="flex flex-row gap-6">
                {allRoles.map((role, index) => (
                  <div key={index} className="relative flex items-center py-4">
                    <input
                      id="orange-checkbox"
                      type="checkbox"
                      name={roleInfo[role].name}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2"
                      checked={resolvedUser.availableRoles.includes(role)}
                      onClick={(_) => {
                        if (resolvedUser.availableRoles.includes(role)) {
                          onChangeRoles(resolvedUser.availableRoles.filter((selectedRole) => selectedRole !== role))
                        } else {
                          onChangeRoles([...resolvedUser.availableRoles, role])
                        }
                      }}
                    />
                    <label htmlFor="orange-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                      {roleInfo[role].name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 divide-gray-200">
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
            <div className="flex justify-between gap-4 pt-8">
              <button
                type="reset"
                className="w-1/2 text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  clearResolvedUser()
                  onDismiss()
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onSaveUser(resolvedUser)
                  clearResolvedUser()
                }}
                disabled={!areDetailsValid}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
