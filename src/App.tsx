import { useEffect, useState, type CSSProperties } from "react";
import "./App.css";
import "./research-lean.css";

// public/配下の画像はGitHub Pagesのサブパス(/Create-Portfolio/)に対応するため
// import.meta.env.BASE_URL を経由して参照する(vite.config.tsのbaseと連動)
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type TabId = "home" | "projects" | "research" | "skills";

type NavTab = {
  id: TabId;
  label: string;
};

const navTabs: NavTab[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Profile" },
];

// 顔写真を使う場合は public/images/profile.jpg などに配置して、下を asset("/images/profile.jpg") のように書き換えてください
const PROFILE_PHOTO_SRC = "";

// 名前が決まったら書き換えてください
const PROFILE_NAME = "Your Name";

type HomeStat = {
  label: string;
  value: string;
};

const homeStats: HomeStat[] = [
  { label: "性格", value: "一つずつ検証してから前に進む、コツコツ積み上げ型" },
  { label: "得意なこと", value: "現状に満足せず、ユーザー目線で改善を形にする推進力" },
  { label: "好きなこと", value: "RPGの物語没入 / FPS・格闘ゲームで息抜き" },
  { label: "よく使う言語", value: "Python / TypeScript" },
];

type Project = {
  title: string;
  // サイト内で使われているアイコン(任意)。タイトルの左に表示されます
  icon?: string;
  concept: string;
  description: string;
  tags: string[];
  theme: "green" | "purple";
  // 仮の代用画像。実際のスライド画像が用意でき次第差し替えてください
  slides: string[];
  // サイトが公開でき次第、URLを入れてください（空文字なら準備中として表示）
  url: string;
};

const projects: Project[] = [
  {
    title: "Rooted",
    icon: "🌱",
    concept: "木構造を利用したタスク管理サイト",
    description:
      "木構造でタスクを整理し、進捗率を可視化することで、自分が毎日使いやすいUXを目指すWebアプリです。",
    tags: ["React", "TypeScript", "Zustand", "Vite", "Tailwind CSS", "Supabase Auth"],
    theme: "green",
    slides: [
      asset("/images/projects/Rooted/BeforeAfter@1x.png"),
      asset("/images/projects/Rooted/FeatureShowcase@1x.png"),
    ],
    url: "",
  },
  {
    title: "コンボラボ",
    icon: "🥊",
    concept: "格闘ゲームのコンボメモサイト",
    description:
      "コンボ内容、練習課題、改善点を記録できるWebアプリです。趣味の時間を開発素材に変えることを目的にしています。",
    tags: ["React", "TypeScript", "Zustand", "Vite", "Tailwind CSS", "Supabase Auth", "Testing Library"],
    theme: "purple",
    slides: [
      asset("/images/projects/Combo-LAB/Main@1x.png"),
      asset("/images/projects/Combo-LAB/FeatureShowcase@1x.png"),
    ],
    url: "",
  },
];

type SkillItem = {
  name: string;
  icon: string;
  alt: string;
};

const languageItems: SkillItem[] = [
  {
    name: "Python",
    icon: asset("/images/python_icon.png"),
    alt: "Python Icon",
  },
  {
    name: "JavaScript\nTypeScript",
    icon: asset("/images/js_icon.png"),
    alt: "JavaScript / TypeScript Icon",
  },
];

const qualificationItems: SkillItem[] = [
  {
    name: "普通自動車第一種運転免許（AT限定）",
    icon: asset("/images/question-mark.jpg"),
    alt: "Qualification Icon",
  },
];

type EsHighlight = {
  title: string;
  genreLabel: string;
  genres: string[];
  favoriteLabel: string;
  favoriteTitles: string[];
  experienceLabel: string;
  paragraphs: string[];
};

const esHighlight: EsHighlight = {
  title: "好きなゲーム・影響を受けた体験",
  genreLabel: "普段プレイするゲームジャンル",
  genres: ["FPS", "格闘ゲーム", "RPG", "アクション"],
  favoriteLabel: "好きなゲーム",
  favoriteTitles: ["ペルソナシリーズ", "キングダムハーツ", "ファイアーエムブレム風花雪月"],
  experienceLabel: "好きなゲーム体験",
  paragraphs: [
    "プレイヤーの選択や行動の積み重ねが、物語やキャラクターへの思い入れにつながるゲームが好きです。",
    "特に『ペルソナ』シリーズでは、日常パートと非日常パートを自分のペースで進める中で、プレイヤー自身の時間が物語への没入感を生んでいる点に強く惹かれました。",
    "自分も、遊んだ時間そのものがプレイヤーの記憶に残るような体験づくりに関わりたいです。",
  ],
};

type ContactLink = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "your-address@example.com",
    href: "mailto:your-address@example.com",
  },
  {
    label: "GitHub",
    value: "github.com/your-name",
    href: "https://github.com/your-name",
    external: true,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [activeTab]);

  return (
    <div className={`portfolio-app is-${activeTab}`}>
      <Header activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className="main-content">
        <div key={activeTab} className="tab-motion">
          {activeTab === "home" && (
            <HomeSection onViewProjects={() => setActiveTab("projects")} />
          )}

          {activeTab === "projects" && <ProjectsSection />}

          {activeTab === "research" && <ResearchSection />}

          {activeTab === "skills" && <SkillsSection />}
        </div>
      </main>
    </div>
  );
}

function Header({
  activeTab,
  onChangeTab,
}: {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}) {
  return (
    <header className="site-header">
      <nav
        className="nav-tabs"
        aria-label="メインナビゲーション"
        role="tablist"
      >
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              className={`nav-tab${isActive ? " is-active" : ""}`}
              onClick={() => onChangeTab(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

function HomeSection({ onViewProjects }: { onViewProjects: () => void }) {
  return (
    <section
      id="home-panel"
      className="tab-panel home-panel"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <div className="home-hero">
        <div className="profile-photo-block">
          <div className="profile-photo-frame" aria-label="顔写真エリア">
            {PROFILE_PHOTO_SRC ? (
              <img src={PROFILE_PHOTO_SRC} alt="プロフィール写真" />
            ) : (
              <span>PHOTO</span>
            )}
          </div>
          <p className="profile-name">{PROFILE_NAME}</p>
        </div>

        <div className="home-text">
          <p className="section-kicker">About Me</p>
          <h1>厳密さも遊び心も大事にするエンジニアです。</h1>

          <ul className="home-stats">
            {homeStats.map((stat) => (
              <li key={stat.label}>
                <span className="home-stat-label">{stat.label}</span>
                <span>{stat.value}</span>
              </li>
            ))}
          </ul>

          <button type="button" className="primary-button" onClick={onViewProjects}>
            作品を見る
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  return (
    <section
      id="projects-panel"
      className="tab-panel content-panel"
      role="tabpanel"
      aria-labelledby="projects-tab"
    >
      <div className="section-heading">
        <p className="section-kicker">Projects</p>
        <h1>制作物</h1>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpenDetail={() => setActiveProject(project)}
          />
        ))}
      </div>

      {activeProject && (
        <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  onOpenDetail,
}: {
  project: Project;
  onOpenDetail: () => void;
}) {
  return (
    <article className={`project-card project-card--${project.theme}`}>
      <div className="project-thumb" aria-hidden="true">
        {project.slides[0] && <img src={project.slides[0]} alt="" />}
      </div>

      <div className="project-body">
        <h2>{project.icon ? `${project.icon} ${project.title}` : project.title}</h2>
        <p className="project-concept">{project.concept}</p>
        <p className="project-description">{project.description}</p>

        <div className="tag-list" aria-label={`${project.title}の技術タグ`}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <button type="button" className="project-detail-button" onClick={onOpenDetail}>
            詳細を見る
          </button>
          <ProjectSiteLink url={project.url} />
        </div>
      </div>
    </article>
  );
}

function ProjectSiteLink({ url }: { url: string }) {
  if (!url) {
    return (
      <span className="project-site-link project-site-link--pending">サイトURL準備中</span>
    );
  }

  return (
    <a
      className="project-site-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      サイトを見る
    </a>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 id="project-modal-title">
          {project.icon ? `${project.icon} ${project.title}` : project.title}
        </h2>
        <p className="project-concept">{project.concept}</p>

        <div className="project-modal-slides">
          {project.slides.map((slide, index) => (
            <img
              key={`${slide}-${index}`}
              src={slide}
              alt={`${project.title} スライド${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

type ResearchTimelineEntry = {
  dot: "llm" | "lean";
  label: string;
  detail: string;
};

const researchTimeline: ResearchTimelineEntry[] = [
  {
    dot: "llm",
    label: "バグに遭遇",
    detail:
      "LeanDojoを使い始めた直後、Leanのプロセスが初期状態を返した直後に、原因不明のままクラッシュするという問題に直面した。",
  },
  {
    dot: "lean",
    label: "原因を特定し対応",
    detail:
      "考えられる要因を1つずつ切り分けて検証を重ね、最終的にLeanDojo本体側の未解決の互換性バグ(Leanの仕様変更に起因)であることを公式のissueから特定。バージョンを固定して回避し、実際に動くパイプラインを構築した。",
  },
  {
    dot: "lean",
    label: "会話内容も保存する",
    detail:
      "LLMへ送った提案文・提示された理由・Leanの判定結果を、実行ごとに専用ファイルへ構造的に記録できる仕組みを整備した。",
  },
];

function ResearchSection() {
  return (
    <section
      id="research-panel"
      className="tab-panel content-panel lean-research"
      role="tabpanel"
      aria-labelledby="research-tab"
    >
      <div className="hero">
        <div className="eyebrow">卒業研究</div>
        <h1>Lean×Gemini対話による、論理破綻しないAI数学証明</h1>
        <ul className="goal-list">
          <li>
            <span className="goal-label">何をしているか</span>
            <span>
              GeminiとLeanを対話させることで、論理的な破綻を起こすことなく、AI主体で数学の問題を証明する。
            </span>
          </li>
          <li>
            <span className="goal-label">意図・ゴール</span>
            <span>
              AIの論理性をどのように保てるのか、またAIの推論が得意な分野・苦手な分野を把握することを目的としている。副次的な観点だが、AIのみで数学の未解決問題を証明した事例も存在するため、どのようなアプローチでどのような結果が得られたのかも合わせてまとめていく。
            </span>
          </li>
        </ul>

        <a
          className="repo-link"
          href="https://github.com/s1f102302832/Lean-AI-Research.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          github.com/s1f102302832/Lean-AI-Research
        </a>
      </div>

      <hr className="section-divider" />

      <div className="section">
        <div className="eyebrow">システムの仕組み</div>
        <h2>
          アイデアを出す<span className="accent-llm">LLM</span>と、証明を検証する
          <span className="accent-lean">Lean</span>を、対話でつなぐ
        </h2>
        <p className="lede">
          <strong>Lean</strong>は、数学の証明を人手を介さず1つの曖昧さもなく機械的にチェックできる証明支援システム。本研究では、この厳密な検証者Leanと、自由な発想を持つLLM(Gemini)を対話させ、証明の手を自動的に探索する。LLMが提案し、安全フィルターを通過したものだけをLeanが検証、失敗すればその理由をLLMへ送り返し、証明が完成するまでこの対話を繰り返す。
        </p>
      </div>

      <figure>
        <svg
          viewBox="0 0 1360 700"
          role="img"
          aria-label="証明したい定理を起点に、LLMが提案し、安全フィルターを通過した手をLeanが検証し、成功すれば証明完了、失敗すれば理由をLLMへフィードバックして繰り返すループ図"
        >
          <defs>
            <marker
              id="arrowNeutral"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--neutral-arrow)" />
            </marker>
            <marker
              id="arrowLean"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8.5"
              markerHeight="8.5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--lean)" />
            </marker>
            <marker
              id="arrowLlm"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8.5"
              markerHeight="8.5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--llm)" />
            </marker>
          </defs>

          <rect x="90" y="22" width="380" height="94" rx="12" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
          <text x="280" y="61" textAnchor="middle" className="svg-title" fontSize="23" fill="var(--ink)">
            証明したい定理
          </text>
          <text x="280" y="93" textAnchor="middle" className="svg-sub svg-mono" fontSize="19">
            例: a + b = b + a
          </text>

          <line x1="280" y1="116" x2="280" y2="228" stroke="var(--neutral-arrow)" strokeWidth="2.5" markerEnd="url(#arrowNeutral)" />

          <rect x="90" y="232" width="380" height="160" rx="12" fill="var(--llm-soft)" stroke="var(--llm)" strokeWidth="2" />
          <text x="280" y="271" textAnchor="middle" className="svg-title" fontSize="23" fill="var(--ink)">
            LLM (Gemini) が方向性を提案
          </text>
          <text x="280" y="303" textAnchor="middle" className="svg-sub" fontSize="19">
            発想は柔軟。ただし正しさは保証できない
          </text>
          <rect x="130" y="322" width="300" height="48" rx="8" fill="var(--surface)" stroke="var(--line)" />
          <text x="280" y="352" textAnchor="middle" className="svg-mono" fontSize="19" fill="var(--llm)">
            rw [Nat.add_comm]
          </text>

          <line x1="470" y1="312" x2="576" y2="312" stroke="var(--neutral-arrow)" strokeWidth="2.5" markerEnd="url(#arrowNeutral)" />
          <text x="523" y="292" textAnchor="middle" className="svg-sub" fontSize="16">
            提案 + 理由
          </text>

          <rect
            x="580"
            y="252"
            width="220"
            height="120"
            rx="12"
            fill="var(--surface)"
            stroke="var(--line)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <text x="690" y="303" textAnchor="middle" className="svg-title" fontSize="21" fill="var(--ink)">
            安全フィルター
          </text>
          <text x="690" y="333" textAnchor="middle" className="svg-sub" fontSize="17.5">
            不正な提案は却下
          </text>

          <line x1="804" y1="312" x2="910" y2="312" stroke="var(--neutral-arrow)" strokeWidth="2.5" markerEnd="url(#arrowNeutral)" />
          <text x="857" y="292" textAnchor="middle" className="svg-sub" fontSize="16">
            検証済みのみ
          </text>

          <rect x="914" y="232" width="380" height="160" rx="12" fill="var(--lean-soft)" stroke="var(--lean)" strokeWidth="2" />
          <text x="1104" y="271" textAnchor="middle" className="svg-title" fontSize="23" fill="var(--ink)">
            Lean が検証
          </text>
          <text x="1104" y="303" textAnchor="middle" className="svg-sub" fontSize="19">
            曖昧さを許さない、100%厳密な判定
          </text>
          <rect x="954" y="322" width="300" height="48" rx="8" fill="var(--surface)" stroke="var(--line)" />
          <text x="1104" y="352" textAnchor="middle" className="svg-mono" fontSize="19" fill="var(--lean)">
            証明成功 / エラー
          </text>

          <line x1="1185" y1="392" x2="1185" y2="484" stroke="var(--lean)" strokeWidth="3" markerEnd="url(#arrowLean)" />
          <text x="1207" y="422" textAnchor="start" fontSize="21" fontWeight="700" fill="var(--lean)">
            成功
          </text>

          <rect x="1045" y="488" width="280" height="86" rx="43" fill="var(--lean)" />
          <path
            d="M1105,531 L1122,548 L1152,512"
            fill="none"
            stroke="var(--surface)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="1198" y="540" textAnchor="middle" className="svg-title" fontSize="22" fill="var(--surface)">
            証明成功
          </text>

          <path
            d="M1010,392 L1010,600 Q1010,624 986,624 L304,624 Q280,624 280,600 L280,392"
            fill="none"
            stroke="var(--llm)"
            strokeWidth="3"
            markerEnd="url(#arrowLlm)"
          />
          <text x="1032" y="422" textAnchor="start" fontSize="21" fontWeight="700" fill="var(--llm)">
            エラー
          </text>
          <text x="645" y="653" textAnchor="middle" fontSize="21" fontWeight="700" fill="var(--llm)">
            失敗理由をフィードバックして再提案
          </text>
        </svg>

        <figcaption>
          <strong>読み方:</strong> Lean側の「はい/いいえ」だけが唯一の正解の基準。LLMはその基準に向けて何度でも提案をやり直せるが、
          安全フィルターを通過しなかった提案や、Leanが却下した提案は、そのまま次の提案文に組み込まれ、同じ誤りを繰り返さないようにする。
        </figcaption>
      </figure>

      <hr className="section-divider" />

      <div className="section">
        <div className="eyebrow">進捗</div>
        <h2>ここまでの歩み</h2>

        <ol className="timeline">
          {researchTimeline.map((entry, index) => (
            <li className="timeline-item" key={entry.label}>
              <div className="timeline-marker">
                <span
                  className="timeline-dot"
                  style={{ "--dot": `var(--${entry.dot})` } as CSSProperties}
                />
                {index < researchTimeline.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-body">
                <div className="timeline-label">{entry.label}</div>
                <p className="timeline-detail">{entry.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <hr className="section-divider" />

      <div className="tags">
        <span className="tag">Lean 4</span>
        <span className="tag">LeanDojo</span>
        <span className="tag">Gemini API</span>
        <span className="tag">Python</span>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills-panel"
      className="tab-panel content-panel skills-panel"
      role="tabpanel"
      aria-labelledby="skills-tab"
    >
      <div className="skills-grid">
        <EsHighlightCard highlight={esHighlight} />
        <SkillGroup title="使用言語" items={languageItems} layout="row" />
        <SkillGroup title="取得資格" items={qualificationItems} />
      </div>

      <ContactArea />
    </section>
  );
}

function SkillGroup({
  title,
  items,
  layout = "column",
}: {
  title: string;
  items: SkillItem[];
  layout?: "column" | "row";
}) {
  return (
    <article className="skill-card">
      <h2>{title}</h2>

      <div className={`skill-list${layout === "row" ? " skill-list--row" : ""}`}>
        {items.map((item) => (
          <div key={item.name} className="skill-item">
            <img src={item.icon} alt={item.alt} className="skill-icon" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function EsHighlightCard({ highlight }: { highlight: EsHighlight }) {
  return (
    <article className="skill-card skill-card--wide es-card">
      <h2>{highlight.title}</h2>

      <div className="es-block">
        <span className="es-block-label">{highlight.genreLabel}</span>
        <div className="es-tag-list">
          {highlight.genres.map((genre) => (
            <span key={genre} className="es-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="es-block">
        <span className="es-block-label">{highlight.favoriteLabel}</span>
        <div className="es-tag-list">
          {highlight.favoriteTitles.map((favoriteTitle) => (
            <span key={favoriteTitle} className="es-tag">
              {favoriteTitle}
            </span>
          ))}
        </div>
      </div>

      <h3 className="es-subtitle">{highlight.experienceLabel}</h3>

      {highlight.paragraphs.map((paragraph) => (
        <p key={paragraph} className="es-paragraph">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

function ContactArea() {
  return (
    <aside className="contact-area" aria-labelledby="contact-title">
      <div>
        <p className="section-kicker">Contact</p>
        <h2 id="contact-title">連絡先</h2>
        <p>
          メールアドレスやGitHubなどをここに配置します。
          個人情報を載せる場合は、公開範囲に注意してください。
        </p>
      </div>

      <div className="contact-links">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="contact-link"
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            <span className="contact-label">{link.label}</span>
            <span className="contact-value">{link.value}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
