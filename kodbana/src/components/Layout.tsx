import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
