type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-5 ${className}`}>
      {children}
    </div>
  );
}
