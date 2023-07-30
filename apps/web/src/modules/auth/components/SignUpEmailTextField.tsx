import classNames from 'classnames'
import { useState } from 'react'
import { labelStyle, textFieldStyle } from '../styles/styles'

interface Props {
  value: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  className?: string
  emailFromUserMetadata: string
}

export default function SignUpEmailTextField({ value, onChange, className, emailFromUserMetadata }: Props) {
  const [isShowingEmailTextField, setShowingEmailTextField] = useState(false)
  return (
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
            }}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <span id="same-as-google-email-description" className="text-gray-500">
            Use same email address <strong>{emailFromUserMetadata}</strong> from Google account
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
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
