import { useSession } from 'next-auth/react'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'
import Router from 'next/router'

export default function Page() {
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') Router.push('/home')
    else if (status === 'unauthenticated') Router.push('/login')
  }, [status])

  return <Spinner />
}
