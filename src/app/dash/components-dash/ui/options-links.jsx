import Link from 'next/link'
import Text from './text'
import { HeartFilledIcon, PlusIcon } from '../../assets/dash-icons'

export default function OptionsLinks () {
  return (
    <div className='flex items-center justify-between mb-7'>
      <Text name='Your files' />

      <div className='flex items-center gap-x-2.5'>
        <Link href='/dash/new' className='block py-2 btn-bg'>
          <div className='flex items-center'>
            <PlusIcon />
            <span className='hidden md:inline md:ml-1'>New file</span>
          </div>
        </Link>

        <Link href='#' className='block btn-border py-[7px]'>
          <div className='flex items-center'>
            <HeartFilledIcon />
            <span className='hidden md:inline md:ml-1'>Favorites</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
