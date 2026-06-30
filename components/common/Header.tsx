"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = [
    { label: "소개", href: isHome ? "#about" : "/#about" },
    { label: "포트폴리오", href: "/portfolio" },
    { label: "촬영비용", href: "/pricing" },
    { label: "후기", href: isHome ? "#reviews" : "/#reviews" },
    { label: "FAQ", href: isHome ? "#faq" : "/#faq" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[9999]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mt-3 flex items-center justify-between rounded-full border border-white/20 bg-[#1d1815]/65 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:mt-4">
          <Link href="/" className="relative block h-8 w-[96px] sm:h-10 sm:w-[110px]">
            <Image
              src="/images/wevesnap-logo.png"
              alt="위브스냅 로고"
              fill
              sizes="110px"
              className="object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm text-white/85">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="https://blog.naver.com/weve_snap" className="rounded-full border border-white/30 px-4 py-2 text-sm text-white/90">
              Blog
            </Link>
            <a href="https://instagram.com/wevesnap" target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-4 py-2 text-sm text-white/90">
              Instagram
            </a>
            <a href="https://open.kakao.com/o/s2cR31ph" target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1d1815]">
              오픈채팅 문의
            </a>
          </div>

          <button
            type="button"
            onPointerDown={() => setOpen(true)}
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white lg:hidden"
            aria-label="메뉴 열기"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[10000] bg-[#1d1815]/95 px-5 py-5 text-white backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex h-full max-w-[430px] flex-col">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} className="relative block h-8 w-[96px]">
                <Image src="/images/wevesnap-logo.png" alt="위브스냅 로고" fill sizes="96px" className="object-contain" priority />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-3xl font-light text-white/80"
                aria-label="메뉴 닫기"
              >
                ×
              </button>
            </div>

            <nav className="mt-14 flex flex-col gap-7 text-[24px] font-light tracking-[-0.04em]">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-white/15" />

              <Link href="https://blog.naver.com/weve_snap" onClick={() => setOpen(false)}>
                블로그
              </Link>

              <a href="https://instagram.com/wevesnap" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                Instagram
              </a>
            </nav>

            <a
              href="https://open.kakao.com/o/s2cR31ph"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-auto mb-4 rounded-full bg-white py-4 text-center text-[15px] font-semibold text-[#1d1815]"
            >
              오픈채팅 문의
            </a>
          </div>
        </div>
      )}
    </header>
  );
}