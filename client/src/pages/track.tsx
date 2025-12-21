import { useState } from "react";
import { getComplaintById, Complaint } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function Track() {
  const [searchId, setSearchId] = useState("");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [error, setError] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (!searchId.trim()) return;

    const found = getComplaintById(searchId.trim().toUpperCase());
    if (found) {
      setComplaint(found);
      setError(false);
    } else {
      setComplaint(null);
      setError(true);
    }
  };

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'resolved': return { color: 'text-green-600', icon: CheckCircle2, text: 'تم الحل' };
      case 'rejected': return { color: 'text-red-600', icon: XCircle, text: 'مرفوضة' };
      default: return { color: 'text-amber-600', icon: Clock, text: 'قيد المعالجة' };
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">تتبع الشكاية</h1>
        <p className="text-muted-foreground">أدخل رقم الشكاية لمعرفة حالتها</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4 mb-12">
        <input 
          type="text" 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="أدخل رقم الشكاية (مثال: X7Y2Z9)"
          className="neu-input text-center text-lg font-mono uppercase placeholder:text-base placeholder:font-sans"
        />
        <button type="submit" className="neu-btn px-6">
          <Search />
        </button>
      </form>

      <AnimatePresence mode="wait">
        {searched && error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="neu-flat p-6 text-center text-red-500 flex flex-col items-center gap-2"
          >
            <AlertCircle size={32} />
            <p className="font-bold">رقم الشكاية غير صحيح</p>
            <p className="text-sm text-muted-foreground">تأكد من الرقم وحاول مرة أخرى</p>
          </motion.div>
        )}

        {complaint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="neu-card space-y-6"
          >
            <div className="flex justify-between items-start border-b border-border/50 pb-4">
              <div>
                <span className="text-xs text-muted-foreground block mb-1">رقم الشكاية</span>
                <span className="font-mono text-xl font-bold text-primary">{complaint.id}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground block mb-1">الحالة</span>
                {(() => {
                  const status = getStatusInfo(complaint.status);
                  const Icon = status.icon;
                  return (
                    <span className={`flex items-center gap-1 font-bold ${status.color}`}>
                      <Icon size={16} /> {status.text}
                    </span>
                  );
                })()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl neu-pressed">
                <span className="text-xs text-muted-foreground block mb-1">المعهد</span>
                <p className="font-semibold">{complaint.institute}</p>
              </div>
              <div className="p-4 rounded-xl neu-pressed">
                <span className="text-xs text-muted-foreground block mb-1">الشعبة</span>
                <p className="font-semibold">{complaint.department}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl neu-pressed">
              <span className="text-xs text-muted-foreground block mb-1">نوع المشكلة</span>
              <p className="font-semibold">{complaint.type}</p>
            </div>

            <div className="p-4 rounded-xl neu-pressed bg-background/50">
              <span className="text-xs text-muted-foreground block mb-1">الوصف</span>
              <p className="text-foreground/90 leading-relaxed">{complaint.description}</p>
            </div>

            <div className="text-xs text-muted-foreground text-center pt-2">
              تاريخ الإرسال: {format(new Date(complaint.date), "PPP p", { locale: ar })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
