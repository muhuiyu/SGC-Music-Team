import { logoImageUrl } from '../../common/assets/AppImages'

interface Props {}

export default function SignUpHeader(props: Props) {
  return (
    <div className="mx-auto w-full max-w-md pb-12">
      <img className="mx-auto h-12 w-auto" src={logoImageUrl} alt="St George Church" />
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up a new account</h2>
    </div>
  )
}
