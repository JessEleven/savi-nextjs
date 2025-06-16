import { auth } from '@/libs/auth'
import { headers } from 'next/headers'
import Image from 'next/image'

export default async function UserAvatar () {
  const { user } = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <Image
      width={32}
      height={32}
      src={user?.image}
      alt='Avatar'
      className='hidden md:inline rounded-full'
    />
  )
}
