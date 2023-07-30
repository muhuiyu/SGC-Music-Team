import { labelStyle, textFieldStyle } from '../styles/styles'

interface Props {
  title: string
  value: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  className?: string
}

export default function SignUpTextField({ title, value, onChange, className }: Props) {
  return (
    <div className={className}>
      <label htmlFor="name" className={labelStyle}>
        Name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="given-name"
          value={value}
          className={textFieldStyle}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
