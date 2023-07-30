import classNames from 'classnames'
import { MouseEventHandler } from 'react'

interface Props {
  title: string
  className?: string
  onClick?: MouseEventHandler | undefined
}

export default function PrimaryButton({ title, className, onClick }: Props) {
  return (
    <button
      className={classNames(
        'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  )
}
