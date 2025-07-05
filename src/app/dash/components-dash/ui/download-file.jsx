import clsx from 'clsx'
import { useParams, usePathname } from 'next/navigation'
import { DownloadFileIcon } from '../../assets/dash-icons'

export default function DownloadFile ({ handleFileDownload, responsiveMode }) {
  const { id } = useParams()
  const pathname = usePathname()

  const areOnRoutes = ['/dash/new', `/dash/${id}/edit`, `/dash/${id}/edit/fav`]

  return (
    <>
      <button
        type='button'
        aria-label='Download File Icon'
        onClick={handleFileDownload}
        className={(areOnRoutes.includes(pathname) && responsiveMode)
          ? clsx(
            'bg-transparent flex items-center gap-x-1.5',
            responsiveMode === 'md' && 'editor-btn'
          )
          : 'editor-btn text-sm leading-3.5'}
      >
        <DownloadFileIcon className={(areOnRoutes.includes(pathname) && responsiveMode) &&
          clsx('size-6', responsiveMode === 'md' && 'w-4 h-4')}
        />
        <span>Download file</span>
      </button>
    </>
  )
}
