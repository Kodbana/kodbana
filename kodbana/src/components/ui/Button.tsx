type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({ children, onClick, className = "" }: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-2xl shadow transition-all ${className}`}
    >
      {children}
    </button>
  );
}
