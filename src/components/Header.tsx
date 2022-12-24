import { Skeleton } from '@mui/material'
import { useSession } from 'next-auth/react'
import ToggleTheme from './ToggleTheme'
import UserMenu from './UserMenu'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <div className="absolute top-5 right-5 flex items-center justify-center gap-2">
      <ToggleTheme />
      {status === 'loading' ? (
        <Skeleton variant="circular" className="w-14 h-14" />
      ) : session && session.user ? (
        <UserMenu
          avatar={session.user.image ?? ''}
          username={session.user.name ?? ''}
        />
      ) : null}
    </div>
  )
}
