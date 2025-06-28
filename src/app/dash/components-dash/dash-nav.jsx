import AppLogo from '@/components/ui/app-logo'
import Link from 'next/link'
import UserAvatar from './ui/user-avatar'
import GetSessionStatus from './ui/get-session-status'
import { GetUserName, GetFileName } from './ui/breadcrumbs'
import Modal from './modals/modal'
import { FavoriteBtn, HomeBtn, NewFileBtn } from './ui/dash-nav-buttons'

export default function DashNav () {
  return (
    <header className='h-[60px] flex items-center justify-between'>
      <div className='flex items-center'>
        <Link translate='no' href='/dash'>
          <AppLogo iconSize={26} showText fontSize={20} />
        </Link>
        <GetUserName />
        <GetFileName />
      </div>

      <div className='flex items-center gap-x-2.5'>
        <GetSessionStatus />
        <NewFileBtn />
        <HomeBtn />
        <FavoriteBtn />
        <span className='z-40'>
          <Modal />
        </span>
        <span className='hidden md:inline'>
          <UserAvatar />
        </span>
      </div>
    </header>
  )
}
