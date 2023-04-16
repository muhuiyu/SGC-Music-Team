interface Props {
  title: string
  href: string
}

export default function SideBarItem(props: Props) {
  const { title, href } = props

  return (
    <a href={href}>
      <div className="px-3 py-2 text-white hover:bg-slate-500 cursor-pointer">{title}</div>
    </a>
  )
}
