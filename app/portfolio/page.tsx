"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";

type HallItem = {
  hall: string;
  category: string;
  coverImage: string;
  count: number;
  latestCreatedAt?: string;
};

const filters = ["전체", "웨딩홀", "호텔", "야외", "교회", "컨벤션"];

function encodeHall(hall: string) {
  return encodeURIComponent(hall);
}

export default function PortfolioPage() {
  const router = useRouter();

  const [active, setActive] = useState("전체");
  const [halls, setHalls] = useState<HallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHalls() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/halls", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("웨딩홀 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();
        setHalls(data || []);
      } catch (err) {
        console.error(err);
        setError("웨딩홀 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchHalls();
  }, []);

  const filteredHalls = useMemo(() => {
    if (active === "전체") return halls;
    return halls.filter((item) => item.category === active);
  }, [active, halls]);

  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#1d1815]">
      <Header />

      <section className="bg-[#1d1815] px-6 pb-16 pt-32 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.32em] text-white/55">
            Portfolio
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            웨딩홀별로 확인하는
            <br />
            위브스냅의 실제 촬영
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
            예식장은 조명, 동선, 분위기에 따라 사진의 결과가 달라집니다.
            위브스냅이 실제로 촬영한 장소별 포트폴리오를 먼저 확인해보세요.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#9b846d]">
              Wedding Hall
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              촬영 장소를 선택해보세요
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#6b625b]">
              궁금한 웨딩홀을 선택하면 해당 장소의 실제 촬영 사진을 확인할 수
              있습니다.
            </p>
          </div>

          <a
            href="https://open.kakao.com/o/s2cR31ph"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full bg-[#1d1815] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            내 예식장 촬영 문의
          </a>
        </div>

        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[1.8rem] border border-[#e4d9cd] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
              >
                <div className="h-[420px] w-full animate-pulse bg-[#ece5dc]" />
                <div className="p-6">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#ece5dc]" />
                  <div className="mt-4 h-6 w-40 animate-pulse rounded bg-[#ece5dc]" />
                  <div className="mt-4 h-4 w-full animate-pulse rounded bg-[#ece5dc]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="py-20 text-center text-[#8b5e3c]">{error}</div>
        )}

        {!loading && !error && filteredHalls.length === 0 && (
          <div className="py-20 text-center text-[#6b625b]">
            아직 등록된 촬영 장소가 없습니다.
          </div>
        )}

        {!loading && !error && filteredHalls.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredHalls.map((item) => (
              <button
                key={item.hall}
                type="button"
                onClick={() =>
                  router.push(`/portfolio/${encodeHall(item.hall)}`)
                }
                className="group overflow-hidden rounded-[1.8rem] border border-[#e4d9cd] bg-white text-left shadow-[0_18px_40px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={`${item.hall} 대표 이미지`}
                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#9b846d]">
                    {item.category || "Wedding"}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold text-[#211c18]">
                    {item.hall}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#6b625b]">
                    총 {item.count}장의 실제 촬영 사진 보기
                  </p>

                  <div className="mt-5 inline-flex items-center text-sm font-semibold text-[#1d1815]">
                    이 장소 사진 보기
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#1d1815] px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
            내 예식장도
            <br />
            이렇게 담길 수 있을지 궁금하다면
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75">
            예식 일정과 장소를 남겨주시면, 위브스냅이 해당 공간에 맞는 촬영
            가능 여부와 방향을 안내해드리겠습니다.
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
    </main>
  );
}