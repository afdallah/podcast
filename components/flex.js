import css from '../styles.scss'
import flexItem from './FlexItem'

const Flex = ({ children }) => (
  <div className={css.flex}>{children}</div>
)

Flex.Item = flexItem
export default Flex