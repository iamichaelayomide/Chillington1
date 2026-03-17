import { cn } from "@/lib/utils";

export function AdminTable({
  headers,
  children,
  className,
}: {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[2rem] border border-orange-200 bg-white shadow-soft", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-orange-50">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-5 py-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
