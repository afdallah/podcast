import ContentEditable from 'react-contenteditable'
import dynamic from 'next/dynamic'

export default ({ children, passive, ...props }) => {
  return (
    <div className="editable">
      <span className="editable__passive">{passive}</span>
      {/* <span className="editable__content" contentEditable {...props}>{children}</span> */}
      <ContentEditable className="editable__content" {...props} tagName="span"/>
    </div>
  )
}