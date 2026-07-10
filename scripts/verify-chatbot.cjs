/* Development verification for the deterministic local intent matcher. */
const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(root, "src", request.slice(2));
  return originalResolve.call(this, request, parent, isMain, options);
};
require.extensions[".ts"] = function (module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, resolveJsonModule: true } }).outputText;
  module._compile(output, filename);
};

const { matchIntent, isMedicalQuestion } = require(path.join(root, "src/lib/chatbot/matchIntent.ts"));
const cases = [
  ["ar", "بدي احجز", "booking"], ["ar", "كيف احجز موعد", "booking"], ["ar", "وين العيادة", "location"], ["ar", "رقم التلفون", "phone"],
  ["ar", "شو خدماتكم", "services"], ["ar", "عندكم اسنان", "service-dentistry"], ["ar", "زيارة منزلية", "service-home-visits"], ["ar", "عندي ضغط", "blood-pressure"],
  ["ar", "بدي اسجل الضغط", "blood-pressure"], ["ar", "بدي اسجل السكر", "blood-glucose"], ["ar", "كيف ارتب ادويتي", "medications"], ["ar", "شو رفيق صحتك", "companion"],
  ["ar", "بدي اجهز لزيارة الطبيب", "visit"], ["ar", "قصص يومية", "daily-stories"], ["ar", "نصائح طبية", "medical-tips"], ["ar", "فيديوهات", "videos"],
  ["ar", "اسئلة شائعة", "faq"], ["ar", "خدمات للاطفال", "kids"], ["ar", "كيف انزل التطبيق", "install"], ["ar", "كيف انزله على الايفون", "install-ios"],
  ["ar", "كيف انزله على الويندوز", "install-desktop"], ["en", "Book an appointment", "booking"], ["en", "Where is the clinic?", "location"], ["en", "What services do you offer?", "services"],
  ["en", "Do you offer dental care?", "service-dentistry"], ["en", "I need a home visit", "service-home-visits"], ["en", "Open blood pressure log", "blood-pressure"], ["en", "Track blood glucose", "blood-glucose"],
  ["en", "Organize my medications", "medications"], ["en", "Prepare for my appointment", "visit"], ["en", "Create a doctor summary", "report"], ["en", "Show medical tips", "medical-tips"],
  ["en", "Show daily stories", "daily-stories"], ["en", "Install the app", "install"], ["en", "Install on iPhone", "install-ios"], ["en", "Install on Windows", "install-desktop"],
];
const failures = cases.filter(([lang, query, expected]) => matchIntent(query, lang, "/").intent?.id !== expected);
if (!isMedicalQuestion("I have severe pain and need a diagnosis")) failures.push(["en", "medical safety detector", "true"]);
if (failures.length) { console.error(failures); process.exit(1); }
console.log(`PASS: ${cases.length} bilingual intent cases and medical-safety detection`);
