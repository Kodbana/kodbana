import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true)
        } else {
          router.push('/login')
        }
        setLoading(false)
      })

      return () => unsubscribe()
    }, [])

    if (loading) {
      return <div className="p-6 text-center">Kontrollerar inloggning...</div>
    }

    return authenticated ? <Component {...props} /> : null
  }
}
