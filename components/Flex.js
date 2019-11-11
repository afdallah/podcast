import flexItem from './FlexItem'
import { classNames } from '../helpers'

const Flex = ({ children, ...props }) => {
  const { gap } = props
  const classes = classNames({
    'flex': true,
    [`flex--gap-${props.gap}`]: props.gap
  })

  return (
    <div className={classes} {...props}>{children}</div>
  )
}

Flex.Item = flexItem
export default Flex