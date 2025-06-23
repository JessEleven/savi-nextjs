'use client'

import { useState } from 'react'
import { UserIcon, XIcon } from '../../assets/dash-icons'

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

      <div className={open ? 'block' : 'hidden'}>
        {children}
      </div>
    </>
  )
}
