import countryCodes from '../pages/CountryCode'

interface Props {
  countryCode: string
  phoneNumber: string
  setCountryCode(value: string): void
  setPhoneNumber(value: string): void
}

export default function PhoneTextField({
  countryCode,
  phoneNumber,
  setCountryCode,
  setPhoneNumber,
}: Props) {
  return (
    <div className="flex flex-row gap-4">
      <div className="col-span-2 col-start-1">
        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
          Country
        </label>
        <div className="mt-2">
          <select
            id="countryCode"
            name="countryCode"
            className="block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            value={countryCode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCountryCode(e.target.value)
            }}
          >
            {countryCodes.map((value) => (
              <option value={value.dial_code}>
                {value.name} {value.dial_code}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-span-6">
        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
          Phone number
        </label>
        <div className="mt-2">
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            pattern="\d{2,4}-?\d{2,4}"
            defaultValue={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value)
            }}
          />
          {/* Todo: Add phone number validation */}
          {/* <span className="text-red-500 text-sm">The number is invalid.</span> */}
        </div>
      </div>
    </div>
  )
}
