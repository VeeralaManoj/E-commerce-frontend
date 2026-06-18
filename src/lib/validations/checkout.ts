import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2)
});
