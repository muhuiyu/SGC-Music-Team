import SearchBar from '../features/common/components/SearchBar'

interface Props {
  title: string
  buttonText?: string
  searchPlaceholder?: string
  isSearchable: boolean
  searchQuery: string
  setSearchQuery(searchQuery: string): void
  onClickButton(): void
}

export default function TableHeader(props: Props) {
  const {
    title,
    buttonText,
    isSearchable,
    searchPlaceholder,
    searchQuery,
    setSearchQuery,
    onClickButton,
  } = props
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        {isSearchable && (
          <SearchBar
            className="w-1/2"
            placeholder={searchPlaceholder ?? ''}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e)}
          />
        )}
      </div>

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
