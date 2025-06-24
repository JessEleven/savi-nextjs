import Link from 'next/link'
import Text from './text'
import { HeartIcon, PlusIcon, RefreshIcon } from '../../assets/dash-icons'

export default function OptionsLinks ({ allFiles, handleRefresh, loading, hasItems }) {
  return (
    <div className='flex items-center justify-between mb-7'>
      <Text name='Your files' />

      <div className='flex items-center justify-between gap-x-2.5'>
        {hasItems && (
          <h3 className='text-sm text-neutral-400'>{allFiles} files</h3>
        )}

        <button
          type='button'
          aria-label='Refresh Icon'
          onClick={handleRefresh}
          className='btn-border-icon'
        >
          {loading ? <RefreshIcon className='animate-spin' /> : <RefreshIcon />}
        </button>

        <Link href='/dash/new' className='block px-2 md:px-4 py-2 btn-bg'>
          <div className='flex items-center'>
            <PlusIcon />
            <span className='hidden md:inline md:ml-1'>New file</span>
          </div>
        </Link>

        {(hasItems || loading) && (
          <Link href='#' className='block px-[7px] md:px-4 py-[7px] btn-border'>
            <div className='flex items-center'>
              <HeartIcon />
              <span className='hidden md:inline md:ml-1'>Favorites</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
