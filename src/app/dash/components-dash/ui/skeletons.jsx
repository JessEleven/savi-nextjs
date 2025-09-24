export function SkeletonCard () {
  return (
    <div className='flex flex-col gap-y-3 card-container'>
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className='px-5 py-2.5 rounded-lg border border-neutral-700/70 animate-pulse'>
          <div className='flex items-center justify-between gap-x-5'>
            <div className='flex flex-col w-full space-y-3.5'>
              <div className='w-full md:w-72 h-[18px] rounded-sm bg-neutral-700/70 ' />
              <div className='w-44 h-4 rounded-sm bg-neutral-700/70' />
            </div>

            <div className='flex items-center gap-x-2.5'>
              <div className='size-8 rounded-[5px] bg-neutral-700/70' />
              <div className='size-8 rounded-[5px] bg-neutral-700/70' />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function SkeletonById () {
  return (
    <div className='flex flex-col card-container animate-pulse'>
      <div className='block md:flex md:items-center justify-between mb-6'>
        <div className='w-full md:w-60 h-7 rounded-[5px] bg-neutral-700/70' />
        <div className='w-44 h-4 mt-[5px] md:mt-0 rounded-sm bg-neutral-700/70' />
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2.5'>
          <div className='w-[76px] h-8 rounded-[5px] bg-neutral-700/70' />
          <div className='w-32 h-8 rounded-[5px] bg-neutral-700/70' />
        </div>

        <div className='w-[98px] h-8 rounded-[5px] bg-neutral-700/70' />
      </div>

      <div className='h-[500px] mt-2.5 rounded-lg bg-neutral-700/70' />
    </div>
  )
}

export function SkeletonUpdate () {
  return (
    <div className='card-container animate-pulse'>
      <div className='w-[168px] md:w-[220px] h-7 rounded-[5px] bg-neutral-700/70' />
      <div className='w-[72px] h-4 mt-5 md:mt-7 rounded-sm bg-neutral-700/70' />
      <div className='w-full h-[34px] mt-3 rounded-[5px] bg-neutral-700/70' />

      <div className='flex items-center justify-between mt-[26px]'>
        <div className='block md:hidden size-8 rounded-[5px] bg-neutral-700/70' />
        <div className='hidden md:flex items-center gap-x-2.5'>
          <div className='w-[89px] h-8 rounded-[5px] bg-neutral-700/70' />
          <div className='w-[79px] h-8 rounded-[5px] bg-neutral-700/70' />
          <div className='w-[76px] h-8 rounded-[5px] bg-neutral-700/70' />
          <div className='w-32 h-8 rounded-[5px] bg-neutral-700/70' />
        </div>
        <div className='w-[120px] h-8 rounded-[5px] bg-neutral-700/70' />
      </div>

      <div className='h-[500px] mt-2.5 rounded-lg bg-neutral-700/70' />

      <div className='flex justify-end gap-x-2.5 mt-7'>
        <div className='w-[76px] h-8 rounded-[5px] bg-neutral-700/70 ' />
        <div className='w-[76px] h-8 rounded-[5px] bg-neutral-700/70 ' />
      </div>
    </div>
  )
}
