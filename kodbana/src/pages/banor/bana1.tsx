import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, updateDoc, increment } from 'firebase/firestore'

export default function Bana1() {
  const [color, setColor] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [uid, setUid] = useState('')
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid)
      else router.push('/login')
    })
    return () => unsubscribe()
  }, [])

  const checkAnswer = async () => {
    const correct = color.toLowerCase().trim() === 'yellow' || color.toLowerCase().trim() === 'gul'
    setIsCorrect(correct)

    if (correct && uid) {
      // ✅ Ge +10 XP till användaren
      await updateDoc(doc(db, 'users', uid), {
        xp: increment(10)
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kodbanaBlue text-kodbanaDark px-4">
      <h1 className="text-3xl font-display mb-4">Bana 1: Färgmatchning 🎨</h1>

      <div
        className="w-40 h-40 rounded-full mb-4 transition"
        style={{ backgroundColor: isCorrect ? 'yellow' : '#eee' }}
      ></div>

      <p className="mb-2 text-lg">Vad ska vi skriva för att göra cirkeln gul?</p>
      <input
        type="text"
        className="p-2 border rounded w-60 text-center mb-4"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Ex: gul"
      />
      <button
        onClick={checkAnswer}
        className="bg-kodbanaGreen text-white font-bold px-4 py-2 rounded hover:scale-105 transition"
      >
        Testa
      </button>

      {isCorrect && (
        <p className="mt-6 text-xl font-bold text-green-700">
          Rätt! Du fick <span className="font-black">10 XP</span> 🎉<br />
          Gå vidare till <a href="/banor" className="underline">banöversikten</a>
        </p>
      )}
    </div>
  )
}
