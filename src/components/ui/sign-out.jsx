import { auth } from '@/libs/auth'
import { LogoutIcon } from '@/resources/assets/main-icons'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function handleSignOut () {
  'use server'
  await auth.api.signOut({
    headers: await headers()
  })
  redirect('/sign-in')
}

export default function SignOut ({ icon = false, text = false, both = false }) {
  return (
    <form action={handleSignOut}>
      <button type='submit' className='flex cursor-pointer'>
        {icon && (
          <div className='btn-border-icon'>
            <LogoutIcon />
          </div>
        )}
        {text && (
          <span className='btn-border py-2'>Sign Out</span>
        )}
        {both && (
          <div className='flex items-center gap-x-1.5 btn-border py-[7px]'>
            <LogoutIcon />
            <span>Sign Out</span>
          </div>
        )}
      </button>
    </form>
  )
}
