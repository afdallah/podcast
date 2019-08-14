import css from '../styles.scss'
import { classNames } from '../helpers'

export default ({ children, ...props }) => {
  const { span } = props

  const classes = classNames({
    [css.flex__item]: true,
    [css[`is-${span}`]]: span
  })

  return (
    <div className={classes}>{children}</div>
  )
}