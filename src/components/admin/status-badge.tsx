import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/domain";

const styles: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Preparing: "bg-sky-100 text-sky-700",
  Delivered: "bg-green-100 text-green-700",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]", styles[status])}>{status}</span>;
}
