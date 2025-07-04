import Nav from '@/components/nav'
import {
  ChevronLeft, ChevronRight, DotsIcon,
  FocusIcon, PointIcon, StarIcon
} from './dash/assets/dash-icons'
import Footer from '@/components/ui/footer'

const ELEMENTS = [
  {
    name: 'Products',
    date: 'File not updated',
    icon: <PointIcon className='text-emerald-500' />,
    icon2: <ChevronLeft />
  },
  {
    name: 'Users',
    date: 'February 18, 2025 • 12:18 am',
    icon: <PointIcon className='text-purple-500' />,
    icon2: <ChevronRight />
  },
  {
    name: 'Server config',
    date: 'July 29, 2025 • 05:25 pm',
    icon: <PointIcon className='text-purple-500' />,
    icon2: <ChevronRight />
  }
]

export default function Home () {
  return (
    <main className='bg-[#292c2e]'>
      <div className='relative min-h-screen main-container'>
        <div className='px-5 md:px-0'>
          <Nav />

          <section role='region' aria-label='Description of the application' className='mt-14'>
            <h1 className='relative text-3xl md:text-4xl text-center font-bold'>
              <span className='underline decoration-2 decoration-wavy decoration-emerald-500'>Creates</span> <span className='text-teal-600'>JSON</span>{' '}
              <span className='text-neutral-50'>files or <span className='underline decoration-2 decoration-wavy decoration-purple-500'>upload</span> them</span>
            </h1>
            <h3 className='w-full md:w-1/2 mx-auto text-center mt-3 text-lg text-neutral-400'>
              Savi is a simple and easy to use application. In addition to a
              favorites section and being able to download.
            </h3>
          </section>

          <section className='flex flex-col gap-y-3 mt-10 mx-auto w-full lg:w-[400px] xl:w-[550px] 2xl:w-[700px] perspective-normal'>
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
        </div>

        <Footer />
      </div>
    </main>
  )
}
