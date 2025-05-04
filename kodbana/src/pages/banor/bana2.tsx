import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, updateDoc, increment } from 'firebase/firestore'

export default function Bana2() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)
  const [uid, setUid] = useState('')
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid)
      else router.push('/login')
    })
    return () => unsub()
  }, [])

  const runCode = async () => {
    const trimmedCode = code.trim()

    if (
      trimmedCode.includes('for') &&
      trimmedCode.includes('let i = 1') &&
      trimmedCode.includes('i <= 5') &&
      trimmedCode.includes('i++')
    ) {
      const outputArray: string[] = []
      for (let i = 1; i <= 5; i++) {
        outputArray.push(i.toString())
      }
      setOutput(outputArray)
      setCompleted(true)

      if (uid) {
        await updateDoc(doc(db, 'users', uid), {
          xp: increment(10)
        })
      }
    } else {
      setOutput(['❌ Något är fel – kontrollera din for-loop!'])
    }
  }

  return (
    <div className="min-h-screen bg-kodbanaBlue text-kodbanaDark flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-display mb-4">Bana 2: Loop till 5 🔁</h1>
      <p className="mb-2 text-center max-w-lg">
        Skriv en <strong>for-loop</strong> som skriver ut siffrorna 1 till 5.
      </p>

      <textarea
        className="w-full max-w-md h-32 p-2 rounded border mb-4"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Skriv din for-loop här..."
      ></textarea>

      <button
        onClick={runCode}
        className="bg-kodbanaGreen text-white font-bold px-6 py-2 rounded hover:scale-105 transition"
      >
        Kör
      </button>

      <div className="mt-6">
        {output.map((row, i) => (
          <p key={i} className="text-lg font-mono">{row}</p>
        ))}
      </div>

      {completed && (
        <p className="mt-6 text-green-700 text-xl font-bold text-center">
          ✅ Bra jobbat! Du klarade banan och fick 10 XP!<br />
          <a href="/banor" className="underline">Tillbaka till banöversikten</a>
        </p>
      )}
    </div>
  )
}
