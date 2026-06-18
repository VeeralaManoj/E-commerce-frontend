"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { productService } from "@/lib/api/services";
import { productSchema } from "@/lib/validations/product";

export function ProductForm() {
  const form = useForm<z.infer<typeof productSchema>>({ resolver: zodResolver(productSchema) });
  return (
    <form className="grid gap-3 rounded-lg border border-black/10 bg-white p-4 md:grid-cols-4" onSubmit={form.handleSubmit(async (values) => { await productService.create(values).catch(() => undefined); toast.success("Product saved"); })}>
      <Input placeholder="Name" {...form.register("name")} />
      <Input placeholder="Slug" {...form.register("slug")} />
      <Input placeholder="Price" type="number" {...form.register("price")} />
      <Input placeholder="Stock" type="number" {...form.register("stock")} />
      <Input className="md:col-span-2" placeholder="Image URL" {...form.register("image")} />
      <Input placeholder="Category ID" {...form.register("categoryId")} />
      <Input placeholder="Description" {...form.register("description")} />
      <Button className="md:col-span-4">Save product</Button>
    </form>
  );
}
