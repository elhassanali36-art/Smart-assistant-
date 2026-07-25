export type Language = "ar" | "en";

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  proBadge: string;
  serverOnline: string;
  videoCredits: string;
  videoStudioTab: string;
  createNewPost: string;
  overviewTab: string;
  accountsTab: string;
  postsTab: string;
  rulesTab: string;
  refreshData: string;
  allRightsReserved: string;
  // Dashboard Overview
  welcomeTitle: string;
  welcomeSubtitle: string;
  totalFollowers: string;
  connectedAccounts: string;
  postsCountLabel: string;
  aiVideosLabel: string;
  avgEngagement: string;
  createAdVideoBtn: string;
  connectAccountBtn: string;
  accountsSectionTitle: string;
  accountsSectionSub: string;
  manageAllAccounts: string;
  autoPublishStatus: string;
  activeEnabled: string;
  disabledLabel: string;
  latestAiVideos: string;
  viewAll: string;
  publishingHistory: string;
  manageCalendar: string;
  // Accounts Manager
  accountsManagerTitle: string;
  accountsManagerSub: string;
  connectNewSocial: string;
  followersLabel: string;
  permissionsLabel: string;
  lastSyncLabel: string;
  disconnectBtn: string;
  connectModalTitle: string;
  connectModalSub: string;
  step1ChoosePlatform: string;
  step2AccountDetails: string;
  accountNameLabel: string;
  usernameLabel: string;
  followerCountLabel: string;
  autoPublishPermission: string;
  autoPublishDesc: string;
  connectSubmitBtn: string;
  connectingStatus: string;
  // AI Video Studio
  studioTitle: string;
  studioSubtitle: string;
  newVideoBtn: string;
  hideFormBtn: string;
  step1ProductDetails: string;
  productNameLabel: string;
  productUrlLabel: string;
  promptDescriptionLabel: string;
  step2ChooseStyle: string;
  step3ChooseLanguage: string;
  aspectRatioLabel: string;
  durationLabel: string;
  voiceToneLabel: string;
  generateVideoBtn: string;
  generatingStatus: string;
  readyVideosTitle: string;
  noVideosYet: string;
  // Scheduler & Advanced Recurring Posts
  schedulerTitle: string;
  schedulerSubtitle: string;
  filterByPlatform: string;
  filterByStatus: string;
  allPlatforms: string;
  allStatuses: string;
  scheduledStatus: string;
  publishedStatus: string;
  draftStatus: string;
  publishNowBtn: string;
  deletePostBtn: string;
  viewsMetric: string;
  likesMetric: string;
  commentsSharesMetric: string;
  engagementRateMetric: string;
  // New Post Modal & Recurring Scheduling UI
  modalTitle: string;
  modalSubtitle: string;
  selectTargetAccounts: string;
  aiWriterTitle: string;
  aiWriterSub: string;
  aiTopicPlaceholder: string;
  aiToneLabel: string;
  aiGenerateBtn: string;
  aiGeneratingBtn: string;
  postTitleLabel: string;
  postContentLabel: string;
  attachVideoLabel: string;
  publishModeLabel: string;
  modeNow: string;
  modeSchedule: string;
  modeRecurring: string;
  modeDraft: string;
  scheduledDateLabel: string;
  scheduledTimeLabel: string;
  // Advanced Recurring
  recurringFreqLabel: string;
  freqDaily: string;
  freqWorkdays: string;
  freqWeekly: string;
  freqMonthly: string;
  multipleTimesPerDayLabel: string;
  addTimeSlotBtn: string;
  timeSlotHeader: string;
  endDateLabel: string;
  noEndDate: string;
  submitPostNow: string;
  submitPostSchedule: string;
  submitPostRecurring: string;
  submitPostDraft: string;
  // Auto Publish Rules
  rulesTitle: string;
  rulesSubtitle: string;
  addRuleBtn: string;
  ruleNameLabel: string;
  scheduleRepetition: string;
  promptTemplateLabel: string;
  targetPlatformsLabel: string;
  generateVideoWithRule: string;
  activateRuleBtn: string;
  activeRulesCount: string;
  noRulesYet: string;
  pauseRuleBtn: string;
  resumeRuleBtn: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appTitle: "بوستك الذكي | Postik AI",
    appSubtitle: "إدارة الحسابات + النشر المجدول المتكرر + استوديو الفيديوهات",
    proBadge: "PRO",
    serverOnline: "الخادم متصل وأتمتة النشر نشطة 24/7",
    videoCredits: "رصيد الفيديوهات:",
    videoStudioTab: "استوديو الفيديوهات 🎬",
    createNewPost: "إنشاء منشور / جدولة",
    overviewTab: "لوحة القيادة",
    accountsTab: "الحسابات المربوطة",
    postsTab: "جدول النشر والتقويم 📅",
    rulesTab: "أتمتة النشر التلقائي",
    refreshData: "مزامنة فورية للبيانات",
    allRightsReserved: "جميع الحقوق محفوظة 2026 ©",
    // Dashboard Overview
    welcomeTitle: "مرحباً بك في غرفة قيادة منصتك الاجتماعية 🚀",
    welcomeSubtitle: "يقوم موقعك الآن بجدولة ونشر المحتوى تلقائياً وفي عدة أوقات يومياً عبر الحسابات المربوطة، مع استوديو فيديوهات إعلانية جاهز لتحويل أفكارك لحملات ناجحة.",
    totalFollowers: "إجمالي المتابعين",
    connectedAccounts: "عبر الحسابات المتصلة بنجاح",
    postsCountLabel: "المنشورات (منشور/مجدول/متكرر)",
    aiVideosLabel: "فيديوهات AI الإعلانية",
    avgEngagement: "معدل التفاعل العام",
    createAdVideoBtn: "إنشاء فيديو إعلاني",
    connectAccountBtn: "ربط حساب جديد",
    accountsSectionTitle: "الحسابات المربوطة وإعدادات النشر بالنيابة عنك",
    accountsSectionSub: "تحكم في الحسابات المتصلة وفعّل أو عطّل النشر التلقائي الأوتوماتيكي لكل منصة بسهولة",
    manageAllAccounts: "إدارة جميع الحسابات",
    autoPublishStatus: "النشر الآلي:",
    activeEnabled: "مفعّل (نشط)",
    disabledLabel: "معطّل",
    latestAiVideos: "أحدث الفيديوهات الإعلانية المُنتجة بالذكاء الاصطناعي",
    viewAll: "مشاهدة الكل →",
    publishingHistory: "سجل النشر والجدولة التلقائية",
    manageCalendar: "إدارة التقويم →",
    // Accounts Manager
    accountsManagerTitle: "مركز إدارة حسابات التواصل الاجتماعي",
    accountsManagerSub: "اربط حساباتك الرسمية ليتمكن الذكاء الاصطناعي من النشر بالنيابة عنك وتوزيع الفيديوهات الإعلانية في أوقات الذروة.",
    connectNewSocial: "ربط حساب تواصل جديد",
    followersLabel: "المتابعين:",
    permissionsLabel: "الصلاحيات الممنوحة:",
    lastSyncLabel: "آخر مزامنة:",
    disconnectBtn: "فصل الحساب",
    connectModalTitle: "ربط ومصادقة حساب تواصل اجتماعي جديد",
    connectModalSub: "اختر المنصة وافتح بوابة التصريح عبر OAuth الآمن",
    step1ChoosePlatform: "1. اختر المنصة المراد ربطها:",
    step2AccountDetails: "2. بيانات الحساب المفتوح في المتصفح أو المراد المصادقة معه:",
    accountNameLabel: "اسم الحساب أو المتجر *",
    usernameLabel: "اسم المستخدم (Username / Handle) *",
    followerCountLabel: "عدد المتابعين الحالي (اختياري، للمزامنة التلقائية)",
    autoPublishPermission: "صلاحيات النشر التلقائي الأوتوماتيكي والجدولة اليومية",
    autoPublishDesc: "عند تفعيل هذا الخيار، سيقوم الذكاء الاصطناعي الخاص بالموقع بجدولة ونشر المنشورات بالنيابة عنك دون الحاجة لتأكيد إضافي في كل مرة.",
    connectSubmitBtn: "الموافقة وربط الحساب الآن (تسجيل الدخول الآمن) 🔒",
    connectingStatus: "جاري الاتصال والمصادقة وبناء المزامنة...",
    // AI Video Studio
    studioTitle: "اصنع فيديوهات إعلانية احترافية بضغطة زر 🎬",
    studioSubtitle: "أدخل وصف منتجك، واختر اللهجة العربية والنمط المناسب لتقوم الخوارزميات بتوليد سيناريو إعلاني، تعليق صوتي، ومشاهد جاهزة للنشر الفوري.",
    newVideoBtn: "إنشاء فيديو إعلاني جديد ▼",
    hideFormBtn: "إخفاء نموذج الإنشاء ▲",
    step1ProductDetails: "الخطوة 1: تفاصيل المنتج أو العرض الترويجي",
    productNameLabel: "اسم المنتج أو الخدمة أو الحملة *",
    productUrlLabel: "رابط المتجر أو صفحة الهبوط (اختياري)",
    promptDescriptionLabel: "وصف تفصيلي للإعلان والمميزات المراد التركيز عليها *",
    step2ChooseStyle: "الخطوة 2: اختر النمط البصري (Video Style):",
    step3ChooseLanguage: "الخطوة 3: اختر اللهجة العربية للتعليق الصوتي والسيناريو:",
    aspectRatioLabel: "أبعاد الفيديو (Aspect Ratio):",
    durationLabel: "مدة الفيديو الإعلاني:",
    voiceToneLabel: "نبرة الصوت (Voiceover Tone):",
    generateVideoBtn: "توليد الفيديو والسيناريو الإعلاني بالذكاء الاصطناعي الآن 🚀",
    generatingStatus: "جاري تحليل الوصف وتصوير المشاهد وتركيب الصوت...",
    readyVideosTitle: "استوديو الفيديوهات الإعلانية الجاهزة",
    noVideosYet: "لا توجد فيديوهات إعلانية حتى الآن",
    // Scheduler
    schedulerTitle: "تقويم وقائمة انتظار نشر المحتوى المجدول والمتكرر",
    schedulerSubtitle: "نظم منشوراتك، حدد أوقات النشر المتعددة في اليوم الواحد والتكرار اليومي، أو اضغط على (نشر الآن فوراً) لتوصيل رسالتك فوراً لحسابات التواصل.",
    filterByPlatform: "المنصة:",
    filterByStatus: "الحالة:",
    allPlatforms: "🌐 جميع المنصات",
    allStatuses: "📊 كل المنشورات",
    scheduledStatus: "⏳ مجدول للنشر / متكرر",
    publishedStatus: "✅ تم نشره بنجاح",
    draftStatus: "📝 مسودات",
    publishNowBtn: "نشر الآن فوراً 🚀",
    deletePostBtn: "حذف المنشور",
    viewsMetric: "المشاهدات",
    likesMetric: "الإعجابات",
    commentsSharesMetric: "التعليقات والمشاركات",
    engagementRateMetric: "معدل التفاعل",
    // New Post Modal & Recurring UI
    modalTitle: "إنشاء ونشر منشور ذكي أو مجدول متكرر في اليوم",
    modalSubtitle: "اختر الحسابات، استعن بمساعد الذكاء الاصطناعي، وحدد أوقات النشر اليومية المتكررة",
    selectTargetAccounts: "1. اختر الحسابات المراد النشر عليها بالنيابة عنك (*):",
    aiWriterTitle: "مساعد الصياغة بالذكاء الاصطناعي (AI Writer Assistant)",
    aiWriterSub: "صياغة مخصصة + هاشتاقات ترند",
    aiTopicPlaceholder: "عن ماذا يتحدث منشورك؟ (مثال: خصم 40% على عطور الشتاء الملكية)",
    aiToneLabel: "نبرة الكتابة",
    aiGenerateBtn: "✨ صياغة وتوليد عنوان ومحتوى المنشور بالذكاء الاصطناعي الآن",
    aiGeneratingBtn: "جاري صياغة النص الإعلاني واقتراح الهاشتاقات...",
    postTitleLabel: "2. عنوان المنشور أو التغريدة *",
    postContentLabel: "3. نص المنشور والتفاصيل والروابط *",
    attachVideoLabel: "4. إرفاق فيديو إعلاني مُنتج بالذكاء الاصطناعي (اختياري):",
    publishModeLabel: "5. موعد وطريقة التكرار والنشر عبر الموقع بالنيابة عنك:",
    modeNow: "🚀 نشر الآن فوراً",
    modeSchedule: "⏳ جدولة لمرة واحدة",
    modeRecurring: "🔄 تكرار يومي / عدة أوقات في اليوم",
    modeDraft: "📝 حفظ كمسودة",
    scheduledDateLabel: "تاريخ النشر المجدول:",
    scheduledTimeLabel: "ساعة النشر:",
    // Advanced Recurring
    recurringFreqLabel: "نوع التكرار والجدولة المستمرة:",
    freqDaily: "🔄 تكرار يومي (كل يوم)",
    freqWorkdays: "💼 تكرار في أيام العمل فقط (الأحد - الخميس)",
    freqWeekly: "📅 تكرار أسبوعي في نفس اليوم",
    freqMonthly: "🗓️ تكرار شهري",
    multipleTimesPerDayLabel: "أوقات النشر اليومية (يمكنك إضافة أكثر من وقت في نفس اليوم!):",
    addTimeSlotBtn: "+ إضافة وقت نشر آخر في اليوم",
    timeSlotHeader: "وقت النشر رقم",
    endDateLabel: "تاريخ انتهاء التكرار (اختياري، اتركه فارغاً للتكرار الدائم):",
    noEndDate: "تكرار مستمر دائم",
    submitPostNow: "نشر هذا المنشور عبر الحسابات الآن فوراً 🚀",
    submitPostSchedule: "تأكيد جدولة المنشور بالنيابة عنك ⏳",
    submitPostRecurring: "تأكيد الجدولة المتكررة (عدة أوقات يومياً) 🔄✨",
    submitPostDraft: "حفظ في مسودات المنشورات 📝",
    // Auto Publish Rules
    rulesTitle: "دع الذكاء الاصطناعي يدير نشرك وتكراره 24/7 🤖",
    rulesSubtitle: "أنشئ قواعد أتمتة مخصصة ليقوم الموقع يومياً أو عدة مرات باليوم بتوليد منشورات وفيديوهات جديدة بالذكاء الاصطناعي ونشرها تلقائياً.",
    addRuleBtn: "إضافة قاعدة أتمتة جديدة ▼",
    ruleNameLabel: "اسم قاعدة الأتمتة *",
    scheduleRepetition: "تكرار النشر:",
    promptTemplateLabel: "قالب المحتوى والتعليمات للذكاء الاصطناعي (Prompt Template) *",
    targetPlatformsLabel: "اختر حسابات التواصل الاجتماعي المستهدفة:",
    generateVideoWithRule: "توليد فيديو إعلاني بالذكاء الاصطناعي مع كل منشور مجدول",
    activateRuleBtn: "تفعيل قاعدة النشر التلقائي الآن 🚀",
    activeRulesCount: "قواعد وأوامر النشر الدورية النشطة",
    noRulesYet: "لا توجد قواعد أتمتة حتى الآن",
    pauseRuleBtn: "إيقاف مؤقت",
    resumeRuleBtn: "تفعيل الأتمتة",
  },
  en: {
    appTitle: "Postik AI | Smart Publisher",
    appSubtitle: "Social Accounts + Recurring Daily Schedules + AI Ad Video Studio",
    proBadge: "PRO",
    serverOnline: "Server Online & 24/7 Automation Active",
    videoCredits: "Video Credits:",
    videoStudioTab: "AI Video Studio 🎬",
    createNewPost: "Create / Schedule Post",
    overviewTab: "Dashboard",
    accountsTab: "Connected Accounts",
    postsTab: "Schedule & Calendar 📅",
    rulesTab: "AI Auto-Publish Rules",
    refreshData: "Instant Data Sync",
    allRightsReserved: "All Rights Reserved 2026 ©",
    // Dashboard Overview
    welcomeTitle: "Welcome to your Social Media Command Center 🚀",
    welcomeSubtitle: "Your platform is automatically scheduling and publishing posts at multiple daily slots across connected accounts, with an AI Ad Video Studio ready to supercharge your campaigns.",
    totalFollowers: "Total Followers",
    connectedAccounts: "Across successfully connected accounts",
    postsCountLabel: "Posts (Published/Scheduled/Recurring)",
    aiVideosLabel: "AI Ad Videos Generated",
    avgEngagement: "Overall Engagement Rate",
    createAdVideoBtn: "Create Ad Video",
    connectAccountBtn: "Connect Account",
    accountsSectionTitle: "Connected Accounts & Automated Publishing Settings",
    accountsSectionSub: "Control your connected accounts and toggle automated AI publishing on or off per platform effortlessly",
    manageAllAccounts: "Manage All Accounts",
    autoPublishStatus: "Auto-Publish:",
    activeEnabled: "Active (Enabled)",
    disabledLabel: "Disabled",
    latestAiVideos: "Latest AI Ad Videos Generated",
    viewAll: "View All →",
    publishingHistory: "Publishing & Scheduled History",
    manageCalendar: "Manage Calendar →",
    // Accounts Manager
    accountsManagerTitle: "Social Media Accounts Center",
    accountsManagerSub: "Connect your official accounts so our AI can publish on your behalf and distribute ad videos during peak engagement hours.",
    connectNewSocial: "Connect New Social Account",
    followersLabel: "Followers:",
    permissionsLabel: "Granted Permissions:",
    lastSyncLabel: "Last Synced:",
    disconnectBtn: "Disconnect Account",
    connectModalTitle: "Connect & Authenticate New Social Account",
    connectModalSub: "Select platform and open secure OAuth authorization gateway",
    step1ChoosePlatform: "1. Choose platform to connect:",
    step2AccountDetails: "2. Account details for browser authentication:",
    accountNameLabel: "Account or Store Name *",
    usernameLabel: "Username / Handle *",
    followerCountLabel: "Current Follower Count (Optional, for auto-sync)",
    autoPublishPermission: "Automated Auto-Publish & Daily Scheduling Permission",
    autoPublishDesc: "When enabled, the platform's AI will schedule and publish posts on your behalf without requiring manual confirmation every time.",
    connectSubmitBtn: "Authorize & Connect Account Now (Secure Login) 🔒",
    connectingStatus: "Connecting, authenticating & building sync...",
    // AI Video Studio
    studioTitle: "Create Professional AI Ad Videos in 1 Click 🎬",
    studioSubtitle: "Enter your product description, choose Arabic dialect and style, and let algorithms generate persuasive script, voiceover, and visual footage ready for instant publishing.",
    newVideoBtn: "Create New Ad Video ▼",
    hideFormBtn: "Hide Generator Form ▲",
    step1ProductDetails: "Step 1: Product or Promotional Offer Details",
    productNameLabel: "Product, Service or Campaign Name *",
    productUrlLabel: "Store or Landing Page URL (Optional)",
    promptDescriptionLabel: "Detailed description of the ad and features to highlight *",
    step2ChooseStyle: "Step 2: Choose Visual Style (Video Style):",
    step3ChooseLanguage: "Step 3: Choose Voiceover Dialect / Language:",
    aspectRatioLabel: "Video Aspect Ratio:",
    durationLabel: "Ad Video Duration:",
    voiceToneLabel: "Voiceover Tone:",
    generateVideoBtn: "Generate AI Ad Video & Script Now 🚀",
    generatingStatus: "Analyzing prompt, generating footage & mixing voiceover...",
    readyVideosTitle: "Ready AI Ad Videos Studio",
    noVideosYet: "No ad videos generated yet",
    // Scheduler
    schedulerTitle: "Scheduled & Recurring Content Publishing Calendar",
    schedulerSubtitle: "Organize posts, set multiple daily publishing times and daily repetition, or click (Publish Now) to broadcast instantly to your social channels.",
    filterByPlatform: "Platform:",
    filterByStatus: "Status:",
    allPlatforms: "🌐 All Platforms",
    allStatuses: "📊 All Posts",
    scheduledStatus: "⏳ Scheduled / Recurring",
    publishedStatus: "✅ Successfully Published",
    draftStatus: "📝 Drafts",
    publishNowBtn: "Publish Now 🚀",
    deletePostBtn: "Delete Post",
    viewsMetric: "Views",
    likesMetric: "Likes",
    commentsSharesMetric: "Comments & Shares",
    engagementRateMetric: "Engagement Rate",
    // New Post Modal & Recurring UI
    modalTitle: "Create Smart Post or Daily Recurring Schedule",
    modalSubtitle: "Select accounts, use AI copywriter, and configure multiple daily time slots",
    selectTargetAccounts: "1. Select target accounts to publish on your behalf (*):",
    aiWriterTitle: "AI Writer Assistant",
    aiWriterSub: "Custom copy + Trending hashtags",
    aiTopicPlaceholder: "What is your post about? (e.g. 40% off Winter Royal Perfumes)",
    aiToneLabel: "Writing Tone",
    aiGenerateBtn: "✨ Generate Title & Content with AI Copywriter Now",
    aiGeneratingBtn: "Drafting promotional copy & suggesting hashtags...",
    postTitleLabel: "2. Post / Tweet Title *",
    postContentLabel: "3. Post Text, Details & Links *",
    attachVideoLabel: "4. Attach AI Generated Ad Video (Optional):",
    publishModeLabel: "5. Schedule, Daily Repetition & Publishing Mode:",
    modeNow: "🚀 Publish Now Instantly",
    modeSchedule: "⏳ One-time Schedule",
    modeRecurring: "🔄 Daily Recurrence / Multiple Times a Day",
    modeDraft: "📝 Save as Draft",
    scheduledDateLabel: "Scheduled Date:",
    scheduledTimeLabel: "Scheduled Time:",
    // Advanced Recurring
    recurringFreqLabel: "Recurrence Frequency & Continuous Scheduling:",
    freqDaily: "🔄 Daily (Every single day)",
    freqWorkdays: "💼 Workdays Only (Sunday - Thursday)",
    freqWeekly: "📅 Weekly on same day",
    freqMonthly: "🗓️ Monthly repetition",
    multipleTimesPerDayLabel: "Daily Publishing Time Slots (Add multiple times per day!):",
    addTimeSlotBtn: "+ Add Another Time Slot for Today",
    timeSlotHeader: "Publish Time #",
    endDateLabel: "Recurrence End Date (Optional, leave empty for indefinite):",
    noEndDate: "Indefinite Continuous Recurrence",
    submitPostNow: "Broadcast Post Instantly Across Accounts 🚀",
    submitPostSchedule: "Confirm One-Time Schedule on your Behalf ⏳",
    submitPostRecurring: "Confirm Daily Recurring Schedule (Multi-Slots/Day) 🔄✨",
    submitPostDraft: "Save to Post Drafts 📝",
    // Auto Publish Rules
    rulesTitle: "Let AI Automate Your Recurring Posts 24/7 🤖",
    rulesSubtitle: "Create custom automation workflows where AI generates and publishes fresh posts & ad videos daily or multiple times a day automatically.",
    addRuleBtn: "Add New Automation Workflow ▼",
    ruleNameLabel: "Automation Workflow Name *",
    scheduleRepetition: "Repetition Frequency:",
    promptTemplateLabel: "AI Content Prompt Template & Instructions *",
    targetPlatformsLabel: "Select Target Social Media Channels:",
    generateVideoWithRule: "Automatically generate an AI Ad Video with each scheduled post",
    activateRuleBtn: "Activate Auto-Publish Workflow Now 🚀",
    activeRulesCount: "Active Recurring Publishing Workflows",
    noRulesYet: "No automation workflows created yet",
    pauseRuleBtn: "Pause Workflow",
    resumeRuleBtn: "Activate Workflow",
  },
};
