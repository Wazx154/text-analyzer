import { Link, useLocation } from "wouter";
import { Home, FilePlus, Search, LayoutDashboard, Phone } from "lucide-react";
import logoUrl from "@assets/photo_2025-12-21_16-35-07-Photoroom_1766332295101.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/report", label: "تقديم مشكل", icon: FilePlus },
    { href: "/track", label: "تتبع", icon: Search },
    { href: "/dashboard", label: "الشكايات", icon: LayoutDashboard },
    { href: "/contact", label: "اتصل بنا", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 px-4 py-3 bg-white/70 backdrop-blur-xl border-b border-white/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-bold text-primary shrink-0">
            <img 
              src={logoUrl} 
              alt="صوت المتدرب" 
              className="h-12 w-auto object-contain"
            />
            <span className="hidden sm:inline text-lg">صوت المتدرب</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium whitespace-nowrap
                  ${isActive 
                    ? "text-primary bg-primary/10 shadow-md" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs sm:text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 animate-in fade-in zoom-in-95 duration-500">
        {children}
      </main>

      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>© 2025 منصة صوت المتدرب - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
