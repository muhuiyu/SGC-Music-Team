interface NavBarProps {
  title: string
}

export default function NavBar(props: NavBarProps) {
  const { title } = props
  return (
    <div className="flex flex-row justify-between items-center pb-10">
      <h1 className="text-2xl font-semibold inline-block">{title}</h1>
      <div className="flex flex-row items-center gap-1">
        <div className="bg-gray-400 w-4 aspect-square rounded-full" />
        <span>Grace Yu</span>
      </div>
    </div>
  )
}
