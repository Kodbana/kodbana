import { motion } from "framer-motion";

type Props = {
  nummer: number;
  namn: string;
  ikon: string;
  låst: boolean;
  ärAktuell: boolean;
  highlight?: boolean;
  onClick: () => void;
};

export default function MapTile({
  nummer,
  namn,
  ikon,
  låst,
  ärAktuell,
  highlight = false,
  onClick,
}: Props) {
  return (
    <motion.div
      onClick={() => !låst && onClick()}
      className={`relative p-4 rounded-xl shadow text-center transition-all cursor-pointer select-none ${
        låst
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-green-100"
      } ${ärAktuell ? "ring-2 ring-indigo-400" : ""}`}
      animate={highlight ? { scale: [1, 1.1, 1] } : {}}
      transition={highlight ? { repeat: Infinity, duration: 1 } : {}}
    >
      {/* Roboten på aktuell nivå */}
      {ärAktuell && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl"
        >
          🤖
        </motion.div>
      )}

      <div className="text-3xl">{ikon}</div>
      <p className="font-semibold mt-1">Bana {nummer}</p>
      <p className="text-sm">{namn}</p>
      {låst && <p className="text-xs mt-1">🔒 Låst</p>}
      {ärAktuell && <p className="text-xs mt-1">👉 Du är här</p>}
      {highlight && !låst && (
        <p className="text-xs mt-1 text-green-600 font-bold animate-pulse">🆕 Ny bana!</p>
      )}
    </motion.div>
  );
}
