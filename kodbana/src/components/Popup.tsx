type Props = {
  nivå: string;
  onClose: () => void;
};

export default function Popup({ nivå, onClose }: Props) {
  const text = nivå === "3"
    ? "🎉 Du har klarat kod för 7-åringar – och du är snabbare än blixten!"
    : nivå === "10"
    ? "🚀 WOW! Du klarade kod för 10-åringar – du är ett kodgeni!"
    : "";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">🎊 Grattis!</h2>
        <p className="mb-6">{text}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fortsätt
        </button>
      </div>
    </div>
  );
}
