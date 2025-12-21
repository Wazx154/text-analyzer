import { Link, useLocation } from "wouter";
import { Home, FilePlus, Search, LayoutDashboard, Phone } from "lucide-react";

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
      <nav className="sticky top-0 z-50 px-4 py-3 bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto neu-flat rounded-full px-6 py-3 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-2 font-bold text-primary shrink-0 ml-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
              <span className="text-lg">ص</span>
            </div>
            <span className="hidden sm:inline">صوت المتدرب</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium whitespace-nowrap
                    ${isActive 
                      ? "text-primary shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_#ffffff]" 
                      : "text-muted-foreground hover:text-primary hover:shadow-[3px_3px_6px_#bec3c9,-3px_-3px_6px_#ffffff]"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </a>
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
