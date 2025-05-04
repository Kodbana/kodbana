import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [lösenord, setLösenord] = useState("");
  const [läge, setLäge] = useState<"login" | "register">("login");
  const [fel, setFel] = useState("");
  const router = useRouter();

  const hanteraAuth = async () => {
    try {
      if (läge === "login") {
        await signInWithEmailAndPassword(auth, email, lösenord);
      } else {
        await createUserWithEmailAndPassword(auth, email, lösenord);
      }
      router.push("/min-statistik");
    } catch (error: any) {
      setFel(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">{läge === "login" ? "Logga in" : "Skapa konto"}</h1>

      <input
        className="w-full p-2 border mb-3"
        placeholder="E-post"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border mb-3"
        placeholder="Lösenord"
        type="password"
        value={lösenord}
        onChange={(e) => setLösenord(e.target.value)}
      />

      {fel && <p className="text-red-600 text-sm mb-2">{fel}</p>}

      <button
        onClick={hanteraAuth}
        className="bg-blue-600 text-white w-full p-2 rounded mb-3"
      >
        {läge === "login" ? "Logga in" : "Skapa konto"}
      </button>

      <p className="text-sm text-center">
        {läge === "login" ? "Inget konto än?" : "Har du redan ett konto?"}{" "}
        <button className="underline text-blue-600" onClick={() => setLäge(läge === "login" ? "register" : "login")}>
          {läge === "login" ? "Skapa konto" : "Logga in"}
        </button>
      </p>
    </div>
  );
}
