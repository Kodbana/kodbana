import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'

export default function Banöversikt() {
  const [xp, setXp] = useState<number | null>(null)
  const router = useRouter()

  const banor = [
    { id: 1, titel: 'Färgmatchning', xpKrav: 0, länk: '/banor/bana1' },
    { id: 2, titel: 'Loop till 5', xpKrav: 10, länk: '/banor/bana2' },
    { id: 3, titel: 'Sortera färger', xpKrav: 20, länk: '/banor/bana3' }
  ]

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login')
      } else {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setXp(data.xp ?? 0)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  if (xp === null) return <p className="p-6 text-center">Laddar dina banor...</p>

  return (
    <div className="min-h-screen bg-white text-kodbanaDark py-12 px-6">
      <h1 className="text-4xl font-display mb-8 text-center">Välj bana</h1>
      <p className="text-center mb-6">🔥 Din XP: {xp}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {banor.map((bana) => {
          const låst = xp < bana.xpKrav
          return (
            <div
              key={bana.id}
              className={`p-6 rounded-2xl shadow-md text-center ${
                låst ? 'bg-gray-200 opacity-50' : 'bg-kodbanaYellow'
              }`}
            >
              <h2 className="text-xl font-bold mb-2">Bana {bana.id}</h2>
              <p className="mb-4">{bana.titel}</p>
              {!låst ? (
                <Link href={bana.länk}>
                  <button className="bg-kodbanaGreen text-white px-4 py-2 rounded hover:scale-105 transition">
                    Starta
                  </button>
                </Link>
              ) : (
                <p className="text-sm text-gray-600">🔒 Kräver {bana.xpKrav} XP</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
