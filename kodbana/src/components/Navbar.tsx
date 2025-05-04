import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [menyÖppen, setMenyÖppen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const loggaUt = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          🌱 Kodbana
        </Link>

        {/* Mobilmenyknapp */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setMenyÖppen(!menyÖppen)}
        >
          ☰
        </button>

        {/* Länkar för större skärmar */}
        <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
          <Link href="/" className="hover:underline">Hem</Link>
          <Link href="/min-statistik" className="hover:underline">Statistik</Link>
          <Link href="/karta" className="hover:underline">Karta</Link>
          <button onClick={loggaUt} className="hover:underline text-red-200">Logga ut</button>
        </div>
      </div>

      {/* Mobilmeny – visas när menyÖppen = true */}
      {menyÖppen && (
        <div className="mt-3 sm:hidden flex flex-col space-y-2 text-sm">
          <Link href="/" className="hover:underline" onClick={() => setMenyÖppen(false)}>Hem</Link>
          <Link href="/min-statistik" className="hover:underline" onClick={() => setMenyÖppen(false)}>Statistik</Link>
          <Link href="/karta" className="hover:underline" onClick={() => setMenyÖppen(false)}>Karta</Link>
          <button onClick={() => { setMenyÖppen(false); loggaUt(); }} className="hover:underline text-red-200">Logga ut</button>
        </div>
      )}
    </nav>
  );
}
