import Nav from '@/components/nav'
import { FocusIcon, HeartIcon, TrashIcon } from './dash/assets/dash-icons'
import Footer from '@/components/ui/footer'

const elements = [
  {
    name: 'Products',
    date: '2024 December 10 - 04:18:57 pm'
  },
  {
    name: 'Users',
    date: '2025 June 18 - 12:18:36 am'
  },
  {
    name: 'Server config',
    date: '2025 September 29 - 05:25:09 pm'
  }
]

export default function Home () {
  return (
    <main className='main-container relative min-h-screen'>
      <Nav />

      <section role='region' aria-label='Description of the application' className='mt-14'>
        <h1 className='relative text-3xl md:text-4xl text-center font-bold'>
          Create <span className='text-teal-600'>JSON</span>{' '}
          <span className='text-neutral-50'>files or upload them</span>
          <span className='text-rose-400'>...</span>
        </h1>
        <h3 className='w-full md:w-1/2 mx-auto text-center mt-3 text-lg text-neutral-400'>
          Savi is a simple and easy to use application. In addition to a
          favorites section and being able to download.
        </h3>
      </section>

      <section className='flex flex-col gap-y-3 mt-10 mx-auto w-full lg:w-[400px] xl:w-[550px] 2xl:w-[700px] perspective-normal'>
        {elements?.map((item) => (
          <article key={item.name} className='transform-3d rotate-x-[35deg] animate-rotate-border rounded-lg bg-conic/[from_var(--border-angle)] from-neutral-600 via-neutral-400 to-neutral-600 from-80% via-90% to-100% p-px'>
            <div className='flex items-center justify-between gap-x-5 px-5 py-2.5 rounded-lg bg-neutral-800'>
              <div className='flex flex-col space-y-1 truncate'>
                <div className='flex items-center gap-x-1'>
                  <FocusIcon className='text-cyan-600' />
                  <h3 className='font-medium'>{item.name}</h3>
                </div>
                <h3 className='truncate text-sm text-neutral-400'>{item.date}</h3>
              </div>

              <div className='flex items-center gap-x-2.5'>
                <div aria-label='Heart Icon' className='btn-border-icon'>
                  <HeartIcon />
                </div>
                <div aria-label='Trash Icon' className='btn-border-icon'>
                  <TrashIcon />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <Footer />
    </main>
  )
}
