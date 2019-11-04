import css from '../styles.scss'

export default ({ children, ...props }) => (
  <div className={css.container} {...props}>{children}</div>
)