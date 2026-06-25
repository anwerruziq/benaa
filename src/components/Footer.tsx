import { Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10 z-20 relative">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 size={16} />
          </span>
          <span className="text-lg font-bold text-foreground">بناء للمقاولات</span>
        </div>
        <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} بناء للمقاولات. جميع الحقوق محفوظة.</span>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
          <Link to="/" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}
