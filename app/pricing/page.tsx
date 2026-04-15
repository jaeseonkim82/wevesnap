import Header from "@/components/common/Header";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f2ec] text-[#1d1815]">
      <Header />

      <section className="bg-[#1d1815] px-6 pb-16 pt-32 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.32em] text-white/55">
            Pricing
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            위브스냅 촬영비용 안내
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
            예식의 흐름과 분위기를 자연스럽고 안정감 있게 담아드리기 위한
            본식스냅 기준 구성입니다. 필요한 구성은 더하고, 부담은 줄일 수
            있도록 명확하게 안내해드립니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-[#e3d8cc] bg-white p-8 shadow-[0_18px_40px_rgba(0,0,0,0.04)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-[#9b846d]">
              Main Package
            </p>

            <div className="mt-5 flex flex-col gap-6 border-b border-[#eee5db] pb-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold text-[#1d1815] sm:text-4xl">
                  본식스냅
                </h2>

                <p className="mt-4 text-base leading-8 text-[#6b625b]">
                  신부대기실부터 본식, 원판촬영까지 예식의 핵심 흐름을
                  안정적으로 담아드리는 기본 구성입니다.
                </p>
              </div>

              <div className="shrink-0 rounded-[1.6rem] bg-[#f8f4ee] px-6 py-5 text-left md:min-w-[200px] md:text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9b846d]">
                  Price
                </p>

                <p className="mt-3 whitespace-nowrap text-[#1d1815]">
                  <span className="text-5xl font-semibold leading-none">55</span>
                  <span className="ml-1 text-2xl font-semibold">만원</span>
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-[#211c18]">
                  촬영 범위
                </h3>

                <div className="mt-5 space-y-4 text-base leading-8 text-[#5f554d]">
                  <p>• 신부대기실</p>
                  <p>• 본식스냅</p>
                  <p>• 원판촬영</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#211c18]">
                  기본 제공
                </h3>

                <div className="mt-5 space-y-4 text-base leading-8 text-[#5f554d]">
                  <p>• 원본파일 제공</p>
                  <p>• 수정파일 40장</p>
                  <p>• 전자서명 계약/현금영수증</p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[1.6rem] bg-[#f8f4ee] p-6 sm:p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-[#9b846d]">
                Notice
              </p>

              <p className="mt-4 text-sm leading-8 text-[#6b625b] sm:text-base">
                예식 시간, 장소, 이동 거리, 추가 요청 범위에 따라 일부 구성이
                조정될 수 있습니다. 정확한 일정과 예식 정보를 알려주시면 보다
                자세하게 안내해드리겠습니다.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[#e3d8cc] bg-white p-8 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#9b846d]">
                Add On
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-[#1d1815]">
                추가 구성
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.5rem] border border-[#eee3d7] bg-[#fffdfb] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xl font-semibold text-[#211c18]">
                        서브스냅 추가
                      </p>

                      <p className="mt-3 text-sm leading-8 text-[#6b625b] sm:text-base">
                        더 다양한 시선과 장면을 함께 담고 싶으실 때 추천드리는
                        구성입니다.
                      </p>

                      <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#6b625b] sm:text-base">
                        수정파일 +20장
                      </p>
                    </div>

                    <p className="shrink-0 whitespace-nowrap text-[#1d1815]">
                      <span className="text-3xl font-semibold leading-none">
                        +35
                      </span>
                      <span className="ml-1 text-lg font-semibold">만원</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e3d8cc] bg-white p-8 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#9b846d]">
                Album
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-[#1d1815]">
                앨범 옵션
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.5rem] border border-[#eee3d7] bg-[#fffdfb] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xl font-semibold text-[#211c18]">
                        13×10인치 · 50페이지
                      </p>

                      <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#6b625b] sm:text-base">
                        1권
                      </p>
                    </div>

                    <p className="shrink-0 whitespace-nowrap text-[#1d1815]">
                      <span className="text-3xl font-semibold leading-none">
                        15
                      </span>
                      <span className="ml-1 text-lg font-semibold">만원</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[#eee3d7] bg-[#fffdfb] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xl font-semibold text-[#211c18]">
                        13×10인치 · 20페이지
                      </p>

                      <p className="mt-3 whitespace-nowrap text-sm leading-7 text-[#6b625b] sm:text-base">
                        1권
                      </p>
                    </div>

                    <p className="shrink-0 whitespace-nowrap text-[#1d1815]">
                      <span className="text-3xl font-semibold leading-none">
                        6
                      </span>
                      <span className="ml-1 text-lg font-semibold">만원</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#1d1815] p-8 text-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
              <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                Consultation
              </p>

              <h2 className="mt-4 text-2xl font-semibold leading-tight">
                예식 일정과 분위기에 맞춰
                <br />
                가장 안정적인 구성을 안내해드립니다
              </h2>

              <p className="mt-4 text-sm leading-8 text-white/72 sm:text-base">
                촬영 가능 여부와 원하시는 분위기를 남겨주시면, 위브스냅이 예식
                흐름에 맞는 구성으로 자세히 상담해드리겠습니다.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="https://open.kakao.com/o/s2cR31ph/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#1d1815] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3ede4]"
                >
                  카카오톡으로 문의하기
                </a>

                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
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