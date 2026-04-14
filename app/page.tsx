"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/common/Header";
const reviewItems = [
  {
    id: 1,
    label: "빠른 전달",
    title: "결과가 빠르게 나와서 더 만족스러웠어요",
    summary:
      "본식스냅 결과물이 생각보다 훨씬 빨리 나와서 좋았고, 사진도 자연스럽고 예쁘게 잘 담겨 더 만족스러웠다는 후기.",
    image: "/images/reviews/review-01.jpg",
  },
  {
    id: 2,
    label: "사진 퀄리티",
    title: "원본도 너무 마음에 들고 사진이 정말 예뻐요",
    summary:
      "원본부터 만족도가 높았고, 전체적인 색감과 분위기가 기대 이상으로 잘 나와서 기분 좋았다는 후기.",
    image: "/images/reviews/review-02.jpg",
  },
  {
    id: 3,
    label: "진행 안정감",
    title: "당일 진행이 꼼꼼해서 더 믿음이 갔어요",
    summary:
      "예식 전부터 동선과 구도를 세심하게 확인해줘서 촬영 내내 안정감이 있었고 믿고 맡길 수 있었다는 후기.",
    image: "/images/reviews/review-03.jpg",
  },
  {
    id: 4,
    label: "소통 만족",
    title: "작가님이 친절하고 소통도 편했어요",
    summary:
      "촬영 전후 응대가 친절했고 필요한 부분을 편하게 이야기할 수 있어서 전체 경험이 더 좋았다는 후기.",
    image: "/images/reviews/review-04.jpg",
  },
];
type PortfolioItem = {
  id: string;
  hall: string;
  category: string;
  image: string;
  title: string;
  description: string;
};

type HallCard = {
  hall: string;
  category: string;
  coverImage: string;
  count: number;
  description: string;
};

const faqItems = [
  {
    question: "Q. 촬영 결과가 원하는 느낌으로 나올지 걱정돼요",
    answer:
      "A. 위브스냅은 배경보다 인물의 표정과 감정에 집중하고 있습니다. 웨딩홀 환경이나 조명에 영향을 최대한 적게 받는 촬영방식을 고수하고 있습니다. 어떠한 장소에서도 안정적인 결과로 보답합니다.",
  },

  {
    question: "Q. 웨딩홀마다 결과 차이가 많이 나지 않나요?",
    answer:
      "A. 맞습니다. 실제로 조명, 층고, 동선에 따라 결과 차이가 크게 발생합니다. 위브스냅은 다양한 웨딩홀 경험을 기반으로 각 공간에 맞는 촬영 방식으로 대응하고 있습니다..",
  },
  {
    question: "Q. 웨사진데이터는 안전하게 보관되나요?",
    answer:
      "A. 위브스냅은 데이터 관리를 매우 중요하게 생각합니다. 촬영원본은 외장하드, NAS, 클라우드 등 여러 장치에 나누어 보관하고 있으며, 몇 년이 지나도 다시 찾을 수 있도록 관리하고 있습니다.",
  },
  {
    question: "Q. 예약은 어떻게 진행되나요?",
    answer:
      "A. 카톡문의를 통해 예식일과 장소를 확인하고, 예약이 확정되면 전자서명을 통하여 스냅촬영 계약서를 전달드리고 있습니다.",
  },
  {
    question: "Q. 촬영 예약은 언제쯤 하는 게 좋을까요?",
    answer:
      "A. 있기 있는 날짜는 빠르게 마감되는 편이라 좋은날은 빠르게 예약을 진행하는게 좋습니다.",
  },
  {
    question: "Q. 결과물은 언제 받을 수 있나요?",
    answer:
      "A. 사진파일은 최대 7일이내 전달드리는 것으로 안내드리지만, 실질적으로 3일 이내에 사진파일을 전달드리고 있습니다.",
  },
  {
    question: "Q. 사진은 어떤방식으로 전달 해주시나요?",
    answer:
      "A. 사진은 구글 드라이브에 업로드 하여 링크를 공유드리고 있습니다.",
  },
  
];

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function buildHallCards(items: PortfolioItem[]): HallCard[] {
  const grouped = new Map<string, HallCard>();

  for (const item of items) {
    const hall = item.hall || "위브스냅";

    if (!grouped.has(hall)) {
      grouped.set(hall, {
        hall,
        category: item.category || "웨딩홀",
        coverImage: item.image,
        count: 0,
        description:
          item.description || `${hall}에서 촬영한 실제 본식 분위기를 확인해보세요.`,
      });
    }

    const current = grouped.get(hall)!;
    current.count += 1;

    if (!current.description && item.description) {
      current.description = item.description;
    }
  }

  return Array.from(grouped.values());
}

export default function HomePage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [activeReview, setActiveReview] = useState(reviewItems[0]);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        setLoadingPortfolio(true);

        const response = await fetch("/api/portfolio", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("메인 포트폴리오를 불러오지 못했어요.");
        }

        const data = await response.json();
        setPortfolioItems(data.items || []);
      } catch (error) {
        console.error(error);
        setPortfolioItems([]);
      } finally {
        setLoadingPortfolio(false);
      }
    }

    fetchPortfolio();
  }, []);

  const randomHallCards = useMemo(() => {
    const grouped = buildHallCards(portfolioItems);
    return shuffleArray(grouped).slice(0, 4);
  }, [portfolioItems]);

  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#1d1815]">
      <Header />

      <section
        id="top"
        className="relative overflow-hidden bg-[#1d1815] pt-28 sm:pt-32"
      >
        <div className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16 lg:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="order-2 relative z-10 lg:order-1">
              <div className="hero-fade-up">
                <div className="mb-8 flex items-center gap-4">
                  <div className="relative h-px flex-1 bg-white/20">
                    <span className="absolute -top-3 left-0 bg-[#1d1815] pr-4 text-[11px] uppercase tracking-[0.35em] text-white/65">
                      Premium Wedding Snapshot
                    </span>
                  </div>
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
                  가장 중요한 하루를
                  <br />
                  오래 남을 감정으로 기록합니다
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                  위브스냅은 본식스냅에 특화된 프리미엄 본식스냅 브랜드입니다.
                  단순히 예쁜 사진을 넘어, 신랑신부가 안심하고 맡길 수 있는
                  촬영 경험과 오래 남는 결과물을 함께 만듭니다.
                </p>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-start">
                  <a
                    href="https://open.kakao.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#1d1815] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3ede4] sm:w-auto sm:max-w-none"
                  >
                    카카오톡으로 문의하기
                  </a>
                  <a
                    href="#portfolio"
                    className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto sm:max-w-none"
                  >
                    포트폴리오 보기
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 relative z-10 lg:order-2">
              <div className="hero-visual relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <img
                  src="/images/hero.jpg"
                  alt="위브스냅 메인 이미지"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_25%)]" />
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#9b846d]">
              About Wevesnap
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              많은 선택지보다
              <br />
              더 신뢰할 수 있는 기준
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f554d]">
              위브스냅은 본식 당일의 감정과 분위기, 그리고 진행의 안정감까지
              함께 설계하는 브랜드입니다.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#5f554d]">
              사진은 물론, 촬영을 맡기는 순간의 신뢰감까지 중요하다고
              생각하기 때문에 결과물과 경험 모두를 함께 만듭니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e6ddd2] bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.06)]">
            <div className="grid gap-10 text-center sm:grid-cols-3">
              <div className="flex flex-col items-center justify-center max-w-[180px] mx-auto">
                <p className="text-3xl font-semibold">오랜 경험</p>
                <p className="mt-3 text-sm leading-6 text-[#6b625b] break-keep">
                  축적된 본식 촬영 노하우
                </p>
              </div>

              <div className="flex flex-col items-center justify-center max-w-[180px] mx-auto">
                <p className="text-3xl font-semibold">신뢰 중심</p>
                <p className="mt-3 text-sm leading-6 text-[#6b625b] break-keep">
                  결과보다 과정까지 안정적으로
                </p>
              </div>

              <div className="flex flex-col items-center justify-center max-w-[180px] mx-auto">
                <p className="text-3xl font-semibold">완성도</p>
                <p className="mt-3 text-sm leading-6 text-[#6b625b] break-keep">
                  오래 봐도 질리지 않는 결과물
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="border-y border-[#eadfd3] bg-[#fcfaf7] py-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#9b846d]">
                Portfolio
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                실제 촬영한 웨딩홀
              </h2>
            </div>

            <a
              href="/portfolio"
              className="inline-flex items-center text-sm font-medium text-[#6b5848] underline underline-offset-4"
            >
              전체 촬영 보기
            </a>
          </div>

          {loadingPortfolio ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
                >
                  <div className="h-[360px] w-full animate-pulse bg-[#ece5dc]" />
                  <div className="p-5">
                    <div className="h-4 w-20 animate-pulse rounded bg-[#ece5dc]" />
                    <div className="mt-3 h-5 w-32 animate-pulse rounded bg-[#ece5dc]" />
                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#ece5dc]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {randomHallCards.map((item) => (
                <a
                  key={item.hall}
                  href="/portfolio"
                  className="group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={`${item.hall} 대표 이미지`}
                      className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#9b846d]">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[#211c18]">
                      {item.hall}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5f554d]">
                      총 {item.count}장의 실제 촬영 사진 보기
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-end">
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-[#cdbdac] px-6 py-3 text-sm font-medium text-[#5f554d] transition hover:-translate-y-0.5 hover:bg-[#f5eee6]"
            >
              포트폴리오 더보기
            </a>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#ece3d8] py-24">
  <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
    <div className="max-w-2xl">
      <p className="text-sm uppercase tracking-[0.28em] text-[#9b846d]">
        Reviews
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
        결국 선택을 만드는 건
        <br />
        실제로 남겨진 만족감입니다
      </h2>
      <p className="mt-5 text-base leading-8 text-[#5f554d]">
        위브스냅을 선택한 신랑신부가 실제로 남겨준 후기들 입니다.
      
      </p>
    </div>

    <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="order-2 space-y-4 lg:order-1">
        {reviewItems.map((item) => {
          const isActive = activeReview.id === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveReview(item)}
              className={`w-full rounded-[1.5rem] border p-5 text-left transition duration-300 ${
                isActive
                  ? "border-[#cdbdac] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.08)]"
                  : "border-[#ddd2c5] bg-[#f8f3ed] hover:border-[#cdbdac] hover:bg-white"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#9b846d]">
                {item.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-7 text-[#1d1815] sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6b625b]">
                {item.summary}
              </p>
            </button>
          );
        })}
      </div>

      <div className="order-1 lg:order-2">
        <div className="overflow-hidden rounded-[2rem] border border-[#ddd2c5] bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f7efe6]">
            <img
              src={activeReview.image}
              alt={activeReview.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[#ddd2c5] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#9b846d]">
            Selected Review
          </p>
          <p className="mt-2 text-base font-semibold leading-7 text-[#1d1815]">
            {activeReview.title}
          </p>
          <p className="mt-2 text-sm leading-7 text-[#6b625b]">
            {activeReview.summary}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      <section id="faq" className="bg-[#f6f2ec] py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-[#9b846d]">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              문의 전에 많이 궁금해하는 부분
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-[1.5rem] border border-[#e2d7cb] bg-white px-6 py-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="text-lg font-semibold text-[#211c18]">
                    {item.question}
                  </span>
                  <span className="text-2xl leading-none text-[#8f7d6d] transition duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 pr-8 text-sm leading-7 text-[#5f554d]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#1d1815] px-6 py-20 text-white sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
            소중한 하루를
            <br />
            믿고 맡길 수 있는 촬영을 찾고 있다면
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75">
            예식 일정과 원하는 분위기를 남겨주면, 위브스냅이 가장 자연스럽고
            안정적인 방향으로 상담을 도와드려요.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://open.kakao.com/o/s2cR31ph"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#1d1815] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3ede4] sm:w-auto sm:max-w-none"
            >
              오픈채팅 문의
            </a>

            <a
              href="/portfolio"
              className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto sm:max-w-none"
            >
              사진 먼저 보기
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}