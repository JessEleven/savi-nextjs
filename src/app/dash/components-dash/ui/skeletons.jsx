import { usePathname } from 'next/navigation'

export function SkeletonCard () {
  const pathname = usePathname()

  return (
    <div className='flex flex-col gap-y-3 card-container'>
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className='px-6 py-2.5 rounded-lg border border-neutral-700/70 animate-pulse'>
          <div className='flex items-center justify-between gap-x-5'>
            <div className='flex flex-col space-y-3.5'>
              <div className='w-[158px] md:w-72 h-[18px] bg-neutral-700/70 rounded-sm' />
              <div className='w-[158px] md:w-56 h-4 bg-neutral-700/70 rounded-sm' />
            </div>

            <div className='flex items-center gap-x-2.5'>
              {pathname === '/dash' && (
                <div className='size-8 bg-neutral-700/70 rounded-[5px]' />
              )}
              <div className='size-8 bg-neutral-700/70 rounded-[5px]' />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function SkeletonById () {
  return (
    <main className='flex flex-col card-container'>
      <div className='block md:flex md:items-center justify-between mb-5 md:mb-[22px]'>
        <div className='w-60 h-7 rounded-[5px] bg-neutral-700/70' />
        <div className='w-44 h-4 mt-[5px] md:mt-0 rounded-sm bg-neutral-700/70' />
      </div>

      <div className='flex items-center gap-x-2.5'>
        <div className='w-[76px] h-8 rounded-[5px] bg-neutral-700/70' />
        <div className='w-32 h-8 rounded-[5px] bg-neutral-700/70' />
      </div>

      <div className='h-[500px] mt-2.5 rounded-lg bg-neutral-700/70' />
    </main>
  )
}
