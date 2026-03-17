"use client";

import { useState } from "react";
import { AdminTable } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatCurrency, formatOrderDate } from "@/lib/format";
import { orderStatuses, type Order, type OrderStatus } from "@/types/domain";

export function AdminOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);

  async function updateStatus(orderId: string, status: OrderStatus) {
    const response = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    setOrders((current) => current.map((order) => (order.id === orderId ? result.order : order)));
  }

  return (
    <AdminTable headers={["Customer", "Items", "Total", "Status", "Created", "Update"]}>
      {orders.map((order) => (
        <tr key={order.id}>
          <td className="px-5 py-4">
            <p className="font-semibold text-slate-900">{order.customer_name}</p>
            <p className="text-sm text-slate-500">{order.phone}</p>
            <p className="text-sm text-slate-500">{order.address}</p>
          </td>
          <td className="px-5 py-4 text-sm text-slate-700">
            {order.items.map((item) => `${item.product_name} (${item.size}) x${item.quantity}`).join(", ")}
          </td>
          <td className="px-5 py-4 text-sm font-semibold text-slate-900">{formatCurrency(order.total)}</td>
          <td className="px-5 py-4">
            <StatusBadge status={order.status} />
          </td>
          <td className="px-5 py-4 text-sm text-slate-600">{formatOrderDate(order.created_at)}</td>
          <td className="px-5 py-4">
            <select
              value={order.status}
              onChange={(event) => updateStatus(order.id, event.target.value as OrderStatus)}
              className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {orderStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
