import Image from "next/image";

export default function Logo({
  size = 32,
  showText = true,
}: {
  size?: number;
  showText?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/funil.jpeg"
        alt="Logo"
        width={size}
        height={size}
        className="rounded"
      />

      {showText && (
        <span className="font-bold text-lg">
          News Admin
        </span>
      )}
    </div>
  );
}