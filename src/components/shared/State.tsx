import Link from "next/link";

export function EmptyState({ title, actionHref, actionLabel }: { title: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-black/20 bg-white p-8 text-center">
      <div>
        <p className="text-lg font-semibold">{title}</p>
        {actionHref && actionLabel && <Link href={actionHref} className="mt-4 inline-flex text-sm font-semibold text-brand-600">{actionLabel}</Link>}
      </div>
    </div>
  );
}

export function UnauthorizedState() {
  return <EmptyState title="You need permission to view this page." actionHref="/login" actionLabel="Sign in" />;
}
