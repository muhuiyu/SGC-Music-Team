import classNames from 'classnames'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAddUser from '../../../hooks/useAddUser'
import useAuth from '../../../hooks/useAuth'
import { pageInfo } from '../../../models/common/AppPage'
import User, { UserRole } from '../../../models/user/User'
import MaskedSpinner from '../../common/components/MaskedSpinner'
import PhoneTextField from '../../common/components/PhoneTextField'
import PrimaryButton from '../../common/components/PrimaryButton'
import TextButton from '../../common/components/TextButton'
import { singaporeCountryDialCode } from '../../common/pages/CountryCode'
import SignUpChooseRoleField from '../components/SignUpChooseRoleField'
import SignUpEmailTextField from '../components/SignUpEmailTextField'
import SignUpHeader from '../components/SignUpHeader'
import SignUpLeadMusicField from '../components/SignUpLeadMusicField'
import SignUpNoteField from '../components/SignUpNoteField'
import { SignUpSectionHeader } from '../components/SignUpSectionHeader'
import SignUpTextField from '../components/SignUpTextField'
import { sectionStyle } from '../styles/styles'

const SignUpPage = () => {
  // User data
  const { sessionData, signOut } = useAuth()
  const userMetadata = sessionData?.session?.user.user_metadata

  const [editingUser, setEditingUser] = useState<Partial<User>>({})

  const setEditingUserField = <TKey extends keyof User>(key: TKey, value: User[TKey]) => {
    setEditingUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }))
  }

  const createUserOnChange =
    <TKey extends keyof User>(key: TKey) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditingUserField(key, e.target.value as User[TKey])
    }

  const name = editingUser?.name ?? userMetadata?.name ?? ''
  const email = editingUser?.email ?? userMetadata?.email ?? ''

  const [countryCode, setCountryCode] = useState(singaporeCountryDialCode)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([])
  const [isLead, setLead] = useState(false)

  const [isAddingUserDataToSupabase, setIsAddingUserToSupabase] = useState(false)

  // Sign up and navigation
  const navigate = useNavigate()
  const { user } = useAuth({
    onFetchUser: (session, user) => {
      console.log('sign up page: session', session, 'user', user)
      if (user) {
        navigate(pageInfo.dashboard.href)
      }
      if (session === null && user === null) {
        navigate(pageInfo.login.href)
      }
    },
  })

  // Submit
  const { addUser } = useAddUser()
  async function handleSubmit() {
    const id = userMetadata?.id
    if (id && name !== '' && email !== '') {
      var signedUpUser: User = {
        id: id,
        name: name,
        email: email,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        availableRoles: selectedRoles,
        isLead: isLead,
        isInSingapore: true,
        imageUrlString: userMetadata?.avatar_url ?? '',
        musicianGroups: [],
      }
      setIsAddingUserToSupabase(true)
      try {
        await addUser(signedUpUser)
        navigate(pageInfo.dashboard.href)
      } catch (error) {
        alert('something wrong with your data, please check again')
        setIsAddingUserToSupabase(false)
      }
    } else {
      alert('something wrong with your data, please check again')
    }
  }

  function handleCancel() {
    signOut()
  }

  if (userMetadata === undefined) {
    // It's still fetching user so we return null
    return null
  }

  if (userMetadata === null) {
    // User is fetched but it's null, which means there's no active Supabase session
    // So we should return to login
    signOut()
  }

  return (
    <div className="space-y-12 py-12">
      <div className="max-w-2xl mx-auto">
        <SignUpHeader />

        {/* Section 1: Personal Infomation */}
        <div className={sectionStyle}>
          <SignUpSectionHeader
            title="Personal Information"
            subtitle="To receive music team weekly update and roster."
          />
          <div className="flex flex-col mt-10 gap-y-6">
            <SignUpTextField title="Name" value={name} onChange={createUserOnChange('name')} />
            <SignUpEmailTextField
              value={email}
              onChange={createUserOnChange('email')}
              emailFromUserMetadata={userMetadata?.email ?? ''}
            />
            <PhoneTextField {...{ countryCode, phoneNumber, setCountryCode, setPhoneNumber }} />
          </div>
        </div>

        {/* Section 2: Roles */}
        <div className={classNames(sectionStyle, 'mt-12')}>
          <SignUpSectionHeader title="Roles" subtitle="Choose your roles" />
          <SignUpChooseRoleField
            className="mt-10"
            {...{ selectedRoles }}
            onAddRole={(role) => {
              setSelectedRoles([...selectedRoles, role])
            }}
            onRemoveRole={(role) => setSelectedRoles(selectedRoles.filter((selectedRole) => selectedRole !== role))}
          />
          <SignUpLeadMusicField
            className="mt-12"
            onChange={(value) => {
              setLead(value)
            }}
          />
          <SignUpNoteField />
        </div>

        {/* Section 3: Buttons */}
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <TextButton title="Cancel" onClick={handleCancel} />
          <PrimaryButton title="Create Account" onClick={handleSubmit} />
        </div>
      </div>

      {isAddingUserDataToSupabase && <MaskedSpinner />}
    </div>
  )
}

export default SignUpPage
