import Link from 'next/link'
import SectionTitle from './section-title'
import { PlusIcon, RefreshIcon, StarIcon } from '../../assets/dash-icons'
import { usePathname } from 'next/navigation'

export default function FileHeaderBar ({
  allFiles,
  handleRefresh,
  loading,
  hasItems,
  queryTime
}) {
  const pathname = usePathname()

  return (
    <div className='flex items-center justify-between mb-7'>
      <SectionTitle name={pathname === '/dash' ? 'Your files' : 'Your favorites'} />

      <div className='flex items-center justify-between gap-x-2.5'>
        {hasItems && (
          <h3 className='text-sm text-neutral-400'>
            {allFiles} {allFiles === 1 ? 'file' : 'files'} • {queryTime} ms
          </h3>
        )}

        <button
          type='button'
          aria-label='Refresh Icon'
          onClick={handleRefresh}
          className='btn-border-icon'
        >
          {loading ? <RefreshIcon className='animate-spin' /> : <RefreshIcon />}
        </button>

        <Link href='/dash/new' className='block px-2 md:px-4 py-[7.5px] btn-bg'>
          <div className='flex items-center'>
            <PlusIcon />
            <span className='hidden md:inline md:ml-1'>New file</span>
          </div>
        </Link>

        {pathname === '/dash' && (
          <Link href='/dash/favorite' className='block px-[7px] md:px-4 py-[7px] btn-border'>
            <div className='flex items-center'>
              <StarIcon />
              <span className='hidden md:inline md:ml-1'>Favorites</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
