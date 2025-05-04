import { useState } from 'react'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [role, setRole] = useState('barn')
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // 🔥 Spara extra info i Firestore inklusive XP
      await setDoc(doc(db, 'users', user.uid), {
        namn: name,
        ålder: age,
        roll: role,
        email: user.email,
        skapad: new Date(),
        xp: 0 // 🆕 Startar på 0 XP
      })

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kodbanaBlue text-kodbanaDark">
      <h1 className="text-3xl font-display mb-6">Skapa ett konto</h1>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-xl shadow-md w-80">
        <input
          type="text"
          placeholder="Namn"
          className="w-full mb-4 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ålder"
          className="w-full mb-4 p-2 border rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="barn">Jag är ett barn</option>
          <option value="förälder">Jag är en förälder</option>
        </select>
        <input
          type="email"
          placeholder="E-post"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        <button className="w-full bg-kodbanaGreen text-white font-bold py-2 rounded hover:scale-105 transition">
          Skapa konto
        </button>
      </form>
      <p className="mt-4 text-sm">
        Har du redan ett konto? <a href="/login" className="underline">Logga in här</a>
      </p>
    </div>
  )
}
