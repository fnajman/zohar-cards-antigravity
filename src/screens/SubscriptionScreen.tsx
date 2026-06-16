import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";

export function SubscriptionScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useStore();

  const plans = [
    {
      id: "free",
      name: t('subscription.free.name'),
      price: t('subscription.free.price'),
      period: t('subscription.free.period'),
      description: t('subscription.free.desc'),
      features: [
        { name: t('subscription.features.draw'), included: true },
        { name: t('subscription.features.letter'), included: true },
        { name: t('subscription.features.practices'), included: false },
        { name: t('subscription.features.ai_none'), included: false, highlight: false }
      ],
      cta: t('subscription.free.cta'),
      highlight: false,
    },
    {
      id: "light",
      name: t('subscription.light.name'),
      price: t('subscription.light.price'),
      period: t('subscription.light.period'),
      description: t('subscription.light.desc'),
      features: [
        { name: t('subscription.features.draw'), included: true },
        { name: t('subscription.features.letter'), included: true },
        { name: t('subscription.features.practices'), included: true },
        { name: t('subscription.features.ai_25'), included: true, highlight: true }
      ],
      cta: t('subscription.light.cta'),
      highlight: false,
    },
    {
      id: "unlimited",
      name: t('subscription.unlimited.name'),
      price: t('subscription.unlimited.price'),
      period: t('subscription.unlimited.period'),
      description: t('subscription.unlimited.desc'),
      features: [
        { name: t('subscription.features.draw'), included: true },
        { name: t('subscription.features.letter'), included: true },
        { name: t('subscription.features.practices'), included: true },
        { name: t('subscription.features.ai_unlimited'), included: true, highlight: true }
      ],
      cta: t('subscription.unlimited.cta'),
      highlight: true,
    },
    {
      id: "onetime",
      name: t('subscription.onetime.name'),
      price: t('subscription.onetime.price'),
      period: t('subscription.onetime.period'),
      description: t('subscription.onetime.desc'),
      features: [
        { name: t('subscription.features.draw'), included: true },
        { name: t('subscription.features.letter'), included: true },
        { name: t('subscription.features.practices'), included: true },
        { name: t('subscription.features.ai_50'), included: true, highlight: true }
      ],
      cta: t('subscription.onetime.cta'),
      highlight: false,
    }
  ];

  const handleSubscribe = (planId: string) => {
    alert(t('subscription.not_available_yet', { planId }));
  };

  return (
    <div className="h-full bg-night flex flex-col relative">
      <header className="flex-none px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-night/95 backdrop-blur-sm z-20 border-b border-parchment/5">
        <button onClick={() => navigate("/settings")} className="w-10 h-10 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="text-sm tracking-[0.2em] uppercase text-parchment">{t('subscription.title')}</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-hebrew text-parchment mb-3">{t('subscription.header')}</h2>
          <p className="text-sm text-ash leading-relaxed">
            {t('subscription.subheader')}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {plans.map((plan, idx) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl overflow-hidden border ${plan.highlight ? 'border-parchment bg-parchment/5' : 'border-parchment/10 bg-night-light'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-parchment/40 via-parchment to-parchment/40"></div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-medium ${plan.highlight ? 'text-parchment' : 'text-parchment/90'}`}>{plan.name}</h3>
                  {plan.highlight && (
                    <span className="text-[10px] uppercase tracking-wider bg-parchment text-night px-2 py-1 rounded-full font-bold">
                      {t('subscription.recommended')}
                    </span>
                  )}
                </div>
                
                <div className="mb-1">
                  <span className="text-2xl font-bold text-parchment">{plan.price}</span>
                  <span className="text-sm text-ash">{plan.period}</span>
                </div>
                <p className="text-xs text-ash/80 mb-6 uppercase tracking-wider">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-parchment/80' : 'text-ash/40'}`}>
                      {feature.included ? (
                        <svg className={`w-5 h-5 flex-shrink-0 ${feature.highlight ? 'text-parchment' : 'text-parchment/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 flex-shrink-0 text-ash/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={feature.highlight ? 'font-medium text-parchment' : ''}>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={user?.sub_tier === plan.id || (plan.id === 'free' && (!user?.sub_tier || user?.sub_tier === 'free'))}
                  className={`w-full py-3.5 rounded-xl text-sm uppercase tracking-wider font-medium transition-colors ${
                    user?.sub_tier === plan.id || (plan.id === 'free' && (!user?.sub_tier || user?.sub_tier === 'free'))
                      ? 'bg-parchment/10 text-ash cursor-not-allowed'
                      : plan.highlight 
                        ? 'bg-parchment text-night hover:bg-parchment/90' 
                        : 'border border-parchment/20 text-parchment hover:bg-parchment/10'
                  }`}
                >
                  {user?.sub_tier === plan.id || (plan.id === 'free' && (!user?.sub_tier || user?.sub_tier === 'free')) ? t('subscription.current_plan') : plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="h-10" />
      </main>
    </div>
  );
}
