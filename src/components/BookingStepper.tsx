"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { FORMSPREE, whatsappHref } from "@/lib/clinic";
import services from "@/data/services.json";
import BookingSuccessQR, { BookingSummary } from "./BookingSuccessQR";
import DisclaimerNote from "./DisclaimerNote";
import Icon from "./Icon";

type Bi = { ar: string; en: string };

type Form = {
  location: "" | "clinic" | "home";
  service: string;
  relation: "" | "myself" | "child" | "family";
  fullName: string;
  phone: string;
  ageGroup: "" | "child" | "adult" | "senior";
  gender: "" | "male" | "female";
  insurance: "" | "yes" | "no";
  urgency: "" | "today" | "24h" | "normal";
  date: string;
  time: string;
  geo: string;
  address: string;
  arrivalNotes: string;
  condition: string;
};

const initial: Form = {
  location: "", service: "", relation: "", fullName: "", phone: "",
  ageGroup: "", gender: "", insurance: "", urgency: "", date: "", time: "",
  geo: "", address: "", arrivalNotes: "", condition: "",
};

export default function BookingStepper() {
  const { lang, t } = useLang();
  const L = (b: Bi) => (lang === "ar" ? b.ar : b.en);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<BookingSummary | null>(null);
  const [error, setError] = useState("");

  const isHome = form.location === "home";
  const steps = useMemo(() => {
    const base = ["location", "service", "relation", "patient", "urgency", "datetime"];
    if (isHome) base.push("home");
    base.push("condition", "review");
    return base;
  }, [isHome]);
  const current = steps[step];
  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const serviceLabel = (id: string) => {
    const s = services.find((x) => x.id === id);
    return s ? L(s.title) : id;
  };

  const canNext = (): boolean => {
    switch (current) {
      case "location": return !!form.location;
      case "service": return !!form.service;
      case "relation": return !!form.relation;
      case "patient": return !!form.fullName && form.phone.length >= 7 && !!form.ageGroup && !!form.gender && !!form.insurance;
      case "urgency": return !!form.urgency;
      case "datetime": return !!form.date && !!form.time;
      default: return true;
    }
  };

  const captureGeo = () => {
    if (!navigator.geolocation) { setError(t("المتصفح لا يدعم تحديد الموقع", "Geolocation not supported")); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => set("geo", `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),
      () => setError(t("تعذّر تحديد الموقع", "Could not get location")),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const genId = () => "AKMC-" + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10);

  const summaryText = (s: BookingSummary) =>
    (lang === "ar"
      ? `طلب حجز جديد\nرقم الحجز: ${s.bookingId}\nالاسم: ${s.firstName}\nالخدمة: ${s.service}\nالمكان: ${isHome ? "زيارة منزلية" : "زيارة المركز"}\nالتاريخ: ${s.date}\nالوقت: ${s.time}`
      : `New booking request\nBooking ID: ${s.bookingId}\nName: ${s.firstName}\nService: ${s.service}\nLocation: ${isHome ? "Home visit" : "Clinic visit"}\nDate: ${s.date}\nTime: ${s.time}`);

  const submit = async () => {
    setSubmitting(true); setError("");
    const bookingId = genId();
    const summary: BookingSummary = {
      bookingId, firstName: form.fullName.split(" ")[0] || form.fullName,
      service: serviceLabel(form.service), date: form.date, time: form.time,
    };
    try {
      const res = await fetch(FORMSPREE.booking, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ bookingId, ...form, serviceLabel: serviceLabel(form.service), lang }),
      });
      if (!res.ok) throw new Error("Booking submission failed");
      setDone(summary);
    } catch {
      setError(t("تعذّر إرسال طلب الحجز. حاول مرة أخرى أو تواصل معنا عبر واتساب.", "Could not send the booking request. Please try again or contact us on WhatsApp."));
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl animate-pop text-center">
        <div className="card p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-mint-500">
            <Icon name="check" className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-ink">{t("تم استلام طلبك", "Your request is received")}</h2>
          <p className="mt-2 text-sm text-slate-600">{t("سنتواصل معك لتأكيد الموعد. هذا طلب حجز وليس تأكيداً طبياً نهائياً.", "We'll contact you to confirm. This is a booking request, not a final medical confirmation.")}</p>

          <div className="mt-6 rounded-2xl bg-cloud p-5 text-start text-sm">
            <Row k={t("رقم الحجز", "Booking ID")} v={done.bookingId} />
            <Row k={t("الاسم", "Name")} v={done.firstName} />
            <Row k={t("الخدمة", "Service")} v={done.service} />
            <Row k={t("التاريخ", "Date")} v={done.date} />
            <Row k={t("الوقت", "Time")} v={done.time} />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <BookingSuccessQR summary={done} />
            <a href={whatsappHref(summaryText(done))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <Icon name="whatsapp" className="h-5 w-5" /> {t("أرسل الملخص عبر واتساب", "Send summary on WhatsApp")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{t("الخطوة", "Step")} {step + 1} / {steps.length}</span>
          <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        {current === "location" && (
          <Step title={t("أين تريد تلقّي الرعاية؟", "Where do you want care?")}>
            <Choices value={form.location} onChange={(v) => set("location", v)} options={[
              { v: "clinic", label: t("زيارة المركز", "Visit the clinic"), icon: "home" },
              { v: "home", label: t("زيارة منزلية", "Home visit"), icon: "pin" },
            ]} />
          </Step>
        )}

        {current === "service" && (
          <Step title={t("ما الخدمة المطلوبة؟", "Requested service")}>
            <div className="grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <button key={s.id} onClick={() => set("service", s.id)} className={`flex items-center gap-3 rounded-2xl border p-3 text-start text-sm font-semibold transition ${form.service === s.id ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 hover:border-brand-300"}`}>
                  <Icon name={s.icon} className="h-5 w-5 shrink-0 text-brand-500" />
                  {L(s.title)}
                </button>
              ))}
            </div>
          </Step>
        )}

        {current === "relation" && (
          <Step title={t("لمن هذا الموعد؟", "Who is this for?")}>
            <Choices value={form.relation} onChange={(v) => set("relation", v)} options={[
              { v: "myself", label: t("لنفسي", "Myself"), icon: "stethoscope" },
              { v: "child", label: t("لطفلي", "My child"), icon: "baby" },
              { v: "family", label: t("فرد من العائلة", "Family member"), icon: "heart-pulse" },
            ]} />
          </Step>
        )}

        {current === "patient" && (
          <Step title={t("معلومات المريض", "Patient information")}>
            <div className="space-y-3">
              <Field label={t("الاسم الكامل", "Full name")}>
                <input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputCls} placeholder={t("الاسم", "Name")} />
              </Field>
              <Field label={t("رقم الهاتف", "Phone number")}>
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" className={inputCls} placeholder="07xxxxxxxx" />
              </Field>
              <Field label={t("الفئة العمرية", "Age group")}>
                <Pills value={form.ageGroup} onChange={(v) => set("ageGroup", v)} options={[
                  { v: "child", label: t("طفل", "Child") }, { v: "adult", label: t("بالغ", "Adult") }, { v: "senior", label: t("كبير سن", "Senior") }]} />
              </Field>
              <Field label={t("الجنس", "Gender")}>
                <Pills value={form.gender} onChange={(v) => set("gender", v)} options={[
                  { v: "male", label: t("ذكر", "Male") }, { v: "female", label: t("أنثى", "Female") }]} />
              </Field>
              <Field label={t("هل لديك تأمين؟", "Has insurance?")}>
                <Pills value={form.insurance} onChange={(v) => set("insurance", v)} options={[
                  { v: "yes", label: t("نعم", "Yes") }, { v: "no", label: t("لا", "No") }]} />
              </Field>
            </div>
          </Step>
        )}

        {current === "urgency" && (
          <Step title={t("ما مدى الاستعجال؟", "How urgent is it?")}>
            <Choices value={form.urgency} onChange={(v) => set("urgency", v)} options={[
              { v: "today", label: t("اليوم", "Today"), icon: "clock" },
              { v: "24h", label: t("خلال 24 ساعة", "Within 24 hours"), icon: "clock" },
              { v: "normal", label: t("موعد عادي", "Normal appointment"), icon: "clock" },
            ]} />
          </Step>
        )}

        {current === "datetime" && (
          <Step title={t("التاريخ والوقت المفضّل", "Preferred date and time")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={t("التاريخ", "Date")}>
                <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
              </Field>
              <Field label={t("الوقت", "Time")}>
                <input type="time" value={form.time} onChange={(e) => set("time", e.target.value)} className={inputCls} />
              </Field>
            </div>
          </Step>
        )}

        {current === "home" && (
          <Step title={t("تفاصيل الزيارة المنزلية", "Home visit details")}>
            <div className="space-y-3">
              <button onClick={captureGeo} className="btn-ghost w-full">
                <Icon name="pin" className="h-5 w-5" /> {form.geo ? t("تم تحديد الموقع ✓", "Location captured ✓") : t("حدّد موقعي الحالي", "Capture my location")}
              </button>
              {form.geo && <p className="text-xs text-slate-500">{form.geo}</p>}
              <Field label={t("العنوان (اختياري)", "Address (optional)")}>
                <input value={form.address} onChange={(e) => set("address", e.target.value)} className={inputCls} />
              </Field>
              <Field label={t("ملاحظات الوصول (اختياري)", "Arrival notes (optional)")}>
                <textarea value={form.arrivalNotes} onChange={(e) => set("arrivalNotes", e.target.value)} className={`${inputCls} min-h-20`} />
              </Field>
            </div>
          </Step>
        )}

        {current === "condition" && (
          <Step title={t("وصف الحالة (اختياري)", "Condition description (optional)")}>
            <textarea value={form.condition} onChange={(e) => set("condition", e.target.value)} className={`${inputCls} min-h-28`} placeholder={t("اكتب الأعراض أو سبب الزيارة باختصار", "Briefly describe symptoms or reason")} />
            <p className="mt-3 text-xs text-rose-600">{t("لا ترسل تفاصيل حالات الطوارئ المهددة للحياة عبر النموذج — اتصل بخدمات الطوارئ المحلية فوراً.", "Do not submit life-threatening emergency details via the form - call local emergency services immediately.")}</p>
          </Step>
        )}

        {current === "review" && (
          <Step title={t("مراجعة وتأكيد", "Review and submit")}>
            <div className="rounded-2xl bg-cloud p-4 text-sm">
              <Row k={t("المكان", "Location")} v={isHome ? t("زيارة منزلية", "Home visit") : t("زيارة المركز", "Clinic visit")} />
              <Row k={t("الخدمة", "Service")} v={serviceLabel(form.service)} />
              <Row k={t("لمن", "For")} v={form.relation === "myself" ? t("لنفسي", "Myself") : form.relation === "child" ? t("لطفلي", "My child") : t("فرد من العائلة", "Family member")} />
              <Row k={t("الاسم", "Name")} v={form.fullName} />
              <Row k={t("الهاتف", "Phone")} v={form.phone} />
              <Row k={t("الاستعجال", "Urgency")} v={form.urgency === "today" ? t("اليوم", "Today") : form.urgency === "24h" ? t("خلال 24 ساعة", "Within 24h") : t("عادي", "Normal")} />
              <Row k={t("الموعد", "Appointment")} v={`${form.date} ${form.time}`} />
            </div>
            <div className="mt-4"><DisclaimerNote compact /></div>
          </Step>
        )}

        {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

        <div className="mt-7 flex items-center justify-between gap-3">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="btn-ghost disabled:opacity-40">
            {t("رجوع", "Back")}
          </button>
          {current === "review" ? (
            <button onClick={submit} disabled={submitting} className="btn-primary min-w-40">
              {submitting ? t("جارٍ الإرسال…", "Sending…") : t("تأكيد الحجز", "Confirm booking")}
            </button>
          ) : (
            <button onClick={() => canNext() && setStep((s) => s + 1)} disabled={!canNext()} className="btn-primary min-w-32 disabled:opacity-40">
              {t("التالي", "Next")} <Icon name="arrow" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fadeUp">
      <h2 className="mb-5 text-xl font-bold text-ink">{title}</h2>
      {children}
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-1.5 last:border-0">
      <span className="text-slate-500">{k}</span>
      <span className="font-semibold text-ink">{v}</span>
    </div>
  );
}
function Choices({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { v: string; label: string; icon: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => (
        <button key={o.v} onClick={() => onChange(o.v)} className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-start font-semibold transition ${value === o.v ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 hover:border-brand-300"}`}>
          <Icon name={o.icon} className="h-6 w-6 shrink-0 text-brand-500" />
          {o.label}
        </button>
      ))}
    </div>
  );
}
function Pills({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { v: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o.v} onClick={() => onChange(o.v)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${value === o.v ? "border-brand-500 bg-brand-600 text-white" : "border-slate-200 hover:border-brand-300"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
