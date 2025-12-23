import { Link } from "wouter";
import { motion } from "framer-motion";
import logoUrl from "@assets/photo_2025-12-21_16-35-07-Photoroom_1766332295101.png";
import { ArrowRight, Users, FileText, Zap } from "lucide-react";
import { getComplaints } from "@/lib/store";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";

export default function Home() {
  const complaints = getComplaints();
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  const pending = complaints.filter(c => c.status === 'pending').length;
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 lg:space-y-12 py-4 sm:py-6 lg:py-8 mt-8 lg:mt-0">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full flex justify-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={logoUrl}
            alt="منصة صوت المتدرب"
            className="w-40 sm:w-52 lg:w-64 h-40 sm:h-52 lg:h-64 object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-2 sm:space-y-3 max-w-2xl px-2 sm:px-4"
      >
        <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary text-xs sm:text-sm font-bold">
          🚀 {t("platformDesc", language)}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
          <span className="gradient-text">{t("mainTitle", language)}</span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
          {t("mainDesc", language)}
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 w-full max-w-2xl px-2 sm:px-4"
      >
        <div className="neu-card flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-6 px-2 sm:px-3">
          <FileText className="text-primary" size={24} />
          <span className="text-lg sm:text-2xl font-bold text-primary">{complaints.length}</span>
          <span className="text-xs text-muted-foreground text-center">{t("totalComplaints", language)}</span>
        </div>
        <div className="neu-card flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-6 px-2 sm:px-3">
          <Zap className="text-amber-500" size={24} />
          <span className="text-lg sm:text-2xl font-bold text-amber-500">{pending}</span>
          <span className="text-xs text-muted-foreground text-center">{t("pending", language)}</span>
        </div>
        <div className="neu-card flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-6 px-2 sm:px-3">
          <Users className="text-green-500" size={24} />
          <span className="text-lg sm:text-2xl font-bold text-green-500">{resolved}</span>
          <span className="text-xs text-muted-foreground text-center">{t("resolved", language)}</span>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md px-2 sm:px-4"
      >
        <Link href="/report" className="flex-1">
          <button className="neu-btn-primary w-full rounded-2xl text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform py-2 sm:py-3">
            <span>{t("submitComplaint", language)}</span>
            <ArrowRight size={18} />
          </button>
        </Link>
        <Link href="/track" className="flex-1">
          <button className="neu-btn w-full rounded-2xl text-sm sm:text-base lg:text-lg font-bold hover:scale-105 transition-transform py-2 sm:py-3">
            {t("trackComplaint", language)}
          </button>
        </Link>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full max-w-4xl mt-2 sm:mt-4 px-2 sm:px-4"
      >
        {[
          {
            icon: "⚡",
            title: "سريعة وسهلة",
            desc: "تقديم الشكايات بخطوات بسيطة وواضحة",
          },
          {
            icon: "🔒",
            title: "آمنة وموثوقة",
            desc: "حماية كاملة لبيانات المتدربين والشكايات",
          },
          {
            icon: "📊",
            title: "شفافة وفعالة",
            desc: "تتبع مستمر لحالة الشكايات والإجراءات",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + idx * 0.1 }}
            className="neu-card flex flex-col items-center gap-4"
          >
            <span className="text-4xl">{feature.icon}</span>
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
