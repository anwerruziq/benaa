import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "مشاريعنا | بناء للمقاولات" },
      { name: "description", content: "معرض مشاريع شركة بناء للمقاولات، اكتشف أحدث وأكبر أعمالنا في التشييد." },
    ],
  }),
  component: ProjectsPage,
});

const DETAILED_PROJECTS = [
  { name: "مشروع برج النخبة السكني", cat: "برج سكني", year: "مكتمل", location: "خور مكسر - عدن", details: "المساحة: 4,200 م² | عدد الأدوار: 14 دور", image: "/projects/tower.png" },
  { name: "مشروع مجمع الواحة التجاري", cat: "مجمع تجاري", year: "مكتمل", location: "المنصورة - عدن", details: "المساحة: 5,800 م² | عدد المحلات: 52 محل", image: "/projects/mall.png" },
  { name: "مشروع فلل الساحل الحديثة", cat: "فلل سكنية", year: "مكتمل", location: "البريقة - عدن", details: "عدد الوحدات: 24 فيلا", image: "/projects/villas.png" },
  { name: "مشروع مركز النور الطبي", cat: "مركز طبي", year: "مكتمل", location: "الشيخ عثمان - عدن", details: "المساحة: 2,400 م²", image: "/projects/hospital.png" },
  { name: "مشروع مدارس المستقبل الأهلية", cat: "منشأة تعليمية", year: "مكتمل", location: "المنصورة - عدن", details: "السعة: 1,200 طالب", image: "/projects/school.png" },
  { name: "مشروع مستودعات عدن اللوجستية", cat: "مستودعات صناعية", year: "مكتمل", location: "المنطقة الحرة", details: "المساحة: 9,000 م²", image: "/projects/warehouse.png" },
];

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-muted/20 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">مشاريعنا</span>
            </div>
            <h1 className="text-4xl font-extrabold text-foreground md:text-6xl">
              سجل حافل بالإنجازات
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              نفخر بما أنجزناه من مشاريع تنموية وتجارية وسكنية أضافت بصمة معمارية مميزة وساهمت في تطوير البنية التحتية بأعلى معايير الجودة والاحترافية.
            </p>
          </div>
          
          <div className="relative h-[400px] w-full lg:h-[500px]">
            {/* Arch Image Placeholder */}
            <div className="absolute inset-0 mx-auto w-4/5 overflow-hidden rounded-t-[200px] bg-muted/50 shadow-2xl border border-border">
              <img 
                src="/projects/tower.png" 
                alt="مباني شاهقة" 
                className="h-full w-full object-cover opacity-90 mix-blend-luminosity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DETAILED_PROJECTS.map((p) => (
            <div key={p.name} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-foreground/30 hover:shadow-2xl">
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105" 
                  loading="lazy"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-bold text-foreground shadow-sm border border-border">
                    {p.cat}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-1 p-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">{p.name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 flex-1 font-medium">
                  {p.details}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
                  <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <BadgeCheck size={18} className="text-muted-foreground" /> {p.year}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
                    <MapPin size={16} /> {p.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
