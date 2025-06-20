import { auth } from '@/libs/auth'
import { headers } from 'next/headers'
import { CircleIcon } from '../../assets/dash-icons'

export default async function GetSessionStatus () {
  const { session } = await auth.api.getSession({
    headers: await headers()
  })

  const now = new Date()
  const expires = new Date(session?.expiresAt)
  const diff = expires.getTime() - now.getTime()
  const hoursLeft = diff / (1000 * 60 * 60)
  const isExpiringSoon = hoursLeft <= 24

  // console.log(`🕒 There are: ${hoursLeft.toFixed(2)} left before the session expires`)

  const statusText = isExpiringSoon ? 'EXPIRING' : 'ACTIVE'
  const color = isExpiringSoon ? 'text-yellow-500' : 'text-emerald-500'

  return (
    <div className='hidden md:inline-flex items-center gap-x-1 rounded-full px-2.5 py-1 bg-neutral-500/50'>
      <CircleIcon className={color} />
      <span className='text-[10px] leading-3 tracking-wide'>{statusText}</span>
    </div>
  )
}
