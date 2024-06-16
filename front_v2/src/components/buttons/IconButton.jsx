const defaultClassName = "material-icons"

export default function IconButton(props) {
  return (
    <button
      type={props.type}
      className={`${defaultClassName} ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  )
}