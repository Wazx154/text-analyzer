import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveComplaint, generateId } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

const formSchema = z.object({
  institute: z.string().min(2, "اسم المعهد مطلوب"),
  department: z.string().min(2, "الشعبة مطلوبة"),
  type: z.string().min(1, "نوع المشكلة مطلوب"),
  description: z.string().min(10, "يرجى وصف المشكلة بوضوح (10 أحرف على الأقل)"),
});

export default function Report() {
  const { toast } = useToast();
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institute: "",
      department: "",
      type: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = generateId();
    const complaint = {
      id,
      ...values,
      date: new Date().toISOString(),
      status: 'pending' as const,
    };
    
    saveComplaint(complaint);
    setSubmittedId(id);
    
    toast({
      title: "تم الإرسال بنجاح!",
      description: "تم تسجيل شكايتك بنجاح.",
    });
  }

  const copyToClipboard = () => {
    if (submittedId) {
      navigator.clipboard.writeText(submittedId);
      toast({ title: "تم النسخ!", description: "تم نسخ رقم التتبع للحافظة" });
    }
  };

  if (submittedId) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-12 space-y-8"
      >
        <div className="w-24 h-24 rounded-full bg-background neu-flat flex items-center justify-center text-green-500">
          <CheckCircle2 size={48} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-primary">تم استلام شكايتك بنجاح</h2>
          <p className="text-muted-foreground">يرجى الاحتفاظ برقم التتبع التالي لمراجعة حالة الطلب</p>
        </div>

        <div className="neu-pressed px-8 py-6 rounded-2xl flex flex-col items-center gap-4 w-full max-w-sm">
          <span className="text-sm text-muted-foreground">رقم التتبع</span>
          <code className="text-3xl font-mono font-bold tracking-wider text-foreground select-all">
            {submittedId}
          </code>
          <button onClick={copyToClipboard} className="neu-btn text-sm py-2 px-4 w-full">
            <Copy size={16} />
            نسخ الرقم
          </button>
        </div>

        <button 
          onClick={() => {
            setSubmittedId(null);
            form.reset();
          }}
          className="neu-btn-primary px-8 py-3 rounded-xl"
        >
          تقديم شكاية أخرى
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">تقديم مشكل</h1>
        <p className="text-muted-foreground">املأ النموذج التالي لتقديم شكايتك للإدارة</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-card"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-bold ml-1 block mb-2">اسم المعهد</FormLabel>
                  <FormControl>
                    <input {...field} className="neu-input" placeholder="مثال: معهد التكنولوجيا التطبيقية..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-bold ml-1 block mb-2">الشعبة / التخصص</FormLabel>
                  <FormControl>
                    <input {...field} className="neu-input" placeholder="مثال: تطوير الرقمي..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-bold ml-1 block mb-2">نوع المشكلة</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="neu-input h-12 w-full flex items-center justify-between px-4">
                        <SelectValue placeholder="اختر نوع المشكلة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="neu-flat border-none">
                      <SelectItem value="admin">إداري</SelectItem>
                      <SelectItem value="teacher">مكون / أستاذ</SelectItem>
                      <SelectItem value="equipment">تجهيزات</SelectItem>
                      <SelectItem value="timing">توقيت</SelectItem>
                      <SelectItem value="behavior">سلوك</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-bold ml-1 block mb-2">وصف المشكل</FormLabel>
                  <FormControl>
                    <textarea 
                      {...field} 
                      className="neu-input min-h-[120px] resize-none" 
                      placeholder="اشرح المشكلة بالتفصيل..." 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <button type="submit" className="neu-btn-primary w-full text-lg py-4 rounded-xl font-bold">
                إرسال الشكاية
              </button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
