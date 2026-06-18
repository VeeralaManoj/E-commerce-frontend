import { adminService } from "@/lib/api/services";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminUsersPage() {
  const users = await adminService.users();
  return <div><h1 className="mb-6 text-3xl font-bold">Users</h1><AdminTable headings={["Name", "Email", "Role", "Created"]} rows={users.map((u) => [u.name, u.email, u.role, u.createdAt || ""])} /></div>;
}
