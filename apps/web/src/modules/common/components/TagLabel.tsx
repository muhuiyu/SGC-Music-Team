interface Props {
  title: string
}

export default function TagLabel({ title }: Props) {
  return (
    <div className="mt-2 px-2 py-1 bg-indigo-100 text-indigo-600 font-medium text-xs w-fit rounded-sm">{title} </div>
  )
}
