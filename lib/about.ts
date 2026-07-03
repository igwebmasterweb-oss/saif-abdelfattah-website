// محتوى صفحة "عن الكاتب" الكامل — السيرة الذاتية للأستاذ الدكتور سيف الدين عبد الفتاح
// المصدر: الموقع القديم https://www.saifabdelfattah.net/about-us

export interface KV { k: string; v: string; }

// ── البيانات الشخصية ──
export const BIO_DATA: { ar: KV[]; en: KV[] } = {
  ar: [
    { k: 'الاسم', v: 'سيف الدين عبد الفتاح إسماعيل' },
    { k: 'تاريخ الميلاد', v: '١١ / ١١ / ١٩٥٤م' },
    { k: 'محل الميلاد', v: 'القاهرة — جمهورية مصر العربية' },
    { k: 'الجنسية', v: 'مصري' },
    { k: 'الديانة', v: 'مسلم' },
    { k: 'الحالة الاجتماعية', v: 'متزوج، وله ثلاثة أبناء' },
    { k: 'الوظيفة الحالية', v: 'أستاذ العلوم السياسية' },
    { k: 'التخصص العام', v: 'علوم سياسية' },
    { k: 'التخصص الدقيق', v: 'النظرية السياسية — الفكر السياسي الإسلامي — الدراسات السياسية الإسلامية' },
    { k: 'المؤسسة', v: 'كلية الاقتصاد والعلوم السياسية، قسم العلوم السياسية، جامعة القاهرة' },
  ],
  en: [
    { k: 'Name', v: 'Saif Al-Din Abd Al-Fattah Ismail' },
    { k: 'Date of Birth', v: '11 / 11 / 1954' },
    { k: 'Place of Birth', v: 'Cairo — Arab Republic of Egypt' },
    { k: 'Nationality', v: 'Egyptian' },
    { k: 'Religion', v: 'Muslim' },
    { k: 'Marital Status', v: 'Married, three children' },
    { k: 'Current Position', v: 'Professor of Political Science' },
    { k: 'General Field', v: 'Political Science' },
    { k: 'Specialization', v: 'Political Theory — Islamic Political Thought — Islamic Political Studies' },
    { k: 'Institution', v: 'Faculty of Economics & Political Science, Cairo University' },
  ],
};

// ── الدرجات العلمية ──
export interface Degree { title: string; date: string; place: string; grade: string; subject?: string; advisor?: string; }
export const DEGREES: { ar: Degree[]; en: Degree[] } = {
  ar: [
    {
      title: 'بكالوريوس العلوم السياسية',
      date: 'مايو ١٩٧٦م',
      place: 'كلية الاقتصاد والعلوم السياسية — جامعة القاهرة',
      grade: 'جيد جدًا مع مرتبة الشرف',
    },
    {
      title: 'ماجستير العلوم السياسية',
      date: 'أكتوبر ١٩٨٢م',
      place: 'قسم العلوم السياسية — جامعة القاهرة',
      grade: 'امتياز',
      subject: 'الجانب السياسي لمفهوم الاختيار لدى المعتزلة بين الإدراك الذاتي والفهم الاستشراقي',
      advisor: 'إشراف: أ.د. حامد عبد الله ربيع',
    },
    {
      title: 'دكتوراه فلسفة العلوم السياسية',
      date: 'ديسمبر ١٩٨٧م',
      place: 'قسم العلوم السياسية — جامعة القاهرة',
      grade: 'مرتبة الشرف الأولى مع التوصية بتبادل الرسالة مع الجامعات',
      subject: 'التجديد السياسي والخبرة الإسلامية: نظرة في الواقع العربي المعاصر',
      advisor: 'إشراف: أ.د. حامد ربيع، أ.د. محمود خيري عيسى، أ.د. حورية توفيق مجاهد',
    },
  ],
  en: [
    {
      title: 'B.A. in Political Science',
      date: 'May 1976',
      place: 'Faculty of Economics & Political Science — Cairo University',
      grade: 'Very Good with Honors',
    },
    {
      title: 'M.A. in Political Science',
      date: 'October 1982',
      place: 'Department of Political Science — Cairo University',
      grade: 'Excellent',
      subject: 'The Political Dimension of the Concept of Choice among the Mutazila',
      advisor: 'Supervisor: Prof. Hamed Abdullah Rabie',
    },
    {
      title: 'Ph.D. in Political Science',
      date: 'December 1987',
      place: 'Department of Political Science — Cairo University',
      grade: 'First-Class Honors',
      subject: 'Political Renewal and the Islamic Experience: A View of the Contemporary Arab Reality',
      advisor: 'Supervisors: Prof. Hamed Rabie, Prof. Mahmoud Khairy Issa, Prof. Horeya Tawfik Mujahid',
    },
  ],
};

// ── التدرج الوظيفي ──
export interface Career { role: string; period: string; }
export const CAREER: { ar: Career[]; en: Career[] } = {
  ar: [
    { role: 'معيد بقسم العلوم السياسية — جامعة القاهرة', period: '١٩٧٦ – ١٩٨٣' },
    { role: 'مدرس مساعد بقسم العلوم السياسية', period: '١٩٨٣ – ١٩٨٨' },
    { role: 'مدرس بقسم العلوم السياسية', period: '١٩٨٨ – ١٩٩٣' },
    { role: 'أستاذ مشارك بقسم العلوم السياسية', period: '١٩٩٣ – ١٩٩٩' },
    { role: 'أستاذ بقسم العلوم السياسية — جامعة القاهرة', period: 'منذ ١٩٩٩' },
    { role: 'مدير برنامج حوار الحضارات', period: 'منذ ٢٠٠٥' },
    { role: 'نائب رئيس مركز البحوث والدراسات السياسية', period: 'منذ ٢٠٠٦' },
  ],
  en: [
    { role: 'Teaching Assistant, Political Science — Cairo University', period: '1976 – 1983' },
    { role: 'Assistant Lecturer, Political Science', period: '1983 – 1988' },
    { role: 'Lecturer, Political Science', period: '1988 – 1993' },
    { role: 'Associate Professor, Political Science', period: '1993 – 1999' },
    { role: 'Professor, Political Science — Cairo University', period: 'Since 1999' },
    { role: 'Director, Dialogue of Civilizations Program', period: 'Since 2005' },
    { role: 'Vice-President, Center for Political Research & Studies', period: 'Since 2006' },
  ],
};

// ── فترات الدراسة والبحث بالخارج ──
export const ABROAD: { ar: string[]; en: string[] } = {
  ar: [
    'مهمة علمية للبحث بجامعة ميريلاند — الولايات المتحدة الأمريكية (أبريل ١٩٨٥ – يونيو ١٩٨٨)',
    'منحة المؤسسة الألمانية وسلسلة محاضرات في الدراسات السياسية الإسلامية — جامعة برلين الحرة (يونيو – يوليو ١٩٩٥)',
    'إعارة إلى جامعة زايد (١٩٩٩ – ٢٠٠٤)',
    'أستاذ بمؤسسة قطر (٢٠٠٨ – ٢٠١٢)',
  ],
  en: [
    'Research mission at the University of Maryland, USA (April 1985 – June 1988)',
    'German Foundation grant and lecture series in Islamic Political Studies — Free University of Berlin (June – July 1995)',
    'Secondment to Zayed University (1999 – 2004)',
    'Professor at Qatar Foundation (2008 – 2012)',
  ],
};

// ── الأنشطة والعضويات العلمية ──
export const ACTIVITIES: { ar: string[]; en: string[] } = {
  ar: [
    'المستشار الأكاديمي للمعهد العالمي للفكر الإسلامي (سابقًا)',
    'عضو مجلس إدارة مركز الدراسات المعرفية بالقاهرة',
    'عضو الهيئة التحريرية والاستشارية لمجلة المسلم المعاصر',
    'عضو هيئة تدريس جامعة العلوم الإسلامية والاجتماعية — فرجينيا',
    'مدير مركز الدراسات السياسية بجامعة القاهرة',
    'نائب مدير مركز الدراسات الحضارية وحوار الثقافات بالقاهرة',
    'مدير مركز الحكم الراشد والسياسات العامة بمؤسسة قطر',
    'منسق مشروع «التحول الديمقراطي ومراحل الانتقال في البلدان العربية» — المركز العربي للأبحاث ودراسة السياسات',
  ],
  en: [
    'Academic Advisor, International Institute of Islamic Thought (former)',
    'Board Member, Center for Cognitive Studies — Cairo',
    'Editorial & Advisory Board, Al-Muslim Al-Muasir Journal',
    'Faculty, School of Islamic & Social Sciences — Virginia',
    'Director, Center for Political Studies — Cairo University',
    'Deputy Director, Center for Civilizational Studies & Cultural Dialogue — Cairo',
    'Director, Center for Good Governance & Public Policy — Qatar Foundation',
    'Coordinator, "Democratic Transition in the Arab World" Project — Arab Center for Research & Policy Studies',
  ],
};

// ── المواد التي قام بتدريسها ──
export const COURSES: { ar: string[]; en: string[] } = {
  ar: [
    'مبادئ العلوم السياسية',
    'النظرية السياسية',
    'الفكر السياسي',
    'الفكر السياسي الإسلامي',
    'حقوق الإنسان',
    'الفكر السياسي الإسلامي (دراسات عليا)',
  ],
  en: [
    'Principles of Political Science',
    'Political Theory',
    'Political Thought',
    'Islamic Political Thought',
    'Human Rights',
    'Islamic Political Thought (Graduate)',
  ],
};

// ── مختارات من المؤتمرات ──
export const CONFERENCES: { ar: string[]; en: string[] } = {
  ar: [
    'مؤتمر الجمعية الدولية والجمعية الأمريكية للعلوم السياسية (١٩٨٨)',
    'مؤتمر الجامعة الإسلامية العالمية بماليزيا',
    'مؤتمر مركز دراسات الوحدة العربية — بيروت',
    'مؤتمر «تعارف الحضارات» — مكتبة الإسكندرية (٢٠١١)',
    'مؤتمر «نحو نظام عربي جديد» — القاهرة (٢٠١١)',
    'مؤتمر مالك بن نبي: استشراف المستقبل — الجزائر (٢٠١١)',
    'مؤتمر الاجتهاد في الخطاب الإسلامي — جامعة قطر (٢٠١٠)',
    'مؤتمر «الخصوصية الثقافية» — جامعة القاهرة (٢٠٠٦)',
    'مؤتمر مقاصد الشريعة في المجتمعات المعاصرة — ماليزيا (٢٠٠٦)',
    'المؤتمر الدولي: حوار الحضارات ومسارات المعرفة — القاهرة (٢٠٠٧)',
    'مؤتمر «الأمة وأزمة الثقافة والتنمية» — جامعة القاهرة (٢٠٠٤)',
    'مؤتمر العدوان على غزة: الدلالات الحضارية (٢٠٠٩)',
    'مؤتمرات المركز العربي للأبحاث ودراسة السياسات (متعددة)',
    'مؤتمرات جامعة صباح الدين زعيم ومركز دراسات الشرق الأوسط (متعددة)',
  ],
  en: [
    'IPSA & APSA Conference (1988)',
    'International Islamic University Malaysia Conference',
    'Center for Arab Unity Studies Conference — Beirut',
    'Mutual Recognition of Civilizations — Bibliotheca Alexandrina (2011)',
    'Toward a New Arab Order — Cairo (2011)',
    'Malek Bennabi: Foresight Conference — Algeria (2011)',
    'Ijtihad in Islamic Discourse — Qatar University (2010)',
    'Cultural Specificity — Cairo University (2006)',
    'Maqasid al-Shariah in Contemporary Societies — Malaysia (2006)',
    'Dialogue of Civilizations & Paths of Knowledge — Cairo (2007)',
    'The Ummah & the Crisis of Culture and Development — Cairo University (2004)',
    'The Aggression on Gaza: Civilizational Implications (2009)',
    'Arab Center for Research & Policy Studies conferences (multiple)',
    'Sabahattin Zaim University & Middle East Studies Center conferences (multiple)',
  ],
};

// ── مختارات من الندوات ──
export const SEMINARS: { ar: string[]; en: string[] } = {
  ar: [
    'ندوة دولية: تجديد الخطاب الإسلامي وعلاقته بالآخر — باريس (٢٠١١)',
    'ندوة: العلوم الإسلامية.. أزمة منهج أم أزمة تنزيل؟ — الرابطة المحمدية للعلماء (٢٠١٠)',
    'ندوة: إشكالية العلاقة بين الفكري والسياسي — المغرب (٢٠٠٥)',
    'ندوة: مستقبل الأمة الإسلامية — الاتحاد العالمي لعلماء المسلمين (٢٠١١)',
    'ندوة: حوار الأديان — مراجعة وتقويم (٢٠٠٩)',
    'ندوة: المسيري.. الغائب الحاضر في الثورة المصرية (٢٠١١)',
    'ندوة: الدولة المدنية — كلية الاقتصاد والعلوم السياسية (٢٠١١)',
    'ندوة: منظور الفكر الإسلامي في تحليل العلاقات الدولية (١٩٩٨)',
    'ندوة: التأصيل النظري للدراسات الحضارية — دار الفكر (٢٠٠٩)',
    'ندوة: محمد علي ومشروع بناء الدولة الحديثة (٢٠١١)',
  ],
  en: [
    'Renewing Islamic Discourse & Relations with the Other — Paris (2011)',
    'Islamic Sciences: Crisis of Method or Application? — Mohammadia League of Scholars (2010)',
    'The Relationship between the Intellectual & the Political — Morocco (2005)',
    'The Future of the Islamic Ummah — International Union of Muslim Scholars (2011)',
    'Interfaith Dialogue: Review & Assessment (2009)',
    'Al-Messiri: The Present Absentee in the Egyptian Revolution (2011)',
    'The Civil State — Faculty of Economics & Political Science (2011)',
    'Islamic Thought in Analyzing International Relations (1998)',
    'Theoretical Grounding of Civilizational Studies — Dar al-Fikr (2009)',
    'Muhammad Ali & the Modern State-Building Project (2011)',
  ],
};

// ── مختارات من الرسائل العلمية المُشرَف عليها ──
export const THESES: { ar: string[]; en: string[] } = {
  ar: [
    'هشام أحمد جعفر — الأبعاد السياسية لمفهوم الحاكمية (ماجستير، ١٩٩٣)',
    'إبراهيم البيومي غانم — الأوقاف والسياسة في مصر الحديثة (دكتوراه، ١٩٩٧)',
    'أماني عبد الرحمن صالح — أزمة الشرعية في مؤسسة الخلافة (دكتوراه، ١٩٩٨)',
    'عبد العزيز شادي — العلاقة بين الإفتاء والسياسة في مصر (دكتوراه، ١٩٩٩)',
    'محمد أبو رمان — الإصلاح السياسي في الفكر الإسلامي المعاصر (دكتوراه، ٢٠٠٩)',
    'سامح المتولي — العمران السياسي لدى ابن خلدون (ماجستير، ٢٠٠٩)',
    'أحمد نبيل صادق — إسهام ابن خلدون في النظرية الدولية (ماجستير، ٢٠١١)',
    'رضوى عدس — المركزية الغربية (٢٠١٣)',
    'عبده إبراهيم — التجديد السياسي عند حامد ربيع (ماجستير، ٢٠١٢)',
    'وسام الضويني — علاقة المجتمع بالدولة في العالم العربي (ماجستير، ٢٠١٥)',
  ],
  en: [
    'Hisham Ahmad Jafar — Political Dimensions of Hakimiyya (M.A., 1993)',
    'Ibrahim El-Bayoumi Ghanem — Endowments & Politics in Modern Egypt (Ph.D., 1997)',
    'Amani Abdel-Rahman Saleh — The Crisis of Legitimacy in the Caliphate (Ph.D., 1998)',
    'Abdel-Aziz Shady — Fatwa & Politics in Egypt (Ph.D., 1999)',
    'Mohammad Abu Rumman — Political Reform in Contemporary Islamic Thought (Ph.D., 2009)',
    'Sameh El-Metwally — Political Civilization in Ibn Khaldun (M.A., 2009)',
    'Ahmad Nabil Sadeq — Ibn Khalduns Contribution to International Theory (M.A., 2011)',
    'Radwa Adas — Western Centrism (2013)',
    'Abdo Ibrahim — Political Renewal in Hamed Rabie (M.A., 2012)',
    'Wesam El-Dweiny — State–Society Relations in the Arab World (M.A., 2015)',
  ],
};

// ── مختارات من المؤلفات والكتب ──
export interface Book { title: string; meta: string; }
export const PUBLICATIONS: { ar: Book[]; en: Book[] } = {
  ar: [
    { title: 'مفهوم المواطنة', meta: 'مركز الفكر الإسلامي والدراسات المعاصرة، إسطنبول، ٢٠٢٢م' },
    { title: 'المواطنة: المفهوم والإشكالات', meta: 'مركز الفكر السياسي الإسلامي الإستراتيجي، إسطنبول، ٢٠٢٢م' },
    { title: 'النظرية السياسية من منظور حضاري إسلامي', meta: 'منهجية التجديد السياسي وخبرة الواقع العربي — المعهد العالمي للفكر الإسلامي، ٢٠٠٢م' },
    { title: 'التجديد السياسي والواقع العربي المعاصر: رؤية إسلامية', meta: 'مكتبة النهضة المصرية، القاهرة، ١٩٨٩م' },
    { title: 'عقلية الوهن', meta: 'دار القارئ العربي، القاهرة، ١٩٩١م' },
    { title: 'بناء المفاهيم: دراسة معرفية ونماذج تطبيقية (جزآن)', meta: 'بإشراف مشترك مع أ.د. علي جمعة — المعهد العالمي للفكر الإسلامي، ١٩٩٨م' },
    { title: 'المجتمع المدني وأبعاده الفكرية', meta: 'سلسلة حوارات لقرن جديد — دار الفكر، دمشق، ٢٠٠٣م' },
    { title: 'نحو بناء علم سياسة إسلامي', meta: 'ضمن: الصحوة الإسلامية والعلوم الاجتماعية، تونس، ١٩٩١م' },
    { title: 'مقدمات حول التحيز في التحليل السياسي', meta: 'ضمن إشكالية التحيز، المعهد العالمي للفكر الإسلامي، ١٩٩٣م' },
    { title: 'حقوق الإنسان في فكر الإسلاميين', meta: 'مركز القاهرة لدراسات حقوق الإنسان (عمل جماعي)' },
  ],
  en: [
    { title: 'The Concept of Citizenship', meta: 'Center for Islamic Thought & Contemporary Studies, Istanbul, 2022' },
    { title: 'Citizenship: Concept & Problematics', meta: 'Strategic Islamic Political Thought Center, Istanbul, 2022' },
    { title: 'Political Theory from an Islamic Civilizational Perspective', meta: 'International Institute of Islamic Thought, 2002' },
    { title: 'Political Renewal & the Contemporary Arab Reality', meta: 'Egyptian Renaissance Library, Cairo, 1989' },
    { title: 'The Mentality of Weakness', meta: 'Dar al-Qari al-Arabi, Cairo, 1991' },
    { title: 'Building Concepts: A Cognitive Study (2 vols.)', meta: 'Co-supervised with Prof. Ali Gomaa — IIIT, 1998' },
    { title: 'Civil Society & Its Intellectual Dimensions', meta: 'Dialogues for a New Century — Dar al-Fikr, Damascus, 2003' },
    { title: 'Toward Building an Islamic Political Science', meta: 'In: Islamic Awakening & Social Sciences, Tunis, 1991' },
    { title: 'Introductions on Bias in Political Analysis', meta: 'In: The Problematic of Bias — IIIT, 1993' },
    { title: 'Human Rights in Islamist Thought', meta: 'Cairo Institute for Human Rights Studies (collective work)' },
  ],
};
