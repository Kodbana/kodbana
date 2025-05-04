import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import withAuth from '@/components/withAuth'

function Dashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login')
      } else {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserData(docSnap.data())
        }
      }
    })
    return () => unsubscribe()
  }, [])

  if (!userData) {
    return <p className="p-6 text-center">Laddar din dashboard...</p>
  }

  // 🔢 Beräkna nivå utifrån XP
  const xp = userData.xp ?? 0
  const nivå = Math.floor(xp / 10) + 1

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kodbanaBlue text-kodbanaDark">
      <h1 className="text-4xl font-display mb-4">Hej, {userData.namn} 👋</h1>
      <p className="text-xl mb-2">Du är {userData.ålder} år gammal.</p>
      <p className="text-lg mb-2">Roll: {userData.roll}</p>
      <p className="text-lg mb-4">🔥 XP: {xp} | 📈 Nivå: {nivå}</p>

      <button
        onClick={() => auth.signOut().then(() => router.push('/'))}
        className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition"
      >
        Logga ut
      </button>
    </div>
  )
}

export default withAuth(Dashboard)
