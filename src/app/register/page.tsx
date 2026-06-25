import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthOnlyRoute } from "@/components/auth/AuthOnlyRoute";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="container-page py-12">Loading...</div>}>
      <AuthOnlyRoute>
        <div className="container-page py-12">
          <h1 className="mb-6 text-center text-3xl font-bold">Create account</h1>
          <AuthForm mode="register" />
        </div>
      </AuthOnlyRoute>
    </Suspense>
  );
}
