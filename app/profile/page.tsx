import { redirect } from 'next/navigation'
import { getUser } from '@/app/auth/actions'
import ProfileView from './ProfileView'

export default async function ProfilePage() {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ProfileView user={user} />
    </div>
  )
}
