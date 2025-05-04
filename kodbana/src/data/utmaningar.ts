const utmaningar: Record<string, {
  fraga: string;
  typ: "text" | "multiple_choice";
  alternativ?: string[];
  korrektSvar: string;
  xp: number;
  alder: [number, number];
}> = {
  "1": {
    fraga: "Vad är 1 + 1?",
    typ: "multiple_choice",
    alternativ: ["1", "2", "3"],
    korrektSvar: "2",
    xp: 5,
    alder: [5, 6],
  },
  "2": {
    fraga: "Vilket ord skapar en variabel i JavaScript?",
    typ: "multiple_choice",
    alternativ: ["var", "print", "loop"],
    korrektSvar: "var",
    xp: 10,
    alder: [6, 7],
  },
  "3": {
    fraga: "Skriv en variabel som innehåller talet 5.",
    typ: "text",
    korrektSvar: "let x = 5;",
    xp: 15,
    alder: [6, 8],
  },
  "4": {
    fraga: "Vad är resultatet av 3 * 2?",
    typ: "multiple_choice",
    alternativ: ["5", "6", "9"],
    korrektSvar: "6",
    xp: 10,
    alder: [7, 9],
  },
  "5": {
    fraga: "Skriv en if-sats som kollar om `poäng` är större än 10.",
    typ: "text",
    korrektSvar: "if (poäng > 10)",
    xp: 20,
    alder: [8, 10],
  },
  "6": {
    fraga: "Vilken kod skriver ut 'Hej' i JavaScript?",
    typ: "multiple_choice",
    alternativ: ["echo 'Hej'", "console.log('Hej')", "say('Hej')"],
    korrektSvar: "console.log('Hej')",
    xp: 10,
    alder: [8, 10],
  },
  "7": {
    fraga: "Skriv en for-loop som räknar till 3.",
    typ: "text",
    korrektSvar: "for (let i = 1; i <= 3; i++) { console.log(i); }",
    xp: 25,
    alder: [9, 11],
  },
  "8": {
    fraga: "Vad kallas kod man återanvänder flera gånger?",
    typ: "multiple_choice",
    alternativ: ["loop", "funktion", "variabel"],
    korrektSvar: "funktion",
    xp: 15,
    alder: [9, 11],
  },
  "9": {
    fraga: "Skriv en funktion som heter hej och visar 'Hej!'.",
    typ: "text",
    korrektSvar: "function hej() { console.log('Hej!'); }",
    xp: 30,
    alder: [10, 12],
  },
  "10": {
    fraga: "Vad betyder `let` i JavaScript?",
    typ: "multiple_choice",
    alternativ: ["Startar en loop", "Skapar en variabel", "Avslutar kod"],
    korrektSvar: "Skapar en variabel",
    xp: 20,
    alder: [10, 13],
  }
};

export default utmaningar;
