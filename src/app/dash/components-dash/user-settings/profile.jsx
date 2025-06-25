import dayjs from 'dayjs'
import { headers } from 'next/headers'
import UserAvatar from '../ui/user-avatar'
import { auth } from '@/libs/auth'
import { UserCircleIcon } from '../../assets/dash-icons'

export default async function Profile () {
  const { user } = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <>
      <div className='w-fit flex items-center gap-x-1 text-stone-400 cursor-pointer'>
        <UserCircleIcon />
        <h3 className='text-lg font-medium'>Profile</h3>
      </div>

      <div className='flex items-center justify-between gap-x-2.5 mt-2.5 text-sm'>
        <div className='flex flex-col truncate'>
          <h3 className='truncate'>{user?.name}</h3>
          <h3 className='text-neutral-400'>{user?.email}</h3>
        </div>
        <UserAvatar />
      </div>

      <h3 className='mt-2.5 text-sm truncate'>
        Account created at {dayjs(user?.createdAt).format('MMMM DD, YYYY • hh:mm a')}
      </h3>
    </>
  )
}
