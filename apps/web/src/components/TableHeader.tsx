interface Props {
  title: string
  buttonText?: string
  filterElement?: JSX.Element
  searchElement?: JSX.Element
  onClickButton(): void
}

export default function TableHeader(props: Props) {
  const { buttonText, onClickButton, filterElement, searchElement } = props
  return (
    <div className="sm:flex sm:items-center">
      {filterElement && <div className="sm:flex-auto">{filterElement}</div>}
      {searchElement && <div className="sm:flex-auto">{searchElement}</div>}
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        {buttonText && (
          <button
            type="button"
            className="block rounded-md bg-primary px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={onClickButton}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
}
