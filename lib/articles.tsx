import Link from "next/link";

export type Article = {
  slug: string;
  title: string; // SEOタイトル（ページ<title>にそのまま使う）
  description: string; // meta description
  cluster: string; // 内部管理用（検索意図クラスタ名）
  updated: string; // "YYYY-MM-DD"
  Body: () => React.ReactElement;
};

function DiagnosisCta({ label }: { label: string }) {
  return (
    <div className="mt-8 rounded-2xl border-2 border-brand-500 bg-white p-6 text-center shadow-card">
      <p className="text-sm font-bold text-slate-900">{label}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        全5問・約1分・登録不要。あなたの経験がどう翻訳できるか、無料で確認できます。
      </p>
      <Link
        href="/diagnosis"
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-800 sm:w-auto"
      >
        無料で診断をはじめる
      </Link>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 text-lg font-bold text-slate-900 sm:text-xl">
      {children}
    </h2>
  );
}

function Example({ from, to, note }: { from: string; to: string; note: string }) {
  return (
    <li className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-sm font-semibold text-slate-700">{from}</span>
        <span className="hidden text-brand-400 sm:inline" aria-hidden="true">
          →
        </span>
        <span className="inline-flex w-fit items-center rounded-md bg-brand-100 px-2 py-0.5 text-sm font-bold text-brand-800">
          {to}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{note}</p>
    </li>
  );
}

export const articles: Article[] = [
  {
    slug: "koumuin-shokureki-kakikata",
    title:
      "公務員の経験を職務経歴書でどう書くか｜「調整」「起案」を民間語に翻訳する書き方",
    description:
      "「庁内調整」「起案」「予算執行」…公務員特有の言葉をそのまま書いても、民間の採用担当には伝わりにくいことがあります。職務経歴書で使う「翻訳」の考え方と書き換え例を紹介します。",
    cluster: "翻訳・棚卸し系",
    updated: "2026-09-03",
    Body: function ArticleBody() {
      return (
        <>
          <P>
            公務員から民間企業へ応募するとき、最初につまずきやすいのが職務経歴書です。日々の業務をそのまま書き出しても、「結局どんな力がある人なのか」が採用担当者に伝わりにくいことがあります。
          </P>
          <P>
            これは、経験の中身が乏しいからではありません。「起案」「決裁」「庁内調整」「予算執行」といった行政特有の言葉が、民間の採用担当者にとって評価軸の見えない言葉になりがちだからです。必要なのは経験を盛ることではなく、<strong className="font-semibold text-slate-800">民間で通じる言葉に翻訳すること</strong>です。
          </P>

          <H2>翻訳の基本の型</H2>
          <P>
            「①行政での行動」を、「②その行動が本質的にはどんな力を使っていたか」に分解し、「③民間で使われる言葉」に置き換える、という3段階で考えると翻訳しやすくなります。断定はできませんが、以下のような対応関係が目安になります。
          </P>
          <ul className="mt-2 list-none space-y-1 pl-0">
            <Example
              from="庁内の複数部署との調整"
              to="ステークホルダー調整"
              note="利害の異なる相手を巻き込んで前に進めてきた経験は、部門横断プロジェクトの推進力として翻訳できます。"
            />
            <Example
              from="起案・決裁・上司や議会への説明"
              to="資料作成・意思決定支援"
              note="背景・論点・選択肢・結論を筋道立てて示す力は、企画提案や意思決定資料の素地になり得ます。"
            />
            <Example
              from="制度改正・条例対応の現場落とし込み"
              to="業務改善・プロセス設計"
              note="ルール変更を現場のオペレーションに落とし込んできた経験は、業務フロー設計に近い動き方です。"
            />
          </ul>

          <H2>実務での書き換え方</H2>
          <P>
            職務経歴書では「担当していた業務」だけでなく、「その業務でどんな課題があり、どう動き、どんな成果につながったか」をセットで書くと伝わりやすくなります。たとえば「条例改正への対応」であれば、「制度変更の内容を関係部署・関係者に説明し、合意形成を図りながら運用開始までを担った」のように、行った行動を具体的に書くことで、担当者以外にも判断材料が伝わります。
          </P>
          <P>
            数値が出せる場合は、関わった人数・部署数・予算規模・対応件数などを添えると、経験の大きさが伝わりやすくなります。あくまで「活かせる可能性のある素地」としての翻訳であり、断定的な言い換えは避けるのが誠実な書き方です。
          </P>

          <DiagnosisCta label="自分の経験は、どう翻訳できる？" />
        </>
      );
    },
  },
  {
    slug: "koumuin-shourai-fuan-seiri",
    title: "「このまま公務員でいいのか」と思ったときに、最初に整理したい3つのこと",
    description:
      "公務員としての将来に漠然とした不安がある方へ。転職ありきで考える前に、不安の正体・今の経験の見え方・選択肢の幅を整理する方法を紹介します。",
    cluster: "不安・共感系",
    updated: "2026-09-03",
    Body: function ArticleBody() {
      return (
        <>
          <P>
            「このまま公務員を続けていいのだろうか」という不安は、多くの場合、将来が見えないこと自体よりも、<strong className="font-semibold text-slate-800">判断材料が手元にないこと</strong>から来ていることがあります。転職するかどうかを決める前に、まず情報を整理してみると、不安の輪郭がはっきりすることがあります。
          </P>

          <H2>1. 不安の正体を分けてみる</H2>
          <P>
            「給与が上がりにくいこと」「裁量の少なさ」「異動で積み上げにくいこと」「将来性への漠然とした不安」は、それぞれ原因も対処法も異なります。ひとまとめに「公務員はもう無理かもしれない」と考える前に、何が一番引っかかっているのかを言葉にしてみると、次に何を調べればよいかが見えてきます。
          </P>

          <H2>2. 今の経験が民間でどう見えるかを知る</H2>
          <P>
            公務員としての経験は、民間の職種名や評価軸にそのまま対応しないことが多く、「自分の経験は民間で通用するのか」が分かりにくいことが不安を大きくしている場合があります。窓口対応・予算管理・企画調整といった経験が、民間ではどんな言葉・どんな職種に翻訳できるのかを知ることは、判断材料を増やす一歩になります。
          </P>

          <H2>3. 「今すぐ転職する」以外の選択肢も並べてみる</H2>
          <P>
            選択肢は「転職する／しない」の二択ではありません。在職中に職務経歴を整理しながら情報収集だけ進める、必要なスキルを補ってから動く、現職を続けながら異動や資格取得でキャリアを広げる、といった選択肢も並べたうえで、情報が揃ってから決めても遅くはありません。
          </P>

          <DiagnosisCta label="まずは自分の経験を整理するところから" />
        </>
      );
    },
  },
  {
    slug: "koumuin-skill-tanaoroshi",
    title: "公務員のスキル棚卸し、まず何を書き出せばいいか",
    description:
      "職務経歴書を書く前に必要な「スキルの棚卸し」。公務員の仕事のうち何を書き出せば民間で使える形になるのか、具体的な切り口を紹介します。",
    cluster: "翻訳・棚卸し系",
    updated: "2026-09-05",
    Body: function ArticleBody() {
      return (
        <>
          <P>
            転職を考え始めたときに最初につまずくのが、「自分に何が書けるのか分からない」ということです。これは経験が乏しいからではなく、多くの場合、<strong className="font-semibold text-slate-800">棚卸しの型を知らないだけ</strong>です。日々の業務は当たり前すぎて、自分では「書くほどのことではない」と感じてしまいがちです。
          </P>

          <H2>3つの切り口で書き出す</H2>
          <P>
            いきなり文章にしようとせず、まずは箇条書きで材料を集めるところから始めると進めやすくなります。
          </P>
          <ul className="mt-2 list-none space-y-3 pl-0">
            <li className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-800">① 担当した「業務」そのもの</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                制度運用、窓口対応、予算執行、許認可審査など、配属先ごとに何を担当していたかを年表のように並べます。異動歴をそのまま書き出すだけでも材料になります。
              </p>
            </li>
            <li className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-800">② その中で発生した「調整・判断」の場面</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                利害の異なる相手との調整、前例がない中での判断、限られた予算での優先順位づけなど、「大変だった・工夫した」場面を3つほど思い出してみると、業務の中に埋もれていた判断力が見えてきます。
              </p>
            </li>
            <li className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-800">③ 数字で残っている「実績」</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                対応件数、削減できた時間、担当した予算規模、関わった部署・人数など、数字にできるものを併記します。数字がなければ「【例：◯件】」のように仮置きしておき、あとで正確な数値に差し替えれば十分です。
              </p>
            </li>
          </ul>

          <H2>棚卸しのあとにすること</H2>
          <P>
            棚卸しした材料は、そのままでは行政の言葉のままです。民間で通じる言葉に翻訳する作業が次のステップになりますが、これは自己流でやろうとすると時間がかかりがちな部分です。
          </P>

          <DiagnosisCta label="棚卸しした経験を、民間の言葉に翻訳してみる" />
        </>
      );
    },
  },
  {
    slug: "koumuin-tenshoku-mikeiken-it",
    title: "公務員から未経験でIT・Web業界に転職できるか",
    description:
      "プログラミング未経験の公務員がIT・Web業界を目指す場合、何から考えればいいか。開発職以外の選択肢や、現実的な進め方を紹介します。",
    cluster: "具体策層",
    updated: "2026-09-05",
    Body: function ArticleBody() {
      return (
        <>
          <P>
            「IT業界＝エンジニア」というイメージが、未経験からの転職を必要以上に難しく見せていることがあります。実際には、IT・Web業界には開発職以外にも多くの職種があり、公務員としての経験が入口になり得るポジションも存在します。
          </P>

          <H2>開発以外にも職種はある</H2>
          <P>
            たとえば、プロジェクトの進行を管理するPMOや業務企画、現場の課題を理解したうえでツール導入を進める業務改善・DX推進、顧客の課題を整理して伴走するカスタマーサクセス、正確な事務処理が求められるITサポートなど、職種によって求められる力はさまざまです。庁内調整・起案・窓口対応といった経験は、これらの職種の一部と重なる部分があります。
          </P>

          <H2>未経験でも評価されることがある理由</H2>
          <P>
            IT企業の多くは、技術力だけでなく「現場を理解して人を巻き込む力」を必要としています。公務員としての調整力や、正確に手順を遂行する力、窓口対応で培った対人対応力は、そうした場面で素地として活かせる可能性があります。誇張はできませんが、「IT未経験＝価値がない」わけではありません。
          </P>

          <H2>現実的な進め方</H2>
          <P>
            いきなり開発職を目指す必要はありません。まず自分の経験がどの職種と相性が良いかを把握し、次に実際にその経験で応募できる求人があるかを確認し、最後に不足しているスキルだけを後追いで補う、という順番で考えると無理がありません。
          </P>

          <DiagnosisCta label="自分の経験と相性の良い職種を確認する" />
        </>
      );
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
