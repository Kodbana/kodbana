type Props = {
  xp: number;
  maxXp?: number;
};

export default function XPBar({ xp, maxXp = 100 }: Props) {
  const procent = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-emerald-400 h-4 transition-all"
        style={{ width: `${procent}%` }}
      />
    </div>
  );
}
