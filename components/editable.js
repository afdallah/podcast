import css from '../styles.scss'
import ContentEditable from 'react-contenteditable'
import dynamic from 'next/dynamic'

export default ({ children, passive, ...props }) => {
  return (
    <div className={css.editable}>
      <span className={css.editable__passive}>{passive}</span>
      {/* <span className={css.editable__content} contentEditable {...props}>{children}</span> */}
      <ContentEditable className={css.editable__content} {...props} tagName="span"/>
    </div>
  )
}