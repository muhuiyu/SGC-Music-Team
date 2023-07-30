interface Props {
  title: string
  subtitle: string
}

export function SignUpSectionHeader({ title, subtitle }: Props) {
  return (
    <>
      <h2 className="text-lg font-semibold leading-7 text-gray-900">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{subtitle}</p>
    </>
  )
}
