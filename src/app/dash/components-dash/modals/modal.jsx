import SignOut from '@/components/ui/sign-out'
import DeleteAccount from '../user-settings/delete-account'
import Profile from '../user-settings/profile'
import ModalBtn from './modal-btn'
import Sessions from '../user-settings/sessions'

export default function Modal () {
  return (
    <ModalBtn>
      <div className='fixed inset-0 flex pt-[90px] -z-40 bg-neutral-800/80'>
        <div className='h-fit w-full md:w-[400px] lg:w-[450px] 2xl:w-[500px] mx-5 md:mx-auto py-5 pl-5 pr-2.5 rounded-lg border border-neutral-600 bg-neutral-800 truncate'>
          <div className='h-[370px] overflow-y-auto scrollbar-custom pr-2.5'>
            <Profile />
            <Sessions />
            <DeleteAccount />
            <div className='w-full my-2.5 border border-neutral-600' />
            <SignOut both />
          </div>
        </div>
      </div>
    </ModalBtn>
  )
}
