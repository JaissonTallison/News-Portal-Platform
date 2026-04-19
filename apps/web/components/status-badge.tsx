type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    DRAFT: "bg-gray-200 text-gray-700",
    REVIEW: "bg-yellow-100 text-yellow-700",
    PUBLISHED: "bg-green-100 text-green-700",
    ARCHIVED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}