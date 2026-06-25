import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Ruler, HardHat, ShieldCheck, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "خدماتنا | بناء للمقاولات" },
      { name: "description", content: "تعرف على الخدمات الهندسية والإنشائية التي نقدمها في شركة بناء للمقاولات." },
    ],
  }),
  component: ServicesPage,
});

const DETAILED_SERVICES = [
  {
    id: "construction",
    icon: Building2,
    title: "البناء والتشييد",
    desc: "نقدم خدمات البناء والتشييد الشاملة للمشاريع السكنية والتجارية والصناعية. نعتمد على أفضل المواد والتقنيات لضمان المتانة والعمر الافتراضي الطويل.",
    features: ["بناء الهيكل العظمي", "التشطيبات المتكاملة", "أعمال العزل المائي والحراري", "تسليم مفتاح"],
  },
  {
    id: "design",
    icon: Ruler,
    title: "التصميم المعماري والإنشائي",
    desc: "فريق من أمهر المهندسين المعماريين يقدمون تصاميم عصرية وعملية تلبي احتياجاتك، بالإضافة إلى المخططات الإنشائية الدقيقة والآمنة.",
    features: ["تصميم معماري 3D", "مخططات تنفيذية", "تصميم داخلي وديكور", "استخراج التراخيص"],
  },
  {
    id: "infrastructure",
    icon: HardHat,
    title: "مشاريع البنية التحتية",
    desc: "تنفيذ مشاريع البنية التحتية الضخمة من شبكات الطرق والمياه والصرف الصحي والكهرباء وفقاً لأعلى المعايير والمواصفات القياسية.",
    features: ["رصف وسفلتة الطرق", "شبكات الصرف الصحي", "تمديدات المياه", "أعمال الحفر والردم"],
  },
  {
    id: "quality",
    icon: ShieldCheck,
    title: "إدارة المشاريع والإشراف",
    desc: "إدارة احترافية لمشروعك تضمن تنفيذه في الوقت المحدد وضمن الميزانية المعتمدة، مع إشراف هندسي يومي لضمان الجودة.",
    features: ["جدولة المشاريع", "مراقبة الجودة والتكاليف", "الإشراف الميداني", "تقارير دورية للعميل"],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Section */}
      <section className="relative bg-card pt-32 pb-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">خدماتنا</span>
            </div>
            <h1 className="text-4xl font-extrabold text-foreground md:text-6xl leading-tight">
              نحول الأفكار إلى واقع صلب
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
              مجموعة متكاملة من الخدمات الهندسية والإنشائية التي تغطي كافة مراحل المشروع، لنكون شريكك الأوحد من الفكرة وحتى التسليم.
            </p>
          </div>
          
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden bg-muted border border-border">
            <img 
              src="https://images.unsplash.com/photo-1541888082425-eb1bbd92a400?q=80&w=2070&auto=format&fit=crop" 
              alt="مهندس في موقع بناء" 
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {DETAILED_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="group relative flex flex-col sm:flex-row gap-8 overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 transition-all duration-300 hover:border-foreground/30 hover:bg-muted/10">
                
                <div className="flex shrink-0 items-start">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-foreground border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">{service.title}</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-base font-medium text-foreground">
                        <CheckCircle2 size={22} className="text-muted-foreground" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
