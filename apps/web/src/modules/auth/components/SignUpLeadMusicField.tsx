import { musicLeadOptions } from '../../../models/user/User'

interface Props {
  className?: string
  onChange(value: boolean): void
}

export default function SignUpLeadMusicField({ className, onChange }: Props) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-gray-900">Would you like to lead music?</label>

      <div className="mt-4 flex flex-row gap-8">
        {musicLeadOptions.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              id={option.id}
              name="lead-response"
              type="radio"
              defaultChecked={!option.value}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={(e) => {
                if (e.target.value && option.title == 'yes') {
                  onChange(true)
                } else if (e.target.value && option.title == 'no') {
                  onChange(false)
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
  )
}
