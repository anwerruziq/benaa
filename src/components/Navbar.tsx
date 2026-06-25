import { Link } from "@tanstack/react-router";
import { Menu, X, PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "الرئيسية", href: "/" },
  { label: "عن الشركة", href: "/about" },
  { label: "خدماتنا", href: "/services" },
  { label: "مشاريعنا", href: "/projects" },
  { label: "تواصل", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      <nav className="mx-auto w-full max-w-7xl px-6 py-4">
        <div 
          className={`flex items-center justify-between rounded-full border px-6 py-3 transition-all duration-500 ${
            isScrolled 
              ? "border-border/50 bg-background/70 shadow-lg backdrop-blur-xl" 
              : "border-transparent bg-transparent backdrop-blur-sm"
          }`}
        >
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="بناء للمقاولات" className="h-14 w-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105" />
          </Link>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm font-semibold text-foreground/80 transition-all hover:text-primary hover:-translate-y-0.5 [&.active]:text-primary [&.active]:font-bold inline-block">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg md:flex items-center gap-2 hover:-translate-y-0.5">
            <PhoneCall size={16} />
            اتصل بنا
          </Link>
          <button 
            type="button" 
            aria-label="القائمة" 
            onClick={() => setOpen((v) => !v)} 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-foreground transition-all hover:bg-muted active:scale-95 md:hidden border border-border/50"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mt-4 overflow-hidden rounded-3xl border border-border/50 bg-background/85 p-5 shadow-2xl backdrop-blur-2xl md:hidden animate-in slide-in-from-top-4 fade-in duration-300">
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link 
                    to={item.href} 
                    onClick={() => setOpen(false)} 
                    className="block rounded-2xl px-5 py-3.5 text-base font-bold text-foreground/80 transition-all hover:bg-primary/10 hover:text-primary hover:pl-6 [&.active]:bg-primary/10 [&.active]:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              to="/contact" 
              onClick={() => setOpen(false)} 
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
            >
              <PhoneCall size={18} /> اتصل بنا الآن
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
