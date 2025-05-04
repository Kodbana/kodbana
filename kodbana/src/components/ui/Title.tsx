type Props = {
  children: React.ReactNode;
};

export default function Title({ children }: Props) {
  return <h1 className="text-2xl font-bold mb-4 text-center">{children}</h1>;
}
