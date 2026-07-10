"use client";

import { useEffect, useMemo, useState } from "react";

type Step =
  | "landing"
  | "creatorUpload"
  | "creatorAnalyzing"
  | "creatorResult"
  | "product"
  | "matching"
  | "recommendations"
  | "preview"
  | "proposal";

const steps: Step[] = [
  "landing",
  "creatorUpload",
  "creatorAnalyzing",
  "creatorResult",
  "product",
  "matching",
  "recommendations",
  "preview",
  "proposal",
];

const scenes = [
  {
    time: "00:12",
    title: "Morning Kitchen",
    description: "자연광이 들어오는 주방 테이블 장면",
    score: 96,
    category: "음료 · 식품 · 생활용품",
  },
  {
    time: "00:31",
    title: "Getting Ready",
    description: "외출을 준비하는 라이프스타일 장면",
    score: 92,
    category: "뷰티 · 패션 · 모바일 서비스",
  },
  {
    time: "00:47",
    title: "Café Conversation",
    description: "카페 테이블에서 대화를 나누는 장면",
    score: 89,
    category: "음료 · 디저트 · 라이프스타일",
  },
];

const contents = [
  {
    title: "A Calm Morning Routine",
    creator: "Mina Daily",
    audience: "20–34세 라이프스타일 관심층",
    score: 96,
    scenes: 3,
    tone: "Warm Lifestyle",
  },
  {
    title: "Weekend Café Vlog",
    creator: "Jade Archive",
    audience: "20–39세 카페·여행 관심층",
    score: 93,
    scenes: 4,
    tone: "Urban Casual",
  },
  {
    title: "Healthy Office Life",
    creator: "Daily Hyun",
    audience: "25–40세 직장인·웰니스 관심층",
    score: 89,
    scenes: 2,
    tone: "Clean & Modern",
  },
];

export default function AdmeetAIDemoPage() {
  const [step, setStep] = useState<Step>("landing");
  const [progress, setProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState<"before" | "after">(
    "before"
  );
  const [selectedScene, setSelectedScene] = useState(0);
  const [selectedContent, setSelectedContent] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [productUploaded, setProductUploaded] = useState(false);

  const currentIndex = steps.indexOf(step);

  useEffect(() => {
    if (step !== "creatorAnalyzing" && step !== "matching") return;

    setProgress(0);

    const timer = window.setInterval(() => {
      setProgress((previous) => {
        const next = previous + Math.floor(Math.random() * 8) + 3;

        if (next >= 100) {
          window.clearInterval(timer);

          window.setTimeout(() => {
            setStep(
              step === "creatorAnalyzing"
                ? "creatorResult"
                : "recommendations"
            );
          }, 500);

          return 100;
        }

        return next;
      });
    }, 180);

    return () => window.clearInterval(timer);
  }, [step]);

  const analysisMessage = useMemo(() => {
    if (progress < 25) return "영상의 장면과 컷을 구분하고 있습니다.";
    if (progress < 50) return "인물, 배경, 오브젝트를 분석하고 있습니다.";
    if (progress < 75) return "광고 삽입이 가능한 영역을 찾고 있습니다.";
    if (progress < 95) return "제품과 콘텐츠의 적합도를 계산하고 있습니다.";
    return "분석이 완료되었습니다.";
  }, [progress]);

  function goBack() {
    if (currentIndex <= 0) return;
    setStep(steps[currentIndex - 1]);
  }

  function resetDemo() {
    setStep("landing");
    setProgress(0);
    setPreviewMode("before");
    setUploaded(false);
    setProductUploaded(false);
    setSelectedScene(0);
    setSelectedContent(0);
  }

  return (
    <main className="admeet-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={resetDemo}>
          <span className="brand-mark">A</span>
          <span>
            admeet<span className="brand-ai">AI</span>
          </span>
        </button>

        <div className="topbar-center">
          <span className="status-dot" />
          Interactive MVP Demo
        </div>

        <div className="topbar-actions">
          {step !== "landing" && (
            <button className="text-button" onClick={goBack}>
              ← 이전
            </button>
          )}

          <button className="text-button" onClick={resetDemo}>
            처음부터
          </button>
        </div>
      </header>

      <section className="workspace">
        {step !== "landing" && (
          <div className="progress-rail">
            {steps.slice(1).map((item, index) => {
              const actualIndex = index + 1;
              const active = actualIndex <= currentIndex;

              return (
                <div
                  key={item}
                  className={`rail-segment ${active ? "active" : ""}`}
                />
              );
            })}
          </div>
        )}

        {step === "landing" && (
          <section className="screen landing-screen">
            <div className="eyebrow">
              AI-POWERED PRODUCT PLACEMENT PLATFORM
            </div>

            <h1>
              The right product.
              <br />
              <span>The perfect scene.</span>
            </h1>

            <p className="hero-copy">
              콘텐츠 속 광고 가능 장면을 AI가 분석하고,
              <br />
              광고주의 제품과 가장 자연스러운 순간을 연결합니다.
            </p>

            <div className="role-grid">
              <button
                className="role-card"
                onClick={() => setStep("creatorUpload")}
              >
                <div className="role-icon creator-icon">▶</div>

                <div>
                  <span className="role-label">CONTENT CREATOR</span>
                  <h2>콘텐츠 제작자로 시작</h2>
                  <p>
                    영상을 업로드하고 AI가 찾아낸 광고 가능 장면을
                    확인합니다.
                  </p>
                </div>

                <span className="role-arrow">↗</span>
              </button>

              <button
                className="role-card"
                onClick={() => setStep("product")}
              >
                <div className="role-icon advertiser-icon">◆</div>

                <div>
                  <span className="role-label">ADVERTISER</span>
                  <h2>광고주로 시작</h2>
                  <p>
                    제품을 등록하고 가장 적합한 콘텐츠와 장면을
                    추천받습니다.
                  </p>
                </div>

                <span className="role-arrow">↗</span>
              </button>
            </div>

            <div className="flow-caption">
              <span>Upload</span>
              <i />
              <span>Analyze</span>
              <i />
              <span>Match</span>
              <i />
              <span>Preview</span>
              <i />
              <span>Connect</span>
            </div>
          </section>
        )}

        {step === "creatorUpload" && (
          <section className="screen split-screen">
            <div className="intro-panel">
              <div className="step-number">01</div>
              <div className="eyebrow">CREATOR STUDIO</div>

              <h1>
                콘텐츠를 업로드하면
                <br />
                AI가 광고 기회를 찾습니다.
              </h1>

              <p>
                Admeet AI가 영상의 장면, 공간, 분위기와 오브젝트를
                분석해 제품이 자연스럽게 들어갈 수 있는 순간을
                찾아냅니다.
              </p>

              <div className="mini-feature-list">
                <div>
                  <span>01</span>
                  장면별 광고 적합도 분석
                </div>
                <div>
                  <span>02</span>
                  제품 삽입 가능 영역 탐색
                </div>
                <div>
                  <span>03</span>
                  브랜드 카테고리 자동 추천
                </div>
              </div>
            </div>

            <div className="main-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-label">NEW CONTENT</span>
                  <h2>영상 업로드</h2>
                </div>

                <span className="secure-badge">Secure Upload</span>
              </div>

              <button
                className={`upload-zone ${uploaded ? "uploaded" : ""}`}
                onClick={() => setUploaded(true)}
              >
                {!uploaded ? (
                  <>
                    <div className="upload-icon">↑</div>
                    <h3>영상을 이곳에 업로드하세요</h3>
                    <p>MP4, MOV · 최대 5GB</p>
                    <span className="outline-button">파일 선택</span>
                  </>
                ) : (
                  <>
                    <div className="video-file-card">
                      <div className="video-thumbnail">
                        <span>▶</span>
                      </div>

                      <div className="file-info">
                        <strong>morning_routine_final.mp4</strong>
                        <span>01:24 · 1920 × 1080 · 248MB</span>
                      </div>

                      <div className="file-complete">✓</div>
                    </div>

                    <div className="upload-success">
                      업로드가 완료되었습니다.
                    </div>
                  </>
                )}
              </button>

              <div className="form-row">
                <label>
                  콘텐츠 제목
                  <input
                    defaultValue="A Calm Morning Routine"
                    placeholder="콘텐츠 제목"
                  />
                </label>

                <label>
                  콘텐츠 카테고리
                  <select defaultValue="lifestyle">
                    <option value="lifestyle">Lifestyle</option>
                    <option value="beauty">Beauty</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                  </select>
                </label>
              </div>

              <button
                className="primary-button full-button"
                disabled={!uploaded}
                onClick={() => setStep("creatorAnalyzing")}
              >
                Admeet AI 분석 시작
                <span>→</span>
              </button>
            </div>
          </section>
        )}

        {step === "creatorAnalyzing" && (
          <section className="screen analysis-screen">
            <div className="analysis-visual">
              <div className="video-stage">
                <div className="fake-video">
                  <div className="window-light" />
                  <div className="table" />
                  <div className="cup" />
                  <div className="person-shape" />
                  <div className="scan-line" />
                  <div className="object-box box-one">
                    <span>Surface</span>
                    94%
                  </div>
                  <div className="object-box box-two">
                    <span>Placement Zone</span>
                    96%
                  </div>
                </div>

                <div className="timeline">
                  <div
                    className="timeline-progress"
                    style={{ width: `${progress}%` }}
                  />
                  <span style={{ left: "16%" }} />
                  <span style={{ left: "42%" }} />
                  <span style={{ left: "74%" }} />
                </div>
              </div>
            </div>

            <div className="analysis-copy">
              <div className="ai-orbit">
                <div className="orbit-ring ring-one" />
                <div className="orbit-ring ring-two" />
                <span>AI</span>
              </div>

              <div className="eyebrow">CONTENT INTELLIGENCE</div>
              <h1>콘텐츠를 분석하고 있습니다.</h1>
              <p>{analysisMessage}</p>

              <div className="large-progress">
                <div style={{ width: `${progress}%` }} />
              </div>

              <div className="progress-number">{progress}%</div>

              <div className="analysis-checks">
                <div className={progress >= 25 ? "done" : ""}>
                  <span>{progress >= 25 ? "✓" : "•"}</span>
                  Scene detection
                </div>

                <div className={progress >= 50 ? "done" : ""}>
                  <span>{progress >= 50 ? "✓" : "•"}</span>
                  Object recognition
                </div>

                <div className={progress >= 75 ? "done" : ""}>
                  <span>{progress >= 75 ? "✓" : "•"}</span>
                  Placement opportunity
                </div>

                <div className={progress >= 95 ? "done" : ""}>
                  <span>{progress >= 95 ? "✓" : "•"}</span>
                  Brand suitability
                </div>
              </div>
            </div>
          </section>
        )}

        {step === "creatorResult" && (
          <section className="screen result-screen">
            <div className="section-header">
              <div>
                <div className="eyebrow">ANALYSIS COMPLETE</div>
                <h1>3개의 광고 가능 장면을 찾았습니다.</h1>
                <p>
                  콘텐츠의 분위기와 장면 구성에 가장 적합한 광고
                  카테고리입니다.
                </p>
              </div>

              <div className="score-summary">
                <span>Content Ad Potential</span>
                <strong>94</strong>
                <small>/ 100</small>
              </div>
            </div>

            <div className="result-layout">
              <div className="video-result-card">
                <div className="fake-video large">
                  <div className="window-light" />
                  <div className="table" />
                  <div className="cup" />
                  <div className="person-shape" />

                  <div className="play-button">▶</div>

                  <div className="video-label">
                    A Calm Morning Routine
                    <span>01:24</span>
                  </div>
                </div>

                <div className="video-timeline">
                  <div className="timeline-base" />
                  <button
                    className="scene-point point-one"
                    onClick={() => setSelectedScene(0)}
                  >
                    00:12
                  </button>
                  <button
                    className="scene-point point-two"
                    onClick={() => setSelectedScene(1)}
                  >
                    00:31
                  </button>
                  <button
                    className="scene-point point-three"
                    onClick={() => setSelectedScene(2)}
                  >
                    00:47
                  </button>
                </div>
              </div>

              <div className="scene-list">
                {scenes.map((scene, index) => (
                  <button
                    key={scene.time}
                    className={`scene-card ${
                      selectedScene === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedScene(index)}
                  >
                    <div className="scene-time">{scene.time}</div>

                    <div className="scene-data">
                      <strong>{scene.title}</strong>
                      <p>{scene.description}</p>
                      <span>{scene.category}</span>
                    </div>

                    <div className="scene-score">
                      <small>AD FIT</small>
                      <strong>{scene.score}%</strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bottom-action">
              <div>
                <strong>제작자 콘텐츠 등록 완료</strong>
                <span>
                  이제 광고주가 이 콘텐츠를 추천받을 수 있습니다.
                </span>
              </div>

              <button
                className="primary-button"
                onClick={() => setStep("product")}
              >
                광고주 화면으로 이동
                <span>→</span>
              </button>
            </div>
          </section>
        )}

        {step === "product" && (
          <section className="screen product-screen">
            <div className="section-header compact">
              <div>
                <div className="eyebrow">ADVERTISER WORKSPACE</div>
                <h1>광고할 제품을 등록하세요.</h1>
                <p>
                  제품 정보와 브랜드 방향을 기반으로 AI가 적합한
                  콘텐츠를 추천합니다.
                </p>
              </div>

              <span className="campaign-badge">New Campaign</span>
            </div>

            <div className="product-layout">
              <button
                className={`product-upload ${
                  productUploaded ? "uploaded" : ""
                }`}
                onClick={() => setProductUploaded(true)}
              >
                {!productUploaded ? (
                  <>
                    <div className="product-upload-icon">＋</div>
                    <h3>제품 이미지 업로드</h3>
                    <p>PNG 또는 JPG</p>
                  </>
                ) : (
                  <div className="product-visual">
                    <div className="bottle">
                      <div className="bottle-cap" />
                      <div className="bottle-label">
                        <strong>AURA</strong>
                        <span>SPARKLING WATER</span>
                      </div>
                    </div>

                    <div className="product-glow" />
                  </div>
                )}
              </button>

              <div className="product-form">
                <label>
                  제품명
                  <input defaultValue="AURA Sparkling Water" />
                </label>

                <div className="form-row">
                  <label>
                    카테고리
                    <select defaultValue="beverage">
                      <option value="beverage">Beverage</option>
                      <option value="beauty">Beauty</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </label>

                  <label>
                    주요 타깃
                    <input defaultValue="20–34세 라이프스타일 관심 고객" />
                  </label>
                </div>

                <label>
                  브랜드 이미지
                  <div className="tag-selector">
                    <button className="active">Clean</button>
                    <button className="active">Refreshing</button>
                    <button className="active">Premium</button>
                    <button>Playful</button>
                    <button>Natural</button>
                  </div>
                </label>

                <label>
                  캠페인 목표
                  <textarea defaultValue="브랜드의 청량하고 세련된 이미지를 일상 콘텐츠 안에 자연스럽게 노출하고 싶습니다." />
                </label>

                <button
                  className="primary-button full-button"
                  disabled={!productUploaded}
                  onClick={() => setStep("matching")}
                >
                  AI 콘텐츠 추천받기
                  <span>→</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {step === "matching" && (
          <section className="screen matching-screen">
            <div className="matching-network">
              <div className="center-product">
                <div className="mini-bottle">
                  <span>AURA</span>
                </div>
              </div>

              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={`network-node node-${item + 1}`}
                >
                  <div className="node-thumbnail" />
                  <span>{89 + item}%</span>
                </div>
              ))}

              <svg className="network-lines" viewBox="0 0 800 500">
                <line x1="400" y1="250" x2="125" y2="100" />
                <line x1="400" y1="250" x2="400" y2="60" />
                <line x1="400" y1="250" x2="675" y2="110" />
                <line x1="400" y1="250" x2="150" y2="390" />
                <line x1="400" y1="250" x2="410" y2="445" />
                <line x1="400" y1="250" x2="680" y2="390" />
              </svg>
            </div>

            <div className="matching-copy">
              <div className="eyebrow">AI CONTENT MATCHING</div>
              <h1>
                제품에 가장 적합한
                <br />
                콘텐츠를 찾고 있습니다.
              </h1>

              <p>{analysisMessage}</p>

              <div className="large-progress">
                <div style={{ width: `${progress}%` }} />
              </div>

              <div className="matching-stats">
                <div>
                  <span>Analyzed Contents</span>
                  <strong>{Math.min(248, progress * 3)}</strong>
                </div>

                <div>
                  <span>Candidate Scenes</span>
                  <strong>{Math.min(76, progress)}</strong>
                </div>

                <div>
                  <span>Top Matches</span>
                  <strong>{progress > 82 ? 12 : "—"}</strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === "recommendations" && (
          <section className="screen recommendations-screen">
            <div className="section-header">
              <div>
                <div className="eyebrow">AI RECOMMENDATIONS</div>
                <h1>제품과 가장 잘 어울리는 콘텐츠입니다.</h1>
                <p>
                  장면의 맥락, 시청자 성향과 브랜드 이미지를 종합해
                  추천했습니다.
                </p>
              </div>

              <div className="filter-pills">
                <button className="active">Best Match</button>
                <button>Audience</button>
                <button>Natural Fit</button>
              </div>
            </div>

            <div className="content-grid">
              {contents.map((content, index) => (
                <button
                  className={`content-card ${
                    selectedContent === index ? "selected" : ""
                  }`}
                  key={content.title}
                  onClick={() => setSelectedContent(index)}
                >
                  <div className={`content-thumb thumb-${index + 1}`}>
                    <div className="thumb-person" />
                    <div className="thumb-table" />
                    <span className="match-badge">
                      {content.score}% Match
                    </span>
                    <span className="thumb-play">▶</span>
                  </div>

                  <div className="content-info">
                    <span className="content-tone">{content.tone}</span>
                    <h3>{content.title}</h3>
                    <p>by {content.creator}</p>

                    <div className="content-meta">
                      <span>{content.audience}</span>
                      <span>{content.scenes} Scenes</span>
                    </div>
                  </div>

                  <div className="selected-indicator">✓</div>
                </button>
              ))}
            </div>

            <div className="recommendation-detail">
              <div>
                <span className="detail-label">AI RECOMMENDATION</span>
                <strong>
                  “AURA의 깨끗하고 청량한 이미지가 아침 루틴 장면의
                  자연광과 가장 잘 어울립니다.”
                </strong>
              </div>

              <div className="detail-scores">
                <div>
                  <span>Brand Fit</span>
                  <strong>96%</strong>
                </div>
                <div>
                  <span>Audience Fit</span>
                  <strong>91%</strong>
                </div>
                <div>
                  <span>Naturalness</span>
                  <strong>94%</strong>
                </div>
              </div>

              <button
                className="primary-button"
                onClick={() => setStep("preview")}
              >
                AI 프리뷰 확인
                <span>→</span>
              </button>
            </div>
          </section>
        )}

        {step === "preview" && (
          <section className="screen preview-screen">
            <div className="preview-heading">
              <div>
                <div className="eyebrow">GENERATIVE PREVIEW</div>
                <h1>광고 집행 전, 실제 노출 장면을 확인하세요.</h1>
              </div>

              <div className="preview-toggle">
                <button
                  className={previewMode === "before" ? "active" : ""}
                  onClick={() => setPreviewMode("before")}
                >
                  Original
                </button>

                <button
                  className={previewMode === "after" ? "active" : ""}
                  onClick={() => setPreviewMode("after")}
                >
                  AI Preview
                </button>
              </div>
            </div>

            <div className="preview-layout">
              <div className="preview-player">
                <div
                  className={`preview-scene ${
                    previewMode === "after" ? "with-product" : ""
                  }`}
                >
                  <div className="preview-window" />
                  <div className="preview-table" />
                  <div className="preview-person" />
                  <div className="preview-cup" />

                  <div className="inserted-product">
                    <div className="preview-bottle-cap" />
                    <strong>AURA</strong>
                  </div>

                  <div className="preview-top-label">
                    {previewMode === "before"
                      ? "ORIGINAL CONTENT"
                      : "AI-GENERATED PREVIEW"}
                  </div>

                  <div className="preview-play">▶</div>

                  <div className="preview-time">00:31 / 01:24</div>
                </div>

                <div className="preview-controls">
                  <button>▶</button>
                  <div className="control-track">
                    <div />
                  </div>
                  <span>00:31</span>
                  <button>⛶</button>
                </div>
              </div>

              <aside className="preview-sidebar">
                <div className="preview-product-card">
                  <div className="tiny-bottle">
                    <span>AURA</span>
                  </div>

                  <div>
                    <span>PLACEMENT PRODUCT</span>
                    <strong>AURA Sparkling Water</strong>
                    <small>Beverage · Premium Lifestyle</small>
                  </div>
                </div>

                <div className="placement-info">
                  <span className="detail-label">RECOMMENDED SCENE</span>
                  <h3>00:31 · Morning Table Scene</h3>
                  <p>
                    자연광과 밝은 배경이 제품의 투명하고 청량한
                    이미지를 효과적으로 강조합니다.
                  </p>
                </div>

                <div className="metric-list">
                  <div>
                    <span>Visual Naturalness</span>
                    <strong>94%</strong>
                  </div>
                  <div>
                    <span>Brand Relevance</span>
                    <strong>96%</strong>
                  </div>
                  <div>
                    <span>Audience Compatibility</span>
                    <strong>91%</strong>
                  </div>
                </div>

                <button
                  className="primary-button full-button"
                  onClick={() => setStep("proposal")}
                >
                  이 콘텐츠에 광고 제안
                  <span>→</span>
                </button>
              </aside>
            </div>
          </section>
        )}

        {step === "proposal" && (
          <section className="screen proposal-screen">
            <div className="proposal-success">
              <div className="success-rings">
                <div />
                <div />
                <span>✓</span>
              </div>

              <div className="eyebrow">PROPOSAL SENT</div>
              <h1>광고 제안이 제작자에게 전달되었습니다.</h1>

              <p>
                제작자가 제안을 검토하고 승인하면
                <br />
                캠페인 제작 단계가 시작됩니다.
              </p>

              <div className="proposal-card">
                <div className="proposal-product">
                  <div className="tiny-bottle">
                    <span>AURA</span>
                  </div>

                  <div>
                    <span>CAMPAIGN</span>
                    <strong>AURA Sparkling Water</strong>
                    <small>A Calm Morning Routine · 00:31</small>
                  </div>
                </div>

                <div className="proposal-status">
                  <span className="status-dot" />
                  Waiting for creator approval
                </div>
              </div>

              <div className="final-flow">
                <div className="complete">
                  <span>✓</span>
                  Product
                </div>
                <i />
                <div className="complete">
                  <span>✓</span>
                  Matching
                </div>
                <i />
                <div className="complete">
                  <span>✓</span>
                  Preview
                </div>
                <i />
                <div className="current">
                  <span>4</span>
                  Proposal
                </div>
                <i />
                <div>
                  <span>5</span>
                  Production
                </div>
              </div>

              <button className="primary-button" onClick={resetDemo}>
                데모 다시 시작
                <span>↻</span>
              </button>
            </div>
          </section>
        )}
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .admeet-page {
          --bg: #07090d;
          --panel: rgba(20, 24, 32, 0.88);
          --panel-soft: rgba(255, 255, 255, 0.045);
          --line: rgba(255, 255, 255, 0.1);
          --text: #f5f7fb;
          --muted: #8f98a8;
          --purple: #8b7cff;
          --cyan: #63e6d2;
          --blue: #4ba8ff;

          position: relative;
          min-height: 100vh;
          overflow: hidden;
          color: var(--text);
          background:
            radial-gradient(
              circle at 50% -20%,
              rgba(107, 85, 255, 0.18),
              transparent 38%
            ),
            var(--bg);
          font-family:
            Inter, Pretendard, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        .ambient {
          position: fixed;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          opacity: 0.12;
        }

        .ambient-one {
          top: -260px;
          right: -130px;
          background: #765bff;
        }

        .ambient-two {
          bottom: -300px;
          left: -150px;
          background: #20d6bd;
        }

        .topbar {
          position: relative;
          z-index: 10;
          height: 72px;
          padding: 0 42px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          border-bottom: 1px solid var(--line);
          background: rgba(7, 9, 13, 0.78);
          backdrop-filter: blur(22px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          width: fit-content;
          border: 0;
          color: white;
          background: transparent;
          font-size: 21px;
          font-weight: 750;
          letter-spacing: -0.04em;
        }

        .brand-mark {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--purple), var(--cyan));
          color: #05060a;
          font-size: 15px;
          font-weight: 900;
        }

        .brand-ai {
          color: var(--cyan);
          margin-left: 2px;
        }

        .topbar-center {
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--muted);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 14px var(--cyan);
        }

        .topbar-actions {
          justify-self: end;
          display: flex;
          gap: 18px;
        }

        .text-button {
          border: 0;
          background: transparent;
          color: #aeb6c5;
          font-size: 13px;
        }

        .text-button:hover {
          color: white;
        }

        .workspace {
          position: relative;
          z-index: 2;
          width: min(1440px, 100%);
          min-height: calc(100vh - 72px);
          margin: 0 auto;
          padding: 32px 44px 46px;
        }

        .progress-rail {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 7px;
          margin-bottom: 30px;
        }

        .rail-segment {
          height: 2px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .rail-segment.active {
          background: linear-gradient(90deg, var(--purple), var(--cyan));
          box-shadow: 0 0 12px rgba(99, 230, 210, 0.25);
        }

        .screen {
          min-height: calc(100vh - 150px);
          animation: screenIn 0.45s ease;
        }

        @keyframes screenIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .landing-screen {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-bottom: 30px;
        }

        .eyebrow,
        .panel-label,
        .detail-label,
        .content-tone {
          color: var(--cyan);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        .landing-screen h1 {
          margin: 20px 0 22px;
          font-size: clamp(52px, 6vw, 88px);
          line-height: 0.98;
          letter-spacing: -0.065em;
        }

        .landing-screen h1 span {
          background: linear-gradient(
            90deg,
            #ffffff 10%,
            #aaa2ff 54%,
            #6ce7d3
          );
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero-copy {
          color: var(--muted);
          font-size: 18px;
          line-height: 1.7;
        }

        .role-grid {
          width: min(950px, 100%);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-top: 42px;
        }

        .role-card {
          position: relative;
          min-height: 190px;
          padding: 28px;
          display: grid;
          grid-template-columns: 56px 1fr 26px;
          gap: 20px;
          align-items: start;
          text-align: left;
          border: 1px solid var(--line);
          border-radius: 24px;
          color: white;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.075),
            rgba(255, 255, 255, 0.025)
          );
          transition: 0.3s ease;
        }

        .role-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 124, 255, 0.55);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
        }

        .role-icon {
          width: 54px;
          height: 54px;
          display: grid;
          place-items: center;
          border-radius: 17px;
          font-size: 17px;
        }

        .creator-icon {
          color: #0a0b0f;
          background: var(--cyan);
        }

        .advertiser-icon {
          color: white;
          background: var(--purple);
        }

        .role-label {
          display: block;
          margin-bottom: 11px;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.17em;
        }

        .role-card h2 {
          margin-bottom: 10px;
          font-size: 23px;
          letter-spacing: -0.035em;
        }

        .role-card p {
          margin-bottom: 0;
          color: var(--muted);
          line-height: 1.6;
          font-size: 14px;
        }

        .role-arrow {
          color: #929aaa;
          font-size: 20px;
        }

        .flow-caption {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 45px;
          color: #697181;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .flow-caption i {
          width: 26px;
          height: 1px;
          background: #303641;
        }

        .split-screen {
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: 60px;
          align-items: center;
        }

        .intro-panel {
          padding: 20px 20px 20px 10px;
        }

        .step-number {
          margin-bottom: 45px;
          color: rgba(255, 255, 255, 0.08);
          font-size: 100px;
          font-weight: 800;
          line-height: 0.8;
          letter-spacing: -0.08em;
        }

        .intro-panel h1,
        .section-header h1,
        .analysis-copy h1,
        .matching-copy h1,
        .preview-heading h1 {
          margin: 17px 0;
          font-size: clamp(36px, 4vw, 58px);
          line-height: 1.1;
          letter-spacing: -0.055em;
        }

        .intro-panel > p,
        .section-header p,
        .analysis-copy > p,
        .matching-copy > p {
          max-width: 580px;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.75;
        }

        .mini-feature-list {
          display: grid;
          gap: 14px;
          margin-top: 42px;
        }

        .mini-feature-list div {
          display: flex;
          align-items: center;
          gap: 15px;
          color: #bdc4d0;
          font-size: 14px;
        }

        .mini-feature-list span {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 50%;
          color: var(--cyan);
          font-size: 10px;
        }

        .main-panel {
          padding: 30px;
          border: 1px solid var(--line);
          border-radius: 26px;
          background: var(--panel);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
          backdrop-filter: blur(24px);
        }

        .panel-heading,
        .section-header,
        .preview-heading,
        .bottom-action,
        .recommendation-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .panel-heading h2 {
          margin: 6px 0 0;
          font-size: 28px;
        }

        .secure-badge,
        .campaign-badge {
          padding: 9px 13px;
          border: 1px solid rgba(99, 230, 210, 0.2);
          border-radius: 999px;
          color: var(--cyan);
          background: rgba(99, 230, 210, 0.06);
          font-size: 11px;
        }

        .upload-zone {
          width: 100%;
          min-height: 260px;
          margin: 25px 0 22px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px dashed rgba(255, 255, 255, 0.17);
          border-radius: 20px;
          color: white;
          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(139, 124, 255, 0.1),
              transparent 50%
            ),
            rgba(255, 255, 255, 0.025);
          transition: 0.25s ease;
        }

        .upload-zone:hover,
        .upload-zone.uploaded {
          border-color: rgba(99, 230, 210, 0.44);
          background-color: rgba(99, 230, 210, 0.025);
        }

        .upload-icon {
          width: 52px;
          height: 52px;
          margin-bottom: 16px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: rgba(139, 124, 255, 0.16);
          color: #b9b1ff;
          font-size: 26px;
        }

        .upload-zone h3 {
          margin-bottom: 7px;
          font-size: 18px;
        }

        .upload-zone p {
          color: var(--muted);
          font-size: 13px;
        }

        .outline-button {
          margin-top: 9px;
          padding: 10px 17px;
          border: 1px solid var(--line);
          border-radius: 10px;
          color: #dde2eb;
          font-size: 12px;
        }

        .video-file-card {
          width: calc(100% - 40px);
          display: grid;
          grid-template-columns: 110px 1fr 34px;
          gap: 18px;
          align-items: center;
          text-align: left;
        }

        .video-thumbnail {
          height: 72px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background:
            linear-gradient(
              135deg,
              rgba(99, 230, 210, 0.25),
              rgba(139, 124, 255, 0.3)
            ),
            #161b23;
        }

        .file-info {
          display: grid;
          gap: 8px;
        }

        .file-info span,
        .upload-success {
          color: var(--muted);
          font-size: 12px;
        }

        .file-complete {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #07100d;
          background: var(--cyan);
        }

        .upload-success {
          margin-top: 22px;
          color: var(--cyan);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        label {
          display: grid;
          gap: 8px;
          color: #aab2c0;
          font-size: 12px;
        }

        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 12px;
          outline: none;
          color: white;
          background: rgba(255, 255, 255, 0.045);
        }

        input,
        select {
          height: 48px;
          padding: 0 14px;
        }

        textarea {
          min-height: 104px;
          padding: 14px;
          resize: none;
          line-height: 1.6;
        }

        input:focus,
        textarea:focus,
        select:focus {
          border-color: rgba(139, 124, 255, 0.7);
        }

        .primary-button {
          min-height: 50px;
          padding: 0 21px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 22px;
          border: 0;
          border-radius: 13px;
          color: #090a0d;
          background: linear-gradient(90deg, #8e80ff, #66e3d1);
          font-weight: 800;
          box-shadow: 0 15px 34px rgba(96, 196, 192, 0.12);
          transition: 0.25s ease;
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 42px rgba(96, 196, 192, 0.2);
        }

        .primary-button:disabled {
          cursor: not-allowed;
          opacity: 0.3;
          transform: none;
        }

        .full-button {
          width: 100%;
          margin-top: 20px;
        }

        .analysis-screen,
        .matching-screen {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 70px;
          align-items: center;
        }

        .video-stage {
          padding: 12px;
          border: 1px solid var(--line);
          border-radius: 27px;
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.4);
        }

        .fake-video {
          position: relative;
          min-height: 470px;
          overflow: hidden;
          border-radius: 19px;
          background:
            linear-gradient(
              to bottom,
              rgba(220, 225, 220, 0.13),
              rgba(38, 43, 42, 0.2)
            ),
            linear-gradient(125deg, #323936, #161b1d);
        }

        .window-light {
          position: absolute;
          top: 0;
          left: 7%;
          width: 38%;
          height: 57%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.65),
            rgba(174, 218, 206, 0.12)
          );
          clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
          opacity: 0.48;
        }

        .table {
          position: absolute;
          left: 6%;
          right: 6%;
          bottom: 0;
          height: 30%;
          background: linear-gradient(180deg, #5a4d42, #29241f);
          transform: perspective(500px) rotateX(58deg);
          transform-origin: bottom;
        }

        .cup {
          position: absolute;
          right: 26%;
          bottom: 28%;
          width: 44px;
          height: 57px;
          border-radius: 6px 6px 15px 15px;
          background: linear-gradient(90deg, #cbc7bd, #f5f1e8);
          box-shadow: 0 12px 22px rgba(0, 0, 0, 0.25);
        }

        .person-shape {
          position: absolute;
          left: 49%;
          bottom: 15%;
          width: 150px;
          height: 280px;
          border-radius: 80px 80px 25px 25px;
          background:
            radial-gradient(
              circle at 50% 16%,
              #d3b59f 0 14%,
              transparent 15%
            ),
            linear-gradient(
              to bottom,
              transparent 0 24%,
              #1f242a 25% 100%
            );
          opacity: 0.9;
        }

        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--cyan);
          box-shadow: 0 0 18px var(--cyan);
          animation: scan 2.4s linear infinite;
        }

        @keyframes scan {
          from {
            top: 4%;
          }
          to {
            top: 96%;
          }
        }

        .object-box {
          position: absolute;
          padding: 7px 9px;
          display: grid;
          gap: 3px;
          border: 1px solid var(--cyan);
          color: white;
          background: rgba(7, 9, 13, 0.75);
          font-size: 11px;
        }

        .object-box span {
          color: var(--cyan);
          font-size: 9px;
        }

        .box-one {
          right: 20%;
          bottom: 24%;
        }

        .box-two {
          left: 17%;
          bottom: 18%;
        }

        .timeline {
          position: relative;
          height: 4px;
          margin: 19px 8px 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .timeline-progress {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--purple), var(--cyan));
          transition: width 0.2s linear;
        }

        .timeline > span {
          position: absolute;
          top: 50%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--cyan);
          transform: translate(-50%, -50%);
        }

        .analysis-copy,
        .matching-copy {
          max-width: 520px;
        }

        .ai-orbit {
          position: relative;
          width: 86px;
          height: 86px;
          margin-bottom: 35px;
          display: grid;
          place-items: center;
        }

        .ai-orbit > span {
          position: relative;
          z-index: 2;
          width: 45px;
          height: 45px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          color: #080a0e;
          background: linear-gradient(135deg, var(--purple), var(--cyan));
          font-size: 13px;
          font-weight: 900;
        }

        .orbit-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(99, 230, 210, 0.32);
          border-radius: 50%;
          animation: rotate 4s linear infinite;
        }

        .orbit-ring::after {
          content: "";
          position: absolute;
          top: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 14px var(--cyan);
        }

        .ring-two {
          inset: 9px;
          animation-direction: reverse;
          animation-duration: 2.8s;
          border-color: rgba(139, 124, 255, 0.4);
        }

        .ring-two::after {
          background: var(--purple);
        }

        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }

        .large-progress {
          width: 100%;
          height: 7px;
          margin-top: 28px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .large-progress > div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--purple), var(--cyan));
          box-shadow: 0 0 18px rgba(99, 230, 210, 0.4);
          transition: width 0.2s linear;
        }

        .progress-number {
          margin-top: 12px;
          color: white;
          font-size: 36px;
          font-weight: 750;
        }

        .analysis-checks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 31px;
        }

        .analysis-checks div {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #656e7d;
          font-size: 12px;
          transition: 0.25s;
        }

        .analysis-checks span {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 50%;
        }

        .analysis-checks .done {
          color: #c5ccd7;
        }

        .analysis-checks .done span {
          color: #07100d;
          border-color: var(--cyan);
          background: var(--cyan);
        }

        .section-header {
          margin-bottom: 28px;
        }

        .section-header.compact {
          margin-bottom: 30px;
        }

        .section-header h1,
        .preview-heading h1 {
          margin-bottom: 10px;
          font-size: clamp(34px, 4vw, 53px);
        }

        .score-summary {
          min-width: 190px;
          padding: 18px 22px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--panel-soft);
        }

        .score-summary span {
          display: block;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .score-summary strong {
          color: var(--cyan);
          font-size: 45px;
          letter-spacing: -0.06em;
        }

        .score-summary small {
          color: var(--muted);
        }

        .result-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 22px;
        }

        .video-result-card {
          padding: 12px;
          border: 1px solid var(--line);
          border-radius: 22px;
          background: var(--panel-soft);
        }

        .fake-video.large {
          min-height: 410px;
        }

        .play-button,
        .preview-play {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          background: rgba(9, 11, 16, 0.55);
          backdrop-filter: blur(14px);
          transform: translate(-50%, -50%);
        }

        .video-label {
          position: absolute;
          right: 20px;
          bottom: 18px;
          left: 20px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .video-label span {
          color: #bac1cc;
        }

        .video-timeline {
          position: relative;
          height: 52px;
          margin: 9px 10px 0;
        }

        .timeline-base {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.09);
        }

        .scene-point {
          position: absolute;
          top: 50%;
          padding: 5px 8px;
          border: 1px solid rgba(99, 230, 210, 0.38);
          border-radius: 8px;
          color: var(--cyan);
          background: #10161b;
          font-size: 10px;
          transform: translate(-50%, -50%);
        }

        .point-one {
          left: 18%;
        }

        .point-two {
          left: 46%;
        }

        .point-three {
          left: 72%;
        }

        .scene-list {
          display: grid;
          gap: 12px;
        }

        .scene-card {
          width: 100%;
          padding: 20px;
          display: grid;
          grid-template-columns: 62px 1fr auto;
          gap: 18px;
          align-items: center;
          text-align: left;
          border: 1px solid var(--line);
          border-radius: 17px;
          color: white;
          background: var(--panel-soft);
          transition: 0.25s ease;
        }

        .scene-card.selected {
          border-color: rgba(99, 230, 210, 0.5);
          background: rgba(99, 230, 210, 0.065);
          transform: translateX(-5px);
        }

        .scene-time {
          color: var(--cyan);
          font-size: 20px;
          font-weight: 750;
          letter-spacing: -0.04em;
        }

        .scene-data {
          display: grid;
          gap: 7px;
        }

        .scene-data p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
        }

        .scene-data span {
          color: #a8b0bd;
          font-size: 10px;
        }

        .scene-score {
          text-align: right;
        }

        .scene-score small {
          display: block;
          color: var(--muted);
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .scene-score strong {
          color: var(--cyan);
          font-size: 21px;
        }

        .bottom-action {
          margin-top: 22px;
          padding: 19px 22px;
          border: 1px solid var(--line);
          border-radius: 17px;
          background: var(--panel-soft);
        }

        .bottom-action > div {
          display: grid;
          gap: 5px;
        }

        .bottom-action span {
          color: var(--muted);
          font-size: 12px;
        }

        .product-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 28px;
        }

        .product-upload,
        .product-form {
          min-height: 555px;
          border: 1px solid var(--line);
          border-radius: 24px;
          background: var(--panel);
        }

        .product-upload {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
        }

        .product-upload-icon {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          border: 1px solid var(--line);
          border-radius: 18px;
          font-size: 25px;
        }

        .product-upload h3 {
          margin-bottom: 7px;
        }

        .product-upload p {
          color: var(--muted);
          font-size: 12px;
        }

        .product-visual {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background:
            radial-gradient(
              circle at 50% 55%,
              rgba(99, 230, 210, 0.22),
              transparent 34%
            ),
            linear-gradient(145deg, #11161c, #090b10);
        }

        .bottle {
          position: relative;
          z-index: 2;
          width: 135px;
          height: 335px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 26px 26px 42px 42px;
          background: linear-gradient(
            90deg,
            rgba(180, 255, 242, 0.13),
            rgba(247, 255, 252, 0.56),
            rgba(125, 218, 203, 0.16)
          );
          box-shadow:
            inset 14px 0 18px rgba(255, 255, 255, 0.16),
            0 30px 65px rgba(0, 0, 0, 0.45);
        }

        .bottle-cap {
          position: absolute;
          top: -39px;
          left: 31px;
          width: 72px;
          height: 46px;
          border-radius: 12px 12px 5px 5px;
          background: linear-gradient(90deg, #c7ccd2, #f8fafb, #8a929c);
        }

        .bottle-label {
          position: absolute;
          top: 118px;
          left: 12px;
          right: 12px;
          padding: 28px 8px;
          display: grid;
          gap: 7px;
          text-align: center;
          border-radius: 9px;
          color: #0a2724;
          background: rgba(224, 255, 248, 0.76);
        }

        .bottle-label strong {
          font-size: 25px;
          letter-spacing: 0.12em;
        }

        .bottle-label span {
          font-size: 8px;
          letter-spacing: 0.16em;
        }

        .product-glow {
          position: absolute;
          bottom: 80px;
          width: 250px;
          height: 50px;
          border-radius: 50%;
          background: rgba(99, 230, 210, 0.28);
          filter: blur(22px);
        }

        .product-form {
          padding: 28px;
          display: grid;
          gap: 17px;
        }

        .tag-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-selector button,
        .filter-pills button,
        .preview-toggle button {
          padding: 9px 13px;
          border: 1px solid var(--line);
          border-radius: 999px;
          color: #9ca5b3;
          background: rgba(255, 255, 255, 0.025);
          font-size: 11px;
        }

        .tag-selector button.active,
        .filter-pills button.active,
        .preview-toggle button.active {
          border-color: rgba(99, 230, 210, 0.4);
          color: var(--cyan);
          background: rgba(99, 230, 210, 0.08);
        }

        .matching-network {
          position: relative;
          min-height: 580px;
        }

        .center-product {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 50%;
          width: 145px;
          height: 145px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(99, 230, 210, 0.36);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(99, 230, 210, 0.18),
            rgba(9, 13, 18, 0.95) 68%
          );
          box-shadow: 0 0 55px rgba(99, 230, 210, 0.13);
          transform: translate(-50%, -50%);
        }

        .mini-bottle,
        .tiny-bottle {
          width: 46px;
          height: 92px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 10px 10px 15px 15px;
          color: #092420;
          background: rgba(214, 255, 246, 0.75);
          font-size: 7px;
          font-weight: 900;
        }

        .network-node {
          position: absolute;
          z-index: 2;
          width: 105px;
          padding: 8px;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: rgba(20, 25, 33, 0.9);
        }

        .node-thumbnail {
          height: 62px;
          border-radius: 9px;
          background:
            radial-gradient(
              circle at 65% 30%,
              #c9a68d 0 12%,
              transparent 13%
            ),
            linear-gradient(135deg, #46534d, #1f2528);
        }

        .network-node > span {
          display: block;
          margin-top: 6px;
          color: var(--cyan);
          text-align: right;
          font-size: 10px;
        }

        .node-1 {
          top: 6%;
          left: 8%;
        }

        .node-2 {
          top: 0;
          left: 43%;
        }

        .node-3 {
          top: 10%;
          right: 5%;
        }

        .node-4 {
          bottom: 6%;
          left: 10%;
        }

        .node-5 {
          bottom: 0;
          left: 45%;
        }

        .node-6 {
          right: 4%;
          bottom: 8%;
        }

        .network-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .network-lines line {
          stroke: rgba(99, 230, 210, 0.2);
          stroke-width: 1;
          stroke-dasharray: 4 7;
          animation: dash 2s linear infinite;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -22;
          }
        }

        .matching-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 30px;
        }

        .matching-stats div {
          padding: 15px;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: var(--panel-soft);
        }

        .matching-stats span {
          display: block;
          margin-bottom: 8px;
          color: var(--muted);
          font-size: 9px;
        }

        .matching-stats strong {
          font-size: 22px;
        }

        .filter-pills {
          display: flex;
          gap: 7px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .content-card {
          position: relative;
          padding: 10px;
          text-align: left;
          border: 1px solid var(--line);
          border-radius: 21px;
          color: white;
          background: var(--panel-soft);
          transition: 0.25s ease;
        }

        .content-card:hover,
        .content-card.selected {
          transform: translateY(-5px);
          border-color: rgba(99, 230, 210, 0.43);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.25);
        }

        .content-thumb {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: 15px;
          background:
            linear-gradient(
              140deg,
              rgba(198, 226, 215, 0.26),
              transparent 48%
            ),
            #222a29;
        }

        .thumb-2 {
          background:
            linear-gradient(
              140deg,
              rgba(235, 191, 150, 0.26),
              transparent 48%
            ),
            #2a2422;
        }

        .thumb-3 {
          background:
            linear-gradient(
              140deg,
              rgba(162, 180, 224, 0.26),
              transparent 48%
            ),
            #242731;
        }

        .thumb-person {
          position: absolute;
          left: 43%;
          bottom: 0;
          width: 85px;
          height: 160px;
          border-radius: 50px 50px 10px 10px;
          background:
            radial-gradient(
              circle at 50% 18%,
              #c9aa92 0 16%,
              transparent 17%
            ),
            linear-gradient(
              to bottom,
              transparent 0 28%,
              #1c2024 29% 100%
            );
        }

        .thumb-table {
          position: absolute;
          right: 0;
          bottom: -20px;
          left: 0;
          height: 60px;
          background: #4a4038;
          transform: skewY(-3deg);
        }

        .match-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 7px 9px;
          border-radius: 999px;
          color: #06100d;
          background: var(--cyan);
          font-size: 9px;
          font-weight: 850;
        }

        .thumb-play {
          position: absolute;
          right: 12px;
          bottom: 12px;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(8, 10, 14, 0.66);
          font-size: 10px;
        }

        .content-info {
          padding: 18px 10px 13px;
        }

        .content-info h3 {
          margin: 8px 0 6px;
          font-size: 18px;
        }

        .content-info p {
          color: var(--muted);
          font-size: 12px;
        }

        .content-meta {
          min-height: 46px;
          display: flex;
          justify-content: space-between;
          gap: 15px;
          color: #929baa;
          font-size: 9px;
          line-height: 1.5;
        }

        .selected-indicator {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 28px;
          height: 28px;
          display: none;
          place-items: center;
          border-radius: 50%;
          color: #07100d;
          background: var(--cyan);
        }

        .content-card.selected .selected-indicator {
          display: grid;
        }

        .recommendation-detail {
          margin-top: 20px;
          padding: 20px 22px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--panel-soft);
        }

        .recommendation-detail > div:first-child {
          max-width: 430px;
          display: grid;
          gap: 8px;
        }

        .recommendation-detail strong {
          line-height: 1.5;
        }

        .detail-scores {
          display: flex;
          gap: 26px;
        }

        .detail-scores div {
          display: grid;
          gap: 4px;
        }

        .detail-scores span {
          color: var(--muted);
          font-size: 9px;
        }

        .detail-scores strong {
          color: var(--cyan);
          font-size: 20px;
        }

        .preview-heading {
          margin-bottom: 22px;
        }

        .preview-toggle {
          padding: 4px;
          display: flex;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.025);
        }

        .preview-toggle button {
          min-width: 98px;
          border: 0;
        }

        .preview-layout {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 22px;
        }

        .preview-player,
        .preview-sidebar {
          border: 1px solid var(--line);
          border-radius: 22px;
          background: var(--panel);
        }

        .preview-player {
          padding: 12px;
        }

        .preview-scene {
          position: relative;
          min-height: 500px;
          overflow: hidden;
          border-radius: 16px;
          background:
            linear-gradient(
              to bottom,
              rgba(217, 235, 224, 0.14),
              rgba(43, 49, 47, 0.06)
            ),
            linear-gradient(135deg, #3a4440, #1a1f20);
        }

        .preview-window {
          position: absolute;
          top: 0;
          left: 0;
          width: 45%;
          height: 65%;
          background: linear-gradient(
            135deg,
            rgba(247, 255, 251, 0.72),
            rgba(174, 215, 204, 0.08)
          );
          clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
          opacity: 0.56;
        }

        .preview-table {
          position: absolute;
          right: -4%;
          bottom: -12%;
          left: -4%;
          height: 43%;
          background: linear-gradient(180deg, #685a4e, #342c27);
          transform: perspective(650px) rotateX(55deg);
          transform-origin: bottom;
        }

        .preview-person {
          position: absolute;
          left: 50%;
          bottom: 11%;
          width: 160px;
          height: 310px;
          border-radius: 90px 90px 24px 24px;
          background:
            radial-gradient(
              circle at 50% 16%,
              #d0ad94 0 14%,
              transparent 15%
            ),
            linear-gradient(
              to bottom,
              transparent 0 25%,
              #20262b 26% 100%
            );
        }

        .preview-cup {
          position: absolute;
          left: 30%;
          bottom: 29%;
          width: 50px;
          height: 62px;
          border-radius: 8px 8px 16px 16px;
          background: #e5e1d9;
        }

        .inserted-product {
          position: absolute;
          z-index: 4;
          right: 24%;
          bottom: 28%;
          width: 45px;
          height: 115px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.66);
          border-radius: 8px 8px 14px 14px;
          color: #09241f;
          background: rgba(214, 255, 246, 0.77);
          font-size: 7px;
          opacity: 0;
          filter: blur(4px);
          transform: translateY(10px) scale(0.85);
          transition: 0.65s ease;
          box-shadow: 0 20px 28px rgba(0, 0, 0, 0.3);
        }

        .with-product .inserted-product {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0) scale(1);
        }

        .preview-bottle-cap {
          position: absolute;
          top: -11px;
          width: 22px;
          height: 13px;
          border-radius: 4px 4px 2px 2px;
          background: #d8dde1;
        }

        .preview-top-label,
        .preview-time {
          position: absolute;
          padding: 8px 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(8, 10, 14, 0.55);
          color: #dbe1ea;
          backdrop-filter: blur(12px);
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .preview-top-label {
          top: 16px;
          left: 16px;
        }

        .preview-time {
          right: 16px;
          bottom: 16px;
        }

        .preview-controls {
          display: grid;
          grid-template-columns: 30px 1fr 46px 30px;
          gap: 12px;
          align-items: center;
          height: 52px;
          padding: 0 10px;
        }

        .preview-controls button {
          border: 0;
          color: white;
          background: transparent;
        }

        .preview-controls span {
          color: var(--muted);
          font-size: 10px;
        }

        .control-track {
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.09);
        }

        .control-track div {
          width: 38%;
          height: 100%;
          border-radius: inherit;
          background: var(--cyan);
        }

        .preview-sidebar {
          padding: 24px;
        }

        .preview-product-card,
        .proposal-product {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--line);
        }

        .preview-product-card > div:last-child,
        .proposal-product > div:last-child {
          display: grid;
          gap: 6px;
        }

        .preview-product-card span,
        .proposal-product span {
          color: var(--muted);
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .preview-product-card small,
        .proposal-product small {
          color: var(--muted);
          font-size: 10px;
        }

        .placement-info {
          padding: 23px 0;
          border-bottom: 1px solid var(--line);
        }

        .placement-info h3 {
          margin: 9px 0;
        }

        .placement-info p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .metric-list {
          display: grid;
          gap: 14px;
          padding: 22px 0 5px;
        }

        .metric-list div {
          display: flex;
          justify-content: space-between;
          color: #b7bfcb;
          font-size: 11px;
        }

        .metric-list strong {
          color: var(--cyan);
        }

        .proposal-screen {
          display: grid;
          place-items: center;
        }

        .proposal-success {
          width: min(760px, 100%);
          text-align: center;
        }

        .success-rings {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
          display: grid;
          place-items: center;
        }

        .success-rings div {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(99, 230, 210, 0.2);
          border-radius: 50%;
          animation: pulse 2s ease-out infinite;
        }

        .success-rings div:nth-child(2) {
          inset: 14px;
          animation-delay: 0.4s;
        }

        @keyframes pulse {
          0% {
            opacity: 0.7;
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(1.25);
          }
        }

        .success-rings span {
          position: relative;
          z-index: 2;
          width: 66px;
          height: 66px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #07100d;
          background: var(--cyan);
          font-size: 28px;
        }

        .proposal-success h1 {
          margin: 16px 0;
          font-size: clamp(40px, 5vw, 65px);
          line-height: 1.08;
          letter-spacing: -0.055em;
        }

        .proposal-success > p {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.7;
        }

        .proposal-card {
          margin: 30px 0 28px;
          padding: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: var(--panel);
        }

        .proposal-product {
          padding: 0;
          border: 0;
        }

        .proposal-status {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #aeb6c3;
          font-size: 11px;
        }

        .final-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          margin: 31px 0;
        }

        .final-flow > div {
          display: grid;
          justify-items: center;
          gap: 7px;
          color: #66707f;
          font-size: 9px;
          text-transform: uppercase;
        }

        .final-flow > div > span {
          width: 29px;
          height: 29px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 50%;
        }

        .final-flow i {
          width: 34px;
          height: 1px;
          margin-bottom: 20px;
          background: #303642;
        }

        .final-flow .complete,
        .final-flow .current {
          color: #bfc7d2;
        }

        .final-flow .complete > span {
          color: #06100d;
          border-color: var(--cyan);
          background: var(--cyan);
        }

        .final-flow .current > span {
          color: white;
          border-color: var(--purple);
          background: var(--purple);
          box-shadow: 0 0 18px rgba(139, 124, 255, 0.4);
        }

        @media (max-width: 1050px) {
          .workspace {
            padding-right: 24px;
            padding-left: 24px;
          }

          .split-screen,
          .analysis-screen,
          .matching-screen,
          .product-layout,
          .result-layout,
          .preview-layout {
            grid-template-columns: 1fr;
          }

          .content-grid {
            grid-template-columns: 1fr 1fr;
          }

          .recommendation-detail {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 720px) {
          .topbar {
            padding: 0 18px;
            grid-template-columns: 1fr auto;
          }

          .topbar-center {
            display: none;
          }

          .workspace {
            padding: 24px 16px;
          }

          .role-grid,
          .content-grid,
          .form-row {
            grid-template-columns: 1fr;
          }

          .landing-screen h1 {
            font-size: 48px;
          }

          .section-header,
          .preview-heading,
          .bottom-action,
          .proposal-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .fake-video,
          .preview-scene {
            min-height: 380px;
          }

          .detail-scores,
          .filter-pills {
            flex-wrap: wrap;
          }

          .final-flow {
            gap: 4px;
          }

          .final-flow i {
            width: 12px;
          }
        }
      `}</style>
    </main>
  );
}