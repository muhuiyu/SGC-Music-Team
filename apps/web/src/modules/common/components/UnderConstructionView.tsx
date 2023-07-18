interface Props {}

const UnderConstructionView = () => {
  return (
    <div className="flex flex-col text-center items-center gap-4">
      <div className="text-xl font-bold">Under Construction</div>
      <p>This page is currently under construction. Please check back later.</p>
      <img
        className="my-8"
        src="https://www.svgheart.com/wp-content/uploads/2021/11/under-construction-road-sign-free-svg-file-SvgHeart.Com-2.png"
        alt="Under Construction"
        width={600}
      />
    </div>
  )
}

export default UnderConstructionView
