import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneCall, Mail, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | بناء للمقاولات" },
      { name: "description", content: "تواصل مع فريق بناء للمقاولات لطلب عرض سعر أو الاستفسار عن خدماتنا." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-muted/20 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">تواصل معنا</span>
            </div>
            <h1 className="text-4xl font-extrabold text-foreground md:text-6xl">
              تواصل معنا
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              نحن هنا للاستماع إليك. سواء كان لديك استفسار بسيط أو مشروع ضخم تود مناقشته، فريقنا المتخصص مستعد لتقديم المشورة والمساعدة في أي وقت.
            </p>
          </div>
          
          <div className="relative h-[400px] w-full lg:h-[500px]">
            {/* Arch Image Placeholder */}
            <div className="absolute inset-0 mx-auto w-4/5 overflow-hidden rounded-t-[200px] bg-muted/50 shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="مكتب العمل" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">معلومات التواصل</h2>
          <p className="text-lg text-muted-foreground">
            يمكنك الوصول إلينا عبر القنوات التالية خلال أوقات العمل الرسمية.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <PhoneCall size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">(+966) 50 000 0000</h3>
            <p className="text-sm text-muted-foreground">من الأحد إلى الخميس، 8 ص - 5 م</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">info@binaa.sa</h3>
            <p className="text-sm text-muted-foreground">راسلنا وسنرد خلال 24 ساعة</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">الرياض، العليا</h3>
            <p className="text-sm text-muted-foreground">طريق الملك فهد، المملكة العربية السعودية</p>
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          
          {/* Contact Form */}
          <div className="rounded-3xl border border-border bg-card p-10 shadow-xl">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">ابق على تواصل!</h2>
            <p className="text-muted-foreground mb-8">
              املأ النموذج أدناه وسيقوم أحد ممثلينا بالتواصل معك قريباً.
            </p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <input type="email" id="email" placeholder="البريد الإلكتروني" className="w-full rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" dir="rtl" />
              </div>
              <div className="space-y-2">
                <input type="text" id="name" placeholder="الاسم الكامل" className="w-full rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <textarea id="message" rows={5} placeholder="اكتب رسالتك هنا..." className="w-full resize-none rounded-2xl border border-input bg-background/50 px-5 py-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
              </div>

              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90">
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* Location & Social */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground mb-4">موقعنا</h2>
              <p className="text-lg text-muted-foreground">
                نسعد بزيارتك في مقرنا الرئيسي لمناقشة تفاصيل مشروعك القادم على كوب من القهوة.
              </p>
            </div>
            
            <div className="h-[250px] w-full overflow-hidden rounded-3xl border border-border bg-muted">
              {/* Google Maps Placeholder using a static map image or iframe */}
              <iframe 
                title="موقع الشركة"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115860.88514138127!2d46.738586!3d24.774265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efddee3747eb1%3A0x1e36093d567a213e!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 mix-blend-luminosity"
              ></iframe>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">منصات التواصل</h3>
              <div className="flex gap-4">
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  <Facebook size={20} />
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  <Twitter size={20} />
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  <Instagram size={20} />
                </a>
                <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
