import css from '../styles.scss'
import flexItem from './FlexItem'
import { classNames } from '../helpers'

const Flex = ({ children, ...props }) => {
  const { gap } = props
  const classes = classNames({
    [css.flex]: true,
    [css[`flex--gap-${props.gap}`]]: props.gap
  })

  return (
    <div className={classes}>{children}</div>
  )
}

Flex.Item = flexItem
export default Flex