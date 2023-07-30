import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { pageInfo } from '../../../models/common/AppPage'
import { backgroundImageUrl, logoImageUrl } from '../../common/assets/AppImages'
import PrimaryButton from '../../common/components/PrimaryButton'

export default function LoginPage() {
  const navigate = useNavigate()
  const { sessionData, user, isFetching, signIn } = useAuth({
    onFetchUser: (user) => {
      console.log('Login page: user', user)
      if (sessionData.session) {
        if (user) {
          // Fetched auth session and user data from the database
          navigate(pageInfo.dashboard.href)
        } else {
          // Fetched auth data but the user hasn't created a profile in the database yet
          navigate(pageInfo.signup.href)
        }
      }
    },
  })
  console.log('Login: session', sessionData.session, 'user', user)

  return (
    <>
      <div
        className="flex min-h-full flex-col justify-center py-12 px-6 h-full"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <img className="mx-auto h-12 w-auto" src={logoImageUrl} alt="St George Church" />
            <h2 className="mt-6 mb-12 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <PrimaryButton className="flex w-full justify-center" title="Continue with Google" onClick={signIn} />
          </div>
        </div>
      </div>

      {/* Loading */}
      <div
        className={classNames('absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center', {
          hidden: !isFetching,
        })}
      >
        <span className="text-2xl">Loading&hellip;</span>
      </div>
    </>
  )
}
