import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { withRequireAuth } from '../../../api/auth/RequireAuth'
// import { sendEmailNotification } from '../../../api/functions'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { auth, getUserProfile, logout } from '../../../api/providers/FirebaseProvider'
import useAllUsers from '../../../api/providers/useAllUsers'
import User, { UserRole, allRoles, roleInfo } from '../../../models/user/User'
import { logoImageUrl } from '../../common/assets/AppImages'
import PhoneTextField from '../../common/components/PhoneTextField'
import { singaporeCountryDialCode } from '../../common/pages/CountryCode'

const musicLeadOptions = [
  { id: 'yes', title: 'yes', value: true },
  { id: 'no', title: 'no', value: false },
]

const labelStyle = 'block text-sm font-medium leading-6 text-gray-900'

const textFieldStyle =
  'block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

function handleCancel() {
  logout()
}

const SignUpPage = () => {
  // User data
  const [user, loading, error] = useAuthState(auth)
  user?.displayName
  const [firstName, setFirstName] = useState(user?.displayName?.split(' ')[0] ?? '')
  const [lastName, setLastName] = useState(user?.displayName?.split(' ')[1] ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [countryCode, setCountryCode] = useState(singaporeCountryDialCode)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([])
  const [isLead, setIsLead] = useState(false)
  const [isShowingEmailTextField, setShowingEmailTextField] = useState(false)

  // Sign up and navigation
  const navigate = useNavigate()

  const { data: fetchedUserData, isFetching: isFetchingUser } = useQuery({
    queryKey: ['userProfile', user?.uid ?? ''],
    queryFn: async () => (user ? getUserProfile(user.uid) : null),
    enabled: !!user?.uid,
  })

  useEffect(() => {
    if (loading || isFetchingUser) {
      return
    }
    if (user && typeof fetchedUserData !== 'undefined' && fetchedUserData !== null) {
      navigate('/')
    }
  }, [user, loading, fetchedUserData, isFetchingUser])

  // Submit
  const { addUser } = useAllUsers()
  function handleSubmit() {
    const id = user?.uid
    if (id && firstName !== '' && email !== '') {
      var signedUpUser: User = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        availableRoles: selectedRoles,
        isLead: isLead,
        isInSingapore: true, // TODO: add option and comment for this
        imageUrlString: '', // TODO: add image file
      }
      addUser(signedUpUser)
    } else {
      alert('something wrong with your data, please check again')
    }
  }

  return (
    <div className="space-y-12 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md pb-12">
          <img className="mx-auto h-12 w-auto" src={logoImageUrl} alt="St George Church" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up a new account
          </h2>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          {/* Title */}
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Personal Indivation</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            To receive music team weekly update and roster.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* First name */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className={labelStyle}>
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={firstName}
                  className={textFieldStyle}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                />
              </div>
            </div>

            {/* Last name */}
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className={labelStyle}>
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={lastName}
                  className={textFieldStyle}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="col-span-8">
              <label htmlFor="email" className={labelStyle}>
                Email address
              </label>

              <div className="flex flex-row mt-2">
                <div className="flex h-6 items-center">
                  <input
                    id="same-as-google-email"
                    aria-describedby="same-as-google-email-description"
                    name="same-as-google-email"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    defaultChecked={!isShowingEmailTextField}
                    onChange={(value) => {
                      setShowingEmailTextField(!value.target.checked)
                      if (!value.target.checked) {
                        setEmail(user?.email ?? '')
                      }
                    }}
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <span id="same-as-google-email-description" className="text-gray-500">
                    Use same email address <b>{user?.email}</b> from Google account
                  </span>
                </div>
              </div>

              <div
                className={classNames('mt-2', {
                  hidden: !isShowingEmailTextField,
                })}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className={textFieldStyle}
                  onChange={(e) => {
                    if (isShowingEmailTextField) {
                      setEmail(e.target.value)
                    }
                  }}
                />
              </div>
            </div>

            {/* Photo, not allow to change now */}
            {/* <div className="col-span-full">
              <label htmlFor="photo" className={labelStyle}>
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {imageFile === null ? (
                  <UserCircleIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
                ) : (
                  <img src={imageFile} className="h-24 w-24" alt="profile photo" />
                )}

                <input
                  type="file"
                  onChange={(e) => setImageFile(URL.createObjectURL(e.target.files[0]))}
                  className="bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900"
                />
                <XMarkIcon
                  className={classNames(
                    imageFile !== null && imageFile !== user?.photoURL ? '' : 'hidden',
                  )}
                  width={24}
                  height={24}
                  onClick={(_) => setImageFile(user?.photoURL)}
                />
              </div>
            </div> */}

            {/* Phone */}
            <div className="col-span-full">
              <PhoneTextField {...{ setCountryCode, setPhoneNumber }} />
            </div>

            {/* <div className="border-b border-gray-900/10 pb-12 pt-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We'll always let you know about important changes, but you pick what else you want
                to hear about.
              </p>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="offers" className="font-medium text-gray-900">
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className={labelStyle}
                      >
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className={labelStyle}
                      >
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className={labelStyle}
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12 pt-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900 ">Roles</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Choose your roles</p>

          <div className="mt-10 space-y-10 col-span-full">
            <fieldset>
              <label htmlFor="photo" className={labelStyle}>
                What roles would you like to do?
              </label>
              <div className="mt-4 divide-gray-200">
                {allRoles.map((role, index) => (
                  <div key={index} className="relative flex items-center py-4">
                    <input
                      id="orange-checkbox"
                      type="checkbox"
                      name={roleInfo[role].name}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2"
                      checked={selectedRoles.includes(role)}
                      onClick={(_) => {
                        if (selectedRoles.includes(role)) {
                          setSelectedRoles(
                            selectedRoles.filter((selectedRole) => selectedRole !== role),
                          )
                        } else {
                          setSelectedRoles([...selectedRoles, role])
                        }
                      }}
                    />
                    <label
                      htmlFor="orange-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      {roleInfo[role].name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="pt-12">
            <label className="text-sm font-semibold text-gray-900">
              Would you like to lead music?
            </label>

            <fieldset className="mt-4">
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {musicLeadOptions.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={option.id}
                      name="notification-method"
                      type="radio"
                      defaultChecked={!option.value}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={(e) => {
                        if (e.target.value && option.title == 'yes') {
                          setIsLead(true)
                        } else if (e.target.value && option.title == 'no') {
                          setIsLead(false)
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
            </fieldset>
          </div>
          <div className="pt-12">
            <label className="text-sm font-semibold text-gray-900">
              Any extra comment or notes?
            </label>

            <textarea
              id="message"
              rows={4}
              className="block mt-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            // type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRequireAuth(SignUpPage)
