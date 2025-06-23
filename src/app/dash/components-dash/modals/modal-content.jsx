import dayjs from 'dayjs'
import { headers } from 'next/headers'
import GetSessionStatus from '../ui/get-session-status'
import SignOut from '@/components/ui/sign-out'
import { auth } from '@/libs/auth'
import UserAvatar from '../ui/user-avatar'

export default async function ModalContent () {
  const { user, session } = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className='fixed inset-0 flex pt-[90px] -z-40 bg-neutral-800/80'>
      <div className='h-fit w-full md:w-96 mx-5 md:mx-auto p-5 rounded-lg border border-neutral-600 bg-neutral-800'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col truncate'>
            <h3 className='text-[16px] truncate'>{user?.name}</h3>
            <h3 className='text-sm text-neutral-400'>{user?.email}</h3>
          </div>
          <UserAvatar />
        </div>

        <div className='w-full my-2.5 border border-neutral-600' />

        <div className='flex items-center justify-between mb-0.5'>
          <h3 className='text-sm'>The session is in mode</h3>
          <GetSessionStatus />
        </div>

        <h3 className='text-sm'>
          Expires at {dayjs(session?.expiresAt).format('MMMM DD, YYYY • hh:mm:ss a')}
        </h3>

        <div className='w-full my-2.5 border border-neutral-600' />
        <SignOut both />
      </div>
    </div>
  )
}
