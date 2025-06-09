import clsx from 'clsx'
import { FileIcon } from '../../assets/dash-icons'

export default function Format ({ handleFormat, responsiveMode }) {
  return (
    <button
      type='button'
      onClick={handleFormat}
      className={clsx(
        'bg-transparent flex items-center gap-x-1',
        responsiveMode === 'md' && 'editor-btn'
      )}
    >
      <FileIcon className={clsx('size-5', responsiveMode === 'md' && 'w-4 h-4')} />
      <span>Format</span>
    </button>
  )
}
