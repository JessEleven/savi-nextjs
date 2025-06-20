export default function SkeletonCard () {
  return (
    <div className='mt-24 flex flex-col gap-y-3 card-container'>
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className='px-6 py-2.5 rounded-lg border border-neutral-600 animate-pulse'>
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
