import { productService } from "@/lib/api/services";
import { formatCurrency } from "@/lib/utils";
import { AdminTable } from "@/components/admin/AdminTable";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminProductsPage() {
  const { data } = await productService.list();
  return <div><h1 className="mb-6 text-3xl font-bold">Products</h1><ProductForm /><div className="mt-6"><AdminTable headings={["Name", "Category", "Price", "Stock", "Status"]} rows={data.map((p) => [p.name, p.category.name, formatCurrency(p.price), p.stock, p.stock > 0 ? "Active" : "Out of stock"])} /></div></div>;
}
