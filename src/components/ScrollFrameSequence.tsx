import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Frame file helpers ──────────────────────────────────────────────────────
const ALL_FRAME_PATHS = [
  "frames-extractor-0001-0-00.jpg", "frames-extractor-0002-0-07.jpg", "frames-extractor-0003-0-13.jpg", "frames-extractor-0004-0-20.jpg", "frames-extractor-0005-0-27.jpg",
  "frames-extractor-0006-0-33.jpg", "frames-extractor-0007-0-40.jpg", "frames-extractor-0008-0-47.jpg", "frames-extractor-0009-0-53.jpg", "frames-extractor-0010-0-60.jpg",
  "frames-extractor-0011-0-67.jpg", "frames-extractor-0012-0-73.jpg", "frames-extractor-0013-0-80.jpg", "frames-extractor-0014-0-87.jpg", "frames-extractor-0015-0-93.jpg",
  "frames-extractor-0016-1-00.jpg", "frames-extractor-0017-1-07.jpg", "frames-extractor-0018-1-13.jpg", "frames-extractor-0019-1-20.jpg", "frames-extractor-0020-1-27.jpg",
  "frames-extractor-0021-1-33.jpg", "frames-extractor-0022-1-40.jpg", "frames-extractor-0023-1-47.jpg", "frames-extractor-0024-1-53.jpg", "frames-extractor-0025-1-60.jpg",
  "frames-extractor-0026-1-67.jpg", "frames-extractor-0027-1-73.jpg", "frames-extractor-0028-1-80.jpg", "frames-extractor-0029-1-87.jpg", "frames-extractor-0030-1-93.jpg",
  "frames-extractor-0031-2-00.jpg", "frames-extractor-0032-2-07.jpg", "frames-extractor-0033-2-13.jpg", "frames-extractor-0034-2-20.jpg", "frames-extractor-0035-2-27.jpg",
  "frames-extractor-0036-2-33.jpg", "frames-extractor-0037-2-40.jpg", "frames-extractor-0038-2-47.jpg", "frames-extractor-0039-2-53.jpg", "frames-extractor-0040-2-60.jpg",
  "frames-extractor-0041-2-67.jpg", "frames-extractor-0042-2-73.jpg", "frames-extractor-0043-2-80.jpg", "frames-extractor-0044-2-87.jpg", "frames-extractor-0045-2-93.jpg",
  "frames-extractor-0046-3-00.jpg", "frames-extractor-0047-3-07.jpg", "frames-extractor-0048-3-13.jpg", "frames-extractor-0049-3-20.jpg", "frames-extractor-0050-3-27.jpg",
  "frames-extractor-0051-3-33.jpg", "frames-extractor-0052-3-40.jpg", "frames-extractor-0053-3-47.jpg", "frames-extractor-0054-3-53.jpg", "frames-extractor-0055-3-60.jpg",
  "frames-extractor-0056-3-67.jpg", "frames-extractor-0057-3-73.jpg", "frames-extractor-0058-3-80.jpg", "frames-extractor-0059-3-87.jpg", "frames-extractor-0060-3-93.jpg",
  "frames-extractor-0061-4-00.jpg", "frames-extractor-0062-4-07.jpg", "frames-extractor-0063-4-13.jpg", "frames-extractor-0064-4-20.jpg", "frames-extractor-0065-4-27.jpg",
  "frames-extractor-0066-4-33.jpg", "frames-extractor-0067-4-40.jpg", "frames-extractor-0068-4-47.jpg", "frames-extractor-0069-4-53.jpg", "frames-extractor-0070-4-60.jpg",
  "frames-extractor-0071-4-67.jpg", "frames-extractor-0072-4-73.jpg", "frames-extractor-0073-4-80.jpg", "frames-extractor-0074-4-87.jpg", "frames-extractor-0075-4-93.jpg",
  "frames-extractor-0076-5-00.jpg", "frames-extractor-0077-5-07.jpg", "frames-extractor-0078-5-13.jpg", "frames-extractor-0079-5-20.jpg", "frames-extractor-0080-5-27.jpg",
  "frames-extractor-0081-5-33.jpg", "frames-extractor-0082-5-40.jpg", "frames-extractor-0083-5-47.jpg", "frames-extractor-0084-5-53.jpg", "frames-extractor-0085-5-60.jpg",
  "frames-extractor-0086-5-67.jpg", "frames-extractor-0087-5-73.jpg", "frames-extractor-0088-5-80.jpg", "frames-extractor-0089-5-87.jpg", "frames-extractor-0090-5-93.jpg",
  "frames-extractor-0091-6-00.jpg", "frames-extractor-0092-6-07.jpg", "frames-extractor-0093-6-13.jpg", "frames-extractor-0094-6-20.jpg", "frames-extractor-0095-6-27.jpg",
  "frames-extractor-0096-6-33.jpg", "frames-extractor-0097-6-40.jpg", "frames-extractor-0098-6-47.jpg", "frames-extractor-0099-6-53.jpg", "frames-extractor-0100-6-60.jpg",
  "frames-extractor-0101-6-67.jpg", "frames-extractor-0102-6-73.jpg", "frames-extractor-0103-6-80.jpg", "frames-extractor-0104-6-87.jpg", "frames-extractor-0105-6-93.jpg",
  "frames-extractor-0106-7-00.jpg", "frames-extractor-0107-7-07.jpg", "frames-extractor-0108-7-13.jpg", "frames-extractor-0109-7-20.jpg", "frames-extractor-0110-7-27.jpg",
  "frames-extractor-0111-7-33.jpg"
].map(file => `/frame2/${file}`);

// ─── Component ───────────────────────────────────────────────────────────────
export function ScrollFrameSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const text3Ref = useRef<HTMLSpanElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // ── Check prefers-reduced-motion ──
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Draw a frame on canvas (cover-fit, HiDPI) ──
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const images = imagesRef.current;
    if (!canvas || !ctx || images.length === 0) return;

    const img = images[Math.min(index, images.length - 1)];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Enhance image rendering quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Cover-fit math
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, []);

  // ── Preload frames ──
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // On mobile, use every other frame to save memory
    const paths = isMobile
      ? ALL_FRAME_PATHS.filter((_, i) => i % 2 === 0 || i === ALL_FRAME_PATHS.length - 1)
      : ALL_FRAME_PATHS;

    let loadedCount = 0;
    const total = paths.length;
    const images: HTMLImageElement[] = [];

    const onLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / total) * 100));
      if (loadedCount === total) {
        imagesRef.current = images;
        setLoaded(true);
      }
    };

    paths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = onLoad;
      img.onerror = onLoad; // count errors too so we don't hang
      images.push(img);
    });
  }, []);

  // ── Draw first frame once loaded ──
  useEffect(() => {
    if (loaded) {
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  // ── Handle resize — redraw current frame ──
  useEffect(() => {
    if (!loaded) return;
    const onResize = () => drawFrame(frameIndexRef.current.value);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, drawFrame]);

  // ── GSAP ScrollTrigger animation ──
  useEffect(() => {
    if (!loaded || prefersReduced) return;

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const headline = headlineRef.current;
    const t2 = text2Ref.current;
    const t3 = text3Ref.current;
    if (!wrapper || !canvas || !headline || !t2 || !t3) return;

    const totalImages = imagesRef.current.length;
    const frameObj = frameIndexRef.current;
    frameObj.value = 0;

    // Lock body scroll during loading was already handled; ensure it's unlocked now
    document.body.style.overflow = "";

    const ctx = gsap.context(() => {
      // Main frame scrub
      gsap.to(frameObj, {
        value: totalImages - 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Tighter sync for smoother response
          onUpdate: () => {
            drawFrame(Math.round(frameObj.value));
          },
        },
      });

      // Pin the canvas area
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: canvas.parentElement!, // pin the sticky container
        pinSpacing: false,
      });

      // Clear text initially
      t2.innerText = "";
      t3.innerText = "";
      gsap.set(headline, { opacity: 1, y: 0, filter: "blur(0px)" });

      // Typing animation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top", // Starts as soon as pinned
          toggleActions: "play none none reverse",
        }
      });

      tl.to(t2, { duration: 0.8, text: "بناء للمقاولات", ease: "none" })
        .to(t3, { duration: 1.2, text: "نبني المستقبل بأيدٍ خبيرة وتقنيات حديثة", ease: "none" });

      // Erase (reverse typing) animation after 10th frame (~9% of scroll)
      const eraseTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "9% top",
          toggleActions: "play none none reverse",
        }
      });

      eraseTl.to(t3, { duration: 0.8, text: "", ease: "none" })
             .to(t2, { duration: 0.6, text: "", ease: "none" });
    }, wrapper);

    return () => ctx.revert();
  }, [loaded, prefersReduced, drawFrame]);

  // ── Lock scroll during preload ──
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  // ── Reduced-motion: show last frame statically ──
  useEffect(() => {
    if (prefersReduced && loaded) {
      drawFrame(0);
    }
  }, [prefersReduced, loaded, drawFrame]);

  return (
    <>
      {/* ── Loading overlay ───────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <img src="/loading.gif" alt="جاري التحميل..." className="w-full h-full object-contain p-4 md:p-12" />
      </div>

      {/* ── Scroll-pinned canvas zone ─────────────────────────────────── */}
      <div
        ref={wrapperRef}
        className={`relative z-10 ${prefersReduced ? "h-screen" : "h-[280vh] md:h-[480vh]"}`}
        style={{ marginTop: "-6rem" }} /* -mt-24 equivalent to overlap navbar */
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ display: "block" }}
          />

          {/* Gradient overlays matching the old video look (lightened for better frame clarity) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

          {/* Headline overlay */}
          <div
            ref={headlineRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            style={prefersReduced ? {} : { opacity: 1 }}
          >
            <h1 className="text-white drop-shadow-2xl">
              <span
                ref={text2Ref}
                className="block text-5xl font-extrabold md:text-7xl lg:text-[7rem] tracking-tight leading-none min-h-[48px] md:min-h-[112px]"
                style={{ textShadow: "0 10px 60px rgba(0,0,0,0.7)" }}
              >
                {prefersReduced ? "بناء للمقاولات" : ""}
              </span>
              <span
                ref={text3Ref}
                className="mt-4 block text-lg font-medium text-white/75 md:text-xl min-h-[28px]"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
              >
                {prefersReduced ? "نبني المستقبل بأيدٍ خبيرة وتقنيات حديثة" : ""}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
