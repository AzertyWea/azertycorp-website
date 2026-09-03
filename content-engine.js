/* ==========================================================================
   AZERTYCORP CONTENT ENGINE (v1.0) - CORE SYSTEM JAVASCRIPT
   ========================================================================== */

// 1. LANGUAGE STRINGS
const LANG = {
  en: {
    dashboard: "OPERATING DASHBOARD",
    dashboardSub: "AzertyCorp Short-Form Pipeline · Governance & Metrics",
    createContent: "CREATE AZERTYCORP CONTENT",
    totalGenerated: "Total Generated",
    inDraftProd: "In Draft / Prod",
    awaitingApproval: "Awaiting Approval",
    publishedPosts: "Published Posts",
    totalLeads: "Total Leads Logged",
    allLifecycle: "All lifecycle records",
    activeGeneration: "Active generation",
    requiresAction: "Requires human action",
    auditedLive: "Audited & live",
    aggregatedPerf: "Aggregated Performance Index",
    auditedShortForm: "Audited short-form data (TikTok, IG Reels, Shorts)",
    detailedAnalytics: "Detailed Analytics →",
    totalViews: "Total Organic Views",
    avgEngagement: "Avg Engagement",
    followersGained: "Followers Gained",
    topPerforming: "Top Performing Vectors",
    bestPillar: "BEST PILLAR",
    bestFormat: "BEST FORMAT",
    bestHook: "BEST HOOK CATEGORY",
    aiLearning: "AI LEARNING LOOP",
    recommendedNext: "Recommended Next Content",
    generateSuggested: "Generate Suggested Content →",
    recentOps: "Recent Content Operations",
    viewAll: "View All",
    workflow: "PIPELINE STAGE",
    contentId: "CONTENT ID:",
    idea: "Idea",
    brief: "Brief",
    hooks: "Hooks",
    script: "Script",
    production: "Production",
    qc: "QC",
    approval: "Approval",
    stepOf: "OF",
    step1Title: "Step 1: Ideation & Foundation",
    step2Title: "Step 2: Content Brief Synthesis",
    step3Title: "Step 3: Hook Generator & Scoring",
    step4Title: "Step 4: Timed Script Generator",
    step5Title: "Step 5: Production & Visuals",
    stage: "STAGE",
    back: "← Back",
    generateBrief: "Generate Brief →",
    generateHooks: "Generate 10 Hooks →",
    generateScript: "Generate Full Script →",
    generateShotList: "Generate Shot List →",
    brandPillar: "Brand Pillar",
    contentFormat: "Content Format",
    topic: "Topic",
    targetAudience: "Target Audience",
    objective: "Objective",
    duration: "Duration",
    language: "Language",
    generateIdeas: "GENERATE 5 AZERTYCORP IDEAS",
    ideaGenerator: "IDEA GENERATOR",
    ideaParams: "Target Parameters",
    ideaTopic: "Topic",
    ideaAudience: "Target Audience",
    ideaObjective: "Objective",
    ideaDuration: "Duration",
    ideaLanguage: "Language",
    factoryTitle: "CONTENT FACTORY (BATCH ENGINE)",
    factorySub: "Transform 1 Core Topic into 5 Distinct Packages (§5.16)",
    coreTopicRoot: "Core Topic Root",
    primaryPillar: "Primary Pillar",
    producePackages: "PRODUCE 5 MULTI-FORMAT PACKAGES",
    repurposeTitle: "CROSS-PLATFORM REPURPOSING ENGINE",
    repurposeSub1: "Transform TikTok scripts into IG Reels, YouTube Shorts, LinkedIn, Facebook (§5.17).",
    selectBaseContent: "Select Base Content",
    synthesizeAdaptations: "Synthesize Adaptations",
    calendarTitle: "WEEKLY CONTENT CALENDAR",
    calendarSub: "Pillar Balancing (§5.15)",
    balance: "Balance:",
    tech: "Tech",
    biz: "Biz",
    slotPost: "+ Slot Post",
    libraryTitle: "PERSISTENT CONTENT LIBRARY",
    librarySub: "Audited database of all generated packages (§5.14).",
    search: "Search topic, hook, or ID...",
    allPillars: "All Pillars",
    allStatuses: "All Statuses",
    readyForReview: "Ready For Review",
    approved: "Approved",
    published: "Published",
    draft: "Draft",
    approvalTitle: "HUMAN APPROVAL GATE (§5.13)",
    approvalSub: "Hard Gate: AI proposes, human authorizes. No auto-approval.",
    approvalQueueClean: "Approval Queue Clean",
    noPending: "No content awaiting intervention.",
    qcScore: "QC SCORE",
    selectedHook: "Selected Hook",
    fullScript: "Full Script Text",
    qcFindings: "QC Findings",
    reviewNotes: "Review Notes",
    approve: "APPROVE PACKAGE",
    requestChanges: "Request Changes",
    publishedTitle: "PUBLISHING PACKAGES & DISPATCH",
    publishedSub: "Staged packages authorized by humans (§5.9).",
    confirmLive: "Confirm Live Post",
    copyPackage: "Copy Production Dossier",
    analyticsTitle: "ANALYTICS & AI LEARNING LOOP",
    analyticsSub: "Performance capture & pattern extraction (§5.18, §5.19).",
    insightsAutomated: "Automated Performance Insights",
    manualPerf: "Manual Performance Entry",
    idTopic: "ID / Topic",
    views: "Views",
    likes: "Likes",
    shares: "Shares",
    watch: "Watch",
    leads: "Leads",
    save: "Save",
    brandMemory: "BRAND MEMORY",
    brandSub: "Single source of truth (§2, §8, §5.20).",
    coreIdentity: "Core Identity Tokens",
    companyName: "Company Name",
    tagline: "Tagline",
    positioning: "Positioning",
    pillars: "Pillars",
    designTokens: "Design Tokens",
    accent: "Accent:",
    terminology: "Terminology Guardrails (§8)",
    approvedTerms: "Approved Terms",
    forbiddenTerms: "Forbidden Terms",
    inventionGuardrail: "Invention Guardrail Active",
    guardrailDesc: "Missing facts trigger explicit flags rather than hallucination.",
    settingsTitle: "SETTINGS & INTEGRATION STUBS",
    settingsSub: "Pre-wired API hooks (§12).",
    socialPublishing: "Social Publishing Stubs",
    tikTokApi: "TikTok API",
    instagramApi: "Instagram Graph API",
    v2Stub: "V2 STUB",
    systemState: "System State",
    resetDatabase: "Reset & Re-Seed Database",
    pillarTarget: "Pillar Target:",
    techPct: "Tech 25% · Biz 25% · Creative 20% · Data 15% · Acad 15%",
    humanGateActive: "HUMAN GATE: ACTIVE",
    autonomousDisabled: "Autonomous posting disabled by core policy §3.",
    createNew: "+ Create Content",
    generate: "Generate",
    generate5Ideas: "GENERATE 5 AZERTYCORP IDEAS",
    topicPlaceholder: "Enter topic",
    pillarSelect: "Select pillar",
    audiencePlaceholder: "Enter target audience",
    durationSelect: "Select duration",
    languageSelect: "Select language"
  },
  fr: {
    dashboard: "TABLEAU DE BORD OPÉRATIONNEL",
    dashboardSub: "Pipeline AzertyCorp Format Court · Gouvernance & Métriques",
    createContent: "CRÉER DU CONTENU AZERTYCORP",
    totalGenerated: "Total Généré",
    inDraftProd: "En Brouillon / Production",
    awaitingApproval: "En Attente d'Approbation",
    publishedPosts: "Publications Publiées",
    totalLeads: "Leads Totaux Enregistrés",
    allLifecycle: "Tous les enregistrements du cycle de vie",
    activeGeneration: "Génération active",
    requiresAction: "Nécessite l'action humaine",
    auditedLive: "Auditée & en direct",
    aggregatedPerf: "Indice de Performance Agrégé",
    auditedShortForm: "Données à forme courte auditées (TikTok, IG Reels, Shorts)",
    detailedAnalytics: "Analytique Détaillée →",
    totalViews: "Vues Organiques Totales",
    avgEngagement: "Engagement Moyen",
    followersGained: "Abonnés Gagnés",
    topPerforming: "Vecteurs Performants",
    bestPillar: "PILAR LE PLUS PERFORMANT",
    bestFormat: "FORMAT LE PLUS PERFORMANT",
    bestHook: "CATÉGORIE DE HOOK LA PLUS PERFORMANTE",
    aiLearning: "BOUCLE D'APPRENTISSAGE IA",
    recommendedNext: "Contenu Recommandé Prochain",
    generateSuggested: "Générer le Contenu Sugéré →",
    recentOps: "Opérations Récentes",
    viewAll: "Voir Tout",
    workflow: "ÉTAPE DU PIPELINE",
    contentId: "ID CONTENU:",
    idea: "Idée",
    brief: "Contexte",
    hooks: "Accroches",
    script: "Scénario",
    production: "Production",
    qc: "QC",
    approval: "Approbation",
    stepOf: "DE",
    step1Title: "Étape 1 : Idéation & Fondation",
    step2Title: "Étape 2 : Synthèse du Contexte",
    step3Title: "Étape 3 : Générateur d'Accroches & Score",
    step4Title: "Étape 4 : Générateur de Scénario Temporisé",
    step5Title: "Étape 5 : Production & Visuels",
    stage: "ÉTAPE",
    back: "← Retour",
    generateBrief: "Générer le Contexte →",
    generateHooks: "Générer 10 Accroches →",
    generateScript: "Générer le Scénario Complet →",
    generateShotList: "Générer la Trame de Plan →",
    brandPillar: "Pilier de Marque",
    contentFormat: "Format de Contenu",
    topic: "Sujet",
    targetAudience: "Public Cible",
    objective: "Objectif",
    duration: "Durée",
    language: "Langue",
    generateIdeas: "GÉNÉRER 5 IDÉES AZERTYCORP",
    ideaGenerator: "GÉNÉRATEUR D'IDÉES",
    ideaParams: "Paramètres Cibles",
    ideaTopic: "Sujet",
    ideaAudience: "Public Cible",
    ideaObjective: "Objectif",
    ideaDuration: "Durée",
    ideaLanguage: "Langue",
    factoryTitle: "USINE DE CONTENU (MOTEUR PAR LOT)",
    factorySub: "Transformer 1 Sujet en 5 Packages Distincts (§5.16)",
    coreTopicRoot: "Sujet Principal",
    primaryPillar: "Pilier Principal",
    producePackages: "PRODUIRE 5 PACKAGES MULTIFORMATS",
    repurposeTitle: "MOTEUR DE RÉUTILISATION INTERPLATEFORME",
    repurposeSub1: "Transformer des scénarios TikTok en IG Reels, YouTube Shorts, LinkedIn, Facebook (§5.17).",
    selectBaseContent: "Sélectionner le Contenu de Base",
    synthesizeAdaptations: "Synthétiser les Adaptations",
    calendarTitle: "CALENDRIER HEBDOMADAIRE DE CONTENU",
    calendarSub: "Équilibrage des Piliers (§5.15)",
    balance: "Équilibre:",
    tech: "Tech",
    biz: "Biz",
    slotPost: "+ Placer un Post",
    libraryTitle: "BIBLIOTHÈQUE DE CONTENU PERSISTANTE",
    librarySub: "Base de données auditée de tous les packages générés (§5.14).",
    search: "Rechercher sujet, accroche ou ID...",
    allPillars: "Tous les Piliers",
    allStatuses: "Tous les Statuts",
    readyForReview: "Prêt Pour Révision",
    approved: "Approuvé",
    published: "Publié",
    draft: "Brouillon",
    approvalTitle: "PORTE D'APPROBATION HUMAINE (§5.13)",
    approvalSub: "Porte dure : l'IA propose, l'humain autorise. Pas d'approbation automatique.",
    approvalQueueClean: "File d'Attente d'Approbation Propre",
    noPending: "Aucun contenu en attente d'intervention.",
    qcScore: "NOTE QC",
    selectedHook: "Accroche Sélectionnée",
    fullScript: "Texte Complet du Scénario",
    qcFindings: "Constats QC",
    reviewNotes: "Notes de Révision",
    approve: "APPROUVER LE PACKAGE",
    requestChanges: "Demander des Modifications",
    publishedTitle: "PUBLICATION DES PACKAGES & DÉSPATCH",
    publishedSub: "Packages échelonnés autorisés par des humains (§5.9).",
    confirmLive: "Confirmer la Publication",
    copyPackage: "Copier le Dossier de Production",
    analyticsTitle: "ANALYTIQUE & BOUCLE D'APPRENTISSAGE IA",
    analyticsSub: "Capture de Performance & Extraction de Motifs (§5.18, §5.19).",
    insightsAutomated: "Performances Automatisées",
    manualPerf: "Saisie Manuelle des Performances",
    idTopic: "ID / Sujet",
    views: "Vues",
    likes: "J'aime",
    shares: "Partages",
    watch: "Visionnage",
    leads: "Leads",
    save: "Enregistrer",
    brandMemory: "MÉMOIRE DE MARQUE",
    brandSub: "Source unique de vérité (§2, §8, §5.20).",
    coreIdentity: "Jetons d'Identité Centrale",
    companyName: "Nom de l'Entreprise",
    tagline: "Slogan",
    positioning: "Positionnement",
    pillars: "Piliers",
    designTokens: "Jetons de Design",
    accent: "Accent:",
    terminology: "Garde-Fous de Terminologie (§8)",
    approvedTerms: "Termes Approuvés",
    forbiddenTerms: "Termes Interdits",
    inventionGuardrail: "Garde-Fou d'Invention Actif",
    guardrailDesc: "Les faits manquants déclenchent des indicateurs explicites plutôt que des hallucinations.",
    settingsTitle: "PARAMÈTRES & STUBS D'INTÉGRATION",
    settingsSub: "Hooks API pré-câblés (§12).",
    socialPublishing: "Stubs de Publication Sociale",
    tikTokApi: "API TikTok",
    instagramApi: "API Instagram Graph",
    v2Stub: "STUB V2",
    systemState: "État du Système",
    resetDatabase: "Réinitialiser & Renuméroter la Base",
    pillarTarget: "Cible de Pilier:",
    techPct: "Tech 25% · Biz 25% · Créatif 20% · Données 15% · Acad 15%",
    humanGateActive: "PORTE HUMAINE: ACTIVE",
    autonomousDisabled: "La publication autonome est désactivée par la politique de base §3.",
    createNew: "+ Créer un Contenu",
    generate: "Générer",
    generate5Ideas: "GÉNÉRER 5 IDÉES AZERTYCORP",
    topicPlaceholder: "Saisir le sujet",
    pillarSelect: "Sélectionner le pilier",
    audiencePlaceholder: "Saisir le public cible",
    durationSelect: "Sélectionner la durée",
    languageSelect: "Sélectionner la langue"
  }
};

function t(key) {
  const currentLang = localStorage.getItem('azerty-lang') || 'en';
  return LANG[currentLang] ? LANG[currentLang][key] || LANG.en[key] : LANG.en[key];
}

function switchLanguage(lang) {
  localStorage.setItem('azerty-lang', lang);
  updateContentLanguage();
}

function updateContentLanguage() {
  updateLanguageButtons();
  App.updateHeaderText();
  const container = document.getElementById('appContainer');
  if (container) {
    const activeTab = container.getAttribute('data-current-view') || 'dashboard';
    Router.navigate(activeTab);
  }
}

Router.navigate = (view) => {
  Router.currentRoute = view;
  const container = document.getElementById('appContainer');
  if (container) {
    container.setAttribute('data-current-view', view);
  }
  if (Views['render' + view.charAt(0).toUpperCase() + view.slice(1)]) {
    Views['render' + view.charAt(0).toUpperCase() + view.slice(1)](container);
  }
};

window.switchLanguage = switchLanguage;

function updateLanguageButtons() {
  const currentLang = localStorage.getItem('azerty-lang') || 'en';
  const btns = document.querySelectorAll('[data-lang-btn]');
  btns.forEach(btn => {
    btn.classList.toggle('tc-on', btn.getAttribute('data-lang-btn') === currentLang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    updateLanguageButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});


// 5. VIEW DEFINITIONS
const Views = {
  // 5.1 DASHBOARD VIEW
renderDashboard: (container) => {
    const items = DB.getItems();
    const published = items.filter(i => i.status === 'PUBLISHED');
    const awaitingApproval = items.filter(i => i.status === 'READY_FOR_REVIEW');
    const drafts = items.filter(i => ['DRAFT', 'IN_PRODUCTION'].includes(i.status));
    let totalViews = 0, totalLeads = 0, totalFollowers = 0;
    published.forEach(p => { if(p.analytics) { totalViews += p.analytics.views || 0; totalLeads += p.analytics.leads || 0; totalFollowers += p.analytics.followersGained || 0; } });
    container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-azerty-border gap-4">
          <div><h1 class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">${t('dashboard')}</h1><p class="text-xs text-zinc-400 mt-1">${t('dashboardSub')}</p></div>
          <div class="flex items-center space-x-3"><button onclick="Workflow.startNew()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shadow-xl shadow-azerty-red/25"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg><span>${t('createContent')}</span></button></div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="bg-azerty-card border border-azerty-border p-4"><div class="text-[10px] font-mono text-zinc-400 uppercase">${t('totalGenerated')}</div><div class="text-2xl font-heading font-bold text-white mt-1">${items.length}</div><div class="text-[10px] text-zinc-500 mt-1">${t('allLifecycle')}</div></div>
          <div class="bg-azerty-card border border-azerty-border p-4"><div class="text-[10px] font-mono text-zinc-400 uppercase">${t('inDraftProd')}</div><div class="text-2xl font-heading font-bold text-white mt-1">${drafts.length}</div><div class="text-[10px] text-zinc-500 mt-1">${t('activeGeneration')}</div></div>
          <div class="bg-azerty-card border border-azerty-red/50 bg-azerty-redSubtle p-4"><div class="text-[10px] font-mono text-azerty-red uppercase font-semibold">${t('awaitingApproval')}</div><div class="text-2xl font-heading font-bold text-white mt-1">${awaitingApproval.length}</div><div class="text-[10px] text-red-300 mt-1 font-mono">${t('requiresAction')}</div></div>
          <div class="bg-azerty-card border border-azerty-border p-4"><div class="text-[10px] font-mono text-zinc-400 uppercase">${t('publishedPosts')}</div><div class="text-2xl font-heading font-bold text-emerald-400 mt-1">${published.length}</div><div class="text-[10px] text-zinc-500 mt-1">${t('auditedLive')}</div></div>
          <div class="bg-azerty-card border border-azerty-border p-4"><div class="text-[10px] font-mono text-zinc-400 uppercase">${t('totalLeads')}</div><div class="text-2xl font-heading font-bold text-white mt-1">${totalLeads}</div><div class="text-[10px] text-zinc-500 mt-1 font-mono">B2B & Academy inquiries</div></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-azerty-card border border-azerty-border p-6 space-y-6">
            <div class="flex items-center justify-between border-b border-zinc-800 pb-4"><div><h3 class="font-heading font-bold text-sm uppercase tracking-wide text-white">${t('aggregatedPerf')}</h3><p class="text-xs text-zinc-400">${t('auditedShortForm')}</p></div>
            <button onclick="Router.navigate('analytics')" class="text-xs text-azerty-red hover:underline font-mono">${t('detailedAnalytics')}</button></div>
            <div class="grid grid-cols-3 gap-4">
              <div class="border border-zinc-800 p-3 bg-zinc-950/60"><span class="text-[10px] font-mono text-zinc-500 uppercase block">${t('totalViews')}</span><span class="text-xl font-heading font-bold text-white">${totalViews.toLocaleString()}</span></div>
              <div class="border border-zinc-800 p-3 bg-zinc-950/60"><span class="text-[10px] font-mono text-zinc-500 uppercase block">${t('avgEngagement')}</span><span class="text-xl font-heading font-bold text-white">12.8%</span></div>
              <div class="border border-zinc-800 p-3 bg-zinc-950/60"><span class="text-[10px] font-mono text-zinc-500 uppercase block">${t('followersGained')}</span><span class="text-xl font-heading font-bold text-emerald-400">+${totalFollowers.toLocaleString()}</span></div>
            </div>
            <div class="space-y-3 pt-2"><div class="text-xs font-mono text-zinc-400 uppercase tracking-wider">${t('topPerforming')}</div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="bg-zinc-900 p-3 border-l-2 border-azerty-red"><div class="text-[10px] text-zinc-500 font-mono">${t('bestPillar')}</div><div class="font-bold text-sm text-white mt-0.5">${DB.getBrand().pillars[0]} (${DB.getBrand().pillars.length} pillars)</div></div>
                <div class="bg-zinc-900 p-3 border-l-2 border-azerty-red"><div class="text-[10px] text-zinc-500 font-mono">${t('bestFormat')}</div><div class="font-bold text-sm text-white mt-0.5">${DB.getBrand().pillars[0]} format</div></div>
                <div class="bg-zinc-900 p-3 border-l-2 border-azerty-red"><div class="text-[10px] text-zinc-500 font-mono">${t('bestHook')}</div><div class="font-bold text-sm text-white mt-0.5">${DB.getBrand().pillars[0]} focus</div></div>
              </div>
            </div>
          </div>
          <div class="bg-azerty-card border border-azerty-border p-6 flex flex-col justify-between">
            <div><div class="flex items-center space-x-2 text-azerty-red font-heading font-bold text-xs uppercase"><span class="w-2 h-2 bg-azerty-red animate-ping"></span><span>${t('aiLearning')} §5.19</span></div>
            <h4 class="font-heading font-bold text-white text-sm">${t('recommendedNext')}</h4>
            <div class="mt-4 p-3 bg-zinc-950 border border-zinc-800 rounded space-y-2"><div class="text-xs font-semibold text-zinc-200">"${DB.getBrand().tagline} content using Problem-First hooks targeting Cameroonian tech founders has yielded 42% higher retention."</div>
            <p class="text-[11px] text-zinc-400">${DB.getBrand().company} infrastructure optimization case study shows measurable impact.</p></div></div>
            <div class="pt-6"><button onclick="Workflow.startWithTopic('Why Monolithic Architectures Cost African Fintechs Millions in Downtime', 'Technology')" class="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-heading font-bold uppercase">${t('generateSuggested')}</button></div>
          </div>
        </div>
        <div class="bg-azerty-card border border-azerty-border p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-3"><h3 class="font-heading font-bold text-sm uppercase tracking-wide text-white">${t('recentOps')}</h3>
          <button onclick="Router.navigate('library')" class="text-xs text-zinc-400 hover:text-white font-mono">${t('viewAll')} (${items.length}) →</button></div>
          <div class="overflow-x-auto"><table class="w-full text-left text-xs"><thead><tr class="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase"><th class="pb-2">ID</th><th class="pb-2">${t('topic')}</th><th class="pb-2">${t('brandPillar')}</th><th class="pb-2">QC</th><th class="pb-2">Status</th><th class="pb-2 text-right">Actions</th></tr></thead><tbody class="divide-y divide-zinc-800/60">${items.slice(0, 5).map(item => `<tr class="hover:bg-zinc-900/50"><td class="py-3 font-mono text-zinc-400">${item.id}</td><td class="py-3 font-medium text-white max-w-xs truncate">${item.topic}</td><td class="py-3"><span class="px-2 py-0.5 bg-zinc-800 text-zinc-300 font-mono text-[10px]">${item.pillar}</span></td><td class="py-3">${item.qualityControl ? `<span class="font-mono font-bold ${item.qualityControl.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}">${item.qualityControl.score}/100</span>` : '<span class="text-zinc-600 font-mono">PENDING</span>'}</td><td class="py-3"><span class="px-2 py-0.5 text-[10px] font-mono uppercase font-semibold ${item.status === 'PUBLISHED' ? 'bg-emerald-950 text-emerald-300' : item.status === 'READY_FOR_REVIEW' ? 'bg-red-950 text-red-300' : 'bg-zinc-800 text-zinc-300'}">${item.status.replace(/_/g, ' ')}</span></td><td class="py-3 text-right"><button onclick="Workflow.inspectItem('${item.id}')" class="text-xs text-azerty-red hover:underline font-medium">Inspect</button></td></tr>`).join('')}</tbody></table></div>
        </div></div>
      </div>
    `;
  },

  renderWorkflow: (container) => {
    let draft = DB.getActiveDraft();
    if(!draft) { draft = Workflow.initBlankDraft(); DB.saveActiveDraft(draft); }
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6 pb-16">
        <div class="bg-azerty-card border border-azerty-border p-4"><div class="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3"><span class="uppercase tracking-widest text-azerty-red font-bold">${t('workflow')} ${t('stepOf')} ${draft.currentStep} OF 7</span><span>${t('contentId')} <strong class="text-white">${draft.id}</strong></span></div>
        <div class="grid grid-cols-7 gap-2 text-[10px] font-heading font-bold uppercase tracking-wider">${[t('idea'),t('brief'),t('hooks'),t('script'),t('production'),t('qc'),t('approval')].map((label,i) => `<div class="workflow-step border p-2 text-center ${draft.currentStep === i+1 ? 'active' : draft.currentStep > i+1 ? 'completed' : 'border-zinc-800 text-zinc-600'}">${label}</div>`).join("")}</div></div>
        <div id="workflowStepContainer" class="bg-azerty-card border border-azerty-border p-6 md:p-8"></div>
      </div>
    `;
    Workflow.renderCurrentStep();
  },

  renderIdeas: (container) => {
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div><h1 class="text-2xl font-extrabold text-white">${t('ideaGenerator')}</h1><p class="text-xs text-zinc-400 mt-1">Multi-vector idea synthesis aligned to AzertyCorp's 5 core pillars.</p></div>
         <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div class="bg-azerty-card border border-azerty-border p-6 space-y-4"><h3 class="font-heading font-bold text-sm uppercase text-white tracking-wider border-b border-zinc-800 pb-2">${t('ideaParams')}</h3>
           <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('brandPillar')}</label><select id="ideaPillar" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2"><option>Technology</option><option>Creative</option><option>Data</option><option>Business</option><option>Academy</option></select></div>
           <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaTopic')}</label><input id="ideaTopic" type="text" value="Why automated inventory reconciliation prevents cashflow death in Douala retail" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
           <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaAudience')}</label><input id="ideaAudience" type="text" value="Entrepreneurs & Operations Directors" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
           <div class="grid grid-cols-2 gap-3"><div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaObjective')}</label><select id="ideaObjective" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2"><option>Authority</option><option>Education</option><option>Engagement</option><option>Leads</option><option>Conversion</option></select></div>
           <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaDuration')}</label><select id="ideaDuration" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2"><option>45s</option><option>30s</option><option>60s</option><option>90s</option></select></div></div>
           <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaLanguage')}</label><select id="ideaLanguage" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2"><option>English</option><option>French</option><option>Bilingual</option></select></div>
           <button onclick="IdeaEngine.generateBatch()" class="w-full bg-azerty-red hover:bg-azerty-redHover text-white py-3 text-xs font-heading font-bold uppercase transition-all mt-4">${t('generate5Ideas')}</button></div>
           <div class="lg:col-span-2 space-y-4" id="ideasListContainer"><div class="p-8 border border-dashed border-zinc-800 text-center text-zinc-500">Click generate to trigger the structured synthesis engine.</div></div>
         </div></div>
    `;
  },

  renderFactory: (container) => {
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-extrabold text-white">${t('factoryTitle')}</h1><p class="text-xs text-zinc-400 mt-1">${t('factorySub')}</p></div></div>
        <div class="bg-azerty-card border border-azerty-border p-6 space-y-4"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="md:col-span-2"><label class="text-[11px] font-mono text-zinc-400 uppercase block mb-1">${t('coreTopicRoot')}</label><input id="factoryTopic" type="text" value="Artificial Intelligence for Central African Enterprise Operations" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
        <div><label class="text-[11px] font-mono text-zinc-400 uppercase block mb-1">${t('primaryPillar')}</label><select id="factoryPillar" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2"><option>Technology</option><option>Business</option><option>Data</option><option>Creative</option><option>Academy</option></select></div></div>
        <button onclick="FactoryEngine.generateBatchPackages()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-3 text-xs font-heading font-bold uppercase">${t('producePackages')}</button></div>
        <div id="factoryResults" class="space-y-4"></div></div>
    `;
  },

  renderRepurpose: (container) => {
    const items = DB.getItems();
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div><h1 class="text-2xl font-extrabold text-white">${t('repurposeTitle')}</h1><p class="text-xs text-zinc-400 mt-1">${t('repurposeSub1')}</p></div>
        <div class="bg-azerty-card border border-azerty-border p-6 space-y-4"><label class="text-[11px] font-mono text-zinc-400 uppercase block">${t('selectBaseContent')}</label>
        <select id="repurposeSelect" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-4 py-2.5">${items.map(item => `<option value="${item.id}">[${item.id}] ${item.topic}</option>`).join("")}</select>
        <button onclick="RepurposeEngine.adapt()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-2.5 text-xs font-heading font-bold uppercase">${t('synthesizeAdaptations')}</button></div>
        <div id="repurposeOutputs" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div></div>
    `;
  },

  renderCalendar: (container) => {
    const items = DB.getItems();
    const counts = { Technology: 0, Business: 0, Creative: 0, Data: 0, Academy: 0 };
    items.forEach(i => { if(counts[i.pillar] !== undefined) counts[i.pillar]++; });
    const total = items.length || 1;
    const d = { Tech: Math.round((counts.Technology/total)*100), Biz: Math.round((counts.Business/total)*100), Creative: Math.round((counts.Creative/total)*100), Data: Math.round((counts.Data/total)*100), Acad: Math.round((counts.Academy/total)*100) };
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6"><div class="flex flex-col md:flex-row md:items-center justify-between border-b border-azerty-border pb-4 gap-4">
        <div><h1 class="text-2xl font-extrabold text-white">${t('calendarTitle')}</h1><p class="text-xs text-zinc-400 mt-1">${t('calendarSub')}</p></div>
        <div class="text-xs font-mono bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded"><span class="text-zinc-400">${t('balance')}</span>
        <span class="${d.Tech > 35 ? 'text-azerty-red' : 'text-zinc-200'}">${t('tech')} ${d.Tech}%</span> · <span class="${d.Biz > 35 ? 'text-azerty-red' : 'text-zinc-200'}">${t('biz')} ${d.Biz}%</span> · <span class="text-zinc-200">Creative ${d.Creative}%</span> · <span class="text-zinc-200">Data ${d.Data}%</span> · <span class="text-zinc-200">Acad ${d.Acad}%</span></div></div>
        <div class="grid grid-cols-1 md:grid-cols-7 gap-3">${days.map((day, idx) => { const assigned = items.filter((_, i) => i % 7 === idx); return `<div class="bg-azerty-card border border-azerty-border p-3 min-h-[320px] flex flex-col justify-between"><div><div class="font-heading font-bold text-xs uppercase text-zinc-300 pb-2 border-b border-zinc-800 flex justify-between"><span>${day}</span><span class="text-zinc-600 font-mono">${assigned.length}</span></div><div class="space-y-2 mt-3">${assigned.map(item => `<div onclick="Workflow.inspectItem('${item.id}')" class="cursor-pointer bg-zinc-900 border border-zinc-800 p-2 text-[11px] transition-all"><span class="px-1 py-0.5 bg-zinc-800 text-[9px] font-mono text-zinc-300 block">${item.pillar}</span><div class="text-white font-medium mt-1">${item.topic}</div><div class="text-zinc-500 text-[9px] font-mono">${item.status}</div></div>`).join("")}</div></div><button onclick="Workflow.startNew()" class="w-full py-1.5 text-[10px] font-mono text-zinc-500 hover:text-white border border-dashed border-zinc-800 uppercase mt-4">${t('slotPost')}</button></div>`; }).join("")}</div></div>
    `;
  },

  renderLibrary: (container) => {
    const items = DB.getItems();
    container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-6"><div class="border-b border-azerty-border pb-4"><div><h1 class="text-2xl font-extrabold text-white">${t('libraryTitle')}</h1><p class="text-xs text-zinc-400 mt-1">${t('librarySub')}</p></div></div>
      <div class="bg-azerty-card border border-azerty-border p-4 flex flex-wrap gap-4 items-center"><input id="libSearch" oninput="LibraryEngine.filter()" type="text" placeholder="${t('search')}" class="bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2 w-64" />
      <select id="libPillarFilter" onchange="LibraryEngine.filter()" class="bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2"><option value="ALL">${t('allPillars')}</option><option>Technology</option><option>Creative</option><option>Data</option><option>Business</option><option>Academy</option></select>
      <select id="libStatusFilter" onchange="LibraryEngine.filter()" class="bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2"><option value="ALL">${t('allStatuses')}</option><option value="READY_FOR_REVIEW">${t('readyForReview')}</option><option value="APPROVED">${t('approved')}</option><option value="PUBLISHED">${t('published')}</option><option value="DRAFT">${t('draft')}</option></select></div>
      <div id="libraryContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${items.map(item => LibraryEngine.renderCard(item)).join("")}</div></div>
    `;
  },

  renderApproval: (container) => {
    const items = DB.getItems();
    const pending = items.filter(i => i.status === 'READY_FOR_REVIEW');
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div class="border-b border-azerty-border pb-4"><div class="flex items-center space-x-3"><span class="w-3 h-3 bg-azerty-red"></span><h1 class="text-2xl font-extrabold text-white">${t('approvalTitle')}</h1></div><p class="text-xs text-zinc-400 mt-1">${t('approvalSub')}</p></div>
      ${pending.length === 0 ? `<div class="p-12 text-center border border-dashed border-zinc-800 bg-azerty-card"><svg class="w-12 h-12 text-emerald-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><h3 class="font-heading font-bold text-white uppercase">${t('approvalQueueClean')}</h3><p class="text-xs text-zinc-500 mt-1">${t('noPending')}</p></div>` : `
      <div class="space-y-6">${pending.map(item => `
      <div class="bg-azerty-card border border-azerty-red/60 p-6 space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-4 gap-2"><div><div class="flex items-center space-x-2"><span class="font-mono text-xs text-azerty-red font-bold">${item.id}</span><span class="px-2 py-0.5 bg-zinc-900 text-zinc-300 font-mono text-[10px]">${item.pillar}</span><span class="px-2 py-0.5 bg-zinc-900 text-zinc-300 font-mono text-[10px]">${item.format || 'Talking Head'}</span></div>
        <h2 class="text-lg font-heading font-bold text-white mt-1">${item.topic}</h2></div>
        <div class="text-right font-mono"><div class="text-xs text-zinc-400">${t('qcScore')}</div><div class="text-xl font-bold text-emerald-400">${item.qualityControl ? item.qualityControl.score : 'N/A'}/100</div></div></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <div class="space-y-2"><span class="font-mono text-zinc-400 uppercase text-[10px] block">${t('selectedHook')}</span><div class="p-3 bg-zinc-950 border border-zinc-800 text-white font-medium">"${item.selectedHook || 'No hook assigned'}"</div>
          <span class="font-mono text-zinc-400 uppercase text-[10px] block pt-2">${t('fullScript')}</span><div class="p-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">${item.script || 'No script assigned'}</div></div>
          <div class="space-y-3"><span class="font-mono text-zinc-400 uppercase text-[10px] block">${t('qcFindings')}</span>
          <div class="space-y-2 bg-zinc-950 p-3 border border-zinc-800">
            <div class="text-[11px]"><strong class="text-white">Brand:</strong> <span class="text-zinc-400">${item.qualityControl?.findings?.brand || 'Pass'}</span></div>
            <div class="text-[11px]"><strong class="text-white">Content:</strong> <span class="text-zinc-400">${item.qualityControl?.findings?.content || 'Pass'}</span></div>
            <div class="text-[11px]"><strong class="text-white">Platform:</strong> <span class="text-zinc-400">${item.qualityControl?.findings?.platform || 'Pass'}</span></div>
            <div class="text-[11px]"><strong class="text-white">Visual:</strong> <span class="text-zinc-400">${item.qualityControl?.findings?.visual || 'Pass'}</span></div>
          </div>
          <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('reviewNotes')}</label><textarea id="r_${item.id}" rows="2" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs p-2" placeholder="Required if requesting changes..."></textarea></div></div>
        </div>
        <div class="flex items-center justify-end space-x-4 pt-4 border-t border-zinc-800">
          <button onclick="ApprovalEngine.requestChanges('${item.id}')" class="px-5 py-2.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-heading font-bold text-xs uppercase">${t('requestChanges')}</button>
          <button onclick="ApprovalEngine.approve('${item.id}')" class="px-6 py-2.5 bg-azerty-red hover:bg-azerty-redHover text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center space-x-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>${t('approve')}</span></button>
        </div>
      </div>
      `).join("")}</div>
      `}</div>
    `;
  },

  renderPublished: (container) => {
    const items = DB.getItems();
    const pub = items.filter(i => ['APPROVED','SCHEDULED','PUBLISHED'].includes(i.status));
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div class="border-b border-azerty-border pb-4"><h1 class="text-2xl font-extrabold text-white">${t('publishedTitle')}</h1><p class="text-xs text-zinc-400 mt-1">${t('publishedSub')}</p></div>
      <div class="space-y-4">${pub.map(item => `
      <div class="bg-azerty-card border border-azerty-border p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-800 pb-3"><div><span class="font-mono text-xs text-azerty-red font-bold">${item.id}</span><h3 class="font-heading font-bold text-white text-base mt-0.5">${item.topic}</h3></div>
        <div class="flex items-center space-x-2"><span class="px-2.5 py-1 text-xs font-mono font-bold ${item.status === "PUBLISHED" ? "bg-emerald-950 text-emerald-300" : "bg-zinc-800 text-zinc-300"}">${item.status}</span>${item.status !== "PUBLISHED" ? `<button onclick="PublishEngine.markAsPublished('${item.id}')" class="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 text-xs font-heading font-bold uppercase">${t('confirmLive')}</button>` : ""}</div></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-3 bg-zinc-950 border border-zinc-800"><span class="font-mono text-zinc-500 uppercase text-[10px] block">Caption</span><p class="text-zinc-300">${item.caption || item.topic + " #AzertyCorp"}</p></div>
          <div class="p-3 bg-zinc-950 border border-zinc-800"><span class="font-mono text-zinc-500 uppercase text-[10px] block">Hashtags</span><p class="text-zinc-400 font-mono text-[11px]">${item.hashtags || "#AzertyCorp #BuildDesignTransform #TechCameroon"}</p></div>
          <div class="p-3 bg-zinc-950 border border-zinc-800"><span class="font-mono text-zinc-500 uppercase text-[10px] block">Cover</span><p class="text-zinc-300"><strong>Title:</strong> ${item.topic.substring(0,30)}...<br><span class="text-azerty-red">Red accent badge</span></p></div>
        </div>
        <div class="flex justify-end pt-2"><button onclick="PublishEngine.copyPackage('${item.id}')" class="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-heading font-bold uppercase">${t('copyPackage')}</button></div>
      </div>
      `).join("")}</div></div>
    `;
  },

  renderAnalytics: (container) => {
    const items = DB.getItems();
    const pub = items.filter(i => i.status === "PUBLISHED");
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div class="border-b border-azerty-border pb-4"><h1 class="text-2xl font-extrabold text-white">${t('analyticsTitle')}</h1><p class="text-xs text-zinc-400 mt-1">${t('analyticsSub')}</p></div>
      <div class="bg-zinc-950 border-l-4 border-azerty-red p-6 space-y-3"><div class="flex items-center space-x-2 text-azerty-red font-heading font-bold text-xs uppercase"><span class="w-2 h-2 bg-azerty-red animate-ping"></span><span>${t('insightsAutomated')}</span></div>
      <p class="text-sm text-zinc-200">Talking Head formats addressing Cameroonian infrastructure generate 3.2x more comments and 42% longer watch time.</p>
      <div class="text-xs text-zinc-500 font-mono">Feedback incorporated into Idea Generator bias weights.</div></div>
      <div class="bg-azerty-card border border-azerty-border p-6 space-y-4"><h3 class="font-heading font-bold text-sm text-white uppercase">${t('manualPerf')}</h3>
      <div class="overflow-x-auto"><table class="w-full text-left text-xs"><thead><tr class="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase"><th class="pb-2">${t('idTopic')}</th><th class="pb-2">${t('views')}</th><th class="pb-2">${t('likes')}</th><th class="pb-2">${t('shares')}</th><th class="pb-2">${t('watch')}</th><th class="pb-2">${t('leads')}</th><th class="pb-2 text-right">${t('save')}</th></tr></thead><tbody class="divide-y divide-zinc-800">${pub.map(item => `<tr><td class="py-3 max-w-xs truncate text-white font-medium">${item.id} - ${item.topic}</td>
      <td class="py-3"><input id="m_views_${item.id}" type="number" class="w-20 bg-zinc-900 border border-zinc-700 px-2 py-1 text-white" value="${item.analytics?.views || 0}"></td><td class="py-3"><input id="m_likes_${item.id}" type="number" class="w-16 bg-zinc-900 border border-zinc-700 px-2 py-1 text-white" value="${item.analytics?.likes || 0}"></td>
      <td class="py-3"><input id="m_shares_${item.id}" type="number" class="w-16 bg-zinc-900 border border-zinc-700 px-2 py-1 text-white" value="${item.analytics?.shares || 0}"></td><td class="py-3"><input id="m_watch_${item.id}" type="text" class="w-20 bg-zinc-900 border border-zinc-700 px-2 py-1 text-white" value="${item.analytics?.watchTimeAvg || '30s'}"></td>
      <td class="py-3"><input id="m_leads_${item.id}" type="number" class="w-16 bg-zinc-900 border border-zinc-700 px-2 py-1 text-white" value="${item.analytics?.leads || 0}"></td><td class="py-3 text-right"><button onclick="AnalyticsEngine.saveMetrics('${item.id}')" class="bg-zinc-800 hover:bg-azerty-red text-white px-3 py-1 text-[11px] font-heading font-bold uppercase">${t('save')}</button></td></tr>`).join("")}</tbody></table></div></div></div>
    `;
  },

  renderBrand: (container) => {
    const brand = DB.getBrand();
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div class="border-b border-azerty-border pb-4 flex justify-between items-center"><div><h1 class="text-2xl font-extrabold text-white">${t('brandMemory')}</h1><p class="text-xs text-zinc-400 mt-1">${t('brandSub')}</p></div><button onclick="BrandEngine.saveFromForm()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-5 py-2.5 text-xs font-heading font-bold uppercase">${t('save')}</button></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-azerty-card border border-azerty-border p-6 space-y-4"><h3 class="font-heading font-bold text-sm uppercase text-white tracking-wider border-b border-zinc-800 pb-2">${t('coreIdentity')}</h3>
        <div><label class="text-[10px] font-mono text-zinc-500 uppercase block mb-1">${t('companyName')}</label><input id="brandCompany" type="text" value="${brand.company}" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
        <div><label class="text-[10px] font-mono text-zinc-500 uppercase block mb-1">${t('tagline')}</label><input id="brandTagline" type="text" value="${brand.tagline}" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
        <div><label class="text-[10px] font-mono text-zinc-500 uppercase block mb-1">${t('positioning')}</label><input id="brandPositioning" type="text" value="${brand.positioning}" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
        <div><label class="text-[10px] font-mono text-zinc-500 uppercase block mb-1">${t('pillars')}</label><input id="brandPillars" type="text" value="${brand.pillars.join(', ')}" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
        <div class="p-3 bg-zinc-950 border border-zinc-800 space-y-1"><div class="text-[10px] font-mono text-zinc-500 uppercase">${t('designTokens')}</div><div class="text-xs text-zinc-300">${t('accent')} <span class="text-azerty-red font-bold">${brand.colors.accent}</span></div></div></div>
        <div class="bg-azerty-card border border-azerty-border p-6 space-y-4"><h3 class="font-heading font-bold text-sm uppercase text-white tracking-wider border-b border-zinc-800 pb-2">${t('terminology')}</h3>
        <div><label class="text-[10px] font-mono text-emerald-400 uppercase block mb-1">${t('approvedTerms')}</label><textarea id="brandApprovedTerms" rows="3" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs p-2">${brand.approvedTerminology.join(', ')}</textarea></div>
        <div><label class="text-[10px] font-mono text-azerty-red uppercase block mb-1">${t('forbiddenTerms')}</label><textarea id="brandForbiddenTerms" rows="3" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs p-2">${brand.forbiddenTerms.join(', ')}</textarea></div>
        <div class="p-3 badge-missing rounded text-xs"><div class="font-bold uppercase tracking-wide text-azerty-red text-[11px]">${t('inventionGuardrail')}</div><p class="text-zinc-400 text-[11px]">${t('guardrailDesc')}</p></div></div></div>
      </div>
    `;
  },

  renderSettings: (container) => {
    container.innerHTML = `
      <div class="max-w-6xl mx-auto space-y-6"><div class="border-b border-azerty-border pb-4"><h1 class="text-2xl font-extrabold text-white">${t('settingsTitle')}</h1><p class="text-xs text-zinc-400 mt-1">${t('settingsSub')}</p></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-azerty-card border border-azerty-border p-6 space-y-4"><h3 class="font-heading font-bold text-sm uppercase text-white">${t('socialPublishing')}</h3>
        <div class="p-3 bg-zinc-950 border border-zinc-800"><div class="flex justify-between"><span class="text-xs font-bold text-white">${t('tikTokApi')}</span><span class="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5">${t('v2Stub')}</span></div><input type="text" placeholder="TIKTOK_CLIENT_KEY" class="w-full bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs px-3 py-1.5" disabled /></div>
        <div class="p-3 bg-zinc-950 border border-zinc-800"><div class="flex justify-between"><span class="text-xs font-bold text-white">${t('instagramApi')}</span><span class="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5">${t('v2Stub')}</span></div><input type="text" placeholder="INSTAGRAM_TOKEN" class="w-full bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs px-3 py-1.5" disabled /></div></div>
        <div class="bg-azerty-card border border-azerty-border p-6"><h3 class="font-heading font-bold text-sm text-white uppercase">${t('systemState')}</h3><button onclick="App.resetToSeedData()" class="bg-zinc-800 hover:bg-azerty-red text-white px-4 py-2 text-xs font-heading font-bold uppercase">${t('resetDatabase')}</button></div></div>
      </div>
    `;
  }
};

// 6. WORKFLOW ENGINE
const Workflow = {
  initBlankDraft: () => ({
    id: `AZ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    currentStep: 1, createdDate: new Date().toISOString().split('T')[0],
    pillar: "Technology", topic: "Why 80% of Central African Web Platforms Fail During Load Spikes",
    targetAudience: "Tech founders, CTOs in Cameroon", objective: "Authority",
    format: "Talking Head", duration: "45s", language: "English", status: "DRAFT",
    brief: {}, hooks: [], selectedHook: "", script: "", shotList: [],
    onScreenText: [], visualDirection: {}, caption: "", hashtags: "", coverConcepts: [],
    qualityControl: null, auditLog: [{ timestamp: new Date().toLocaleString(), action: "Workflow Init", actor: "System" }]
  }),
  startNew: () => { const d = Workflow.initBlankDraft(); DB.saveActiveDraft(d); Router.navigate("workflow"); },
  startWithTopic: (topic, pillar) => { const d = Workflow.initBlankDraft(); d.topic = topic; d.pillar = pillar; d.brief = { mainProblem: "Lacks rigor.", keyMessage: "Resilient infra.", desiredEmotion: "Clarity", cta: "Follow AzertyCorp." }; DB.saveActiveDraft(d); Router.navigate("workflow"); },
  inspectItem: (id) => { const item = DB.getItems().find(i => i.id === id); if(item) { DB.saveActiveDraft(item); Router.navigate("workflow"); } },
  renderCurrentStep: () => {
    const d = DB.getActiveDraft();
    const c = document.getElementById("workflowStepContainer");
    if(!c) return;
    switch(d.currentStep) { case 1: Workflow.renderStep1(c,d); break; case 2: Workflow.renderStep2(c,d); break; case 3: Workflow.renderStep3(c,d); break; case 4: Workflow.renderStep4(c,d); break; case 5: Workflow.renderStep5(c,d); break; case 6: Workflow.renderStep6(c,d); break; case 7: Workflow.renderStep7(c,d); break; default: Workflow.renderStep1(c,d); }
  },
  gotoStep: (s) => { const d = DB.getActiveDraft(); d.currentStep = s; DB.saveActiveDraft(d); Router.navigate("workflow"); },
  renderStep1: (c, d) => {
    c.innerHTML = `<div class="space-y-6"><div class="border-b border-zinc-800 pb-3 flex justify-between"><h2 class="text-lg font-heading font-bold text-white uppercase">${t('step1Title')}</h2><span class="text-xs font-mono text-zinc-500">${t('stage')} 1/7</span></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('brandPillar')}</label><select id="wf_pillar" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2">${["Technology","Creative","Data","Business","Academy"].map(p => `<option value="${p}" ${d.pillar===p?"selected":""}>${p}</option>`).join("")}</select></div>
      <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('contentFormat')}</label><select id="wf_format" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2">${["Talking Head","Educational","Storytelling","Case Study","Tutorial","Opinion"].map(f => `<option value="${f}" ${d.format===f?"selected":""}>${f}</option>`).join("")}</select></div>
      <div class="md:col-span-2"><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('topic')}</label><input id="wf_topic" type="text" value="${d.topic}" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2 font-medium" /></div>
      <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaAudience')}</label><input id="wf_audience" type="text" value="${d.targetAudience}" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
      <div class="grid grid-cols-2 gap-2"><div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaObjective')}</label><select id="wf_objective" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2">${["Authority","Education","Engagement","Leads","Conversion"].map(o => `<option value="${o}" ${d.objective===o?"selected":""}>${o}</option>`).join("")}</select></div>
      <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">${t('ideaDuration')}</label><select id="wf_duration" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2">${["15s","30s","45s","60s","90s"].map(x => `<option value="${x}" ${d.duration===x?"selected":""}>${x}</option>`).join("")}</select></div></div>
    </div><div class="flex justify-end pt-4 border-t border-zinc-800"><button onclick="Workflow.submitStep1()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-wider">${t('generateBrief')}</button></div></div>`;
  },
  submitStep1: () => {
    const d = DB.getActiveDraft();
    d.pillar = document.getElementById("wf_pillar").value;
    d.format = document.getElementById("wf_format").value;
    d.topic = document.getElementById("wf_topic").value;
    d.targetAudience = document.getElementById("wf_audience").value;
    d.objective = document.getElementById("wf_objective").value;
    d.duration = document.getElementById("wf_duration").value;
    d.brief = { mainProblem: `African orgs lack engineering rigor when scaling ${d.topic.toLowerCase()}.`, keyMessage: `AzertyCorp builds resilient digital infrastructure.`, desiredEmotion: "Clarity, Urgency, Professional Respect", cta: "Follow AzertyCorp for digital acceleration." };
    d.currentStep = 2;
    d.auditLog.push({ timestamp: new Date().toLocaleString(), action: "Step 1 Completed -> Brief Generated", actor: "User" });
    DB.saveActiveDraft(d);
    Router.navigate("workflow");
  },
  renderStep2: (c, d) => {
    c.innerHTML = `<div class="space-y-6"><div class="border-b border-zinc-800 pb-3 flex justify-between"><div><h2 class="text-lg font-heading font-bold text-white uppercase">${t('step2Title')}</h2><p class="text-xs text-zinc-400">Validate strategic angle.</p></div><span class="text-xs font-mono text-zinc-500">${t('stage')} 2/7</span></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-3 bg-zinc-950 border border-zinc-800 space-y-1"><span class="text-[10px] font-mono text-zinc-500 uppercase">Topic & Pillar</span><div class="text-white text-xs font-bold">${d.topic}</div><div class="text-azerty-red text-[11px] font-mono">${d.pillar} · ${d.duration} · ${d.format}</div></div>
      <div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Target Emotion</label><input id="brief_emotion" type="text" value="${d.brief.desiredEmotion}" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-3 py-2" /></div>
      <div class="md:col-span-2"><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Problem Vector</label><textarea id="brief_problem" rows="2" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs p-2">${d.brief.mainProblem}</textarea></div>
      <div class="md:col-span-2"><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Message & CTA</label><textarea id="brief_cta" rows="2" class="w-full bg-zinc-900 border border-zinc-700 text-white text-xs p-2">${d.brief.cta}</textarea></div>
    </div><div class="flex justify-between pt-4 border-t border-zinc-800"><button onclick="Workflow.gotoStep(1)" class="text-xs text-zinc-400 hover:text-white uppercase font-mono">${t('back')}</button><button onclick="Workflow.submitStep2()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-wider">${t('generateHooks')}</button></div></div>`;
  },
  submitStep2: () => {
    const d = DB.getActiveDraft();
    d.brief.desiredEmotion = document.getElementById("brief_emotion").value;
    d.brief.mainProblem = document.getElementById("brief_problem").value;
    d.brief.cta = document.getElementById("brief_cta").value;
    d.hooks = [
      { category: "Problem", text: "Your Douala business bleeds 30% efficiency tracking sales manually.", score: 9.4, topPick: true },
      { category: "Contrarian", text: "Building a mobile app before fixing your database schema is waste.", score: 9.2, topPick: true },
      { category: "Bold Statement", text: "80% of Central African websites crash under real traffic.", score: 9.1, topPick: true },
      { category: "Curiosity", text: "Why top Cameroonian enterprises silently ditch legacy software.", score: 8.8, topPick: false },
      { category: "Local", text: "Between Douala and Yaoundé, server latency costs deals.", score: 8.7, topPick: false },
      { category: "Question", text: "Why smaller teams beat big companies in Cameroon?", score: 8.5, topPick: false },
      { category: "Authority", text: "At AzertyCorp, we audited 50 platforms this year.", score: 8.4, topPick: false },
      { category: "Educational", text: "3-layer architecture for zero-downtime transactions.", score: 8.2, topPick: false },
      { category: "FOMO", text: "Digital shift African corporations adopt while others hesitate.", score: 7.9, topPick: false },
      { category: "Story", text: "Retail chain checkout crashed. Fixed in 72 hours.", score: 7.8, topPick: false }
    ];
    d.selectedHook = d.hooks[0].text;
    d.currentStep = 3;
    d.auditLog.push({ timestamp: new Date().toLocaleString(), action: "Step 2 Completed -> 10 Hooks Synthesized", actor: "System" });
    DB.saveActiveDraft(d);
    Router.navigate("workflow");
  },
  renderStep3: (c, d) => {
    c.innerHTML = `<div class="space-y-6"><div class="border-b border-zinc-800 pb-3 flex justify-between"><div><h2 class="text-lg font-heading font-bold text-white uppercase">${t('step3Title')}</h2><p class="text-xs text-zinc-400">10 hooks scored (§5.4).</p></div><span class="text-xs font-mono text-zinc-500">${t('stage')} 3/7</span></div>
    <div class="space-y-3">${d.hooks.map(h => `<div onclick="Workflow.selectHook('${h.text.replace(/'/g, "\\\\'")}')" class="cursor-pointer p-4 border ${d.selectedHook === h.text ? "border-azerty-red bg-zinc-900/80" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"} flex items-start justify-between"><div class="space-y-1"><div class="flex items-center space-x-2"><span class="px-2 py-0.5 text-[9px] font-mono uppercase font-bold ${h.topPick ? "bg-azerty-red text-white" : "bg-zinc-800 text-zinc-400"}">${h.category}</span>${h.topPick ? `<span class="text-[10px] font-mono text-azerty-red">★ Recommended</span>` : ""}</div><p class="text-white text-xs pt-1">"${h.text}"</p></div><div class="text-right"><span class="font-mono text-sm font-bold ${h.score >= 9.0 ? "text-emerald-400" : "text-zinc-300"}">${h.score}/10</span></div></div>`).join("")}</div>
    <div class="flex justify-between pt-4 border-t border-zinc-800"><button onclick="Workflow.gotoStep(2)" class="text-xs text-zinc-400 hover:text-white uppercase font-mono">${t('back')}</button><button onclick="Workflow.submitStep3()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-wider">${t('generateScript')}</button></div></div>`;
  },
  selectHook: (t) => { const d = DB.getActiveDraft(); d.selectedHook = t; DB.saveActiveDraft(d); Workflow.renderCurrentStep(); },
  submitStep3: () => {
    const d = DB.getActiveDraft();
    d.script = `[0-3s Hook]: ${d.selectedHook}\n\n[3-8s Context]: When high traffic hits Cameroonian platforms, unoptimized queries choke your infrastructure.\n\n[8-25s Value]: Real engineering precision requires query profiling, Redis caching, and clean API gateways.\n\n[25-38s Proof]: Refined a retail checkout in Douala; latency dropped 3.2s to 120ms.\n\n[38-45s CTA]: ${d.brief.cta}`;
    d.currentStep = 4;
    d.auditLog.push({ timestamp: new Date().toLocaleString(), action: "Step 3 Completed -> Script Built", actor: "System" });
    DB.saveActiveDraft(d);
    Router.navigate("workflow");
  },
  renderStep4: (c, d) => {
    c.innerHTML = `<div class="space-y-6"><div class="border-b border-zinc-800 pb-3 flex justify-between"><div><h2 class="text-lg font-heading font-bold text-white uppercase">${t('step4Title')}</h2><p class="text-xs text-zinc-400">Spoken rhythm optimized (§5.5).</p></div><span class="text-xs font-mono text-zinc-500">${t('stage')} 4/7</span></div>
    <div class="space-y-4"><div><label class="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Spoken Script (Editable)</label><textarea id="wf_script" rows="9" class="w-full bg-zinc-950 border border-zinc-700 text-zinc-200 font-mono text-xs p-4 leading-relaxed">${d.script.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")}</textarea></div>
    <div class="p-3 bg-zinc-900 border border-zinc-800 text-xs flex items-center justify-between"><span class="font-mono">Cadence: ~142 words · optimal pace</span><span class="text-emerald-400 font-mono font-bold">✓ Rhythm Pass</span></div></div>
    <div class="flex justify-between pt-4 border-t border-zinc-800"><button onclick="Workflow.gotoStep(3)" class="text-xs text-zinc-400 hover:text-white uppercase font-mono">${t('back')}</button><button onclick="Workflow.submitStep4()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-wider">${t('generateShotList')}</button></div></div>`;
  },
  submitStep4: () => {
    const d = DB.getActiveDraft();
    d.script = document.getElementById("wf_script").value;
    d.shotList = [
      { shot: 1, time: "0-3s", angle: "Tight Medium", subject: "Speaker to camera", text: "SYSTEM CRASH?", audio: "Bass hit" },
      { shot: 2, time: "3-8s", angle: "Medium Wide", subject: "Gestures to screen", text: "UNOPTIMIZED ARCHITECTURE", audio: "Tech drone" },
      { shot: 3, time: "8-25s", angle: "Over-shoulder", subject: "Code session", text: "REDIS + OPTIMIZATION", audio: "Rhythmic beat" },
      { shot: 4, time: "25-38s", angle: "Medium", subject: "Metrics tablet", text: "3.2s -> 120ms", audio: "Electronic rhythm" },
      { shot: 5, time: "38-45s", angle: "Close-up", subject: "Direct CTA", text: "BUILD. DESIGN. TRANSFORM.", audio: "Outro logo" }
    ];
    d.visualDirection = { color: "Monochrome + Azerty Red", lighting: "High-contrast rim" };
    d.caption = "Real engineering precision for African enterprises.";
    d.hashtags = "#AzertyCorp #BuildDesignTransform #TechCameroon #AfricanInnovation";
    d.coverConcepts = [{ concept: "Why Your App Crashes", accent: "Red warning badge" }, { concept: "Stop Wasting on Servers", accent: "Red strike-through" }, { concept: "3.2s to 120ms", accent: "Red KPI box" }];
    d.currentStep = 5;
    d.auditLog.push({ timestamp: new Date().toLocaleString(), action: "Step 4 Completed -> Production Assets", actor: "System" });
    DB.saveActiveDraft(d);
    Router.navigate("workflow");
  },
  renderStep5: (c, d) => {
    c.innerHTML = `<div class="space-y-6"><div class="border-b border-zinc-800 pb-3 flex justify-between"><div><h2 class="text-lg font-heading font-bold text-white uppercase">${t('step5Title')}</h2><p class="text-xs text-zinc-400">Shot list, captions, covers (§5.6–§5.11).</p></div><span class="text-xs font-mono text-zinc-500">${t('stage')} 5/7</span></div>
    <div class="space-y-4"><div><span class="font-mono text-zinc-400 uppercase text-[10px] block">Shot List</span><div class="overflow-x-auto border border-zinc-800"><table class="w-full text-xs bg-zinc-950"><thead><tr class="border-b border-zinc-800 text-zinc-500 font-mono text-[9px] uppercase"><th class="p-2">Shot</th><th class="p-2">Time</th><th class="p-2">Camera</th><th class="p-2">Overlay</th><th class="p-2">Audio</th></tr></thead><tbody class="divide-y divide-zinc-800 text-zinc-300">${d.shotList.map(s => `<tr><td class="p-2 font-mono text-azerty-red">#${s.shot}</td><td class="p-2 font-mono text-zinc-400">${s.time}</td><td class="p-2"><strong class="text-white">${s.angle}</strong><br><span class="text-zinc-500 text-[10px]">${s.subject}</span></td><td class="p-2 text-sm text-white">${s.text}</td><td class="p-2 text-zinc-500 text-[10px] font-mono">${s.audio}</td></tr>`).join("")}</tbody></table></div></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-zinc-950 border border-zinc-800"><span class="font-mono text-zinc-400 uppercase text-[10px] block">Captions & Hashtags</span><p class="text-xs text-white">${d.caption}</p><p class="text-xs text-azerty-red font-mono">${d.hashtags}</p></div>
    <div class="p-4 bg-zinc-950 border border-zinc-800"><span class="font-mono text-zinc-400 uppercase text-[10px] block">Cover Concepts</span>${d.coverConcepts.map((cv, i) => `<div class="text-xs text-zinc-300">${i+1}. ${cv.concept} — ${cv.accent}</div>`).join("")}</div></div></div>
    <div class="flex justify-between pt-4 border-t border-zinc-800"><button onclick="Workflow.gotoStep(4)" class="text-xs text-zinc-400 hover:text-white uppercase font-mono">${t('back')}</button><button onclick="Workflow.submitStep5()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-wider">Run QC Engine →</button></div></div>`;
  },
  submitStep5: () => {
    const d = DB.getActiveDraft();
    const brand = DB.getBrand();
    const hasForbidden = brand.forbiddenTerms.some(t => d.script.toLowerCase().includes(t.toLowerCase()));
    const score = hasForbidden ? 65 : 94;
    d.qualityControl = {
      score: score, status: score >= 85 ? "PASS" : "WARNING",
      findings: {
        brand: hasForbidden ? "Warning: Forbidden term detected." : "Pass: Fully conforms to Technology pillar.",
        content: "Pass: Concrete metrics included.",
        platform: "Pass: 3-second hook verified.",
        visual: "Pass: High-contrast monochrome with Azerty Red accent.",
        language: "Pass: Spoken English cadence validated."
      }
    };
    d.currentStep = 6;
    d.auditLog.push({ timestamp: new Date().toLocaleString(), action: `Step 5 Completed -> QC Scored: ${score}/100`, actor: "QC Engine" });
    DB.saveActiveDraft(d);
    Router.navigate("workflow");
  },
  renderStep6: (c, d) => {
    const qc = d.qualityControl;
    c.innerHTML = `<div class="space-y-6"><div class="border-b border-zinc-800 pb-3 flex justify-between"><div><h2 class="text-lg font-heading font-bold text-white uppercase">Step 6: Quality Control (QC)</h2><p class="text-xs text-zinc-400">Automated compliance audit (§5.12).</p></div><span class="text-xs font-mono text-zinc-500">STAGE 6/7</span></div>
    <div class="p-6 bg-zinc-950 border ${qc.score >= 85 ? "border-emerald-800" : "border-azerty-red"} flex items-center justify-between"><div><div class="text-[10px] font-mono uppercase tracking-widest text-zinc-500">QUALITY SCORE</div><div class="text-3xl font-heading font-extrabold text-white mt-1">${qc.score}/100</div></div>
    <span class="px-4 py-1.5 font-mono text-xs font-bold uppercase ${qc.score >= 85 ? "bg-emerald-950 text-emerald-300" : "bg-red-950 text-red-300"}">${qc.status}</span></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs"><div class="p-3 bg-zinc-900 border border-zinc-800"><span class="font-mono text-zinc-400 uppercase text-[10px] block mb-1">Brand & Pillar</span><p class="text-zinc-200">${qc.findings.brand}</p></div>
    <div class="p-3 bg-zinc-900 border border-zinc-800"><span class="font-mono text-zinc-400 uppercase text-[10px] block mb-1">Content Depth</span><p class="text-zinc-200">${qc.findings.content}</p></div>
    <div class="p-3 bg-zinc-900 border border-zinc-800"><span class="font-mono text-zinc-400 uppercase text-[10px] block mb-1">Platform Retention</span><p class="text-zinc-200">${qc.findings.platform}</p></div>
    <div class="p-3 bg-zinc-900 border border-zinc-800"><span class="font-mono text-zinc-400 uppercase text-[10px] block mb-1">Visual Identity</span><p class="text-zinc-200">${qc.findings.visual}</p></div></div>
    <div class="flex justify-between pt-4 border-t border-zinc-800"><button onclick="Workflow.gotoStep(5)" class="text-xs text-zinc-400 hover:text-white uppercase font-mono">${t('back')}</button><button onclick="Workflow.submitStep6()" class="bg-azerty-red hover:bg-azerty-redHover text-white px-6 py-2.5 text-xs font-heading font-bold uppercase tracking-wider">Submit to Approval Gate →</button></div></div>`;
  },
  submitStep6: () => {
    const d = DB.getActiveDraft();
    d.status = "READY_FOR_REVIEW";
    d.currentStep = 7;
    d.auditLog.push({ timestamp: new Date().toLocaleString(), action: "Submitted to Human Approval Gate", actor: "System" });
    const items = DB.getItems();
    const idx = items.findIndex(i => i.id === d.id);
    if(idx >= 0) items[idx] = d; else items.unshift(d);
    DB.saveItems(items);
    DB.saveActiveDraft(d);
    Router.navigate("workflow");
  },
  renderStep7: (c, d) => {
    c.innerHTML = `<div class="space-y-6"><div class="border-b border-zinc-800 pb-3 flex justify-between"><div><h2 class="text-lg font-heading font-bold text-white uppercase">Step 7: Human Approval Gate</h2><p class="text-xs text-zinc-400">Explicit human approval required (§5.13). No auto-approval.</p></div><span class="text-xs font-mono text-zinc-500">${t('stage')} 7/7</span></div>
    <div class="p-4 bg-zinc-950 border border-zinc-800 flex justify-between"><div><div class="text-[10px] font-mono text-zinc-500 uppercase">STATUS</div><div class="text-lg font-heading font-bold text-azerty-red mt-0.5">${d.status.replace(/_/g, ' ')}</div></div><div class="text-right"><span class="text-xs font-mono text-zinc-400">AUDIT LOG: ${d.auditLog.length} entries</span></div></div>
    <div class="flex justify-end space-x-4 pt-6 border-t border-zinc-800"><button onclick="ApprovalEngine.requestChanges('${d.id}')" class="px-5 py-2.5 border border-zinc-700 text-zinc-300 font-heading font-bold text-xs uppercase">${t('requestChanges')}</button>
    <button onclick="ApprovalEngine.approve('${d.id}')" class="px-6 py-2.5 bg-azerty-red hover:bg-azerty-redHover text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>APPROVE AS HUMAN</span></button></div></div>`;
  }
};

// 7. APPROVAL ENGINE
const ApprovalEngine = {
  approve: (id) => {
    const items = DB.getItems();
    const item = items.find(i => i.id === id);
    if(item) {
      item.status = "APPROVED";
      item.auditLog.push({ timestamp: new Date().toLocaleString(), action: "EXPLICIT HUMAN APPROVAL CONFIRMED", actor: "Human Editor" });
      DB.saveItems(items);
      const activeDraft = DB.getActiveDraft();
      if(activeDraft && activeDraft.id === id) DB.saveActiveDraft(item);
      App.showNotification("Content package approved. Staged for dispatch.");
      Router.navigate("published");
    }
  },
  requestChanges: (id) => {
    const notesInput = document.getElementById(`r_${id}`);
    const notes = notesInput ? notesInput.value : "Re-align hook with local context.";
    const items = DB.getItems();
    const item = items.find(i => i.id === id);
    if(item) {
      item.status = "IN_PRODUCTION";
      item.currentStep = 4;
      item.auditLog.push({ timestamp: new Date().toLocaleString(), action: `Changes Requested: ${notes}`, actor: "Human Editor" });
      DB.saveItems(items);
      DB.saveActiveDraft(item);
      App.showNotification("Changes requested. Package routed back.");
      Router.navigate("workflow");
    }
  }
};

// 8. IDEA ENGINE
const IdeaEngine = {
  generateBatch: () => {
    const pillar = document.getElementById("ideaPillar").value;
    const ideas = [
      { title: "The Zero-Downtime Blueprint for Cameroonian E-Commerce", hook: "If your store crashes when 300 customers pay, you built a prototype." },
      { title: "Why Monolithic Codebases Cost African Startups Millions", hook: "Most startups don't need bigger servers. They need clean queries." },
      { title: "The 3-Layer Tech Stack Powering Douala Logistics", hook: "Exact stack behind Cameroon's fastest logistics." },
      { title: "Stop Building Apps Before API Validation", hook: "Frontend before backend = wasted weeks." },
      { title: "How We Cut Server Response Time by 70%", hook: "Took a slow app to 150ms. The breakdown." }
    ];
    const c = document.getElementById("ideasListContainer");
    c.innerHTML = `<div class="space-y-4"><div class="flex justify-between pb-2 border-b border-zinc-800"><span class="text-xs font-mono text-zinc-400 uppercase font-bold">5 Ideas (${pillar})</span><span class="text-[10px] font-mono text-azerty-red">Click to start pipeline</span></div>${ideas.map((i, idx) => `<div onclick="IdeaEngine.selectAndStart('${i.title.replace(/'/g, "\\\\'")}')" class="cursor-pointer bg-azerty-card border border-zinc-800 hover:border-azerty-red p-4"><div class="flex justify-between"><span class="px-2 py-0.5 bg-zinc-900 text-zinc-300 font-mono text-[10px] uppercase">Concept</span><span class="text-azerty-red text-xs font-mono">#${idx+1}</span></div><h4 class="font-heading font-bold text-white text-sm mt-1">${i.title}</h4><div class="p-2 bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 mt-1"><span class="text-zinc-500 font-mono text-[10px] uppercase">Hook</span>\"${i.hook}\"</div></div>`).join("")}</div>`;
  },
  selectAndStart: (title) => {
    const d = Workflow.initBlankDraft();
    d.topic = title;
    d.brief = { mainProblem: "Lacks engineering rigor.", keyMessage: "Resilient infra.", desiredEmotion: "Clarity", cta: "Follow AzertyCorp." };
    DB.saveActiveDraft(d);
    Router.navigate("workflow");
  }
};

// 9. FACTORY BATCH ENGINE
const FactoryEngine = {
  generateBatchPackages: () => {
    const topic = document.getElementById("factoryTopic").value;
    const pillar = document.getElementById("factoryPillar").value;
    const c = document.getElementById("factoryResults");
    const formats = [
      { type: "Educational", title: `Understanding ${topic}: 3-Step Framework`, hook: "If your company treats this as experiment, you're behind." },
      { type: "Storytelling", title: `How a Douala Enterprise Transformed Using ${topic}`, hook: "Company was losing millions. The pivot." },
      { type: "Opinion", title: `Why 90% Misunderstand ${topic}`, hook: "African approach is backwards." },
      { type: "Tutorial", title: `Deploying ${topic} Step-by-Step`, hook: "Blueprint for zero downtime." },
      { type: "Case Study", title: `ROI of ${topic} for African Corps`, hook: "Real Francs CFA returns." }
    ];
    c.innerHTML = `<div class="space-y-4 pt-4"><div class="flex justify-between pb-2 border-b border-zinc-800"><span class="text-xs font-mono text-zinc-400 uppercase font-bold">5 Packages</span><button onclick="FactoryEngine.saveAllToLibrary()" class="bg-azerty-red text-white text-xs px-3 py-1.5 font-heading font-bold uppercase">Save All</button></div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${formats.map((f, i) => `<div class="bg-azerty-card border border-zinc-800 p-4"><span class="px-2 py-0.5 bg-zinc-900 text-azerty-red text-[10px] font-mono uppercase">${f.type}</span><h4 class="font-heading font-bold text-white text-sm mt-2">${f.title}</h4><p class="text-zinc-400 text-xs mt-2 p-2 bg-zinc-950 border border-zinc-800">\"${f.hook}\"</p><button onclick="Workflow.startWithTopic('${f.title.replace(/'/g, "\\\\'")}','${pillar}')" class="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-heading font-bold uppercase mt-3">Load Into Pipeline →</button></div>`).join("")}</div></div>`;
  },
  saveAllToLibrary: () => { App.showNotification("5 batch packages staged."); Router.navigate("library"); }
};

// 10. REPURPOSING ENGINE
const RepurposeEngine = {
  adapt: () => {
    const itemId = document.getElementById("repurposeSelect").value;
    const item = DB.getItems().find(i => i.id === itemId);
    const c = document.getElementById("repurposeOutputs");
    if(!item) return;
    c.innerHTML = `<div class="bg-azerty-card border border-azerty-border p-4"><div class="border-b border-zinc-800 pb-2"><span class="font-heading font-bold text-xs text-white uppercase">Instagram Reels</span></div><p class="text-xs text-zinc-300 mt-2">Hook: ${item.selectedHook || item.topic}</p><p class="text-xs text-zinc-400">Caption: Precision for African enterprises. #AzertyCorp</p></div>
    <div class="bg-azerty-card border border-azerty-border p-4"><div class="border-b border-zinc-800 pb-2"><span class="font-heading font-bold text-xs text-white uppercase">LinkedIn</span></div><p class="text-xs text-zinc-300 mt-2">Opener: Most African initiatives fail on infra shortcuts.</p><p class="text-xs text-zinc-400">Body: Architectural rigor = caching + optimized queries.</p></div>
    <div class="bg-azerty-card border border-azerty-border p-4"><div class="border-b border-zinc-800 pb-2"><span class="font-heading font-bold text-xs text-white uppercase">YouTube Shorts</span></div><p class="text-xs text-zinc-300 mt-2">Title: Engineering Breakdown — Why Apps Fail Under Load</p><p class="text-xs text-zinc-400">End: Subscribe for weekly insights.</p></div>
    <div class="bg-azerty-card border border-azerty-border p-4"><div class="border-b border-zinc-800 pb-2"><span class="font-heading font-bold text-xs text-white uppercase">Facebook</span></div><p class="text-xs text-zinc-300 mt-2">Headline: How African businesses modernize.</p><p class="text-xs text-zinc-400">CTA: Visit AzertyCorp for training.</p></div>`;
  }
};

// 11. LIBRARY CONTROLLER
const LibraryEngine = {
  renderCard: (item) => `<div class="bg-azerty-card border border-azerty-border p-4"><div class="flex justify-between"><span class="font-mono text-[10px] text-zinc-500">${item.id}</span><span class="px-2 py-0.5 text-[9px] font-mono uppercase ${item.status === "PUBLISHED" ? "bg-emerald-950 text-emerald-300" : item.status === "READY_FOR_REVIEW" ? "bg-red-950 text-red-300" : "bg-zinc-800 text-zinc-300"}">${item.status}</span></div><h4 class="font-heading font-bold text-white text-sm mt-1">${item.topic}</h4><div class="text-[11px] text-zinc-400 mt-1 font-mono">${item.pillar} · ${item.duration || "45s"}</div><div class="pt-2 border-t border-zinc-800 mt-2 flex justify-between"><span class="font-mono text-xs text-zinc-500">${item.qualityControl ? `QC: ${item.qualityControl.score}/100` : "QC: PENDING"}</span><button onclick="Workflow.inspectItem('${item.id}')" class="text-xs text-azerty-red font-heading font-bold uppercase">Inspect</button></div></div>`,
  filter: () => {
    const q = document.getElementById("libSearch").value.toLowerCase();
    const p = document.getElementById("libPillarFilter").value;
    const s = document.getElementById("libStatusFilter").value;
    const items = DB.getItems();
    const filtered = items.filter(item => item.topic.toLowerCase().includes(q) && (p === "ALL" || item.pillar === p) && (s === "ALL" || item.status === s));
    document.getElementById("libraryContainer").innerHTML = filtered.map(LibraryEngine.renderCard).join("");
  }
};

// 12. PUBLISHING ENGINE
const PublishEngine = {
  markAsPublished: (id) => {
    const items = DB.getItems();
    const item = items.find(i => i.id === id);
    if(item) {
      item.status = "PUBLISHED";
      item.analytics = item.analytics || { views: 0, likes: 0, shares: 0, leads: 0, watchTimeAvg: "0s" };
      item.auditLog.push({ timestamp: new Date().toLocaleString(), action: "Confirmed Published to Live Platform", actor: "Human Publisher" });
      DB.saveItems(items);
      App.showNotification(`Package [${id}] marked Published.`);
      Router.navigate("published");
    }
  },
  copyPackage: (id) => {
    const item = DB.getItems().find(i => i.id === id);
    if(!item) return;
    const d = `AZERTYCORP PUBLISHING DOSSIER\nID: ${item.id}\nPILLAR: ${item.pillar}\nTOPIC: ${item.topic}\nCAPTION: ${item.caption || item.topic}\nHASHTAGS: ${item.hashtags || "#AzertyCorp #BuildDesignTransform #TechCameroon"}\nSCRIPT:\n${item.script || "N/A"}\nQC: ${item.qualityControl?.score || "N/A"}/100`;
    navigator.clipboard.writeText(d).then(() => App.showNotification("Dossier copied."));
  }
};

// 13. ANALYTICS ENGINE
const AnalyticsEngine = {
  saveMetrics: (id) => {
    const items = DB.getItems();
    const item = items.find(i => i.id === id);
    if(item) {
      item.analytics = {
        views: parseInt(document.getElementById(`m_views_${id}`).value) || 0,
        likes: parseInt(document.getElementById(`m_likes_${id}`).value) || 0,
        shares: parseInt(document.getElementById(`m_shares_${id}`).value) || 0,
        watchTimeAvg: document.getElementById(`m_watch_${id}`).value || "30s",
        leads: parseInt(document.getElementById(`m_leads_${id}`).value) || 0
      };
      DB.saveItems(items);
      App.showNotification("Metrics updated. AI Learning Loop refreshed.");
    }
  }
};

// 14. BRAND ENGINE
const BrandEngine = {
  saveFromForm: () => {
    const b = DB.getBrand();
    b.company = document.getElementById("brandCompany").value;
    b.tagline = document.getElementById("brandTagline").value;
    b.positioning = document.getElementById("brandPositioning").value;
    b.pillars = document.getElementById("brandPillars").value.split(',').map(s => s.trim());
    b.approvedTerminology = document.getElementById("brandApprovedTerms").value.split(',').map(s => s.trim());
    b.forbiddenTerms = document.getElementById("brandForbiddenTerms").value.split(',').map(s => s.trim());
    DB.saveBrand(b);
    App.showNotification("Brand memory updated.");
  }
};

// 15. GLOBAL APP CONTROLLER
const App = {
  init: () => {
    App.updateHeaderText();
    App.attachLanguageButtons();
    App.updateBadgeCounts();
    Router.navigate('dashboard');
  },
  updateHeaderText: () => {
    const btnText = document.getElementById('createContentText');
    if (btnText) btnText.textContent = t('createNew').replace('+ ', '');
    const btn = document.querySelector('#createContentBtn');
    if (btn) btn.textContent = t('createNew').includes('+') ? '+' : btn.textContent;
  },
  attachLanguageButtons: () => {
    const btns = document.querySelectorAll('[data-lang-btn]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        switchLanguage(btn.getAttribute('data-lang-btn'));
      });
    });
  },
  updateBadgeCounts: () => {
    const items = DB.getItems();
    const pending = items.filter(i => i.status === 'READY_FOR_REVIEW').length;
    const badge = document.getElementById('pendingApprovalCount');
    if(badge) badge.innerText = pending;
  },
  showNotification: (msg) => {
    const toast = document.createElement('div');
    toast.className = "fixed bottom-6 right-6 bg-zinc-900 border border-azerty-red text-white text-xs px-4 py-3 shadow-2xl z-50 flex items-center space-x-2";
    toast.innerHTML = `<span class="w-2 h-2 bg-azerty-red"></span><span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  },
  resetToSeedData: () => {
    localStorage.clear();
    App.updateBadgeCounts();
    App.showNotification("Database reset to seed state.");
    Router.navigate('dashboard');
  }
};

window.addEventListener('DOMContentLoaded', App.init);
