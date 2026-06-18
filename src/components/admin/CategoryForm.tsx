"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { categoryService } from "@/lib/api/services";
import { categorySchema } from "@/lib/validations/product";

export function CategoryForm() {
  const form = useForm<z.infer<typeof categorySchema>>({ resolver: zodResolver(categorySchema) });
  return <form className="grid gap-3 rounded-lg border border-black/10 bg-white p-4 md:grid-cols-4" onSubmit={form.handleSubmit(async (values) => { await categoryService.create(values).catch(() => undefined); toast.success("Category saved"); })}><Input placeholder="Name" {...form.register("name")} /><Input placeholder="Slug" {...form.register("slug")} /><Input placeholder="Description" {...form.register("description")} /><Button>Save category</Button></form>;
}
