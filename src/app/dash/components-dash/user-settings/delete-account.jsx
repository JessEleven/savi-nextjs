'use client'

import { deleteAccount } from '@/libs/api/delete-account'
import { authClient } from '@/libs/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ShieldCleckIcon
} from '../../assets/dash-icons'
import { AnimatePresence, motion } from 'framer-motion'

export default function DeleteAccount () {
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const result = await deleteAccount()

      if (!result.success) throw new Error(result?.message)
      console.log({ isSuccess: result.success })

      await authClient.signOut()

      toast.success('Account deleted successfully')
      router.push('/sign-in')
    } catch (error) {
      console.log({ thereIsError: error })
      // toast.error(error.message || 'Failed to delete account')
      toast.error('Failed to delete account')
    }
  }
  const isValid = input === 'Delete account'

  return (
    <>
      <div className='w-full my-2.5 border border-neutral-600' />

      <div className='w-full flex items-center justify-between text-stone-400'>
        <div className='flex items-center gap-x-1 cursor-pointer' onClick={() => setOpen(!open)}>
          <ShieldCleckIcon />
          <h3 className='text-lg font-medium'>Security</h3>
        </div>
        <span className='text-neutral-50 btn-border-icon cursor-pointer' onClick={() => setOpen(!open)}>
          {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='mt-2.5 text-sm'
          >
            <h3>Are you sure you want to delete your account?</h3>
            <h3 className='text-rose-400'>This action is permanent and irreversible.</h3>

            <div className='mt-5'>
              <div className='flex flex-col'>
                <label htmlFor='confirm'>
                  Type <strong>"Delete account"</strong> below to continue.
                </label>
                <input
                  id='confirm'
                  type='text'
                  placeholder='Delete account'
                  className='mt-1.5 px-4 py-1.5 rounded-[5px] font-normal bg-transparent border border-neutral-600 outline-none focus:border-rose-400'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div className='flex justify-end gap-x-2.5 mt-5'>
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  className='px-4 btn-border cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  disabled={!isValid}
                  onClick={handleDelete}
                  className='px-4 py-[9px] btn-bg disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Delete account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
