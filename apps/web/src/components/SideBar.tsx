import SideBarItem from './SideBarItem'

export default function SideBar() {
  return (
    <div className="bg-black w-52 h-full">
      <SideBarItem title="Dashboard" href="/" />
      <SideBarItem title="Planner" href="/planner" />
      <SideBarItem title="Availability" href="/availability" />
      <SideBarItem title="Songs" href="/songs" />
      <SideBarItem title="Members" href="/members" />
    </div>
  )
}
