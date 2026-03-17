"use client";

import { LoaderCircle, MessageCircleMore } from "lucide-react";

export function WhatsAppButton({
  onClick,
  isSubmitting,
}: {
  onClick: () => void;
  isSubmitting: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      className="flex w-full items-center justify-center gap-3 rounded-full bg-green-500 px-5 py-4 text-base font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <MessageCircleMore className="h-5 w-5" />}
      Send order to customer care
    </button>
  );
}
