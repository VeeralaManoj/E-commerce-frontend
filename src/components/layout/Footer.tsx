export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="container-page flex flex-col gap-3 py-8 text-sm text-black/60 sm:flex-row sm:items-center sm:justify-between">
        <p>Commerce frontend for a real backend API.</p>
        <p>NEXT_PUBLIC_API_URL=http://localhost:5000/api</p>
      </div>
    </footer>
  );
}
