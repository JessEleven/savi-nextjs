import clsx from 'clsx'
import { FileIcon } from '../../assets/dash-icons'

export default function Format ({ handleFormat, responsiveMode }) {
  return (
    <button
      type='button'
      aria-label='File Icon'
      onClick={handleFormat}
      className={clsx(
        'bg-transparent flex items-center gap-x-1.5',
        responsiveMode === 'md' && 'editor-btn'
      )}
    >
      <FileIcon className={clsx('size-6', responsiveMode === 'md' && 'w-4 h-4')} />
      <span>Format</span>
    </button>
  )
}
