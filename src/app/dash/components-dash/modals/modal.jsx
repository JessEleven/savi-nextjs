import ModalBtn from './modal-btn'
import Profile from '../user-settings/profile'
import Sessions from '../user-settings/sessions'
import DeleteAccount from '../user-settings/delete-account'
import SignOut from '@/components/ui/sign-out'

export default function Modal () {
  return (
    <ModalBtn>
      <Profile />
      <Sessions />
      <DeleteAccount />
      <div className='w-full my-2.5 border border-neutral-600' />
      <SignOut both />
    </ModalBtn>
  )
}
