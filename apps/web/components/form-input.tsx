"use client";

type Props = {
  name: string;
  placeholder?: string;
  type?: string;
};

export default function FormInput({
  name,
  placeholder,
  type = "text",
}: Props) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}