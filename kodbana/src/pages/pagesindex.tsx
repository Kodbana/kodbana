import Head from "next/head";
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kodbana – Lär barn programmera</title>
        <meta
          name="description"
          content="Kodbana är en rolig och pedagogisk plattform där barn lär sig programmera genom utmaningar, nivåer och belöningar. Börja koda idag!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Section>
        <Title>👾 Välkommen till Kodbana</Title>

        <p className="text-lg mt-4 mb-6 text-center text-gray-700">
          Kodbana är ett äventyr där barn lär sig koda på ett roligt, interaktivt och belönande sätt.
        </p>

        <div className="text-center space-y-4">
          <Button onClick={() => alert("Inloggning kommer snart!")}>
            🚀 Logga in
          </Button>
          <Button onClick={() => alert("Skapa konto kommer snart!")}>
            🧒 Skapa barnkonto
          </Button>
        </div>

        <p className="text-sm text-center mt-10 text-gray-400">
          © {new Date().getFullYear()} Kodbana. Skapat med ❤️ i Sverige.
        </p>
      </Section>
    </>
  );
}
