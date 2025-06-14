import Clean from './ui/clean'
import Clipboard from './ui/clipboard'
import DownloadFile from './ui/download-file'
import Format from './ui/format'

export default function EditorOptions ({
  handleFormat,
  editorRef,
  handleFileDownload,
  handleFileCopying
}) {
  return (
    <div className='hidden md:flex items-center gap-x-2.5 leading-3.5'>
      <Format handleFormat={handleFormat} responsiveMode='md' />
      <Clean editorRef={editorRef} responsiveMode='md' />
      <Clipboard
        editorRef={editorRef}
        handleFileCopying={handleFileCopying}
        responsiveMode='md'
      />
      <DownloadFile handleFileDownload={handleFileDownload} responsiveMode='md' />
    </div>
  )
}
