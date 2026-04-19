import Link from "next/link";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      {/* Ícone simples */}
      <div className="text-4xl mb-4">🗂️</div>

      <h2 className="text-lg font-semibold mb-1">
        {title}
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}