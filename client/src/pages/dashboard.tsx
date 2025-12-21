import { getComplaints, Complaint } from "@/lib/store";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FileText, Inbox } from "lucide-react";

export default function Dashboard() {
  const complaints = getComplaints();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'resolved': return 'تم الحل';
      case 'rejected': return 'مرفوضة';
      default: return 'قيد المعالجة';
    }
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      admin: "إداري",
      teacher: "مكون / أستاذ",
      equipment: "تجهيزات",
      timing: "توقيت",
      behavior: "سلوك",
      other: "أخرى"
    };
    return types[type] || type;
  };

  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full neu-pressed flex items-center justify-center text-muted-foreground/50">
          <Inbox size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-muted-foreground">لا توجد شكايات حالياً</h2>
          <p className="text-sm text-muted-foreground mt-2">لم يتم تسجيل أي شكايات في هذا المتصفح بعد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">لوحة الشكايات</h1>
        <span className="neu-pressed px-4 py-2 rounded-full text-sm font-bold text-primary">
          {complaints.length} شكاية
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {complaints.map((complaint, index) => (
          <motion.div
            key={complaint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neu-card flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-sm font-bold text-muted-foreground bg-background/50 px-2 py-1 rounded">
                #{complaint.id}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(complaint.status)}`}>
                {getStatusText(complaint.status)}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">{getTypeLabel(complaint.type)}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{complaint.institute}</p>
            </div>

            <div className="neu-pressed p-3 rounded-xl bg-background/50 flex-1">
              <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                {complaint.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
              <span className="flex items-center gap-1">
                <FileText size={12} /> {complaint.department}
              </span>
              <span>
                {format(new Date(complaint.date), "dd MMM", { locale: ar })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
