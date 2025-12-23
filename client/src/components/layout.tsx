import { Link, useLocation } from "wouter";
import { Home, FilePlus, Search, LayoutDashboard, Phone, Globe, Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import logoUrl from "@assets/photo_2025-12-21_16-35-07-Photoroom_1766332295101.png";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDark);
  };

  const navItems = [
    { href: "/", label: t("home", language), icon: Home },
    { href: "/report", label: t("report", language), icon: FilePlus },
    { href: "/track", label: t("track", language), icon: Search },
    { href: "/dashboard", label: t("dashboard", language), icon: LayoutDashboard },
    { href: "/contact", label: t("contact", language), icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-all"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative right-0 top-0 h-screen lg:h-auto w-56 lg:w-full lg:max-w-56 bg-gradient-to-b from-white/90 to-white/70 dark:from-slate-800/95 dark:to-slate-900/95 backdrop-blur-2xl border-l border-white/40 dark:border-slate-700/60 shadow-2xl flex flex-col items-center justify-start gap-0 z-40 lg:z-50 py-6 overflow-y-auto transition-all duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo Section */}
        <Link href="/" className="flex items-center justify-center mb-6 lg:mb-8" onClick={() => setMobileMenuOpen(false)}>
          <img 
            src={logoUrl} 
            alt="صوت المتدرب" 
            className="w-28 lg:w-40 h-28 lg:h-40 object-contain hover:scale-110 transition-all duration-300 drop-shadow-xl"
            title="صوت المتدرب"
          />
        </Link>

        {/* Divider with gradient */}
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent my-4 rounded-full"></div>

        {/* Title */}
        <h2 className="text-sm font-bold text-primary text-center px-4 mb-6">{t("mainMenu", language)}</h2>

        {/* Language & Theme Toggles */}
        <div className="w-full px-3 lg:px-4 mb-4 lg:mb-6 flex flex-col gap-2 lg:gap-3">
          {/* Language Selector */}
          <div className="flex items-center justify-center gap-1 p-2 rounded-xl bg-primary/10 dark:bg-primary/20 transition-colors">
            {(['ar', 'en', 'fr'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-1.5 py-1 lg:px-2 rounded-lg text-xs font-bold transition-all ${
                  language === lang 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-muted-foreground dark:text-slate-300 hover:text-primary dark:hover:text-primary/90'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 p-2 lg:p-3 rounded-xl bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary transition-all"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-xs font-bold">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>

        {/* Navigation Toggle Button (Mobile Only) */}
        <button
          onClick={() => setShowNavItems(!showNavItems)}
          className="lg:hidden w-full px-3 mb-3 py-2 rounded-xl bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary transition-all flex items-center justify-center gap-2"
        >
          <span className="text-sm font-bold">الخيارات</span>
          <ChevronDown size={16} className={`transition-transform ${showNavItems ? 'rotate-180' : ''}`} />
        </button>

        {/* Navigation Items */}
        <nav className={`flex flex-col gap-2 lg:gap-3 w-full px-3 lg:px-4 flex-1 transition-all duration-300 overflow-hidden ${
          showNavItems ? 'max-h-96' : 'lg:max-h-96 max-h-0 lg:block'
        }`}>
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative w-full p-3 lg:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 group
                  ${isActive 
                    ? "text-white bg-gradient-to-r from-primary via-primary to-purple-600 shadow-lg scale-105 font-bold" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/15"
                  }`}
                  title={item.label}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? "scale-125" : "group-hover:scale-110"}`} />
                  <span className="text-sm font-medium text-right flex-1">{item.label}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0"></div>}
                </Link>

                {/* Tooltip - Show only on hover (hidden on mobile) */}
                <div className={`hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-lg whitespace-nowrap text-xs font-medium shadow-lg transition-all duration-200 pointer-events-none
                  ${hoveredNav === item.href ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-2"}`}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="w-full px-3 lg:px-4 py-3 lg:py-4 mt-auto border-t border-white/20 dark:border-slate-700/60 transition-colors">
          <p className="text-xs text-muted-foreground dark:text-slate-300 text-center">{t("platformDesc", language)}</p>
          <p className="text-xs text-primary font-bold text-center mt-1">{t("platformName", language)}</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full lg:mr-56 flex flex-col min-h-screen relative z-0">
        <main className="flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-500 overflow-x-hidden">
          <div className="flex flex-col items-center text-center w-full">
            {children}
          </div>
        </main>

        <footer className="py-4 sm:py-6 text-center text-muted-foreground text-xs sm:text-sm border-t border-white/20 dark:border-slate-700/60 px-3">
          <p>© 2025 منصة صوت المتدرب - جميع الحقوق محفوظة</p>
        </footer>
      </div>
    </div>
  );
}
