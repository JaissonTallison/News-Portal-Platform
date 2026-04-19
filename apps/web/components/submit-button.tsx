"use client";

type Props = {
  loading: boolean;
  text: string;
  loadingText?: string;
};

export default function SubmitButton({
  loading,
  text,
  loadingText = "Carregando...",
}: Props) {
  return (
    <button
      disabled={loading}
      className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
    >
      {loading ? loadingText : text}
    </button>
  );
}