import { Link } from "wouter";
import { motion } from "framer-motion";
import logoUrl from "@assets/photo_2025-12-21_16-35-07-Photoroom_1766332295101.png";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-16 py-20">
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
          className="relative z-10"
        >
          <img
            src={logoUrl}
            alt="منصة صوت المتدرب"
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-4 max-w-3xl px-4"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
          🚀 منصة عصرية وموثوقة
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight">
          <span className="gradient-text">صوت المتدرب</span>
          <br/>
          <span className="text-foreground text-4xl md:text-5xl font-bold">يستحق أن يُسمع</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          منصتك الموحدة لتقديم الاقتراحات والشكايات بكل سهولة وشفافية. 
          نحن هنا لنسمع صوتك ونعمل معاً لتحسين بيئة التكوين والتطور المستمر.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-6 w-full max-w-md"
      >
        <Link href="/report" className="flex-1">
          <button
            className="neu-btn-primary w-full rounded-2xl text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
          >
            <span>تقديم شكاية جديدة</span>
            <ArrowRight size={20} />
          </button>
        </Link>

        <Link href="/track" className="flex-1">
          <button
            className="neu-btn w-full rounded-2xl text-lg font-bold hover:scale-105 transition-transform"
          >
            تتبع الشكايات
          </button>
        </Link>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12"
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
