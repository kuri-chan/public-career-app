import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">
            適
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-800 sm:text-base">
            公務員からのキャリアシフト診断
          </span>
        </Link>
        <p className="hidden text-xs text-slate-500 sm:block">約2分・全5問</p>
      </div>
    </header>
  );
}
