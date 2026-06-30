import Header from "@/components/common/Header";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#1d1815]">
      <Header />

      <section className="bg-[#1d1815] px-5 pb-14 pt-32 text-white sm:px-10 sm:pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/55 sm:text-sm sm:tracking-[0.32em]">
            Pricing
          </p>

          <h1 className="mt-5 break-keep text-[34px] font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
            위브스냅 촬영비용 안내
          </h1>

          <p className="mt-5 max-w-2xl break-keep text-[14px] leading-7 text-white/72 sm:mt-6 sm:text-base sm:leading-8">
            예식의 흐름과 분위기를 자연스럽고 안정감 있게 담아드리기 위한
            본식스냅 기준 구성입니다. 필요한 구성은 더하고, 부담은 줄일 수
            있도록 명확하게 안내해드립니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="rounded-[1.5rem] border border-[#e3d8cc] bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)] sm:rounded-[2rem] sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#9b846d] sm:text-sm sm:tracking-[0.24em]">
              Main Package
            </p>

            <div className="mt-5 flex flex-col gap-5 border-b border-[#eee5db] pb-7 md:flex-row md:items-end md:justify-between md:pb-8">
              <div className="max-w-2xl">
                <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-[#1d1815] sm:text-4xl">
                  본식스냅
                </h2>

                <p className="mt-4 break-keep text-[14px] leading-7 text-[#6b625b] sm:text-base sm:leading-8">
                  신부대기실부터 본식, 원판촬영까지 예식의 핵심 흐름을
                  안정적으로 담아드리는 기본 구성입니다.
                </p>
              </div>

              <div className="shrink-0 rounded-[1.25rem] bg-[#f8f4ee] px-5 py-4 text-left sm:rounded-[1.6rem] sm:px-6 sm:py-5 md:min-w-[200px] md:text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9b846d] sm:text-xs">
                  Price
                </p>

                <p className="mt-2 whitespace-nowrap text-[#1d1815] sm:mt-3">
                  <span className="text-[40px] font-semibold leading-none sm:text-5xl">
                    55
                  </span>
                  <span className="ml-1 text-[20px] font-semibold sm:text-2xl">
                    만원
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
              <div>
                <h3 className="text-[18px] font-semibold text-[#211c18] sm:text-xl">
                  촬영 범위
                </h3>

                <div className="mt-4 space-y-3 text-[14px] leading-7 text-[#5f554d] sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                  <p>• 신부대기실</p>
                  <p>• 본식스냅</p>
                  <p>• 원판촬영</p>
                </div>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-[#211c18] sm:text-xl">
                  기본 제공
                </h3>

                <div className="mt-4 space-y-3 text-[14px] leading-7 text-[#5f554d] sm:mt-5 sm:space-y-4 sm:text-base sm:leading-8">
                  <p>• 원본파일 제공</p>
                  <p>• 수정파일 40장</p>
                  <p>• 전자서명 계약/현금영수증</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[1.25rem] bg-[#f8f4ee] p-5 sm:mt-10 sm:rounded-[1.6rem] sm:p-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9b846d] sm:text-sm">
                Notice
              </p>

              <p className="mt-3 break-keep text-[13px] leading-7 text-[#6b625b] sm:mt-4 sm:text-base sm:leading-8">
                예식 시간, 장소, 이동 거리, 추가 요청 범위에 따라 일부 구성이
                조정될 수 있습니다. 정확한 일정과 예식 정보를 알려주시면 보다
                자세하게 안내해드리겠습니다.
              </p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-[1.5rem] border border-[#e3d8cc] bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)] sm:rounded-[2rem] sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#9b846d] sm:text-sm sm:tracking-[0.24em]">
                Add On
              </p>

              <h2 className="mt-3 text-[22px] font-semibold text-[#1d1815] sm:mt-4 sm:text-2xl">
                추가 구성
              </h2>

              <div className="mt-5 space-y-4 sm:mt-6">
                <div className="rounded-[1.25rem] border border-[#eee3d7] bg-[#fffdfb] p-5 sm:rounded-[1.5rem] sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[18px] font-semibold text-[#211c18] sm:text-xl">
                        서브스냅 추가
                      </p>

                      <p className="mt-3 break-keep text-[13px] leading-7 text-[#6b625b] sm:text-base sm:leading-8">
                        더 다양한 시선과 장면을 함께 담고 싶으실 때 추천드리는
                        구성입니다.
                      </p>

                      <p className="mt-3 whitespace-nowrap text-[13px] leading-7 text-[#6b625b] sm:text-base">
                        수정파일 +20장
                      </p>
                    </div>

                    <p className="shrink-0 whitespace-nowrap text-[#1d1815]">
                      <span className="text-[28px] font-semibold leading-none sm:text-3xl">
                        +35
                      </span>
                      <span className="ml-1 text-base font-semibold sm:text-lg">
                        만원
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#e3d8cc] bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)] sm:rounded-[2rem] sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#9b846d] sm:text-sm sm:tracking-[0.24em]">
                Album
              </p>

              <h2 className="mt-3 text-[22px] font-semibold text-[#1d1815] sm:mt-4 sm:text-2xl">
                앨범 옵션
              </h2>

              <div className="mt-5 space-y-4 sm:mt-6">
                {[
                  ["13×10인치 · 50페이지", "1권 기준", "15"],
                  ["13×10인치 · 20페이지", "1권 기준", "6"],
                ].map(([title, desc, price]) => (
                  <div
                    key={title}
                    className="rounded-[1.25rem] border border-[#eee3d7] bg-[#fffdfb] p-5 sm:rounded-[1.5rem] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[18px] font-semibold text-[#211c18] sm:text-xl">
                          {title}
                        </p>

                        <p className="mt-3 whitespace-nowrap text-[13px] leading-7 text-[#6b625b] sm:text-base">
                          {desc}
                        </p>
                      </div>

                      <p className="shrink-0 whitespace-nowrap text-[#1d1815]">
                        <span className="text-[28px] font-semibold leading-none sm:text-3xl">
                          {price}
                        </span>
                        <span className="ml-1 text-base font-semibold sm:text-lg">
                          만원
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-[#1d1815] p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] sm:rounded-[2rem] sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 sm:text-sm sm:tracking-[0.24em]">
                Consultation
              </p>

              <h2 className="mt-3 break-keep text-[22px] font-semibold leading-tight sm:mt-4 sm:text-2xl">
                예식 일정과 분위기에 맞춰
                <br />
                가장 안정적인 구성을 안내해드립니다
              </h2>

              <p className="mt-4 break-keep text-[13px] leading-7 text-white/72 sm:text-base sm:leading-8">
                촬영 가능 여부와 원하시는 분위기를 남겨주시면, 위브스냅이 예식
                흐름에 맞는 구성으로 자세히 상담해드리겠습니다.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8">
                <a
                  href="https://open.kakao.com/o/s2cR31ph/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-[#1d1815] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3ede4] sm:py-4"
                >
                  카카오톡으로 문의하기
                </a>

                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-[14px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:py-4"
                >
                  포트폴리오 먼저 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}