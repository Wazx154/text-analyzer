import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-2xl"
      >
        <div className="w-24 h-24 bg-background rounded-full mx-auto flex items-center justify-center neu-flat mb-8">
          <span className="text-4xl">📢</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
          مرحباً بك في <br/>
          <span className="text-foreground">منصة صوت المتدرب</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          منصتك الموحدة لتقديم الاقتراحات والشكايات بكل سهولة وشفافية. 
          نحن هنا لنسمع صوتك ونعمل معاً لتحسين بيئة التكوين.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg"
      >
        <Link href="/report">
          <a className="neu-card hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-4 text-center group cursor-pointer h-full">
            <div className="w-16 h-16 rounded-full bg-background neu-pressed flex items-center justify-center text-2xl group-hover:text-primary transition-colors">
              📝
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">تقديم مشكل</h3>
              <p className="text-sm text-muted-foreground">أبلغ عن مشكلة تواجهك في المعهد</p>
            </div>
          </a>
        </Link>

        <Link href="/track">
          <a className="neu-card hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-4 text-center group cursor-pointer h-full">
            <div className="w-16 h-16 rounded-full bg-background neu-pressed flex items-center justify-center text-2xl group-hover:text-primary transition-colors">
              🔍
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">تتبع الشكاية</h3>
              <p className="text-sm text-muted-foreground">تابع حالة شكايتك برقم التتبع</p>
            </div>
          </a>
        </Link>
      </motion.div>
    </div>
  );
}
