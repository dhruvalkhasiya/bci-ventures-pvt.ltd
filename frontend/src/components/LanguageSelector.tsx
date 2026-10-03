import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";

type Language = "en" | "hi" | "gu";
type TranslationLanguage = Exclude<Language, "en">;

const originalText = new WeakMap<Text, string>();
const lastTranslatedText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, { source: string; translated: string }>>();
const phrases: Record<TranslationLanguage, Record<string, string>> = {
  hi: {
    "about us": "Hamare baare mein",
    "about": "Hamare baare mein",
    "at bci ventures private limited, our teaching team focuses on making modern technology simple, practical, and accessible.": "BCI Ventures Private Limited ki teaching team modern technology ko simple, practical aur sabke liye accessible banati hai.",
    "all rights reserved.": "Sabhi adhikar surakshit hain.",
    "anything else you'd like us to know?": "Kuch aur jo aap humein batana chahte hain?",
    "back to home": "Home par wapas jaayein",
    "build your future with": "Apna Future Banao",
    "built for real results": "Real Results ke liye bana hai",
    "building bci with vision, technology & innovation.": "Vision, Technology aur Innovation ke saath BCI bana rahe hain.",
    "choose your ai learning path": "AI seekhne ka apna rasta chunein",
    "city": "Sheher",
    "contact": "Sampark",
    "contact us": "Humse sampark karein",
    "course fee": "Course ki fees",
    "course modules": "Course ke modules",
    "do i need any prior experience?": "Kya mujhe pehle se koi experience chahiye?",
    "education / profession": "Padhai / Profession",
    "email": "Email",
    "explore courses": "Courses dekhein",
    "fill out the form below and our team will confirm your seat and batch timing.": "Neeche form bharein, hamari team aapki seat aur batch timing confirm karegi.",
    "from a first taste of ai to building and launching your own ai-powered business — pick the path that fits you.": "AI ko pehli baar samajhne se lekar apna AI-powered business launch karne tak, apne liye sahi path chunein.",
    "free demo class": "Free Demo Class",
    "frequently asked questions": "Aksar pooche jaane wale sawaal",
    "full name": "Poora naam",
    "get certified in ai": "AI mein certified banein",
    "get in touch": "Humse baat karein",
    "have a question about our courses? send us a message and our team will respond shortly.": "Courses ke baare mein koi sawaal hai? Humein message bhejein, hamari team jald jawab degi.",
    "from artificial intelligence and digital tools to practical technology skills, our mentors help students understand concepts, explore real tools, and turn what they learn into practical projects.": "Artificial Intelligence aur digital tools se lekar practical technology skills tak, hamare mentors students ko concepts samajhne, real tools explore karne aur seekhi hui cheezon se practical projects banane mein madad karte hain.",
    "learn | build | create | grow": "Seekho | Banao | Create Karo | Aage Badho",
    "learn ai. build with ai. create with ai. grow with ai.": "AI seekho. AI se banao. AI se create karo. AI ke saath aage badho.",
    "learn. create. innovate.": "Seekho. Banao. Naye ideas laayein.",
    "learn technology. build skills. create with confidence.": "Technology seekhein. Skills banaayein. Confidence ke saath create karein.",
    "less theory. more practice. real-world learning.": "Kam theory. Zyada practice. Real-world learning.",
    "focused on helping students understand ai tools, emerging technologies, and practical applications through simple, hands-on learning.": "Students ko AI tools, emerging technologies aur practical applications simple, hands-on learning se samajhne mein madad karte hain.",
    "focused on ai, digital tools, and technology education, helping students learn modern technologies through practical examples and projects.": "AI, digital tools aur technology education par focus karke students ko practical examples aur projects ke zariye modern technologies sikhate hain.",
    "focused on making technology and digital concepts simple and accessible through practical teaching and hands-on learning.": "Practical teaching aur hands-on learning se technology aur digital concepts ko simple aur accessible banate hain.",
    "meet our mentors": "Hamare mentors se miliye",
    "meet the founders": "Founders se miliye",
    "message": "Message",
    "mobile": "Mobile",
    "mobile number": "Mobile number",
    "name": "Naam",
    "no coding required": "Coding ki zaroorat nahi",
    "our ai programs": "Hamare AI Programs",
    "our ai courses": "Hamare AI Courses",
    "our services": "Hamari Services",
    "our startup business": "Hamare Startup Businesses",
    "our teaching approach": "Hamara Teaching Approach",
    "our vision": "Hamari Soch",
    "preferred batch": "Pasandida batch",
    "ready to build your future with ai?": "AI ke saath apna future banane ke liye ready hain?",
    "register now": "Abhi Register Karein",
    "return to courses": "Courses par wapas jaayein",
    "select a course": "Course chunein",
    "submit registration": "Registration bhejein",
    "student login": "Student Login",
    "thanks for reaching out!": "Message bhejne ke liye shukriya!",
    "verify a certificate": "Certificate verify karein",
    "we'll get back to you shortly.": "Hum jald aapse sampark karenge.",
    "we believe students learn technology best when they can understand it, use it, and build with it.": "Hamara maanna hai ki students technology tab sabse achhe se seekhte hain jab woh use samajh, use aur build kar saken.",
    "who is this for?": "Yeh kiske liye hai?",
    "why bci": "BCI kyun",
    "your city": "Aapka sheher",
    "your full name": "Aapka poora naam",
    "your message": "Aapka message",
  },
  gu: {
    "about us": "Amara vishe",
    "about": "Amara vishe",
    "at bci ventures private limited, our teaching team focuses on making modern technology simple, practical, and accessible.": "BCI Ventures Private Limited ni teaching team modern technology ne simple, practical ane badha mate accessible banave chhe.",
    "all rights reserved.": "Badha adhikaro surakshit chhe.",
    "anything else you'd like us to know?": "Bijun kai je tame amne janavva mango chho?",
    "back to home": "Home par pachha jao",
    "build your future with": "Tamaru Future Banavo",
    "built for real results": "Real Results mate banavelu",
    "building bci with vision, technology & innovation.": "Vision, Technology ane Innovation sathe BCI banavi rahya chhiye.",
    "choose your ai learning path": "AI shikhva tamaro rasto pasand karo",
    "city": "Shaher",
    "contact": "Sampark",
    "contact us": "Amaro sampark karo",
    "course fee": "Course ni fees",
    "course modules": "Course na modules",
    "do i need any prior experience?": "Mane pehla thi experience ni jarur chhe?",
    "education / profession": "Abhyas / Profession",
    "email": "Email",
    "explore courses": "Courses juo",
    "fill out the form below and our team will confirm your seat and batch timing.": "Niche form bharo, amari team tamari seat ane batch timing confirm karse.",
    "from a first taste of ai to building and launching your own ai-powered business — pick the path that fits you.": "AI ni sharuat thi tamaro AI-powered business launch karva sudhi, tamara mate sacho path pasand karo.",
    "free demo class": "Free Demo Class",
    "frequently asked questions": "Varamvar puchhata savalo",
    "full name": "Puru naam",
    "get certified in ai": "AI ma certified bano",
    "get in touch": "Amaro sampark karo",
    "have a question about our courses? send us a message and our team will respond shortly.": "Courses vishe koi saval chhe? Amne message moklo, amari team jaldi jawab aapse.",
    "from artificial intelligence and digital tools to practical technology skills, our mentors help students understand concepts, explore real tools, and turn what they learn into practical projects.": "Artificial Intelligence ane digital tools thi practical technology skills sudhi, amara mentors students ne concepts samajhva, real tools explore karva ane shikheli vastu thi practical projects banavva madad kare chhe.",
    "learn | build | create | grow": "Shikho | Banavo | Create Karo | Vikas Karo",
    "learn ai. build with ai. create with ai. grow with ai.": "AI shikho. AI thi banavo. AI thi create karo. AI sathe vikas karo.",
    "learn. create. innovate.": "Shikho. Banavo. Nava ideas lavo.",
    "learn technology. build skills. create with confidence.": "Technology shikho. Skills banavo. Confidence sathe create karo.",
    "less theory. more practice. real-world learning.": "Ochhi theory. Vadhu practice. Real-world learning.",
    "focused on helping students understand ai tools, emerging technologies, and practical applications through simple, hands-on learning.": "Students ne AI tools, emerging technologies ane practical applications simple, hands-on learning thi samajhva madad kare chhe.",
    "focused on ai, digital tools, and technology education, helping students learn modern technologies through practical examples and projects.": "AI, digital tools ane technology education par focus kari students ne practical examples ane projects thi modern technologies shikhve chhe.",
    "focused on making technology and digital concepts simple and accessible through practical teaching and hands-on learning.": "Practical teaching ane hands-on learning thi technology ane digital concepts ne simple ane accessible banave chhe.",
    "meet our mentors": "Amara mentors ne mulo",
    "meet the founders": "Founders ne mulo",
    "message": "Message",
    "mobile": "Mobile",
    "mobile number": "Mobile number",
    "name": "Naam",
    "no coding required": "Coding ni jarur nathi",
    "our ai programs": "Amara AI Programs",
    "our ai courses": "Amara AI Courses",
    "our services": "Amari Services",
    "our startup business": "Amara Startup Businesses",
    "our teaching approach": "Amaro Teaching Approach",
    "our vision": "Amari Soch",
    "preferred batch": "Pasand no batch",
    "ready to build your future with ai?": "AI sathe tamaru future banava ready cho?",
    "register now": "Have Register Karo",
    "return to courses": "Courses par pachha jao",
    "select a course": "Course pasand karo",
    "submit registration": "Registration moklo",
    "student login": "Student Login",
    "thanks for reaching out!": "Message karva badal aabhar!",
    "verify a certificate": "Certificate verify karo",
    "we'll get back to you shortly.": "Ame jaldi tamaro sampark karishu.",
    "we believe students learn technology best when they can understand it, use it, and build with it.": "Amaru manvu chhe ke students technology tyare sauthi sari rite shikhe chhe jyare te samji, use kari ane tena thi banavi shake.",
    "who is this for?": "Aa kona mate chhe?",
    "why bci": "BCI kem",
    "your city": "Tamaro shaher",
    "your full name": "Tamaru puru naam",
    "your message": "Tamaro message",
  },
};

const words: Record<TranslationLanguage, Record<string, string>> = {
  hi: {
    a: "ek", all: "sabhi", and: "aur", anyone: "koi bhi", at: "par", back: "wapas",
    below: "neeche", every: "har", for: "ke liye", from: "se", have: "hai", how: "kaise",
    in: "mein", is: "hai", more: "zyada", new: "naya", no: "nahi", now: "abhi", of: "ka",
    our: "hamare", please: "kripya", prior: "pehle", the: "yeh", their: "unka", this: "yeh",
    to: "ko", us: "humein", we: "hum", what: "kya", you: "aap", your: "aapka",
  },
  gu: {
    a: "ek", all: "badha", and: "ane", anyone: "koi pan", at: "par", back: "pachha",
    below: "niche", every: "darek", for: "mate", from: "mathi", have: "chhe", how: "kevi rite",
    in: "ma", is: "chhe", more: "vadhu", new: "navu", no: "nahi", now: "have", of: "nu",
    our: "amara", please: "krupa kari", prior: "pehla", the: "aa", their: "temna", this: "aa",
    to: "mate", us: "amne", we: "ame", what: "shu", you: "tame", your: "tamaro",
  },
};

function keepCase(source: string, translated: string) {
  if (source.toUpperCase() === source) return translated.toUpperCase();
  if (source[0] === source[0].toUpperCase()) {
    return translated[0].toUpperCase() + translated.slice(1);
  }
  return translated;
}

function translateCopy(source: string, language: Language) {
  if (language === "en") return source;

  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  if (leading.length + trailing.length >= source.length) return source;

  const content = source.slice(leading.length, source.length - trailing.length);
  const exactPhrase = phrases[language][content.toLowerCase()];
  if (exactPhrase) return `${leading}${exactPhrase}${trailing}`;

  return `${leading}${content.replace(/[A-Za-z]+(?:['’][A-Za-z]+)?/g, (word) => {
    const translated = words[language][word.toLowerCase()];
    return translated ? keepCase(word, translated) : word;
  })}${trailing}`;
}

function applyLanguage(language: Language) {
  document.documentElement.lang = language === "hi" ? "hi-Latn" : language === "gu" ? "gu-Latn" : "en";
  const title = document.head.querySelector("title");
  const sourceTitle = title?.dataset.seoTitle ?? title?.textContent ?? document.title;
  document.title = translateCopy(sourceTitle, language);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const textNode = node as Text;
    const parent = textNode.parentElement;
    if (!parent || parent.closest("[data-language-picker], script, style, noscript, textarea, [contenteditable='true']")) {
      continue;
    }

    const current = textNode.nodeValue ?? "";
    const previousTranslation = lastTranslatedText.get(textNode);
    if (previousTranslation === undefined || current !== previousTranslation) {
      originalText.set(textNode, current);
    }

    const source = originalText.get(textNode) ?? current;
    const translated = translateCopy(source, language);
    if (current !== translated) {
      lastTranslatedText.set(textNode, translated);
      textNode.nodeValue = translated;
    }
  }

  document.body.querySelectorAll<HTMLElement>("[placeholder], [title], [aria-label], [alt]").forEach((element) => {
    if (element.closest("[data-language-picker]")) return;

    let snapshots = originalAttributes.get(element);
    if (!snapshots) {
      snapshots = new Map();
      originalAttributes.set(element, snapshots);
    }

    ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (current === null) return;

      const snapshot = snapshots.get(attribute);
      if (!snapshot || current !== snapshot.translated) {
        snapshots.set(attribute, { source: current, translated: current });
      }

      const currentSnapshot = snapshots.get(attribute)!;
      const translated = translateCopy(currentSnapshot.source, language);
      if (current !== translated) {
        currentSnapshot.translated = translated;
        element.setAttribute(attribute, translated);
      }
    });
  });
}

const languageOptions: { value: Language; label: string; shortLabel: string }[] = [
  { value: "en", label: "English", shortLabel: "EN" },
  { value: "hi", label: "Hinglish", shortLabel: "HI" },
  { value: "gu", label: "Gujlish", shortLabel: "GU" },
];

export function LanguagePicker() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem("bci-language");
    return savedLanguage === "hi" || savedLanguage === "gu" ? savedLanguage : "en";
  });
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyLanguage(language);
    const observer = new MutationObserver(() => applyLanguage(language));
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  const chooseLanguage = (nextLanguage: Language) => {
    window.localStorage.setItem("bci-language", nextLanguage);
    setLanguage(nextLanguage);
    setOpen(false);
  };

  const activeOption = languageOptions.find((option) => option.value === language)!;

  return (
    <div ref={pickerRef} className="relative" data-language-picker>
      <button
        type="button"
        aria-label={`Website language: ${activeOption.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-md border border-[#DCE3EA] bg-white/90 px-2.5 py-2 text-sm font-semibold text-ink shadow-sm"
      >
        <Languages size={16} aria-hidden="true" />
        <span>{activeOption.shortLabel}</span>
      </button>
      {open && (
        <div role="menu" aria-label="Website language" className="absolute right-0 top-full z-[60] mt-2 w-36 overflow-hidden rounded-md border border-[#DCE3EA] bg-white p-1 shadow-lg">
          {languageOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={language === option.value}
              onClick={() => chooseLanguage(option.value)}
              className={`block w-full rounded px-3 py-2 text-left text-sm ${language === option.value ? "bg-brand-700/10 font-semibold text-brand-700" : "text-ink hover:bg-[#F3F7FB]"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}