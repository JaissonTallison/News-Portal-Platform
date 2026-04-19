export default function LoadingPosts() {
  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />

      {/* FILTRO */}
      <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />

      {/* LISTA */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded shadow"
          >
            <div className="flex justify-between">
              <div className="h-4 w-40 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="mt-3 flex gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}