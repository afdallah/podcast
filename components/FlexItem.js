import { classNames } from '../helpers'

export default ({ children, ...props }) => {
  const { span } = props

  const classes = classNames({
    flex__item: true,
    [`is-${span}`]: span
  })

  return (
    <div className={classes} {...props}>{children}</div>
  )
}