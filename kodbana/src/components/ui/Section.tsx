type Props = {
  children: React.ReactNode;
};

export default function Section({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-xl mx-auto">{children}</div>
    </div>
  );
}
