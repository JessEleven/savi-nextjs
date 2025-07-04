import Link from 'next/link'
import AppLogo from './ui/app-logo'
import UserSession from './ui/user-session'

export default async function Nav () {
  return (
    <header className='h-[60px] flex items-center justify-between animate-fade-up-once'>
      <Link translate='no' href='/' className='block'>
        <AppLogo iconSize={26} showText fontSize={20} />
      </Link>

      <UserSession />
    </header>
  )
}
