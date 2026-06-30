"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/common/Header";

const reviewItems = [
  {
    id: 1,
    label: "빠른 전달",
    title: "결과가 빠르게 나와서 더 만족스러웠어요",
    summary: "사진도 자연스럽고 예쁘게 잘 담겨 더 만족스러웠다는 후기.",
    image: "/images/reviews/review-01.jpg",
  },
  {
    id: 2,
    label: "사진 퀄리티",
    title: "원본도 너무 마음에 들고 사진이 정말 예뻐요",
    summary: "원본부터 만족도가 높았고 색감과 분위기가 기대 이상이었다는 후기.",
    image: "/images/reviews/review-02.jpg",
  },
  {
    id: 3,
    label: "진행 안정감",
    title: "당일 진행이 꼼꼼해서 더 믿음이 갔어요",
    summary: "촬영 내내 안정감이 있었고 믿고 맡길 수 있었다는 후기.",
    image: "/images/reviews/review-03.jpg",
  },
  {
    id: 4,
    label: "소통 만족",
    title: "작가님이 친절하고 소통도 편했어요",
    summary: "필요한 부분을 편하게 이야기할 수 있어서 좋았다는 후기.",
    image: "/images/reviews/review-04.jpg",
  },
];

type HallItem = {
  hall: string;
  category: string;
  coverImage: string;
  count: number;
};

const aboutItems = [
  {
    title: "감정을 기록합니다",
    desc: "위브스냅은 장면을 크게 만들기보다, 그날의 공기와 표정이 자연스럽게 남는 순간을 더 중요하게 생각합니다.",
  },
  {
    title: "자연스러운 순간",
    desc: "가까이 있지만 부담스럽지 않게, 필요한 순간을 자연스럽게 담아드립니다.",
  },
  {
    title: "오래 남는 사진을 만듭니다",
    desc: "처음 봤을 때 예쁜 사진보다 시간이 지난 뒤 다시 꺼내보고 싶은 사진. 위브스냅이 남기고 싶은 결과물입니다.",
  },
];

const faqItems = [
  {
    question: "Q. 촬영 결과가 원하는 느낌으로 나올지 걱정돼요",
    answer:
      "A. 위브스냅은 배경보다 인물의 표정과 감정에 집중합니다. 웨딩홀 환경이나 조명에 영향을 최대한 적게 받는 촬영 방식을 고수합니다.",
  },
  {
    question: "Q. 웨딩홀마다 결과 차이가 많이 나지 않나요?",
    answer:
      "A. 조명, 층고, 동선에 따라 차이는 있지만 다양한 웨딩홀 경험을 기반으로 각 공간에 맞는 촬영 방식으로 대응합니다.",
  },
  {
    question: "Q. 사진데이터는 안전하게 보관되나요?",
    answer:
      "A. 촬영원본은 외장하드, NAS, 클라우드 등 여러 장치에 나누어 보관하고 있습니다.",
  },
  {
    question: "Q. 예약은 어떻게 진행되나요?",
    answer:
      "A. 카톡 문의로 예식일과 장소를 확인하고, 예약 확정 후 전자서명 계약서를 전달드립니다.",
  },
  {
    question: "Q. 결과물은 언제 받을 수 있나요?",
    answer:
      "A. 최대 7일 이내 전달을 안내드리지만, 실질적으로 3일 이내 전달드리고 있습니다.",
  },
];

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function encodeHall(hall: string) {
  return encodeURIComponent(hall);
}

export default function HomePage() {
  const [hallItems, setHallItems] = useState<HallItem[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const reviewScrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollReviews = (direction: "left" | "right") => {
    reviewScrollerRef.current?.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    async function fetchHalls() {
      try {
        setLoadingPortfolio(true);
        const response = await fetch(`${window.location.origin}/api/halls`, {
          cache: "no-store",
        });
        const data = await response.json();
        setHallItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setHallItems([]);
      } finally {
        setLoadingPortfolio(false);
      }
    }

    fetchHalls();
  }, []);

  const randomHallCards = useMemo(() => {
    return shuffleArray(hallItems).slice(0, 4);
  }, [hallItems]);

  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#1d1815]">
      <Header />

      <section id="top" className="relative overflow-hidden bg-[#1d1815] pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="order-2 relative z-10 lg:order-1">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-px flex-1 bg-white/20">
                  <span className="absolute -top-3 left-0 bg-[#1d1815] pr-3 text-[9px] uppercase tracking-[0.24em] text-white/65">
                    Premium Wedding Snapshot
                  </span>
                </div>
              </div>

              <h1 className="mt-5 break-keep text-[32px] font-semibold leading-[1.18] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                가장 중요한 하루를
                <br />
                오래 남을 감정으로 기록합니다
              </h1>

              <p className="mt-5 break-keep text-[14px] leading-7 text-white/75 sm:max-w-2xl sm:text-base sm:leading-8">
                위브스냅은 본식스냅에 특화된 프리미엄 브랜드입니다.
                단순히 예쁜 사진을 넘어, 안심하고 맡길 수 있는 촬영 경험을 함께 만듭니다.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <a
                  href="https://open.kakao.com/o/s2cR31ph"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-[#1d1815] sm:w-auto"
                >
                  카카오톡으로 문의하기
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-[14px] font-semibold text-white sm:w-auto"
                >
                  포트폴리오 보기
                </a>
              </div>
            </div>

            <div className="order-1 relative z-10 lg:order-2">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:max-w-[520px] sm:rounded-[2rem]">
                <img src="/images/hero_1.png" alt="위브스냅 메인 이미지" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
        <p className="text-[12px] uppercase tracking-[0.22em] text-[#9b846d]">
          About Wevesnap
        </p>
        <h2 className="mt-4 break-keep text-[27px] font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
          많은 선택지보다
          <br />
          더 신뢰할 수 있는 기준
        </h2>

        <div className="mt-8 border-t border-[#d8cbbd]">
          {aboutItems.map((item) => (
            <div
              key={item.title}
              className="grid gap-3 border-b border-[#d8cbbd] py-6 sm:grid-cols-[0.42fr_0.58fr] sm:gap-8 sm:py-8"
            >
              <h3 className="break-keep text-[20px] font-semibold leading-tight tracking-[-0.04em] sm:text-2xl">
                {item.title}
              </h3>
              <p className="break-keep text-[14px] leading-7 text-[#5f554d] sm:text-[15px] sm:leading-8">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="border-y border-[#eadfd3] bg-[#fcfaf7] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#9b846d]">
            Portfolio
          </p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.04em] sm:text-4xl">
            실제 촬영한 웨딩홀
          </h2>

          {loadingPortfolio && (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="overflow-hidden rounded-[1.25rem] bg-white">
                  <div className="h-[360px] animate-pulse bg-[#ece5dc] sm:h-[460px] xl:h-[500px]" />
                </div>
              ))}
            </div>
          )}

          {!loadingPortfolio && randomHallCards.length > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {randomHallCards.map((item) => (
                <a
                  key={item.hall}
                  href={`/portfolio/${encodeHall(item.hall)}`}
                  className="group overflow-hidden rounded-[1.25rem] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
                >
                  <img
                    src={item.coverImage}
                    alt={`${item.hall} 대표 이미지`}
                    className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[460px] xl:h-[500px]"
                  />
                  <div className="p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#9b846d]">{item.category}</p>
                    <h3 className="mt-2 truncate text-[18px] font-semibold">{item.hall}</h3>
                    <p className="mt-2 text-[13px] text-[#5f554d]">총 {item.count}장의 실제 촬영 사진 보기</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {!loadingPortfolio && randomHallCards.length === 0 && (
            <div className="mt-8 rounded-[1.25rem] bg-white p-6 text-center text-[14px] text-[#5f554d]">
              포트폴리오 데이터를 불러오지 못했어요.
            </div>
          )}

          <div className="mt-8 flex justify-center sm:justify-end">
            <a href="/portfolio" className="inline-flex w-full items-center justify-center rounded-full border border-[#cdbdac] px-6 py-3 text-[14px] font-medium text-[#5f554d] sm:w-auto">
              포트폴리오 더보기
            </a>
          </div>
        </div>
      </section>

      <section id="reviews" className="overflow-hidden bg-[#ece3d8] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.22em] text-[#9b846d]">Reviews</p>
              <h2 className="mt-3 break-keep text-[27px] font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                후기가 가장 좋은
                <br />
                포트폴리오입니다
              </h2>
            </div>

            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollReviews("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cdbdac] text-[#6b625b]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollReviews("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cdbdac] text-[#6b625b]"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={reviewScrollerRef}
            className="mt-8 flex snap-x gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviewItems.map((item) => (
              <article
                key={item.id}
                className="min-w-[86%] snap-center overflow-hidden rounded-[1.5rem] bg-white shadow-[0_14px_35px_rgba(0,0,0,0.08)] sm:min-w-[420px]"
              >
                <div className="bg-[#f7efe6] p-2">
                  <img src={item.image} alt={item.title} className="max-h-[520px] w-full rounded-[1.1rem] object-contain" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9b846d]">{item.label}</p>
                  <h3 className="mt-2 break-keep text-[17px] font-semibold leading-7">{item.title}</h3>
                  <p className="mt-2 break-keep text-[13px] leading-6 text-[#6b625b]">{item.summary}</p>
                </div>
              </article>
            ))}

            <article className="flex min-w-[86%] snap-center flex-col justify-between rounded-[1.5rem] bg-[#1d1815] p-6 text-white shadow-[0_14px_35px_rgba(0,0,0,0.08)] sm:min-w-[420px]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Next Story</p>
                <h3 className="mt-5 break-keep text-[24px] font-semibold leading-tight">
                  다음 후기는
                  <br />
                  당신의 이야기가 될 수 있습니다.
                </h3>
              </div>
              <a
                href="https://open.kakao.com/o/s2cR31ph"
                target="_blank"
                rel="noreferrer"
                className="mt-10 rounded-full bg-white py-4 text-center text-[14px] font-semibold text-[#1d1815]"
              >
                문의하기
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#f6f2ec] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-10 lg:px-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#9b846d]">FAQ</p>
          <h2 className="mt-3 break-keep text-[24px] font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
            문의 전에 많이 궁금해하는 부분
          </h2>

          <div className="mt-7 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-[1.1rem] border border-[#e2d7cb] bg-white px-4 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="break-keep text-[14px] font-semibold leading-6">{item.question}</span>
                  <span className="text-xl text-[#8f7d6d] group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 break-keep text-[12px] leading-6 text-[#5f554d]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#1d1815] px-5 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="break-keep text-[25px] font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
            결혼식은 하루지만
            <br />
            사진은 평생 남습니다
          </h2>

          <p className="mx-auto mt-5 max-w-2xl break-keep text-[14px] leading-7 text-white/75">
            예식 일정과 원하는 분위기를 남겨주시면 가장 자연스럽고 안정적인 방향으로 상담을 도와드려요.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="https://open.kakao.com/o/s2cR31ph" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#1d1815] sm:w-auto">
              오픈채팅 문의
            </a>
            <a href="/portfolio" className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-semibold text-white sm:w-auto">
              포트폴리오 더보기
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}