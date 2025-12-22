import { Link, useLocation } from "wouter";
import { Home, FilePlus, Search, LayoutDashboard, Phone } from "lucide-react";
import logoUrl from "@assets/photo_2025-12-21_16-35-07-Photoroom_1766332295101.png";
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/report", label: "تقديم مشكل", icon: FilePlus },
    { href: "/track", label: "تتبع الشكايات", icon: Search },
    { href: "/dashboard", label: "لوحة الشكايات", icon: LayoutDashboard },
    { href: "/contact", label: "اتصل بنا", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-screen w-56 bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-2xl border-l border-white/40 shadow-2xl flex flex-col items-center justify-start gap-0 z-50 py-6 overflow-y-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <img 
            src={logoUrl} 
            alt="صوت المتدرب" 
            className="w-40 h-40 object-contain hover:scale-110 transition-all duration-300 drop-shadow-xl"
            title="صوت المتدرب"
          />
        </Link>

        {/* Divider with gradient */}
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent my-4 rounded-full"></div>

        {/* Title */}
        <h2 className="text-sm font-bold text-primary text-center px-4 mb-6">القائمة الرئيسية</h2>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-3 w-full px-4 flex-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative w-full p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 group
                  ${isActive 
                    ? "text-white bg-gradient-to-r from-primary via-primary to-purple-600 shadow-lg scale-105 font-bold" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/15"
                  }`}
                  title={item.label}
                >
                  <item.icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "scale-125" : "group-hover:scale-110"}`} />
                  <span className="text-sm font-medium text-right flex-1">{item.label}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                </Link>

                {/* Tooltip - Show only on hover */}
                <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-lg whitespace-nowrap text-xs font-medium shadow-lg transition-all duration-200 pointer-events-none
                  ${hoveredNav === item.href ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-2"}`}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="w-full px-4 py-4 mt-auto border-t border-white/20">
          <p className="text-xs text-muted-foreground text-center">منصة آمنة وموثوقة</p>
          <p className="text-xs text-primary font-bold text-center mt-1">صوت المتدرب</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 mr-56 flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 animate-in fade-in zoom-in-95 duration-500">
          {children}
        </main>

        <footer className="py-6 text-center text-muted-foreground text-sm border-t border-white/20">
          <p>© 2025 منصة صوت المتدرب - جميع الحقوق محفوظة</p>
        </footer>
      </div>
    </div>
  );
}
