import css from '../styles.scss'

export default ({ children, ...props }) => {
  return <div className={css['ui-select__option']} {...props}>{children}</div>
}