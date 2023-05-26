import classNames from 'classnames'
import { auth, getUserProfile, signInWithGoogle } from '../../../api/providers/FirebaseProvider'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { pageInfo } from '../../../models/common/AppPage'
import { logoImageUrl } from '../../common/assets/AppImages'

export default function LoginPage() {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth)

  const { data: fetchedUserData, isFetching: isFetchingUser } = useQuery({
    queryKey: ['userProfile', user?.uid ?? ''],
    queryFn: async () => (user ? getUserProfile(user.uid) : null),
    enabled: !!user?.uid,
  })

  useEffect(() => {
    if (loading || isFetchingUser) {
      return
    }
    if (user && typeof fetchedUserData !== 'undefined') {
      if (fetchedUserData === null) {
        navigate('/signup')
      } else {
        navigate('/')
      }
    }
  }, [user, loading, fetchedUserData, isFetchingUser])

  return (
    <>
      <div
        className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{
          backgroundImage: 'https://stgeorges.org.sg/wp-content/uploads/20190421_103046-5.jpg',
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={logoImageUrl} alt="St George Church" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                navigate(pageInfo.signup.href)
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      <div
        className={classNames(
          'absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center',
          { hidden: !loading && !isFetchingUser },
          // { hidden: !isFetching },
        )}
      >
        <span className="text-2xl">Loading&hellip;</span>
      </div>
    </>
  )
}
