import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن الشركة | بناء للمقاولات" },
      { name: "description", content: "تعرف على شركة بناء للمقاولات وتاريخها العريق في قطاع التشييد والبناء." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative flex min-h-[300px] flex-col items-center justify-center pt-24 pb-12">
        <h1 className="text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl mb-4">
          عن الشركة
        </h1>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-foreground">عن الشركة</span>
        </div>
      </section>

      {/* Section 1: Intro */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted/30 shadow-2xl">
            {/* Image Placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
              alt="مهندس في موقع العمل" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">عن الشركة</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl leading-tight">
              نحن دائماً نقدم الأفضل
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              تأسست شركة بناء للمقاولات عام 2004 في المملكة العربية السعودية، وسرعان ما أثبتت نفسها كواحدة من الشركات الرائدة في قطاع المقاولات العامة والإنشاءات. على مر السنين، تمكنا من تسليم مئات المشاريع بنجاح باهر مع الالتزام التام بمعايير الجودة العالمية والجدول الزمني.
            </p>
            <div className="pt-4">
              <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-colors hover:bg-foreground/90">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Skills & Stats */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Skills */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-4">مهاراتنا</h2>
              <p className="text-lg text-muted-foreground">
                نعتمد على فريق متكامل من الخبراء والمهندسين لضمان أعلى مستويات الدقة والاحترافية في جميع مراحل البناء.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Skill 1 */}
              <div>
                <div className="flex justify-between text-sm font-bold text-foreground mb-2">
                  <span>التنفيذ والبناء</span>
                  <span>95%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                  <div className="h-full bg-foreground rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              {/* Skill 2 */}
              <div>
                <div className="flex justify-between text-sm font-bold text-foreground mb-2">
                  <span>إدارة المشاريع</span>
                  <span>90%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                  <div className="h-full bg-foreground rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              {/* Skill 3 */}
              <div>
                <div className="flex justify-between text-sm font-bold text-foreground mb-2">
                  <span>التصميم المعماري</span>
                  <span>85%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                  <div className="h-full bg-foreground rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12 content-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-foreground md:text-5xl">+20</h3>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">سنوات من الخبرة</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-foreground md:text-5xl">+1,000</h3>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">مشروع منجز</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-foreground md:text-5xl">+300</h3>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">عميل راضٍ</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-extrabold text-foreground md:text-5xl">64</h3>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">جائزة معتمدة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Hire Us CTA */}
      <section className="relative mt-12 mb-24 overflow-hidden rounded-3xl mx-6 xl:mx-auto xl:max-w-7xl">
        <div className="absolute inset-0 bg-background/80">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop" 
            alt="موقع بناء" 
            className="h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative px-6 py-24 text-center md:py-32">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">وظفنا الآن</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold text-foreground md:text-5xl leading-tight">
            نحن مستعدون دائماً لبناء مشروعك المثالي
          </h2>
          <div className="mt-10">
            <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-colors hover:bg-foreground/90">
              ابدأ الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
