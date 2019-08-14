import css from '../styles.scss'
import Option from './Option'
import { classNames } from '../helpers'

const emptyPlacholder = [{
  key: +new Date(),
  props: {
    children: 'Nothing to select',
    value: null
  }
}]

class Select extends React.Component {
  state = {
    selected: '',
    value: '',
    isFocus: false,
    children: []
  }

  componentDidMount() {
    let children
    if (this.props.children.length <= 0) {
      children = emptyPlacholder
    } else {
      children = this.props.children
    }
    const index = this.props.children.findIndex(el => el.props.selected) >= 0 || 0

    this.setState({
      children: this.props.children,
      selected: children[index].props.children
    })

    window.addEventListener('click', this.clickOutside)
  }

  clickOutside = () => {
    const target = event.target
    const toFind = '.' + this.refs.SelectRef.className
    if (!target.closest(toFind)) {
      this.setState({
        isFocus: false
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutside)
  }

  handleSearch = (event) => {
    this.filterSearch(event.target.value)
  }

  filterSearch = (value) => {
    const { children } = this.props
    const filtered = children.filter(elem => {
      return elem.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
    })

    this.setState({
      selected: value,
      children: filtered
    })
 }

 handleClick = (selected, value) => {
   this.setState({
    selected,
    isFocus: !this.state.isFocus
   })

   this.props.onChange(value, this.props.name)
 }

  render() {
    const { children, isFocus } = this.state
    const classes = classNames({
      [css['ui-select__dropdown']]: true,
      [css['ui-select__dropdown--hidden']]: !isFocus
    })

    return (
      <div className={css['ui-select']} ref="SelectRef">
        <input
          type="input"
          value={this.state.selected}
          className={css.input}
          onChange={this.handleSearch}
          onFocus={() => {this.setState({ isFocus: true })}}
          required={this.props.required && !this.state.value}
          disabled={!this.state.value ? false : true}
        />
        <div className={classes}>
          {children.map((elem, i) => (
            <Option
              onClick={() => this.handleClick(elem.props.children, elem.props.value)}
              key={+new Date() + i}
              {...this.props}
            >
              {elem.props.children}
            </Option>
          ))}
        </div>
      </div>
    )
  }
}

Select.Option = Option

export { Option }
export default Select