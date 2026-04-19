"use client";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

export default function ToastContainer({
  toasts,
}: {
  toasts: Toast[];
}) {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}