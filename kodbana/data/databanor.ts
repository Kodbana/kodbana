const banor: Record<string, {
  fraga: string;
  typ: "text" | "multiple_choice";
  alternativ?: string[];
  korrektSvar?: string;
  xp: number;
  alder: [number, number];
}> = {
  "1": {
    fraga: "Vad heter huvudstaden i Sverige?",
    typ: "multiple_choice",
    alternativ: ["Göteborg", "Malmö", "Stockholm"],
    korrektSvar: "Stockholm",
    xp: 10,
    alder: [7, 12],
  },
  "2": {
    fraga: "Skriv en for-loop som räknar till 5",
    typ: "text",
    korrektSvar: "for (let i = 1; i <= 5; i++) { console.log(i); }",
    xp: 20,
    alder: [10, 16],
  },
};

export default banor;
