import classNames from 'classnames'
import { MouseEventHandler } from 'react'

interface Props {
  title: string
  className?: string
  onClick?: MouseEventHandler | undefined
}

export default function TextButton({ title, className, onClick }: Props) {
  return (
    <button
      type="button"
      className={classNames('text-sm font-semibold leading-6 text-gray-900', className)}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
