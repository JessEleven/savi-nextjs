'use client'

import { motion } from 'framer-motion'

const letters = ['J', 'S', 'O', 'N']

export default function Hero () {
  return (
    <section role='region' aria-label='Description of the application' className='mt-14 animate-fade-up-once'>
      <h1 className='relative text-3xl md:text-4xl text-center font-bold'>
        <motion.span className='underline decoration-2 decoration-wavy decoration-stone-400'>
          Creates
        </motion.span>{' '}
        <span className='inline-block'>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ color: '#fafafa' }} // Tailwind's neutral-50
              animate={{ color: '#94a3b8' }} // Tailwind's slate-400
              transition={{
                delay: i * 0.5,
                duration: 0.7,
                ease: 'easeInOut'
              }}
              className='inline-block'
            >
              {char}
            </motion.span>
          ))}
        </span>{' '}
        <span className='text-neutral-50'>files or <span className='underline decoration-2 decoration-wavy decoration-stone-400'>upload</span> them</span>
      </h1>

      <h3 className='w-full md:w-1/2 mx-auto mt-5 text-center text-lg text-neutral-400'>
        Savi is a simple and easy to use application. In addition to a
        favorites section and being able to download.
      </h3>
    </section>
  )
}
