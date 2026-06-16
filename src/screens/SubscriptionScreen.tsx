import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€",
    period: "",
    description: "Pour découvrir l'univers de Zohar",
    features: [
      { name: "Tirage de 2 cartes", included: true },
      { name: "Lettre du jour", included: true },
      { name: "Méditation, Téhima, Respiration", included: false },
      { name: "Dialogue Expert IA", included: false, highlight: false }
    ],
    cta: "Offre actuelle",
    highlight: false,
  },
  {
    id: "light",
    name: "Light",
    price: "4,99€",
    period: "/mois",
    description: "Sans engagement",
    features: [
      { name: "Tirage de 2 cartes", included: true },
      { name: "Lettre du jour", included: true },
      { name: "Méditation, Téhima, Respiration", included: true },
      { name: "Dialogue Expert IA (25 fois/mois)", included: true, highlight: true }
    ],
    cta: "Choisir Light",
    highlight: false,
  },
  {
    id: "unlimited",
    name: "Illimité",
    price: "9,99€",
    period: "/mois",
    description: "Sans engagement",
    features: [
      { name: "Tirage de 2 cartes", included: true },
      { name: "Lettre du jour", included: true },
      { name: "Méditation, Téhima, Respiration", included: true },
      { name: "Dialogue Expert IA (Illimité)", included: true, highlight: true }
    ],
    cta: "Choisir Illimité",
    highlight: true,
  },
  {
    id: "onetime",
    name: "Ponctuel",
    price: "14,99€",
    period: " une fois",
    description: "Crédits prépayés",
    features: [
      { name: "Tirage de 2 cartes", included: true },
      { name: "Lettre du jour", included: true },
      { name: "Méditation, Téhima, Respiration", included: true },
      { name: "Dialogue Expert IA (50 fois)", included: true, highlight: true }
    ],
    cta: "Acheter un Pass",
    highlight: false,
  }
];

export function SubscriptionScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useStore();

  const handleSubscribe = (planId: string) => {
    // Fake subscription action
    alert(`L'intégration du paiement pour l'offre ${planId} sera implémentée prochainement.`);
  };

  return (
    <div className="min-h-full bg-night flex flex-col relative">
      <header className="flex-none px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-night/95 backdrop-blur-sm z-20 border-b border-parchment/5">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="text-sm tracking-[0.2em] uppercase text-parchment">Abonnements</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-hebrew text-parchment mb-3">Déployez votre potentiel</h2>
          <p className="text-sm text-ash leading-relaxed">
            Profitez de toutes les fonctionnalités de Zohar Cards et approfondissez vos tirages avec notre IA experte.
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
                      Recommandé
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
                  {user?.sub_tier === plan.id || (plan.id === 'free' && (!user?.sub_tier || user?.sub_tier === 'free')) ? 'Actuel' : plan.cta}
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
