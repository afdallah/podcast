export default ({ children, ...props }) => {
  return <div className="ui-select__option" {...props}>{children}</div>
}