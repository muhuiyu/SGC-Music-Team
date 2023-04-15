interface Props {
  title: string
}

export default function SideBarItem(props: Props) {
  const { title } = props

  return <div className="px-3 py-2 text-white hover:bg-slate-500 cursor-pointer">{title}</div>
}
