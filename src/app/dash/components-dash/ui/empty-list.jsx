import Link from 'next/link'
import { ClockCirceIcon } from '../../assets/animated-icons'
import { PlusIcon } from '../../assets/dash-icons'

export default function EmptyList ({ message }) {
  return (
    <div className='mt-52 md:mt-72 lg:mt-40 xl:mt-52 flex flex-col items-center justify-center'>
      <ClockCirceIcon />
      <h3 className='text-neutral-400 -mt-1.5'>{message}</h3>
      <Link href='/dash/new' className='block mt-2 btn-bg'>
        <div className='flex items-center gap-x-1 px-4 py-2'>
          <PlusIcon />
          <span>New file</span>
        </div>
      </Link>
    </div>
  )
}
