import countryCodes, { singaporeCountryCode } from '../pages/CountryCode'

export default function PhoneTextField() {
  return (
    <div className="flex flex-row">
      <div className="col-span-2 col-start-1">
        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
          Country
        </label>
        <div className="mt-2">
          <select
            id="countryCode"
            name="countryCode"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            defaultValue={singaporeCountryCode}
          >
            {countryCodes.map((value) => (
              <option value={value.code}>
                {value.name} {value.dial_code}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-span-6">
        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
          Phone number
        </label>
        <div className="mt-2">
          <input
            type="tel"
            name="region"
            id="region"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <span className="">not correct</span>
        </div>
      </div>
    </div>
  )
}
