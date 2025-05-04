type Props = {
  text: string;
};

export default function RobotMessage({ text }: Props) {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-300 text-blue-900 p-4 rounded-xl mb-4 shadow-sm">
      🤖 <span className="ml-2">{text}</span>
    </div>
  );
}
