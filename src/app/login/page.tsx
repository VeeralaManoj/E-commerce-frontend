import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return <div className="container-page py-12"><h1 className="mb-6 text-center text-3xl font-bold">Sign in</h1><AuthForm mode="login" /><p className="mt-4 text-center text-sm"><Link className="text-brand-600" href="/forgot-password">Forgot password?</Link> · <Link className="text-brand-600" href="/register">Create account</Link></p></div>;
}
