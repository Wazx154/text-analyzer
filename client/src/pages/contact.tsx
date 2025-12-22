import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto py-8 text-center">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2">اتصل بنا</h1>
        <p className="text-muted-foreground">نحن هنا للإجابة على استفساراتكم ومساعدتكم</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="neu-card hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl neu-pressed flex items-center justify-center text-primary flex-shrink-0 mt-1">
              <Mail size={24} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg mb-2">البريد الإلكتروني</h3>
              <a href="mailto:support@vocational.training" className="text-primary hover:underline text-sm">
                support@vocational.training
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="neu-card hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl neu-pressed flex items-center justify-center text-primary flex-shrink-0 mt-1">
              <Phone size={24} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg mb-2">الهاتف</h3>
              <a href="tel:+212522000000" className="text-primary hover:underline text-sm">
                +212 5 22 00 00 00
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="neu-card hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl neu-pressed flex items-center justify-center text-primary flex-shrink-0 mt-1">
              <MapPin size={24} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg mb-2">المقر الرئيسي</h3>
              <p className="text-muted-foreground text-sm">شارع محمد الخامس<br/>الدار البيضاء، المغرب</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="neu-card hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl neu-pressed flex items-center justify-center text-primary flex-shrink-0 mt-1">
              <Globe size={24} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg mb-2">الموقع الرسمي</h3>
              <a href="https://vocational.training" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                www.vocational.training
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="neu-card p-8 max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-bold text-primary mb-4">ساعات العمل</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">الأحد - الخميس</span>
            <span className="font-semibold">8:00 صباحاً - 5:00 مساءً</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">الجمعة والسبت</span>
            <span className="font-semibold">مغلق</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
