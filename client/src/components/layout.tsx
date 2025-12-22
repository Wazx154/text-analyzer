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
      {/* Sidebar - Left */}
      <aside className="fixed right-0 top-0 h-screen w-20 bg-white/80 backdrop-blur-xl border-l border-white/30 flex flex-col items-center justify-center gap-4 z-50 py-8">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-10">
          <img 
            src={logoUrl} 
            alt="صوت المتدرب" 
            className="w-32 h-32 object-contain hover:scale-105 transition-transform drop-shadow-2xl"
            title="صوت المتدرب"
          />
        </Link>

        {/* Divider */}
        <div className="w-12 h-px bg-primary/20 my-2"></div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative p-3 rounded-2xl transition-all duration-300 flex items-center justify-center
                  ${isActive 
                    ? "text-white bg-gradient-to-br from-primary to-purple-600 shadow-lg scale-110" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  title={item.label}
                >
                  <item.icon className="w-6 h-6" />
                </Link>

                {/* Tooltip - Show only on hover or active */}
                <div className={`absolute right-24 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-xl whitespace-nowrap font-medium shadow-lg transition-all duration-200 pointer-events-none
                  ${hoveredNav === item.href ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-2"}`}>
                  {item.label}
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-primary to-purple-600 rotate-45"></div>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 mr-20 flex flex-col min-h-screen">
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
