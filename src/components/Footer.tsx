import { PhoneCall, MapPin, Mail, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 z-20 relative">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-8 lg:flex-row lg:items-start lg:gap-12">
        {/* Brand & About */}
        <div className="flex-1 max-w-xs">
          <Link to="/" className="inline-block mb-4">
            <img src="/logo.png" alt="بناء للمقاولات" className="h-16 w-auto object-contain" />
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            شركة رائدة في قطاع البناء والتشييد، نبني المستقبل بأيدٍ خبيرة وتقنيات حديثة منذ عام 2004.
          </p>
          <div className="flex gap-3">
            {[
              { icon: "bxl-twitter", href: "#" },
              { icon: "bxl-facebook", href: "#" },
              { icon: "bxl-instagram", href: "#" },
              { icon: "bxl-youtube", href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-lg"
              >
                <i className={`bx ${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-none">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">التنقل</h4>
          <ul className="space-y-2">
            {[
              { label: "الرئيسية", to: "/" },
              { label: "عن الشركة", to: "/about" },
              { label: "خدماتنا", to: "/services" },
              { label: "مشاريعنا", to: "/projects" },
              { label: "تواصل معنا", to: "/contact" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="flex-none">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">خدماتنا</h4>
          <ul className="space-y-2">
            {[
              { label: "البناء والتشييد", to: "/services" },
              { label: "التصميم المعماري", to: "/services" },
              { label: "الإشراف الهندسي", to: "/services" },
              { label: "الطرق والبنية التحتية", to: "/services" },
              { label: "ضمان الجودة", to: "/services" },
            ].map((s, i) => (
              <li key={i}>
                <Link to={s.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="flex-1 max-w-sm">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">تواصل معنا</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <PhoneCall size={16} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground" dir="ltr">+967 777 000 000</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">info@benaa.ye</p>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">عدن، اليمن</p>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">السبت – الخميس: 8:00 ص – 5:00 م</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-8 mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} بناء للمقاولات. جميع الحقوق محفوظة.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
          <Link to="/" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}
