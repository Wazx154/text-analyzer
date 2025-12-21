import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto py-8 text-center">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2">اتصل بنا</h1>
        <p className="text-muted-foreground">نحن هنا للإجابة على استفساراتكم ومساعدتكم</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="neu-card flex flex-col items-center gap-4 py-8"
        >
          <div className="w-16 h-16 rounded-full neu-pressed flex items-center justify-center text-primary">
            <Mail size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
            <p className="text-muted-foreground">support@ofppt.ma</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="neu-card flex flex-col items-center gap-4 py-8"
        >
          <div className="w-16 h-16 rounded-full neu-pressed flex items-center justify-center text-primary">
            <Phone size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">الهاتف</h3>
            <p className="text-muted-foreground">+212 5 22 00 00 00</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="neu-card flex flex-col items-center gap-4 py-8"
        >
          <div className="w-16 h-16 rounded-full neu-pressed flex items-center justify-center text-primary">
            <MapPin size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">المقر الرئيسي</h3>
            <p className="text-muted-foreground px-4">شارع محمد الخامس، الدار البيضاء، المغرب</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="neu-card flex flex-col items-center gap-4 py-8"
        >
          <div className="w-16 h-16 rounded-full neu-pressed flex items-center justify-center text-primary">
            <Globe size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">الموقع الرسمي</h3>
            <a href="#" className="text-primary hover:underline">www.ofppt.ma</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
