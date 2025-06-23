import { AlertTriangleIcon } from '../../assets/dash-icons'

export default function ErrorFetching () {
  return (
    <div className='mb-3 flex justify-center'>
      <div className='flex items-center gap-x-1 px-4 py-[7px] rounded-[5px] border border-neutral-600'>
        <AlertTriangleIcon className='text-yellow-400' />
        <h3 className='text-sm'>An unexpected error occurred</h3>
      </div>
    </div>
  )
}
