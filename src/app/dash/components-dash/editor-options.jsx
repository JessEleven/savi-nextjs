import Clean from './ui/clean'
import Format from './ui/format'

export default function EditorOptions ({ handleFormat, editorRef }) {
  return (
    <div className='hidden md:flex items-center gap-x-2.5 leading-3.5'>
      <Format handleFormat={handleFormat} responsiveMode='md' />
      <Clean editorRef={editorRef} responsiveMode='md' />
    </div>
  )
}
