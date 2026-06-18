import { categoryService } from "@/lib/api/services";
import { AdminTable } from "@/components/admin/AdminTable";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function AdminCategoriesPage() {
  const categories = await categoryService.list();
  return <div><h1 className="mb-6 text-3xl font-bold">Categories</h1><CategoryForm /><div className="mt-6"><AdminTable headings={["Name", "Slug", "Description"]} rows={categories.map((c) => [c.name, c.slug, c.description || ""])} /></div></div>;
}
