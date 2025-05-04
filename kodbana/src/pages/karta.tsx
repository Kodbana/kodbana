import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import Card from "@/components/ui/Card";
import { useRouter } from "next/router";

type Bana = {
  id: number;
  namn: string;
  låst: boolean;
};

const banor: Bana[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  namn: `Bana ${i + 1}`,
  låst: i > 4, // första 5 öppna, resten låsta som exempel
}));

export default function Karta() {
  const router = useRouter();

  return (
    <Section>
      <Title>🗺️ Din resa genom kodvärlden</Title>

      <div className="grid grid-cols-3 gap-4">
        {banor.map((bana) => (
          <Card
            key={bana.id}
            className={`text-center cursor-pointer transition ${
              bana.låst
                ? "opacity-40 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-lg"
            }`}
            onClick={() => {
              if (!bana.låst) router.push(`/utmaning/${bana.id}`);
            }}
          >
            <p className="text-xl">{bana.namn}</p>
            <p className="text-sm">
              {bana.låst ? "🔒 Låst" : "✅ Öppen"}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
