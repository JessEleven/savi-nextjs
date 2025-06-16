import AppLogo from '@/components/ui/app-logo'
import Link from 'next/link'
import UserAvatar from './ui/user-avatar'
import SignOut from '@/components/ui/sign-out'
import GetSessionStatus from './ui/get-session-status'
import HomeBtn from './ui/home-btn'
import { GetUserName, GetFileName } from './ui/breadcrumbs'

export default function DashNav () {
  return (
    <header className='h-[60px] flex items-center justify-between'>
      <div className='flex items-center'>
        <Link translate='no' href='/dash'>
          <AppLogo size={24} showText />
        </Link>
        <GetUserName />
        <GetFileName />
      </div>

      <div className='flex items-center gap-x-2.5'>
        <GetSessionStatus />
        <HomeBtn />
        <SignOut icon />
        <UserAvatar />
      </div>
    </header>
  )
}
