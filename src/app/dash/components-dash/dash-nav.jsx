import AppLogo from '@/components/ui/app-logo'
import Link from 'next/link'
import UserAvatar from './ui/user-avatar'
import GetSessionStatus from './ui/get-session-status'
import HomeBtn from './ui/home-btn'
import { GetUserName, GetFileName } from './ui/breadcrumbs'
import Modal from './modals/modal'

export default function DashNav () {
  return (
    <header className='h-[60px] flex items-center justify-between'>
      <div className='flex items-center'>
        <Link translate='no' href='/dash'>
          <AppLogo size={24} showText fontSize={20} />
        </Link>
        <GetUserName />
        <GetFileName />
      </div>

      <div className='flex items-center gap-x-2.5'>
        <span className='hidden'>
          <GetSessionStatus />
        </span>
        <HomeBtn />
        <span className='z-40'>
          <Modal />
        </span>
        <UserAvatar />
      </div>
    </header>
  )
}
