"use client";

import { productCategories, type ProductCategory } from "@/types/domain";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  activeCategory,
  onChange,
}: {
  activeCategory: ProductCategory;
  onChange: (category: ProductCategory) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {productCategories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={cn(
            "whitespace-nowrap rounded-full border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-400",
            activeCategory === category
              ? "border-orange-500 bg-orange-500 text-white"
              : "border-orange-200 bg-white text-slate-700 hover:border-orange-400 hover:text-orange-600",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
