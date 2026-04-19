"use client";

type Props = {
  name: string;
  placeholder?: string;
};

export default function FormTextarea({
  name,
  placeholder,
}: Props) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      className="border px-3 py-2 rounded w-full h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}