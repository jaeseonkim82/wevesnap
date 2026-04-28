"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

function sortByPublicIdAsc(a: PortfolioItem, b: PortfolioItem) {
  return (a.publicId || "").localeCompare(b.publicId || "", undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function createKakaoLink(hallName: string) {
  const message = `안녕하세요, 위브스냅입니다 :)

${hallName} 촬영 가능 여부 문의드립니다.

1. 예식 날짜:
2. 예식 시간:
3. 예식장 / 홀 이름: ${hallName}
4. 원하시는 상품:
5. 성함:
6. 연락처:
7. 문의 내용:
`;

  return `https://open.kakao.com/o/s2cR31ph?text=${encodeURIComponent(
    message
  )}`;
}

export default function PortfolioHallPage() {
  const params = useParams();
  const router = useRouter();

  const hallParam = Array.isArray(params.hall) ? params.hall[0] : params.hall;
  const hallName = decodeURIComponent(hallParam || "");
  const kakaoLink = createKakaoLink(hallName);

  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingAllPhotos, setLoadingAllPhotos] = useState(false);
  const [error, setError] = useState("");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const touchDeltaY = useRef(0);

  const currentItem =
    selectedIndex !== null && items[selectedIndex] ? items[selectedIndex] : null;

  const fetchPortfolio = useCallback(
    async (cursor?: string | null): Promise<string | null> => {
      try {
        if (cursor) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError("");
        }

        const query = new URLSearchParams({
          hall: hallName,
          limit: "20",
        });

        if (cursor) {
          query.set("cursor", cursor);
        }

        const response = await fetch(`/api/portfolio?${query.toString()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("포트폴리오 데이터를 불러오지 못했습니다.");
        }

        const data = await response.json();

        const newItems = ((data.items || []) as PortfolioItem[]).sort(
          sortByPublicIdAsc
        );

        setItems((prev) => {
          if (!cursor) return newItems;

          const existingIds = new Set(prev.map((item) => item.id));
          const merged = [
            ...prev,
            ...newItems.filter((item) => !existingIds.has(item.id)),
          ];

          return merged.sort(sortByPublicIdAsc);
        });

        const newCursor = data.nextCursor || null;
        setNextCursor(newCursor);

        return newCursor;
      } catch (err) {
        console.error(err);
        setError("포트폴리오를 불러오지 못했습니다.");
        return null;
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [hallName]
  );

  useEffect(() => {
    if (!hallName) return;
    fetchPortfolio(null);
  }, [hallName, fetchPortfolio]);

  async function loadAllPhotos() {
    if (!nextCursor || loadingAllPhotos) return;

    try {
      setLoadingAllPhotos(true);

      let cursor: string | null = nextCursor;

      while (cursor) {
        cursor = await fetchPortfolio(cursor);
      }
    } finally {
      setLoadingAllPhotos(false);
    }
  }

  async function openModal(index: number) {
    setSelectedIndex(index);
    await loadAllPhotos();
  }

  function closeModal() {
    setSelectedIndex(null);
  }

  function goPrev() {
    if (!items.length || selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  }

  async function goNext() {
    if (!items.length || selectedIndex === null) return;

    const isLastImage = selectedIndex === items.length - 1;

    if (isLastImage && nextCursor && !loadingMore) {
      await fetchPortfolio(nextCursor);
      setSelectedIndex(selectedIndex + 1);
      return;
    }

    if (isLastImage && !nextCursor) {
      setSelectedIndex(0);
      return;
    }

    setSelectedIndex(selectedIndex + 1);
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

    if (absX > 50 && absX > absY * 1.2) {
      if (deltaX < 0) goNext();
      else goPrev();
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
  }, [selectedIndex, items.length, nextCursor, loadingMore]);

  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#1d1815]">
      <Header />

      <button
        type="button"
        onClick={() => router.push("/portfolio")}
        className="fixed left-8 top-[104px] z-[80] hidden items-center rounded-full border border-white/20 bg-[#1d1815]/75 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-[#1d1815] sm:inline-flex"
      >
        ← 목록으로
      </button>

      <section className="bg-[#1d1815] px-6 pb-16 pt-32 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.32em] text-white/55">
            Wedding Hall
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            {hallName}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
            {hallName}에서 실제로 촬영한 위브스냅의 본식스냅 사진입니다.
            공간의 분위기와 인물의 감정이 어떻게 담기는지 편하게 확인해보세요.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={kakaoLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#1d1815] transition hover:-translate-y-0.5 hover:bg-[#f3ede4] sm:w-auto"
            >
              이 웨딩홀 촬영 가능 여부 확인하기
            </a>

            <button
              type="button"
              onClick={() => router.push("/portfolio")}
              className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 pb-32 sm:px-10 lg:px-16">
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[1.8rem] border border-[#e4d9cd] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
              >
                <div className="h-[420px] w-full animate-pulse bg-[#ece5dc]" />
                <div className="p-6">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#ece5dc]" />
                  <div className="mt-4 h-4 w-full animate-pulse rounded bg-[#ece5dc]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="py-20 text-center text-[#8b5e3c]">{error}</div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="py-20 text-center text-[#6b625b]">
            아직 등록된 사진이 없습니다.
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#9b846d]">
                  Gallery
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {nextCursor ? `${items.length}장 이상` : `총 ${items.length}장`}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#6b625b]">
                  실제 촬영된 사진만 보여드립니다.
                </p>
              </div>

              <a
                href={kakaoLink}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full bg-[#1d1815] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:inline-flex"
              >
                이 웨딩홀 촬영 문의
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  type="button"
                  onClick={() => openModal(index)}
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
                      {item.category || "Wedding"}
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

            <div className="mt-12 flex justify-center">
              {nextCursor ? (
                <button
                  type="button"
                  onClick={() => fetchPortfolio(nextCursor)}
                  disabled={loadingMore || loadingAllPhotos}
                  className="rounded-full border border-[#cdbdac] bg-white px-8 py-4 text-sm font-semibold text-[#5f554d] transition hover:-translate-y-0.5 hover:bg-[#f5eee6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMore || loadingAllPhotos
                    ? "불러오는 중..."
                    : "사진 더 보기"}
                </button>
              ) : (
                <p className="text-sm text-[#8c7a6b]">
                  등록된 사진을 모두 확인했습니다.
                </p>
              )}
            </div>
          </>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+14px)] z-[70] px-4 sm:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/20 bg-[#1d1815]/85 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-lg">
          <button
            type="button"
            onClick={() => router.push("/portfolio")}
            className="flex-1 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#1d1815]"
          >
            목록
          </button>

          <a
            href={kakaoLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold text-white"
          >
            상담 문의
          </a>
        </div>
      </div>

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

            {(loadingMore || loadingAllPhotos) && (
              <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/45 px-4 py-2 text-xs text-white/80">
                다음 사진 불러오는 중...
              </div>
            )}

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
                  className="h-full max-h-[62vh] w-full select-none object-contain lg:h-full lg:max-h-none lg:object-cover"
                  draggable={false}
                />

                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 text-[11px] text-white sm:hidden">
                  좌우로 밀어서 넘기기
                </div>
              </div>

              <div className="flex flex-col bg-white px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:justify-center lg:p-10">
                <p className="text-xs uppercase tracking-[0.24em] text-[#9b846d]">
                  Wedding Hall
                </p>

                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#211c18] sm:text-3xl">
                  {currentItem.hall || hallName}
                </h3>

                <p className="mt-4 text-sm text-[#8c7a6b] sm:text-base">
                  {selectedIndex !== null ? selectedIndex + 1 : 1} /{" "}
                  {loadingAllPhotos || nextCursor
                    ? `${items.length}+`
                    : items.length}
                </p>

                {currentItem.description && (
                  <p className="mt-5 text-sm leading-7 text-[#5f554d] sm:text-base sm:leading-8">
                    {currentItem.description}
                  </p>
                )}

                <p className="mt-5 text-sm leading-7 text-[#6b625b]">
                  ✔ 실제 촬영된 사진만 제공합니다
                  <br />
                  ✔ 예식장 분위기에 맞는 촬영 방향으로 상담드립니다
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-10">
                  <a
                    href={kakaoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#1d1815] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    이 분위기로 촬영 문의하기
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