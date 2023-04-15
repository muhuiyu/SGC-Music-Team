import SideBarItem from './SideBarItem'

export default function SideBar() {
  return (
    <div className="bg-black w-52 h-full">
      <SideBarItem title="Dashboard" />
      <SideBarItem title="Planner" />
      <SideBarItem title="Availability" />
      <SideBarItem title="Songs" />
      <SideBarItem title="Members" />
    </div>
  )
}
