import { useEffect, useState } from "react";
import "./App.css";

type TabId = "home" | "projects" | "research" | "skills";

type NavTab = {
  id: TabId;
  label: string;
};

const navTabs: NavTab[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
];

// 顔写真を使う場合は public/images/profile.jpg などに配置して、下を書き換えてください
const PROFILE_PHOTO_SRC = "";

type Project = {
  title: string;
  concept: string;
  description: string;
  status: string;
  tags: string[];
  theme: "green" | "purple";
};

const projects: Project[] = [
  {
    title: "Rooted",
    concept: "木構造を利用したタスク管理サイト",
    description:
      "XMind風の木構造でタスクを整理し、進捗率を可視化することで、自分が毎日使いやすいUXを目指すWebアプリです。",
    status: "README / パッチノート配置予定",
    tags: ["React", "Task UI", "Tree Structure", "UX"],
    theme: "green",
  },
  {
    title: "コンボラボ",
    concept: "格闘ゲームのコンボメモサイト",
    description:
      "コンボ内容、練習課題、改善点を記録できるWebアプリです。趣味の時間を開発素材に変えることを目的にしています。",
    status: "現在作成中",
    tags: ["React", "Memo App", "Game", "Personal Project"],
    theme: "purple",
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
    icon: "/images/python_icon.png",
    alt: "Python Icon",
  },
  {
    name: "HTML",
    icon: "/images/html_icon.png",
    alt: "HTML Icon",
  },
  {
    name: "CSS",
    icon: "/images/css_icon.png",
    alt: "CSS Icon",
  },
  {
    name: "JavaScript / TypeScript",
    icon: "/images/js_icon.png",
    alt: "JavaScript Icon",
  },
];

const toolItems: SkillItem[] = [
  {
    name: "Canva",
    icon: "/images/canva_icon.png",
    alt: "Canva Icon",
  },
  {
    name: "Figma",
    icon: "/images/figma_icon.png",
    alt: "Figma Icon",
  },
];

const qualificationItems: SkillItem[] = [
  {
    name: "普通自動車第一種運転免許（AT限定）",
    icon: "/images/question-mark.jpg",
    alt: "Qualification Icon",
  },
];

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
  {
    label: "Portfolio URL",
    value: "portfolio.example.com",
    href: "https://portfolio.example.com",
    external: true,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [activeTab]);

  useEffect(() => {
    if (!isResearchModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsResearchModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isResearchModalOpen]);

  return (
    <div className={`portfolio-app is-${activeTab}`}>
      <Header activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className="main-content">
        <div key={activeTab} className="tab-motion">
          {activeTab === "home" && (
            <HomeSection onViewProjects={() => setActiveTab("projects")} />
          )}

          {activeTab === "projects" && <ProjectsSection />}

          {activeTab === "research" && (
            <ResearchSection onOpenModal={() => setIsResearchModalOpen(true)} />
          )}

          {activeTab === "skills" && <SkillsSection />}
        </div>
      </main>

      {isResearchModalOpen && (
        <ResearchModal onClose={() => setIsResearchModalOpen(false)} />
      )}
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
        <div className="profile-photo-frame" aria-label="顔写真エリア">
          {PROFILE_PHOTO_SRC ? (
            <img src={PROFILE_PHOTO_SRC} alt="プロフィール写真" />
          ) : (
            <span>PHOTO</span>
          )}
        </div>

        <div className="home-text">
          <p className="section-kicker">Portfolio</p>
          <h1>ストレスフリーに作品へ到達できるポートフォリオ</h1>
          <p className="catch-copy">
            ゲームやWeb開発を通して、使いやすさと楽しさを届けるエンジニアを目指しています。
          </p>
          <p className="intro-text">
            大学で情報分野を学びながら、ReactやPythonを中心に制作を行っています。
            このポートフォリオでは、作品・研究・スキルへすぐ到達できる構成を意識しています。
          </p>

          <button type="button" className="primary-button" onClick={onViewProjects}>
            作品を見る
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
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
        <p className="section-lead">
          企画書に合わせて、まずは2つの作品を見せるカードレイアウトにしています。
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card--${project.theme}`}>
      <div className="project-thumb" aria-hidden="true">
        <span>{project.title}</span>
      </div>

      <div className="project-body">
        <span className="project-status">{project.status}</span>
        <h2>{project.title}</h2>
        <p className="project-concept">{project.concept}</p>
        <p className="project-description">{project.description}</p>

        <div className="tag-list" aria-label={`${project.title}の技術タグ`}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>

        <button type="button" className="placeholder-button" disabled>
          詳細を見る / スライド配置予定
        </button>
      </div>
    </article>
  );
}

function ResearchSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      id="research-panel"
      className="tab-panel content-panel"
      role="tabpanel"
      aria-labelledby="research-tab"
    >
      <div className="section-heading">
        <p className="section-kicker">Research</p>
        <h1>卒業研究</h1>
        <p className="section-lead">
          長文になりすぎないよう、概要カードと詳細モーダルに分けています。
        </p>
      </div>

      <article className="research-card">
        <div className="research-main">
          <span className="project-status">Graduation Research</span>
          <h2>卒業研究タイトルをここに入力</h2>
          <p>
            研究概要をここに記載します。何を扱う研究なのか、どのような課題を解決したいのかを
            短く説明するためのカードです。
          </p>

          <div className="research-actions">
            <button type="button" className="primary-button" onClick={onOpenModal}>
              詳細を見る
            </button>

            <a
              className="outline-link"
              href="https://github.com/your-name"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="research-points">
          <div className="research-point">
            <strong>研究で行っていること</strong>
            <span>データ収集・分析・検証など</span>
          </div>
          <div className="research-point">
            <strong>解き明かしたいこと</strong>
            <span>研究の目的や仮説を簡潔に記載</span>
          </div>
          <div className="research-point">
            <strong>進捗 / 今後の課題</strong>
            <span>現在の到達点と次に行うこと</span>
          </div>
        </div>
      </article>
    </section>
  );
}

function ResearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="research-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>

        <p className="section-kicker">Research Detail</p>
        <h2 id="research-modal-title">卒業研究の詳細</h2>

        <ul className="modal-list">
          <li>研究概要：ここに研究テーマの要約を記載します。</li>
          <li>研究で行っていること：実験、実装、分析などを書きます。</li>
          <li>解き明かしたいこと：この研究で確認したい仮説を書きます。</li>
          <li>現在の進捗：完了している作業と、今後の課題を書きます。</li>
          <li>GitHubや資料へのリンクも必要に応じて配置できます。</li>
        </ul>
      </section>
    </div>
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
      <div className="section-heading">
        <p className="section-kicker">Skills</p>
        <h1>使用言語・ツール</h1>
        <p className="section-lead">
          Contactは独立タブにせず、このSkills画面の最下部に内蔵しています。
        </p>
      </div>

      <div className="skills-grid">
        <SkillGroup title="使用言語" items={languageItems} />
        <SkillGroup title="使用ツール" items={toolItems} />
        <SkillGroup title="取得資格" items={qualificationItems} wide />
      </div>

      <ContactArea />
    </section>
  );
}

function SkillGroup({
  title,
  items,
  wide = false,
}: {
  title: string;
  items: SkillItem[];
  wide?: boolean;
}) {
  return (
    <article className={`skill-card${wide ? " skill-card--wide" : ""}`}>
      <h2>{title}</h2>

      <div className="skill-list">
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
