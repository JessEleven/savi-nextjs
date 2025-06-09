export default function SkeletonCard () {
  return (
    <div className='mt-10 card-container'>
      {Array.from({ length: 7 }).map((_, index) => (
        <article key={index} className='px-5 py-2.5 rounded-[5px] border border-neutral-600 animate-pulse'>
          <div className='flex items-center justify-between gap-x-5'>
            <div className='flex flex-col space-y-3.5'>
              <div className='h-4.5 w-32 md:w-72 bg-neutral-600 rounded-sm' />
              <div className='h-4 w-32 md:w-72 bg-neutral-600 rounded-sm' />
            </div>

            <div className='flex items-center gap-x-2.5'>
              <div className='size-8 bg-neutral-600 rounded-[5px]' />
              <div className='size-8 bg-neutral-600 rounded-[5px]' />
              <div className='size-8 bg-neutral-600 rounded-[5px]' />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
