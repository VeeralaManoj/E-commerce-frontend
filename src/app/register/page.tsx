import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return <div className="container-page py-12"><h1 className="mb-6 text-center text-3xl font-bold">Create account</h1><AuthForm mode="register" /></div>;
}
