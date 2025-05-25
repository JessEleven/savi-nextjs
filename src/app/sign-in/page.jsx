'use client'

import AppLogo from '@/components/ui/app-logo'
import { authClient } from '@/libs/auth-client'
import { ArrowRight, GitHubIcon } from '@/resources/assets/main-icons'
import Link from 'next/link'

export default function SignInForm () {
  const signInWithGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dash'
      })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full md:w-96 mx-16'>
        <div className='mx-5 md:mx-0'>
          <div className='flex justify-center mb-5'>
            <AppLogo size={56} />
          </div>

          <h2 className='text-2xl'>Welcome back</h2>
          <h3 className='mb-5 text-base text-neutral-400'>Sign in to create a JSON file</h3>

          <button
            type='button'
            className='session-btn'
            onClick={signInWithGithub}
          >
            <GitHubIcon />
            <span>Continue with GitHub</span>
          </button>

          <div className='flex items-center justify-center gap-x-1 mt-2.5 leading-3.5'>
            <Link href='/' className='block text-sm'>
              Go to the landing page
            </Link>
            <ArrowRight className='mt-[3px]' />
          </div>
        </div>
      </div>
    </main>
  )
}
