// Local video served from the public folder
import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Building2, HardHat, Ruler, ShieldCheck, BadgeCheck,
  PhoneCall, MapPin, Mail, Clock, ArrowLeft, Star, CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AnimatedCounter } from "../components/AnimatedCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "بناء للمقاولات" },
      { name: "description", content: "شركة بناء للمقاولات — خبرة عشرين عاماً في البناء والتشييد والمقاولات العامة بأعلى معايير الجودة." },
      { property: "og:title", content: "بناء للمقاولات" },
      { property: "og:description", content: "نبني المستقبل بأيدٍ خبيرة وتقنيات حديثة." },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "preload", as: "video", type: "video/mp4", href: "/YouCut_20260624_205134948.mp4" },
    ],
  }),
  component: Index,
});

const VIDEO_URL = "/YouCut_20260624_205134948.mp4";

const SERVICES = [
  { icon: Building2, title: "البناء والتشييد", desc: "تنفيذ المباني السكنية والتجارية بأعلى مواصفات الجودة والأمان، من الأساس حتى التسليم." },
  { icon: Ruler, title: "التصميم والإشراف", desc: "فريق هندسي متخصص يرافق مشروعك من التصميم المعماري حتى الإشراف الميداني اليومي." },
  { icon: HardHat, title: "الطرق والبنية التحتية", desc: "تنفيذ مشاريع الطرق والشبكات والبنية التحتية وفق أحدث المعايير الهندسية الدولية." },
  { icon: ShieldCheck, title: "ضمان الجودة", desc: "نلتزم بمعايير الجودة الدولية ISO ونوفر ضمان شامل على جميع أعمالنا." },
];

const STATS = [
  { targetValue: 20, prefix: "+", label: "عاماً من الخبرة" },
  { targetValue: 350, prefix: "+", label: "مشروع منجز" },
  { targetValue: 1200, prefix: "+", label: "عميل راضٍ" },
  { targetValue: 100, suffix: "٪", label: "التزام بالمواعيد" },
];

const PROJECTS = [
  { name: "مشروع برج النخبة السكني", cat: "برج سكني", year: "مكتمل", location: "خور مكسر - عدن", details: "المساحة: 4,200 م² | عدد الأدوار: 14 دور", image: "/projects/tower.png" },
  { name: "مشروع مجمع الواحة التجاري", cat: "مجمع تجاري", year: "مكتمل", location: "المنصورة - عدن", details: "المساحة: 5,800 م² | عدد المحلات: 52 محل", image: "/projects/mall.png" },
  { name: "مشروع فلل الساحل الحديثة", cat: "فلل سكنية", year: "مكتمل", location: "البريقة - عدن", details: "عدد الوحدات: 24 فيلا", image: "/projects/villas.png" },
  { name: "مشروع مركز النور الطبي", cat: "مركز طبي", year: "مكتمل", location: "الشيخ عثمان - عدن", details: "المساحة: 2,400 م²", image: "/projects/hospital.png" },
  { name: "مشروع مدارس المستقبل الأهلية", cat: "منشأة تعليمية", year: "مكتمل", location: "المنصورة - عدن", details: "السعة: 1,200 طالب", image: "/projects/school.png" },
  { name: "مشروع مستودعات عدن اللوجستية", cat: "مستودعات صناعية", year: "مكتمل", location: "المنطقة الحرة", details: "المساحة: 9,000 م²", image: "/projects/warehouse.png" },
];

const FAQ = [
  { q: "ما هي المناطق الجغرافية التي تغطيها الشركة؟", a: "نعمل في جميع مناطق اليمن، ولدينا مشاريع في عدة دول خليجية." },
  { q: "كيف يمكنني الحصول على عرض سعر؟", a: "تواصل معنا عبر الهاتف أو النموذج أدناه، وسيرد عليك فريقنا الهندسي خلال 24 ساعة بعرض سعر مفصّل." },
  { q: "هل تقدمون ضماناً على الأعمال المنفذة؟", a: "نعم، نقدم ضماناً هيكلياً لمدة 10 سنوات على الأعمال الإنشائية و5 سنوات على أعمال التشطيب." },
  { q: "هل يمكنكم تنفيذ مشاريع حكومية وكبرى؟", a: "نعم، لدينا تصنيف مقاولين درجة أولى ونؤهلنا لتنفيذ المشاريع الحكومية والمنافسة في المناقصات الكبرى." },
];

const TESTIMONIALS = [
  { name: "م. خالد العمري", role: "مدير مشاريع، مجموعة العمري", text: "تعاملنا مع بناء في مشروع برج سكني كبير، وكانت الجودة والالتزام بالمواعيد أفضل من توقعاتنا بكثير.", stars: 5 },
  { name: "أ. سارة المطيري", role: "مديرة تطوير عقاري", text: "شركة محترفة بكل معنى الكلمة. الفريق الهندسي متعاون والتشطيبات في أعلى مستوى.", stars: 5 },
  { name: "م. يوسف الحارثي", role: "صاحب مشروع فلل الساحل", text: "أنجزوا مشروع الفلل قبل الموعد المحدد بأسبوعين وبجودة فاقت المواصفات المتفق عليها.", stars: 5 },
];

// ─── Scroll-reveal ───────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        filter: visible ? "blur(0px)" : "blur(6px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  /* ── Scroll-driven video — longer scrub range, smoother lerp ─────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let duration = 0;
    let rafId: number;
    let currentSmooth = 0;
    let lastSetTime = -1;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    // Increased LERP on mobile for snappier tracking without floating lag
    const LERP_FACTOR = isMobile ? 0.07 : 0.08; 

    const clamp = (v: number, lo: number, hi: number) => v < lo ? lo : v > hi ? hi : v;

    const getTargetTime = (): number => {
      const hero = heroRef.current;
      if (!hero || duration <= 0) return 0;
      const rect = hero.getBoundingClientRect();
      // Use full scrollable range of hero
      const scrollableRange = Math.max(1, hero.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollableRange, 0, 1);
      // Map to full video duration (leave 0.1s buffer at end)
      return progress * (duration - 0.1);
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (duration <= 0) return;
      const target = getTargetTime();
      currentSmooth += (target - currentSmooth) * LERP_FACTOR;
      
      const diff = Math.abs(currentSmooth - lastSetTime);
      // Use a higher threshold on mobile so we don't choke the video decoder with micro-updates
      const threshold = isMobile ? 0.05 : 0.015;
      
      if (diff > threshold) {
        lastSetTime = currentSmooth;
        try { video.currentTime = clamp(currentSmooth, 0, duration - 0.1); } catch { /* ignore */ }
      }
    };

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();
      currentSmooth = getTargetTime();
      try { video.currentTime = currentSmooth; } catch { /* ignore */ }
      rafId = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Video overlay opacity on scroll (less aggressive darkening) ──────── */
  useEffect(() => {
    let rafPending = false;

    const updateBg = () => {
      rafPending = false;
      const hero = heroRef.current;
      const overlay = document.getElementById("video-overlay");
      const textEl = document.getElementById("hero-main-text");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const overscroll = Math.max(0, window.innerHeight - rect.bottom);
      const scrollY = window.scrollY;

      // Text parallax + fade
      if (textEl) {
        const textOpacity = Math.max(0, 1 - scrollY / 600);
        textEl.style.opacity = `${textOpacity}`;
        textEl.style.transform = `translateY(${-scrollY * 0.28}px)`;
        textEl.style.filter = `blur(${Math.min(scrollY / 100, 12)}px)`;
      }

      // Overlay stays light (max 0.55 opacity) so video is always vivid
      if (overlay) {
        const progress = clamp(scrollY / 400, 0, 1);
        overlay.style.opacity = `${0.25 + progress * 0.3}`;
      }

      // No blur, just fade out slightly when hero leaves viewport
      const bg = document.getElementById("video-bg-container");
      if (bg) {
        if (overscroll > 0) {
          bg.style.filter = "";
          bg.style.opacity = `${Math.max(0.5, 1 - overscroll / 700)}`;
        } else {
          bg.style.filter = "";
          bg.style.opacity = "1";
        }
      }
    };

    const clamp = (v: number, lo: number, hi: number) => v < lo ? lo : v > hi ? hi : v;

    const onScroll = () => {
      if (!rafPending) { rafPending = true; requestAnimationFrame(updateBg); }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen" dir="rtl">

      {/* ── FIXED VIDEO BACKGROUND ──────────────────────────────────────── */}
      <div
        id="video-bg-container"
        className="fixed inset-0 z-0 h-screen w-full"
        style={{ willChange: "filter, opacity" }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform" }}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        {/* Static gradient base — light overlay so video is vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        {/* Dynamic overlay controlled by JS */}
        <div id="video-overlay" className="absolute inset-0 bg-black/25 transition-none" />
      </div>

      {/* ── Hero (scroll-driven video zone) — 480vh for full video playback ── */}
      <section ref={heroRef} id="start" className="relative z-10 -mt-24 h-[280vh] md:h-[480vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div id="hero-main-text" className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform">
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1) translateY(0)" : "scale(0.88) translateY(60px)",
                filter: mounted ? "blur(0px)" : "blur(12px)",
                transition: "opacity 1.6s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1), filter 1.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
                خبرة تمتد لأكثر من ٢٠ عاماً
              </span>
              <h1 className="text-white drop-shadow-2xl">
                <span
                  className="block text-5xl font-extrabold md:text-7xl lg:text-[7rem] tracking-tight leading-none"
                  style={{ textShadow: "0 10px 60px rgba(0,0,0,0.7)" }}
                >
                  بناء للمقاولات
                </span>
                <span className="mt-4 block text-lg font-medium text-white/75 md:text-xl" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
                  نبني المستقبل بأيدٍ خبيرة وتقنيات حديثة
                </span>
              </h1>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-gray-900 shadow-xl transition-all hover:scale-105 hover:bg-white/95">
                  <PhoneCall size={16} /> تواصل معنا
                </Link>
                <Link to="/projects" className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  مشاريعنا <ArrowLeft size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT PANEL — slides over the video ════════════════════════════ */}
      <div className="relative z-20">
        <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background/70 backdrop-blur-md pointer-events-none" />

        <div className="rounded-t-[3rem] bg-background shadow-[0_-40px_100px_rgba(0,0,0,0.5)] border-t border-border overflow-hidden">

          {/* ── Stats bar ─────────────────────────────────────────────────── */}
          <RevealSection>
            <section className="bg-primary/5 border-b border-border py-12">
              <div className="mx-auto max-w-7xl px-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {STATS.map((s) => (
                    <div key={s.label} className="group text-center">
                      <p className="text-4xl font-extrabold text-foreground md:text-5xl group-hover:text-primary transition-colors">
                        <AnimatedCounter targetValue={s.targetValue} prefix={s.prefix} suffix={s.suffix} />
                      </p>
                      <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── About ─────────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="about" className="py-24 bg-background">
              <div className="mx-auto max-w-7xl px-8">
                <div className="grid gap-16 md:grid-cols-2 items-center">
                  {/* Text */}
                  <div>
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">عن الشركة</span>
                    <h2 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
                      ثلاثة عقود من البناء الحقيقي.
                    </h2>
                    <p className="mt-6 text-lg leading-loose text-muted-foreground">
                      تأسست شركة <strong className="text-foreground">بناء للمقاولات</strong> عام 2004، وعلى مدى أكثر من عشرين عاماً أثبتنا حضوراً راسخاً في قطاع البناء والتشييد. نمزج بين الخبرة المحلية العميقة والتقنيات الهندسية الحديثة لتقديم مشاريع استثنائية في وقتها وضمن ميزانيتها.
                    </p>
                    <p className="mt-4 text-lg leading-loose text-muted-foreground">
                      فريقنا يضم أكثر من 500 مهندس وفني متخصص، ونمتلك أسطولاً متكاملاً من المعدات الثقيلة الحديثة.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {["ISO 9001:2015", "تصنيف أول", "خبرة +20 عام", "ضمان شامل", "+350 مشروع"].map((tag) => (
                        <span key={tag} className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold text-foreground">
                          <CheckCircle2 size={12} className="text-primary" /> {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-10">
                      <Link to="/about" className="inline-flex items-center gap-2 rounded-2xl bg-foreground px-8 py-4 text-sm font-bold text-background transition-all hover:opacity-90 hover:gap-3">
                        اقرأ المزيد <ArrowLeft size={16} />
                      </Link>
                    </div>
                  </div>
                  {/* Feature cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Building2, title: "٣٥٠+", sub: "مشروع منجز بنجاح" },
                      { icon: HardHat, title: "٥٠٠+", sub: "مهندس وفني متخصص" },
                      { icon: ShieldCheck, title: "١٠ سنوات", sub: "ضمان هيكلي" },
                      { icon: Clock, title: "٢٤ ساعة", sub: "استجابة سريعة" },
                    ].map(({ icon: Icon, title, sub }) => (
                      <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <p className="text-2xl font-extrabold text-foreground">{title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── Services ──────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="services" className="py-24 bg-muted/30">
              <div className="mx-auto max-w-7xl px-8">
                <div className="mb-14 text-center">
                  <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">خدماتنا</span>
                  <h2 className="text-4xl font-bold text-foreground md:text-5xl">حلول بناء متكاملة.</h2>
                  <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">نقدم طيفاً شاملاً من خدمات المقاولات، من الفكرة إلى التسليم.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {SERVICES.map(({ icon: Icon, title, desc }, i) => (
                    <RevealSection key={title} delay={i * 0.1}>
                      <div className="group h-full rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-2">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                          <Icon size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{title}</h3>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{desc}</p>
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          اعرف المزيد <ArrowLeft size={14} />
                        </div>
                      </div>
                    </RevealSection>
                  ))}
                </div>
                <div className="mt-14 text-center">
                  <Link to="/services" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-muted hover:gap-3">
                    تصفح كافة الخدمات <ArrowLeft size={16} />
                  </Link>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── Projects ──────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="projects" className="py-24 bg-background">
              <div className="mx-auto max-w-7xl px-8">
                <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">مشاريعنا</span>
                    <h2 className="text-4xl font-bold text-foreground md:text-5xl">أعمال تتحدث عن نفسها.</h2>
                  </div>
                  <Link to="/projects" className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:gap-3">
                    عرض الكل <ArrowLeft size={15} />
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {PROJECTS.map((p, i) => (
                    <RevealSection key={p.name} delay={i * 0.07}>
                      <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
                        {/* Image */}
                        <div className="relative h-52 w-full overflow-hidden bg-muted">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-bold text-foreground shadow-sm border border-border">{p.cat}</span>
                          </div>
                        </div>
                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          <h3 className="text-lg font-bold text-foreground mb-2">{p.name}</h3>
                          <p className="text-sm text-muted-foreground mb-auto">{p.details}</p>
                          <div className="mt-5 flex items-center justify-between pt-4 border-t border-border">
                            <span className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                              <BadgeCheck size={16} /> {p.year}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin size={14} /> {p.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </RevealSection>
                  ))}
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── Testimonials ──────────────────────────────────────────────── */}
          <RevealSection>
            <section className="py-24 bg-muted/30">
              <div className="mx-auto max-w-7xl px-8">
                <div className="mb-14 text-center">
                  <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">آراء عملائنا</span>
                  <h2 className="text-4xl font-bold text-foreground md:text-5xl">ماذا يقول عملاؤنا؟</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {TESTIMONIALS.map((t, i) => (
                    <RevealSection key={t.name} delay={i * 0.1}>
                      <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex gap-1 mb-4">
                          {[...Array(t.stars)].map((_, si) => (
                            <Star key={si} size={16} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="flex-1 text-base leading-loose text-muted-foreground">"{t.text}"</p>
                        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                            {t.name.charAt(3)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </RevealSection>
                  ))}
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── FAQ ───────────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="faq" className="py-24 bg-background">
              <div className="mx-auto max-w-4xl px-8">
                <div className="mb-14 text-center">
                  <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">الأسئلة الشائعة</span>
                  <h2 className="text-4xl font-bold text-foreground md:text-5xl">لديك سؤال؟</h2>
                </div>
                <div className="divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
                  {FAQ.map((item, i) => (
                    <div key={item.q}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-right text-lg font-bold text-foreground hover:bg-muted/50 transition-colors"
                      >
                        {item.q}
                        <ChevronDown
                          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                          size={22}
                        />
                      </button>
                      <div
                        style={{
                          maxHeight: openFaq === i ? "300px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      >
                        <p className="px-6 pb-6 text-base leading-loose text-muted-foreground">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── CTA Contact ───────────────────────────────────────────────── */}
          <RevealSection>
            <section id="contact" className="py-24 bg-foreground text-background">
              <div className="mx-auto max-w-5xl px-8">
                <div className="grid gap-12 md:grid-cols-2 items-center">
                  <div>
                    <span className="inline-block rounded-full bg-background/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-background/70 mb-4">تواصل معنا</span>
                    <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                      مشروعك التالي يبدأ هنا.
                    </h2>
                    <p className="mt-6 text-lg leading-loose text-background/70">
                      تواصل مع فريقنا الهندسي اليوم للحصول على استشارة مجانية وعرض سعر تفصيلي لمشروعك.
                    </p>
                    <div className="mt-8 space-y-4">
                      <a href="tel:+967777000000" className="flex items-center gap-3 text-background/80 hover:text-background transition-colors">
                        <PhoneCall size={18} /> <span className="font-semibold">+967 777 000 000</span>
                      </a>
                      <a href="mailto:info@benaa.ye" className="flex items-center gap-3 text-background/80 hover:text-background transition-colors">
                        <Mail size={18} /> <span className="font-semibold">info@benaa.ye</span>
                      </a>
                      <div className="flex items-center gap-3 text-background/80">
                        <MapPin size={18} /> <span className="font-semibold">عدن، اليمن</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-background/10 border border-background/20 p-8 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-background mb-6">أرسل رسالة</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="الاسم الكامل"
                        className="w-full rounded-xl border border-background/20 bg-background/10 px-4 py-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background/50 transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="رقم الهاتف"
                        className="w-full rounded-xl border border-background/20 bg-background/10 px-4 py-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background/50 transition-colors"
                      />
                      <textarea
                        rows={4}
                        placeholder="تفاصيل المشروع..."
                        className="w-full rounded-xl border border-background/20 bg-background/10 px-4 py-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background/50 transition-colors resize-none"
                      />
                      <button className="w-full rounded-xl bg-background px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-background/90 hover:scale-[1.02] active:scale-100">
                        إرسال الطلب
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </RevealSection>



        </div>
      </div>
    </div>
  );
}
