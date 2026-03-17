import { z } from "zod";
import { orderStatuses, productCategories, productSizes } from "@/types/domain";

export const variantSchema = z.object({
  size: z.enum(productSizes),
  price: z.coerce.number().int().positive(),
});

export const productSchema = z.object({
  name: z.string().trim().min(2).max(80),
  category: z.enum(productCategories),
  description: z.string().trim().min(10).max(180),
  image_url: z.string().trim().url().or(z.string().trim().startsWith("/")),
  variants: z.array(variantSchema).min(1),
  is_available: z.boolean().default(true),
});

export const extraSchema = z.object({
  name: z.string().trim().min(2).max(60),
  price: z.coerce.number().int().positive(),
  is_active: z.boolean().default(true),
});

export const promotionSchema = z.object({
  title: z.string().trim().min(3).max(80),
  description: z.string().trim().min(10).max(180),
  is_active: z.boolean().default(true),
});

export const orderItemSchema = z.object({
  product_id: z.string().min(1),
  product_name: z.string().trim().min(2),
  size: z.enum(productSizes),
  quantity: z.coerce.number().int().min(1).max(20),
  extras: z.array(z.string().trim().min(1)),
  price: z.coerce.number().int().nonnegative(),
});

export const checkoutSchema = z.object({
  customer_name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(10)
    .max(15)
    .regex(/^[0-9+\s-]+$/, "Use a valid Nigerian phone number"),
  address: z.string().trim().min(8).max(180),
  items: z.array(orderItemSchema).min(1),
  total: z.coerce.number().int().positive(),
});

export const orderStatusSchema = z.object({
  status: z.enum(orderStatuses),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
export type CheckoutInputValues = z.input<typeof checkoutSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
export type ExtraFormValues = z.infer<typeof extraSchema>;
export type PromotionFormValues = z.infer<typeof promotionSchema>;
