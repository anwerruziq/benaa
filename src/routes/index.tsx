// Local video served from the public folder
import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Building2, HardHat, Ruler, ShieldCheck, BadgeCheck,
  PhoneCall, MapPin
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "بناء للمقاولات   " },
      { name: "description", content: "شركة بناء للمقاولات — خبرة عشرين عاماً في البناء والتشييد والمقاولات العامة بأعلى معايير الجودة." },
      { property: "og:title", content: "بناء للمقاولات" },
      { property: "og:description", content: "نبني المستقبل بأيدٍ خبيرة وتقنيات حديثة." },
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
  { value: "+٢٠", label: "عاماً من الخبرة" },
  { value: "+٣٥٠", label: "مشروع منجز" },
  { value: "+١٢٠٠", label: "عميل راضٍ" },
  { value: "١٠٠٪", label: "التزام بالمواعيد" },
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
  { q: "ما هي المناطق الجغرافية التي تغطيها الشركة؟", a: "نعمل في جميع مناطق المملكة العربية السعودية، ولدينا مشاريع في عدة دول خليجية." },
  { q: "كيف يمكنني الحصول على عرض سعر؟", a: "تواصل معنا عبر الهاتف أو النموذج أدناه، وسيرد عليك فريقنا الهندسي خلال 24 ساعة بعرض سعر مفصّل." },
  { q: "هل تقدمون ضماناً على الأعمال المنفذة؟", a: "نعم، نقدم ضماناً هيكلياً لمدة 10 سنوات على الأعمال الإنشائية و5 سنوات على أعمال التشطيب." },
  { q: "هل يمكنكم تنفيذ مشاريع حكومية وكبرى؟", a: "نعم، لدينا تصنيف مقاولين درجة أولى ونؤهلنا لتنفيذ المشاريع الحكومية والمنافسة في المناقصات الكبرى." },
];

// ─── Scroll-reveal with blur ────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  // Use lighter animation on mobile to avoid GPU overload
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const translateY = isMobile ? "28px" : "56px";
  const blurAmt = isMobile ? "4px" : "8px";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${translateY})`,
        filter: visible ? "blur(0px)" : `blur(${blurAmt})`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Smooth scroll-driven video (lerp / RAF approach) ──────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let duration = 0;
    let rafId: number;
    let currentSmooth = 0;          // smoothed currentTime value
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    // On mobile use stronger smoothing (closer to 1 = slower lerp)
    const LERP_FACTOR = isMobile ? 0.06 : 0.12;

    const clamp = (v: number, lo: number, hi: number) =>
      v < lo ? lo : v > hi ? hi : v;

    const getTargetTime = (): number => {
      const hero = heroRef.current;
      if (!hero || duration <= 0) return 0;
      const rect = hero.getBoundingClientRect();
      const range = Math.max(1, hero.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / range, 0, 1);
      return progress * (duration - 0.05);
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (duration <= 0) return;

      const target = getTargetTime();
      // Lerp the smooth value toward the target each frame
      currentSmooth += (target - currentSmooth) * LERP_FACTOR;

      const diff = Math.abs(currentSmooth - video.currentTime);
      // Only update if the difference is meaningful (avoids unnecessary seeks)
      if (diff > 0.02) {
        try { video.currentTime = clamp(currentSmooth, 0, duration - 0.05); } catch { /* ignore */ }
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

  /* ── Blur background on scroll (RAF-throttled) ────────────────────── */
  useEffect(() => {
    let rafPending = false;

    const updateBg = () => {
      rafPending = false;
      const hero = heroRef.current;
      const bg = document.getElementById("video-bg-container");
      const textEl = document.getElementById("hero-main-text");
      if (!hero || !bg) return;
      const rect = hero.getBoundingClientRect();
      const overscroll = Math.max(0, window.innerHeight - rect.bottom);

      if (textEl) {
        const scrollY = window.scrollY;
        const textOpacity = Math.max(0, 1 - scrollY / 500);
        const textTransform = scrollY * 0.35;
        const textBlur = Math.min(scrollY / 80, 15);
        textEl.style.opacity = `${textOpacity}`;
        textEl.style.transform = `translateY(${-textTransform}px)`;
        textEl.style.filter = `blur(${textBlur}px)`;
      }

      if (overscroll > 0) {
        const blurVal = Math.min(overscroll / 18, 18);
        const opacityVal = Math.max(0.45, 1 - overscroll / 600);
        bg.style.filter = `blur(${blurVal.toFixed(1)}px)`;
        bg.style.opacity = `${opacityVal.toFixed(3)}`;
        bg.style.transform = `scale(${(1 + blurVal / 120).toFixed(4)})`;
      } else {
        bg.style.filter = "";
        bg.style.opacity = "";
        bg.style.transform = "";
      }
    };

    const onScroll = () => {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updateBg);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen" dir="rtl">

      {/* ── FIXED VIDEO BACKGROUND ─────────────────────────────────────── */}
      <div
        id="video-bg-container"
        className="fixed inset-0 z-0 h-screen w-full origin-center"
        style={{ willChange: "filter, opacity, transform" }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
      </div>

      {/* Navigation moved to layout */}

      {/* ── Hero (scroll-driven video zone) ──────────────────────────────── */}
      {/* Mobile: 200vh is enough; desktop: 320vh for longer scrub */}
      <section ref={heroRef} id="start" className="relative z-10 -mt-24 h-[200vh] md:h-[320vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div id="hero-main-text" className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform">
            <div
              className="transition-all duration-[1500ms] ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1) translateY(0)" : "scale(0.85) translateY(60px)",
                filter: mounted ? "blur(0px)" : "blur(12px)",
              }}
            >
              <h1 className="text-white drop-shadow-2xl">
                <span className="block text-7xl font-extrabold md:text-8xl lg:text-[9rem] tracking-tighter" style={{ textShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
                  بناء للمقاولات
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENT PANEL — slides UP over the fixed video with blur effect
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-20">
        {/* Glass transition strip */}
        <div className="relative -mt-1">
          <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background/60 backdrop-blur-md pointer-events-none" />
        </div>

        <div className="rounded-t-[3rem] bg-background/95 backdrop-blur-2xl shadow-[0_-30px_80px_rgba(0,0,0,0.5)] border-t border-border">

          {/* ── Stats ─────────────────────────────────────────────────────── */}
          <RevealSection>
            <section className="relative bg-muted py-12 rounded-t-[3rem]">
              <div className="mx-auto max-w-7xl px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  {STATS.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-3xl font-extrabold text-foreground md:text-5xl">{s.value}</p>
                      <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── About ─────────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="about" className="relative bg-background py-24">
              <div className="mx-auto max-w-7xl px-8">
                <div className="rounded-[3rem] border border-border bg-card p-10 shadow-sm md:p-16">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">عن الشركة</span>
                  <h2 className="mt-3 max-w-3xl text-4xl font-bold leading-snug text-foreground md:text-5xl">
                    ثلاثة عقود من البناء الحقيقي.
                  </h2>
                  <div className="mt-10 grid gap-10 md:grid-cols-2">
                    <p className="text-lg leading-loose text-muted-foreground">
                      تأسست شركة <strong className="text-foreground">بناء للمقاولات</strong> عام 2004، وعلى مدى أكثر من عشرين عاماً أثبتنا حضوراً راسخاً في قطاع البناء والتشييد. نمزج بين الخبرة المحلية العميقة والتقنيات الهندسية الحديثة لتقديم مشاريع استثنائية في وقتها وضمن ميزانيتها.
                    </p>
                    <p className="text-lg leading-loose text-muted-foreground">
                      فريقنا يضم أكثر من 500 مهندس وفني متخصص، ونمتلك أسطولاً متكاملاً من المعدات الثقيلة الحديثة. نؤمن أن كل مبنى يبنيه فريقنا هو إرث يبقى للأجيال القادمة، لذا نتعامل مع كل مشروع بمسؤولية واحترافية كاملة.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-3">
                    {["ISO 9001:2015", "تصنيف أول", "خبرة +20 عام", "ضمان شامل", "+350 مشروع"].map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-muted px-5 py-2 text-sm font-semibold text-foreground">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-12">
                    <Link to="/about" className="inline-flex rounded-2xl bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all hover:opacity-90">اقرأ المزيد عنا</Link>
                  </div>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── Services ──────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="services" className="relative bg-muted/20 py-24">
              <div className="mx-auto max-w-7xl px-8">
                <div className="mb-14 text-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">خدماتنا</span>
                  <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">حلول بناء متكاملة.</h2>
                  <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">نقدم طيفاً شاملاً من خدمات المقاولات، من الفكرة إلى التسليم.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {SERVICES.map(({ icon: Icon, title, desc }, i) => (
                    <RevealSection key={title} delay={i * 0.1}>
                      <div className="group rounded-[2rem] border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-foreground/30 hover:shadow-xl hover:-translate-y-1">
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-foreground border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{title}</h3>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{desc}</p>
                      </div>
                    </RevealSection>
                  ))}
                </div>
                <div className="mt-16 text-center">
                  <Link to="/services" className="inline-flex rounded-2xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-foreground/50 hover:bg-muted">تصفح كافة الخدمات</Link>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── Projects ──────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="projects" className="relative bg-background py-24">
              <div className="mx-auto max-w-7xl px-8">
                <div className="mb-14 text-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">مشاريعنا</span>
                  <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">أعمال تتحدث عن نفسها.</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {PROJECTS.map((p, i) => (
                    <RevealSection key={p.name} delay={i * 0.08}>
                      <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-all duration-300 hover:border-foreground/30 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
                        {/* Image Container */}
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-bold text-foreground shadow-sm border border-border">{p.cat}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6 md:p-8">
                          <h3 className="text-xl font-bold text-foreground mb-3">{p.name}</h3>
                          <div className="mt-auto flex items-center justify-between pt-5 border-t border-border">
                            <span className="flex items-center gap-2 text-sm font-bold text-foreground"><BadgeCheck size={18} className="text-muted-foreground" /> {p.year}</span>
                            <span className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
                              <MapPin size={16} /> {p.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </RevealSection>
                  ))}
                </div>
                <div className="mt-16 text-center">
                  <Link to="/projects" className="inline-flex rounded-2xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-all hover:border-foreground/50 hover:bg-muted">عرض معرض المشاريع</Link>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── FAQ ───────────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="faq" className="relative bg-muted/20 py-24">
              <div className="mx-auto max-w-4xl px-8">
                <div className="rounded-[3rem] border border-border bg-card p-10 shadow-sm md:p-16">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">الأسئلة الشائعة</span>
                  <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">لديك سؤال؟</h2>
                  <div className="mt-12 divide-y divide-border">
                    {FAQ.map((item) => (
                      <details key={item.q} className="group py-6">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-foreground">
                          {item.q}
                          <ChevronDown className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180" size={24} />
                        </summary>
                        <p className="mt-4 text-base leading-loose text-muted-foreground">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* ── Contact ───────────────────────────────────────────────────── */}
          <RevealSection>
            <section id="contact" className="relative bg-card border-t border-border py-32">
              <div className="mx-auto max-w-4xl px-8 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">تواصل معنا</span>
                <h2 className="mt-4 text-5xl font-extrabold text-foreground md:text-6xl tracking-tight">مشروعك التالي يبدأ هنا.</h2>
                <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
                  تواصل مع فريقنا الهندسي اليوم للحصول على استشارة مجانية وعرض سعر تفصيلي لمشروعك.
                </p>
                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                  <a href="tel:+966500000000" className="flex items-center gap-3 rounded-2xl bg-foreground px-8 py-4 text-lg font-bold text-background shadow-2xl transition-all hover:opacity-90">
                    <PhoneCall size={20} /> اتصل الآن
                  </a>
                  <Link to="/contact" className="rounded-2xl border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-muted">
                    صفحة التواصل
                  </Link>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* Footer moved to layout */}

        </div>
      </div>

    </div>
  );
}
