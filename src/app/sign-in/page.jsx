'use client'

import AppLogo from '@/components/ui/app-logo'
import Footer from '@/components/ui/footer'
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
    <main className='bg-[#292c2e]'>
      <div className='relative min-h-screen main-container flex flex-col items-center justify-center'>
        <div className='w-full md:w-96'>
          <div className='mx-5 md:mx-0'>
            <div className='flex justify-center mb-5'>
              <AppLogo iconSize={54} />
            </div>

            <h2 className='text-2xl font-medium'>Welcome back</h2>
            <h3 className='mb-5 text-base text-neutral-400'>Sign in to create a JSON file</h3>

            <button
              type='button'
              aria-label='GitHub Icon'
              className='session-btn'
              onClick={signInWithGithub}
            >
              <GitHubIcon />
              <span>Continue with GitHub</span>
            </button>

            <div className='w-fit mx-auto mt-5'>
              <Link href='/' className='flex items-center justify-center gap-x-1 group'>
                <span className='text-sm leading-3.5'>Go to the landing page</span>
                <ArrowRight className='group-hover:text-cyan-500 transition-colors ease-in-out duration-200 mt-[1.5px]' />
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
