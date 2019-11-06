import css from '../styles.scss'

export default (props) => {
  return (
    <div className={css.separator} {...props}>
      <div className={css.separator__item} data-anim="separator"></div>
    </div>
  )
}