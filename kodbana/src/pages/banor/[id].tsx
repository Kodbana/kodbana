// pages/banor/[id].tsx
import { useRouter } from "next/router";
import banor from "@/data/banor";
import { useEffect, useState } from "react";

export default function BanaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [bana, setBana] = useState(null);

  useEffect(() => {
    if (id && banor[id as string]) {
      setBana(banor[id as string]);
    }
  }, [id]);

  if (!bana) return <div>Laddar bana...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bana {id}</h1>
      <p className="mb-2">{bana.fraga}</p>

      {/* Här bygger vi upp typ-specifik input */}
      {bana.typ === "text" && <input type="text" className="border p-2 w-full" />}
      {bana.typ === "multiple_choice" &&
        bana.alternativ?.map((alt: string, i: number) => (
          <button key={i} className="block w-full p-2 border my-1 rounded hover:bg-gray-100">
            {alt}
          </button>
        ))}

      {/* TODO: Lägg till svarskontroll, XP-belöning, navigering */}
    </div>
  );
}
