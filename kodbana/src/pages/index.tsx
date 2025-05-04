import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RobotMessage from "@/components/ui/RobotMessage";

export default function Home() {
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setUserLoaded(true);
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, []);

  if (!userLoaded) {
    return (
      <Section>
        <p className="text-center text-gray-600">🔄 Laddar startsida...</p>
      </Section>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <Section>
    <Title>
  <span className="text-red-500">🔥 Tailwind fungerar!</span>
</Title>



      <RobotMessage text="Vad vill du göra idag? Du bestämmer!" />

      <Card>
        <div className="space-y-4">
          <Button onClick={() => router.push("/utmaning/1")}>
            🎮 Börja utmaning
          </Button>
          <Button onClick={() => router.push("/min-statistik")}>
            📊 Min statistik
          </Button>
          <Button onClick={() => router.push("/lektioner/intro")}>
            📘 Kodskola
          </Button>
          <Button onClick={() => router.push("/karta")}>
            🗺️ Utforska kartan
          </Button>
        </div>
      </Card>

      <p className="text-center text-sm text-gray-500 mt-6">
        🌟 Nivå upp, lås upp nya världar och bli kodhjälte!
      </p>
    </Section>
  );
}
