import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCatalog from '../components/ServiceCatalog';
import EmailCaptureInline from '../components/EmailCaptureInline';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Bell, Shield, BarChart3, FileText, ArrowRight, Unlock, CheckCircle, Sparkles, Target, ExternalLink, Scale, Plus, Heart, School, BookOpen, AlertTriangle, Bot, Signal } from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';
import { PRIVACY_PORTAL_URL, PRIVACY_PORTAL_OPT_OUT_URL } from '../config/portal';
import { childServiceCatalog, getSchoolAssignedServices } from '../data/childServiceCatalog';
import { getServiceLogoUrlWithBrandColor, hasServiceLogo } from '../utils/serviceLogos';

const SUGGESTED_SERVICE_IDS = ['youtube', 'instagram', 'whatsapp', 'roblox', 'khan-academy', 'duolingo'] as const;

const SCHOOL_SERVICE_IDS = [
  'google-classroom', 'microsoft-teams-edu', 'canvas-lms', 'schoology',
  'seesaw', 'zoom', 'classdojo', 'kahoot', 'quizlet', 'ixl',
  'remind', 'nearpod', 'prodigy', 'code-org'
] as const;

const AI_SERVICE_IDS = [
  'chatgpt', 'google-gemini', 'microsoft-copilot', 'character-ai',
  'snapchat-my-ai', 'meta-ai', 'grammarly', 'perplexity-ai', 'khanmigo'
] as const;

const TELECOM_SERVICE_IDS = [
  'verizon', 'att', 'tmobile', 'cricket-wireless', 'boost-mobile', 'mint-mobile'
] as const;

const ServiceCatalogPage: React.FC = () => {
  const { getFamilyServices, addServiceToFamily, removeServiceFromFamily } = useFamily();
  const [servicesCount, setServicesCount] = useState(0);
  const [addingId, setAddingId] = useState<string | null>(null);
  
  const updateCount = () => setServicesCount(getFamilyServices().length);

  useEffect(() => {
    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, [getFamilyServices]);

  const progressPercent = Math.min((servicesCount / 5) * 100, 100);
  const isReadyForAnalysis = servicesCount >= 3;
  const familyServiceIds = getFamilyServices();
  const suggestedServices = childServiceCatalog.filter(s => SUGGESTED_SERVICE_IDS.includes(s.id as typeof SUGGESTED_SERVICE_IDS[number]));
  const schoolServices = getSchoolAssignedServices().filter(s => SCHOOL_SERVICE_IDS.includes(s.id as typeof SCHOOL_SERVICE_IDS[number]));
  const aiServices = childServiceCatalog.filter(s => AI_SERVICE_IDS.includes(s.id as typeof AI_SERVICE_IDS[number]));
  const telecomServices = childServiceCatalog.filter(s => TELECOM_SERVICE_IDS.includes(s.id as typeof TELECOM_SERVICE_IDS[number]));

  const handleSuggestedAddRemove = async (serviceId: string) => {
    if (addingId) {
      return;
    }
    setAddingId(serviceId);
    try {
      if (familyServiceIds.includes(serviceId)) {
        await removeServiceFromFamily(serviceId);
      } else {
        await addServiceToFamily(serviceId);
      }
      updateCount();
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator - Fixed at top when scrolling */}
        {servicesCount > 0 && (
          <div className={`mb-6 p-4 rounded-xl border-2 transition-all ${
            isReadyForAnalysis 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 dark:border-blue-700'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isReadyForAnalysis ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {isReadyForAnalysis ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Target className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                      isReadyForAnalysis ? 'text-green-900 dark:text-green-100' : 'text-blue-900 dark:text-blue-100'
                    }`}>
                      {servicesCount} Service{servicesCount !== 1 ? 's' : ''} Added
                    </span>
                    {isReadyForAnalysis && (
                      <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles size={12} />
                        Ready for Analysis!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <ProgressBar
                      value={progressPercent}
                      size="sm"
                      variant={isReadyForAnalysis ? 'low' : 'primary'}
                      aria-label="Services added progress"
                      className="w-32 h-2"
                    />
                    <span className={`text-sm ${
                      isReadyForAnalysis ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'
                    }`}>
                      {isReadyForAnalysis
                        ? "You're all set — view your analysis below!"
                        : servicesCount === 0
                          ? 'Add 3 services to unlock your privacy analysis'
                          : servicesCount === 1
                            ? 'Great start — add 2 more to unlock your analysis'
                            : 'Almost there — add 1 more to unlock your analysis'}
                    </span>
                  </div>
                </div>
              </div>
              {isReadyForAnalysis && (
                <Link
                  to="/digital-footprint"
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>View Analysis</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="font-medium text-gray-700 dark:text-gray-300">Your journey:</span>{' '}
            <span className="text-green-600 dark:text-green-400 font-medium">Step 1 – Add services here</span>
            {' → '}
            <Link to="/digital-footprint" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Step 2 – Digital Footprint Analysis</Link>
          </p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Service Catalog
                </h1>
                {servicesCount === 0 && (
                  <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Unlock size={12} />
                    Get Started
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {servicesCount === 0
                  ? "We'll guide you: pick the apps your family uses from the list below (or start with the suggestions above). Add at least 3 to see your Digital Footprint Analysis."
                  : 'Manage your family\'s apps and services. Add more to improve your privacy analysis accuracy.'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to="/safety-alerts"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span>Safety Alerts</span>
              </Link>
              <Link
                to="/digital-footprint"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Footprint</span>
              </Link>
            </div>
          </div>

          {/* Guided: How it works – only when few or no services */}
          {servicesCount < 3 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Unlock className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  How it works — 3 simple steps
                </h3>
                <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li><strong>Choose services</strong> your family uses (below or from the full list).</li>
                  <li><strong>Tap “Add to my services”</strong> on each one — no account needed.</li>
                  <li><strong>Add at least 3</strong> to unlock your Digital Footprint Analysis and personalized tips.</li>
                </ol>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Privacy snapshot</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">See your family’s exposure at a glance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Risk per app</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Understand which apps need more care</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Personalized tips</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Actionable steps to improve privacy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Guided: Suggested to start – friendly quick-add strip */}
          {suggestedServices.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
              Start with these — popular with families
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Tap <strong>Add</strong> on any app your family uses. You can add more from the full list below.
            </p>
            <div className="flex flex-wrap gap-3">
              {suggestedServices.map((service) => {
                const isAdded = familyServiceIds.includes(service.id);
                const isAdding = addingId === service.id;
                return (
                  <div
                    key={service.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      isAdded
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600'
                    }`}
                  >
                    {hasServiceLogo(service.id) ? (
                      <img
                        src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                        alt=""
                        className="w-10 h-10 rounded-lg object-contain bg-gray-100 dark:bg-gray-700 p-1"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                        {service.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-medium text-gray-900 dark:text-white min-w-0 truncate max-w-[120px] sm:max-w-none">
                      {service.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSuggestedAddRemove(service.id)}
                      disabled={isAdding}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                        isAdded
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800/50'
                      }`}
                    >
                      {isAdding ? (
                        '…'
                      ) : isAdded ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          )}

          {/* Privacy Exposure Index Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Privacy Exposure Index
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  Each service includes a Privacy Exposure Index (0-100) that helps you understand the privacy risks. 
                  Higher scores indicate services that require more parental supervision and privacy controls.
                </p>
                <div className="flex items-center space-x-4 text-xs text-blue-700 dark:text-blue-300">
                  <span>• Very High (70-100): Requires close supervision</span>
                  <span>• High (50-69): Needs active monitoring</span>
                  <span>• Medium (30-49): Moderate concerns</span>
                  <span>• Low (0-29): Generally safe</span>
                </div>
              </div>
            </div>
          </div>

          {/* MODPA / Maryland – Exercise your rights (portal CTA) */}
          <div className="mb-6 rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center">
                <Scale className="h-6 w-6 text-teal-600 dark:text-teal-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-1">
                  Maryland (MODPA) – Exercise your privacy rights
                </h3>
                <p className="text-sm text-teal-800 dark:text-teal-200 mb-3">
                  Under the Maryland Online Data Privacy Act (MODPA), Maryland residents can submit requests for access, correction, deletion, portability, and opt-out of sale/targeted advertising. Use the EduSoluce Privacy Portal to submit requests to your school or organization.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={PRIVACY_PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Privacy Portal – Data rights
                  </a>
                  <a
                    href={PRIVACY_PORTAL_OPT_OUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-teal-900/50 text-teal-700 dark:text-teal-200 border-2 border-teal-600 dark:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-800/50 font-medium rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Opt-out of sale / targeted ads
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link
              to="/digital-footprint"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                View Digital Footprint Analysis
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See your family's privacy exposure across all services and get personalized recommendations
              </p>
            </Link>

            <Link
              to="/safety-alerts"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Check Safety Alerts
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get real-time notifications about privacy and safety updates
              </p>
            </Link>

            <Link
              to="/privacy-assessment"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Take Privacy Assessment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Evaluate your family's privacy practices and get personalized recommendations
              </p>
            </Link>
          </div>
        </div>

        {/* Full catalog with guided browsing */}
        <div className="mt-8">
          {/* ── School & EdTech Section ───────────────────────────────────── */}
          <div className="mb-8 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/20 overflow-hidden">
            <div className="flex items-start gap-4 p-5 border-b border-amber-200 dark:border-amber-800">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
                <School className="h-6 w-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                    School &amp; EdTech Apps
                  </h2>
                  <span className="bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle size={11} />
                    School-assigned
                  </span>
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  These apps are commonly assigned by schools or districts — your child may already be using them <strong>whether or not you chose them</strong>. Add them to include their data exposure in your family's Digital Footprint Analysis.
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Under FERPA you have rights over your child's education records, including digital ones held by EdTech vendors.
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-3">
                {schoolServices.map((service) => {
                  const isAdded = familyServiceIds.includes(service.id);
                  const isAdding = addingId === service.id;
                  return (
                    <div
                      key={service.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        isAdded
                          ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-600'
                      }`}
                    >
                      {hasServiceLogo(service.id) ? (
                        <img
                          src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                          alt=""
                          className="w-10 h-10 rounded-lg object-contain bg-gray-100 dark:bg-gray-700 p-1"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
                          <BookOpen size={18} className="text-amber-600 dark:text-amber-300" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900 dark:text-white block truncate max-w-[140px]">
                          {service.name}
                        </span>
                        {service.vendor && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[140px] block">
                            {service.vendor}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSuggestedAddRemove(service.id)}
                        disabled={isAdding}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                          isAdded
                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800/50'
                        }`}
                      >
                        {isAdding ? '…' : isAdded ? (
                          <><CheckCircle className="h-4 w-4" />Added</>
                        ) : (
                          <><Plus className="h-4 w-4" />Add</>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-4 flex items-center gap-1.5">
                <BookOpen size={13} />
                Scroll down to the full catalog to see all EdTech tools, including Lexia, DreamBox, Edpuzzle, Newsela, Flip, Padlet, and more.
              </p>
            </div>
          </div>

          {/* ── AI Apps Section ───────────────────────────────────────────── */}
          <div className="mb-8 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-900/20 overflow-hidden">
            <div className="flex items-start gap-4 p-5 border-b border-purple-200 dark:border-purple-800">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                <Bot className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                    AI Apps
                  </h2>
                  <span className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle size={11} />
                    High risk
                  </span>
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  AI tools are now widely used by children for homework, socialising, and entertainment. They carry unique risks: <strong>conversations are stored</strong>, may be used to train AI models, and most are <strong>not covered by school privacy laws (FERPA/COPPA)</strong>.
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                  Add any AI apps your child uses to see how they affect the Digital Footprint Analysis.
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-3">
                {aiServices.map((service) => {
                  const isAdded = familyServiceIds.includes(service.id);
                  const isAdding = addingId === service.id;
                  const isVeryHigh = service.riskLevel === 'very-high';
                  return (
                    <div
                      key={service.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        isAdded
                          ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-400 dark:border-purple-600'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600'
                      }`}
                    >
                      {hasServiceLogo(service.id) ? (
                        <img
                          src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                          alt=""
                          className="w-10 h-10 rounded-lg object-contain bg-gray-100 dark:bg-gray-700 p-1"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                          <Bot size={18} className="text-purple-600 dark:text-purple-300" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900 dark:text-white block truncate max-w-[140px]">
                          {service.name}
                        </span>
                        {isVeryHigh && (
                          <span className="text-xs text-red-600 dark:text-red-400 font-medium">Very high risk</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSuggestedAddRemove(service.id)}
                        disabled={isAdding}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                          isAdded
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800/50'
                        }`}
                      >
                        {isAdding ? '…' : isAdded ? (
                          <><CheckCircle className="h-4 w-4" />Added</>
                        ) : (
                          <><Plus className="h-4 w-4" />Add</>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-4 flex items-center gap-1.5">
                <Bot size={13} />
                Adding AI apps enables dedicated AI risk analysis in your Digital Footprint report.
              </p>
            </div>
          </div>

          {/* ── Mobile Carriers (Telecom) Section ─────────────────────────── */}
          <div className="mb-8 rounded-xl border-2 border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/30 overflow-hidden">
            <div className="flex items-start gap-4 p-5 border-b border-blue-200 dark:border-blue-900">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Signal className="h-6 w-6 text-blue-700 dark:text-blue-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    Mobile Carriers
                  </h2>
                  <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle size={11} />
                    Deepest reach
                  </span>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your mobile carrier knows <strong>more about your child than any app</strong> — real-time location 24/7, every call and text made, device identifiers, and all data traffic. All major US carriers have been documented selling this data to data brokers.
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Add your carrier to see how it contributes to the deepest layer of your family's data footprint.
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-3">
                {telecomServices.map((service) => {
                  const isAdded = familyServiceIds.includes(service.id);
                  const isAdding = addingId === service.id;
                  return (
                    <div
                      key={service.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        isAdded
                          ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-400 dark:border-blue-600'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                      }`}
                    >
                      {hasServiceLogo(service.id) ? (
                        <img
                          src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                          alt=""
                          className="w-10 h-10 rounded-lg object-contain bg-gray-100 dark:bg-gray-700 p-1"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Signal size={18} className="text-blue-700 dark:text-blue-300" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900 dark:text-white block truncate max-w-[140px]">
                          {service.name}
                        </span>
                        {service.vendor && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 block truncate max-w-[140px]">
                            {service.vendor}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSuggestedAddRemove(service.id)}
                        disabled={isAdding}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                          isAdded
                            ? 'bg-blue-700 text-white hover:bg-blue-800'
                            : 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800/50'
                        }`}
                      >
                        {isAdding ? '…' : isAdded ? (
                          <><CheckCircle className="h-4 w-4" />Added</>
                        ) : (
                          <><Plus className="h-4 w-4" />Add</>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-4 flex items-center gap-1.5">
                <Signal size={13} />
                Carrier data includes your child's real-time location, call/text metadata, and device identifiers — the DFA will show the full data broker chain for your carrier.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Browse all services
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Tap any card to see details and add it to your list. Use categories to narrow down.
          </p>
          <ServiceCatalog guidedMode />
        </div>
        
        {/* Email Capture for Service Updates */}
        <div className="mt-8 max-w-4xl mx-auto">
          <EmailCaptureInline
            title="Get Service Privacy Updates"
            description="Stay informed about privacy policy changes, data breaches, and security updates for services your family uses."
            purpose="updates"
            compact={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalogPage;

