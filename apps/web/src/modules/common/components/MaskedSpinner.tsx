import { CSSProperties } from '@material-ui/core/styles/withStyles'

interface Props {}

export default function MaskedSpinner(props: Props) {
  return (
    <div style={maskStyle}>
      <div style={spinnerStyle}></div>
    </div>
  )
}

const maskStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 9999,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const spinnerStyle: CSSProperties = {
  display: 'inline-block',
  width: '60px',
  height: '60px',
  borderTop: '5px solid #ccc',
  borderRight: '5px solid transparent',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
}
