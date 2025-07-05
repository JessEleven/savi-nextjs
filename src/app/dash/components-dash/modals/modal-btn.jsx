'use client'

import { useState } from 'react'
import { UserIcon, XIcon } from '../../assets/dash-icons'
import { AnimatePresence, motion } from 'framer-motion'

export default function ModalBtn ({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type='button'
        aria-label='Icon'
        onClick={() => setOpen(!open)}
        className='btn-border-icon'
      >
        {open ? <XIcon /> : <UserIcon />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='fixed inset-0 flex pt-[90px] -z-40 bg-neutral-800/80'
          >
            <motion.div className='h-fit w-full md:w-[400px] lg:w-[450px] 2xl:w-[500px] mx-5 md:mx-auto py-5 pl-5 pr-2.5 rounded-lg border border-neutral-600 bg-neutral-800 truncate'>
              <motion.div className='h-[374px] overflow-y-auto scrollbar-custom pr-2.5'>
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
