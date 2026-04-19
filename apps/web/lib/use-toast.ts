"use client";

import { useState } from "react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

let idCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string, type: Toast["type"]) {
    const id = idCounter++;

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  return {
    toasts,
    success: (msg: string) => addToast(msg, "success"),
    error: (msg: string) => addToast(msg, "error"),
  };
}