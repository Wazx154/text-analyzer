import { getComplaints, Complaint } from "@/lib/store";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FileText, Inbox, Filter, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const complaints = getComplaints();
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved' | 'rejected'>('all');

  const filtered = complaints.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'resolved': return CheckCircle2;
      case 'rejected': return XCircle;
      default: return AlertCircle;
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
          <p className="text-sm text-muted-foreground mt-2">ابدأ بتقديم أول شكاية لك</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">لوحة الشكايات</h1>
          <p className="text-muted-foreground text-sm mt-1">إدارة جميع الشكايات والاقتراحات</p>
        </div>
        <span className="neu-pressed px-4 py-2 rounded-full text-sm font-bold text-primary">
          {filtered.length} / {complaints.length}
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { value: 'all' as const, label: 'الكل', icon: '📋' },
          { value: 'pending' as const, label: 'قيد المعالجة', icon: '⏳' },
          { value: 'resolved' as const, label: 'تم حلها', icon: '✅' },
          { value: 'rejected' as const, label: 'مرفوضة', icon: '❌' },
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === f.value
                ? 'neu-btn-primary text-white'
                : 'neu-btn text-muted-foreground'
            }`}
          >
            <span className="mr-2">{f.icon}</span>{f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((complaint, index) => {
          const StatusIcon = getStatusIcon(complaint.status);
          return (
          <motion.div
            key={complaint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="neu-card flex flex-col gap-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                #{complaint.id}
              </span>
              <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(complaint.status)}`}>
                <StatusIcon size={12} />
                {getStatusText(complaint.status)}
              </div>
            </div>

            <div className="border-b border-border/30 pb-3">
              <h3 className="font-bold text-sm text-foreground">{getTypeLabel(complaint.type)}</h3>
              <p className="text-xs text-muted-foreground mt-1">{complaint.institute}</p>
            </div>

            <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed flex-1">
              {complaint.description}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText size={11} /> {complaint.department}
              </span>
              <span>
                {format(new Date(complaint.date), "dd MMM", { locale: ar })}
              </span>
            </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
