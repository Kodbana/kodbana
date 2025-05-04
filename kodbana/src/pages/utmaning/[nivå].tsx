import { useRouter } from "next/router";
import utmaningar from "@/data/utmaningar";
import { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function UtmaningPage() {
  const router = useRouter();
  const { nivå } = router.query;
  const [uppgift, setUppgift] = useState<any>(null);
  const [svar, setSvar] = useState("");
  const [resultat, setResultat] = useState<null | "rätt" | "fel">(null);
  const [visaPopup, setVisaPopup] = useState(false);

  useEffect(() => {
    if (nivå && utmaningar[nivå as string]) {
      setUppgift(utmaningar[nivå as string]);
    }
  }, [nivå]);

  const kontrolleraSvar = async () => {
    if (!uppgift) return;

    const ärRätt = svar.trim().toLowerCase() === uppgift.korrektSvar.trim().toLowerCase();
    setResultat(ärRätt ? "rätt" : "fel");

    if (ärRätt) {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          xp: (uppgift.xp || 10),
        });
      }

      if (nivå === "3" || nivå === "10") {
        setTimeout(() => setVisaPopup(true), 500);
      }
    }
  };

  const nästaNivå = () => {
    const nästa = parseInt(nivå as string) + 1;
    router.push(`/utmaning/${nästa}`);
  };

  if (!uppgift) return <div className="p-4">Laddar nivå...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">🧠 Nivå {nivå}</h1>
      <p className="text-gray-600 text-sm mb-2">Rekommenderad ålder: {uppgift.alder[0]}–{uppgift.alder[1]} år</p>
      <p className="mb-4">{uppgift.fraga}</p>

      {uppgift.typ === "multiple_choice" &&
        uppgift.alternativ.map((alt: string, i: number) => (
          <button
            key={i}
            className="block w-full border p-2 mb-2 rounded hover:bg-gray-100"
            onClick={() => setSvar(alt)}
          >
            {alt}
          </button>
        ))}

      {uppgift.typ === "text" && (
        <textarea
          className="w-full border p-2 mb-4"
          rows={3}
          placeholder="Skriv ditt svar här..."
          onChange={(e) => setSvar(e.target.value)}
        />
      )}

      <button onClick={kontrolleraSvar} className="bg-blue-600 text-white py-2 px-4 rounded">
        Kontrollera svar
      </button>

      {resultat && (
        <p className={`mt-4 text-lg font-semibold ${resultat === "rätt" ? "text-green-600" : "text-red-600"}`}>
          {resultat === "rätt" ? "Rätt svar! 🎉" : "Tyvärr, försök igen!"}
        </p>
      )}

      {resultat === "rätt" && (
        <button onClick={nästaNivå} className="mt-4 block underline text-blue-600">
          Gå till nästa nivå →
        </button>
      )}

      {visaPopup && <Popup nivå={nivå as string} onClose={() => setVisaPopup(false)} />}
    </div>
  );
}
