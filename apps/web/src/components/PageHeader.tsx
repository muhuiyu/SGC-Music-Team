interface Props {
  title: string
  buttonText?: string
  onClickButton(): void
}

export default function TableHeader(props: Props) {
  const { title, buttonText, onClickButton } = props
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        {/* todo: add searching */}
        {/* <input
          className="p-4 my-4"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: '2px solid #ccc',
            borderRadius: '5px',
            width: '40%',
            boxSizing: 'border-box',
            color: '#333',
          }}
          placeholder="Enter name"
        /> */}
      </div>

      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        {buttonText && (
          <button
            type="button"
            className="block rounded-md bg-primary px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => onClickButton}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
}
