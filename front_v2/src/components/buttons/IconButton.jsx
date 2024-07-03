const defaultClassName = 'material-icons'
import PropTypes from 'prop-types'

IconButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired
}

export default function IconButton({ type, className, onClick, icon }) {
  return (
    <button
      type={type}
      className={`${defaultClassName} ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
