import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

// UI-komponenter
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import Card from "@/components/ui/Card";
import XPBar from "@/components/ui/XPBar";
import Button from "@/components/ui/Button";
import RobotMessage from "@/components/ui/RobotMessage";

export default function MinStatistik() {
  const [xp, setXp] = useState(0);
  const [senasteNivå, setSenasteNivå] = useState(1);
  const [laddar, setLaddar] = useState(true);
  const [ingenAnvändare, setIngenAnvändare] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hämtaData = async () => {
      const user = auth.currentUser;

      if (!user) {
        setIngenAnvändare(true);
        setLaddar(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        setXp(data.xp || 0);
        setSenasteNivå(data.nivå || 1);
      }

      setLaddar(false);
    };

    hämtaData();
  }, []);

  if (laddar) return <Section><p>⏳ Laddar statistik...</p></Section>;

  if (ingenAnvändare) {
    return (
      <Section>
        <Title>🔒 Inte inloggad</Title>
        <p className="mb-4">Logga in för att se din statistik.</p>
        <Button onClick={() => router.push("/login")}>Gå till inloggning</Button>
      </Section>
    );
  }

  const nivåTillÅlder = (nivå: number): string => {
    if (nivå < 4) return "6 år";
    if (nivå < 7) return "8 år";
    if (nivå < 10) return "9 år";
    if (nivå < 15) return "10 år";
    if (nivå < 25) return "11 år";
    if (nivå < 40) return "12 år";
    if (nivå < 60) return "13 år";
    return "14+ år";
  };

  const diplom = [3, 10, 25, 50, 100].filter((nivå) => senasteNivå >= nivå);

  return (
    <Section>
      <Title>📊 Min statistik</Title>

      <Card>
        <p className="text-sm text-gray-500 mb-1">Nivå: {senasteNivå}</p>
        <XPBar xp={xp} />
        <p className="mt-2 font-semibold">XP: {xp}</p>
        <p className="text-sm text-gray-600">
          Du klarar kod för <strong>{nivåTillÅlder(senasteNivå)}</strong>!
        </p>
      </Card>

      {diplom.length > 0 && (
        <Card>
          <h2 className="font-semibold mb-2">🏅 Mina diplom</h2>
          {diplom.map((nivå) => (
            <div key={nivå} className="bg-yellow-100 border-l-4 border-yellow-400 p-3 mb-2 rounded">
              🎉 Klarade nivå {nivå} – Kodare i världsklass!
            </div>
          ))}
        </Card>
      )}

      <RobotMessage text={`Bra jobbat! Du har tagit dig till nivå ${senasteNivå} med ${xp} XP.`} />

      <Button
        onClick={() => {
          signOut(auth);
          router.push("/login");
        }}
        className="mt-6 bg-red-500 hover:bg-red-600"
      >
        Logga ut
      </Button>
    </Section>
  );
}
