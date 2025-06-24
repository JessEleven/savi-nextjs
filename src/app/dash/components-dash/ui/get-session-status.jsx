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
    <div className='flex items-center gap-x-1 leading-2.5 rounded-full px-2.5 py-[3.5px] bg-neutral-500/50'>
      <CircleIcon className={color} />
      <span className='mt-[0.5px] text-[10px] tracking-wide'>{statusText}</span>
    </div>
  )
}
