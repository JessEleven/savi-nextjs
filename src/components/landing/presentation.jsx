import {
  ChevronLeft, ChevronRight, DotsIcon,
  FocusIcon, PointIcon, StarIcon
} from '@/app/dash/assets/dash-icons'

const ELEMENTS = [
  {
    name: 'Products',
    date: 'File not updated',
    icon: <PointIcon className='text-emerald-500' />,
    icon2: <ChevronRight />
  },
  {
    name: 'Users',
    date: 'February 18, 2025 • 12:18 am',
    icon: <PointIcon className='text-purple-500' />,
    icon2: <ChevronLeft />
  },
  {
    name: 'Server config',
    date: 'July 29, 2025 • 05:25 pm',
    icon: <PointIcon className='text-purple-500' />,
    icon2: <ChevronLeft />
  }
]

export default function Presentation () {
  return (
    <section className='flex flex-col gap-y-3 mt-10 mx-auto w-full lg:w-[400px] xl:w-[550px] 2xl:w-[700px] perspective-normal animate-fade-up animate-once animate-duration-[2000ms] animate-ease-in-out animate-fill-forwards'>
      {ELEMENTS?.map((item) => (
        <article key={item.name} className='transform-3d rotate-x-[35deg] animate-rotate-border rounded-lg bg-conic/[from_var(--border-angle)] from-neutral-600 via-neutral-400 to-neutral-600 from-80% via-90% to-100% p-px cursor-pointer group'>
          <div className='flex items-center justify-between gap-x-5 px-5 py-2.5 rounded-lg bg-[#292c2e]'>
            <div className='flex flex-col space-y-1 truncate'>
              <div className='flex items-center gap-x-1'>
                <FocusIcon className='text-neutral-600 transition-all duration- ease-in-out group-hover:text-stone-400' />
                <h3 className='font-medium'>{item.name}</h3>
              </div>
              <div className='flex items-center gap-x-0.5'>
                {item.icon}
                {item.icon2}
                <h3 className='truncate text-sm text-neutral-400'>{item.date}</h3>
              </div>
            </div>

            <div className='perspective-normal relative flex items-center gap-x-2.5 text-sm'>
              <div aria-label='Star Icon' className='btn-border-icon'>
                <StarIcon />
              </div>
              <div aria-label='Dots Icon' className='btn-border-icon'>
                <DotsIcon />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
