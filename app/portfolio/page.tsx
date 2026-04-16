"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/common/Header";

type PortfolioItem = {
  id: string;
  hall: string;
  category: string;
  image: string;
  title: string;
  description: string;
  publicId?: string;
  createdAt?: string;
};

type HallGroup = {
  hall: string;
  category: string;
  coverImage: string;
  count: number;
  items: PortfolioItem[];
  latestCreatedAt?: string;
};

const filters = ["전체", "웨딩홀", "호텔", "야외"];

function sortByPublicIdAsc(a: PortfolioItem, b: PortfolioItem) {
  return (a.publicId || "").localeCompare(b.publicId || "", undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function groupByHall(items: PortfolioItem[]): HallGroup[] {
  const map = new Map<string, HallGroup>();

  for (const item of items) {
    const key = item.hall || "위브스냅";

    if (!map.has(key)) {
      map.set(key, {
        hall: key,
        category: item.category || "전체",
        coverImage: item.image,
        count: 0,
        items: [],
        latestCreatedAt: item.createdAt || "",
      });
    }

    const group = map.get(key)!;
    group.items.push(item);
    group.count += 1;

    const currentLatest = group.latestCreatedAt
      ? new Date(group.latestCreatedAt).getTime()
      : 0;
    const incomingTime = item.createdAt ? new Date(item.createdAt).getTime() : 0;

    if (incomingTime > currentLatest) {
      group.latestCreatedAt = item.createdAt || "";
    }
  }

  const groups = Array.from(map.values()).map((group) => {
    const sortedItems = [...group.items].sort(sortByPublicIdAsc);
    const firstItem = sortedItems[0];

    return {
      ...group,
      items: sortedItems,
      coverImage: firstItem?.image || group.coverImage,
      category: firstItem?.category || group.category,
    };
  });

  return groups.sort((a, b) => {
    const aTime = a.latestCreatedAt ? new Date(a.latestCreatedAt).getTime() : 0;
    const bTime = b.latestCreatedAt ? new Date(b.latestCreatedAt).getTime() : 0;
    return bTime - aTime;
  });
}

export default function PortfolioPage() {
  const [active, setActive] = useState("전체");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const touchDeltaY = useRef(0);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/portfolio", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("포트폴리오 데이터를 불러오지 못했습니다.");
        }

        const data = await response.json();
        setItems(data.items || []);
      } catch (err) {
        console.error(err);
        setError("포트폴리오를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  const filteredItems = useMemo(() => {
    if (active === "전체") return items;
    return items.filter((item) => item.category === active);
  }, [active, items]);

  const hallGroups = useMemo(() => {
    return groupByHall(filteredItems);
  }, [filteredItems]);

  const currentHallItems = useMemo(() => {
    if (!selectedHall) return [];
    return filteredItems
      .filter((item) => item.hall === selectedHall)
      .sort(sortByPublicIdAsc);
  }, [filteredItems, selectedHall]);

  const currentItem =
    selectedIndex !== null && currentHallItems[selectedIndex]
      ? currentHallItems[selectedIndex]
      : null;

  function closeModal() {
    setSelectedIndex(null);
  }

  function goPrev() {
    if (!currentHallItems.length || selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + currentHallItems.length) % currentHallItems.length
    );
  }

  function goNext() {
    if (!currentHallItems.length || selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % currentHallItems.length);
  }

  function goToHallList() {
    setSelectedHall(null);
    setSelectedIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchDeltaX.current = 0;
    touchDeltaY.current = 0;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = event.touches[0];
    touchDeltaX.current = touch.clientX - touchStartX.current;
    touchDeltaY.current = touch.clientY - touchStartY.current;
  }

  function handleTouchEnd() {
    const deltaX = touchDeltaX.current;
    const deltaY = touchDeltaY.current;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    const isHorizontalSwipe = absX > 50 && absX > absY * 1.2;

    if (isHorizontalSwipe) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchDeltaX.current = 0;
    touchDeltaY.current = 0;
  }

  useEffect(() => {
    if (selectedIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, currentHallItems.length]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [selectedHall]);

  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#1d1815]">
      <Header />

      <section className="bg-[#1d1815] px-6 pb-16 pt-32 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.32em] text-white/55">
            Portfolio
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            실제 촬영으로 확인하는
            <br />
            위브스냅의 분위기
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
            웨딩홀과 공간의 분위기, 그리고 그 안에서 자연스럽게 남는 감정의
            순간들을 모아두었습니다. 원하시는 장소의 분위기를 먼저 편하게
            확인해보세요.
          </p>
        </div>
      </section>

      <section
        className={`mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16 ${
          selectedHall ? "pb-36 sm:pb-12" : ""
        }`}
      >
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActive(filter);
                setSelectedHall(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                active === filter
                  ? "bg-[#1d1815] text-white"
                  : "border border-[#d8ccc0] bg-white text-[#5f554d] hover:bg-[#f5eee6]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {selectedHall && (
          <div className="mt-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#9b846d]">
                Hall
              </p>
              <h2 className="mt-2 text-3xl font-semibold">{selectedHall}</h2>
              <p className="mt-2 text-sm leading-7 text-[#6b625b]">
                해당 웨딩홀에서 촬영한 전체 사진을 확인하실 수 있습니다.
              </p>
            </div>

            <button
              type="button"
              onClick={goToHallList}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#d8ccc0] bg-white px-5 py-3 text-sm font-medium text-[#5f554d] transition hover:-translate-y-0.5 hover:bg-[#f5eee6]"
            >
              웨딩홀 목록 보기
            </button>
          </div>
        )}

        {loading && (
          <div className="py-20 text-center text-[#6b625b]">
            포트폴리오를 불러오는 중입니다...
          </div>
        )}

        {!loading && error && (
          <div className="py-20 text-center text-[#8b5e3c]">{error}</div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="py-20 text-center text-[#6b625b]">
            아직 등록된 포트폴리오가 없습니다.
          </div>
        )}

        {!loading && !error && !selectedHall && hallGroups.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {hallGroups.map((group) => (
              <button
                key={group.hall}
                type="button"
                onClick={() => setSelectedHall(group.hall)}
                className="group overflow-hidden rounded-[1.8rem] border border-[#e4d9cd] bg-white text-left shadow-[0_18px_40px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <img
                    src={group.coverImage}
                    alt={`${group.hall} 대표 이미지`}
                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#9b846d]">
                    {group.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#211c18]">
                    {group.hall}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#6b625b]">
                    총 {group.count}장의 실제 촬영 사진 보기
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {!loading && !error && selectedHall && currentHallItems.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {currentHallItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group overflow-hidden rounded-[1.8rem] border border-[#e4d9cd] bg-white text-left shadow-[0_18px_40px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title || item.hall}
                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#9b846d]">
                    {item.hall}
                  </p>

                  {item.description && (
                    <p className="mt-3 text-sm leading-7 text-[#6b625b]">
                      {item.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#1d1815] px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
            소중한 하루를
            <br />
            믿고 맡길 수 있는 촬영을 찾고 계시다면
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75">
            예식 일정과 원하시는 분위기를 남겨주시면, 위브스냅이 가장
            자연스럽고 안정적인 방향으로 상담을 도와드리겠습니다.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://open.kakao.com/o/s2cR31ph"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#1d1815] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3ede4] sm:w-auto sm:max-w-none"
            >
              카카오톡으로 문의하기
            </a>

            <a
              href="/"
              className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto sm:max-w-none"
            >
              메인으로 돌아가기
            </a>
          </div>
        </div>
      </section>

      {selectedHall && !currentItem && (
  <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+14px)] z-[70] px-4 sm:hidden">
    <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/20 bg-[#1d1815]/85 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-lg">

      {/* 뒤로가기 역할 */}
      <button
        type="button"
        onClick={goToHallList}
        className="flex-1 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#1d1815] transition hover:bg-[#f3ede4]"
      >
        목록으로 돌아가기
      </button>

      {/* 문의 */}
      <a
        href="https://open.kakao.com/o/s2cR31ph"
        target="_blank"
        rel="noreferrer"
        className="flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
      >
        상담 문의
      </a>

      {/* TOP */}
      <button
        type="button"
        onClick={scrollToTop}
        className="rounded-full px-3 py-3 text-xs font-medium text-white/70 transition hover:text-white"
      >
        TOP
      </button>

    </div>
  </div>
)}

      {currentItem && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 px-0 py-0 backdrop-blur-sm sm:px-4 sm:py-8 lg:items-center"
          onClick={closeModal}
        >
          <div
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden rounded-none bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:h-auto sm:max-h-[92vh] sm:max-w-6xl sm:rounded-[1.8rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl text-white transition hover:bg-black/70"
              aria-label="닫기"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-[32vh] z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-2xl text-white transition hover:bg-black/70 sm:left-4 sm:top-1/2 sm:h-12 sm:w-12"
              aria-label="이전 이미지"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-[32vh] z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-2xl text-white transition hover:bg-black/70 sm:right-4 sm:top-1/2 sm:h-12 sm:w-12"
              aria-label="다음 이미지"
            >
              ›
            </button>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:grid lg:max-h-[92vh] lg:grid-cols-[1.1fr_0.9fr]">
              <div
                className="relative flex min-h-[46vh] items-center justify-center bg-[#111] sm:min-h-[52vh] lg:min-h-0 lg:bg-[#f6f2ec]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.title || currentItem.hall}
                  className="h-full max-h-[62vh] w-full select-none object-contain lg:max-h-none lg:h-full lg:object-cover"
                  draggable={false}
                />

                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 text-[11px] text-white sm:hidden">
                  좌우로 밀어서 넘기기
                </div>
              </div>

              <div className="flex flex-col bg-white px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:justify-center lg:p-10">
                <div className="shrink-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#9b846d]">
                    Wedding Hall
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#211c18] sm:text-3xl">
                    {currentItem.hall}
                  </h3>

                  <p className="mt-4 text-sm text-[#8c7a6b] sm:text-base">
                    {selectedIndex !== null ? selectedIndex + 1 : 1} /{" "}
                    {currentHallItems.length}
                  </p>

                  {currentItem.description && (
                    <p className="mt-5 text-sm leading-7 text-[#5f554d] sm:text-base sm:leading-8">
                      {currentItem.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-10">
                  <a
                    href="https://open.kakao.com/o/s2cR31ph"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#1d1815] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    이 분위기로 문의하기
                  </a>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex items-center justify-center rounded-full border border-[#d8ccc0] px-6 py-3.5 text-sm font-semibold text-[#5f554d] transition hover:bg-[#f5eee6]"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}