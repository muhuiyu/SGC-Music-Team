interface Props {
  repository: string
}

export default function GitHubButton({ repository }: Props) {
  return (
    <div className="hidden mr-3 -mb-1 sm:block">
      <a
        className="github-button"
        href={`https://github.com/${repository}`}
        data-color-scheme="no-preference: dark; light: light; dark: light;"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label={`Star ${repository} on GitHub`}
      >
        Star
      </a>
    </div>
  )
}
