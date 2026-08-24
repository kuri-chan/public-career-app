import { affiliateLinks } from "@/lib/links";
import type { ActionCard } from "@/lib/types";

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 13L13 7" />
      <path d="M8 7h5v5" />
    </svg>
  );
}

type ActionCardsProps = {
  cards: ActionCard[];
};

export function ActionCards({ cards }: ActionCardsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900">おすすめアクション</h2>
      <div className="grid gap-4">
        {cards.map((card) => (
          <article
            key={card.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6"
          >
            <h3 className="text-base font-semibold text-slate-900">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {card.description}
            </p>
            <a
              href={affiliateLinks[card.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              {card.ctaLabel}
              <ExternalLinkIcon />
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              ※まずは無料体験・無料相談で話を聞いてみるのがおすすめです
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
