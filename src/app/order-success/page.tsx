import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function OrderSuccessPage() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-10 text-center">
      <div><CheckCircle2 className="mx-auto text-brand-600" size={56} /><h1 className="mt-4 text-3xl font-bold">Order placed</h1><p className="mt-2 text-black/60">Your order was created successfully.</p><Link href="/profile" className="mt-6 inline-block"><Button>View orders</Button></Link></div>
    </div>
  );
}
