import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { DownloadFileIcon } from '../../assets/dash-icons'

export default function DownloadFile ({ handleFileDownload, responsiveMode }) {
  const pathname = usePathname()

  return (
    <>
      <button
        type='button'
        aria-label='Download File Icon'
        onClick={handleFileDownload}
        className={(pathname === '/dash/new' && responsiveMode)
          ? clsx(
            'bg-transparent flex items-center gap-x-1.5',
            responsiveMode === 'md' && 'editor-btn'
          )
          : 'editor-btn text-sm leading-3.5'}
      >
        <DownloadFileIcon className={(pathname === '/dash/new' && responsiveMode) &&
          clsx('size-6', responsiveMode === 'md' && 'w-4 h-4')}
        />
        <span>Download file</span>
      </button>
    </>
  )
}
