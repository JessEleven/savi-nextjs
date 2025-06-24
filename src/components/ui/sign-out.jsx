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
          <span className='px-4 py-2 btn-border'>Sign Out</span>
        )}
        {both && (
          <div className='flex items-center gap-x-1.5 text-sm hover:text-rose-400 duration-200 ease-in-out'>
            <LogoutIcon />
            <span>Sign Out</span>
          </div>
        )}
      </button>
    </form>
  )
}
