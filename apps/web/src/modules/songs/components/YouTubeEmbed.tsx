import classNames from 'classnames'

interface Props {
  embedId: string
  className?: string
}

export default function YouTubeEmbed({ className, embedId }: Props) {
  return (
    <div className={classNames('relative overflow-hidden', className)} style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="w-full absolute"
        height={400}
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube"
      />
    </div>
  )
}
