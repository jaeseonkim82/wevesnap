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
    { label: "가격", href: "/pricing" },
    { label: "후기", href: isHome ? "#reviews" : "/#reviews" },
    { label: "FAQ", href: isHome ? "#faq" : "/#faq" },
  ];

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="header-shell mt-4 flex items-center justify-between rounded-full border border-white/20 bg-[#1d1815]/55 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-10 w-[110px]">
              <Image
                src="/images/wevesnap-logo.png"
                alt="위브스냅 로고"
                fill
                sizes="110px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`header-link text-sm transition ${
                  isActiveLink(item.href) ? "text-white" : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="https://blog.naver.com/weve_snap"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-white/90 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white whitespace-nowrap"
            >
              <span className="tracking-[0.04em]">Blog</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6.75 3.5A2.25 2.25 0 004.5 5.75v12.5A2.25 2.25 0 006.75 20.5h10.5a2.25 2.25 0 002.25-2.25V8.31a2.25 2.25 0 00-.659-1.591l-2.56-2.56A2.25 2.25 0 0014.69 3.5H6.75zm7.25 1.56c.229.048.442.16.61.329l2.5 2.5c.17.17.281.382.329.611H14.75A.75.75 0 0114 7.75V5.06zM8 10.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 018 10.75zm0 3.5a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 018 14.25zm0 3.5a.75.75 0 01.75-.75h4a.75.75 0 010 1.5h-4A.75.75 0 018 17.75z" />
              </svg>
            </Link>

            <a
              href="https://instagram.com/wevesnap"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-white/90 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white whitespace-nowrap"
            >
              <span className="tracking-[0.04em]">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M7.75 2C4.678 2 2.25 4.428 2.25 7.5v9c0 3.072 2.428 5.5 5.5 5.5h8.5c3.072 0 5.5-2.428 5.5-5.5v-9c0-3.072-2.428-5.5-5.5-5.5h-8.5zm0 1.5h8.5c2.243 0 4 1.757 4 4v9c0 2.243-1.757 4-4 4h-8.5c-2.243 0-4-1.757-4-4v-9c0-2.243 1.757-4 4-4zm8.75 2.25a.75.75 0 100 1.5.75.75 0 000-1.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
              </svg>
            </a>

            <a
              href="https://open.kakao.com/o/s2cR31ph"
              target="_blank"
              rel="noreferrer"
              className="header-cta inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1d1815] whitespace-nowrap"
            >
              오픈채팅 문의
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="text-xl text-white lg:hidden"
            aria-label="메뉴 열기"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="mt-3 animate-fadeDown rounded-2xl bg-[#1d1815]/95 p-6 text-white backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-lg"
              >
                블로그 →
              </Link>

              <a
                href="https://instagram.com/wevesnap"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-lg"
              >
                Instagram →
              </a>

              <a
                href="https://open.kakao.com/o/s2cR31ph"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-white py-3 text-center text-black"
              >
                오픈채팅 문의
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}