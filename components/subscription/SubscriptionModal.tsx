'use client';

import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Star, 
  CheckCircle, 
  Zap, 
  Shield,
  TrendingUp,
  Lock, 
  ArrowLeft 
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
  onSubscribe: (planId: string) => void;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  interval: string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
  description: string;
}

export default function SubscriptionModal({ 
  isOpen, 
  onClose, 
  currentPlan,
  onSubscribe 
}: SubscriptionModalProps) {
  const [view, setView] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free Trader',
      price: 0,
      yearlyPrice: 0,
      interval: 'forever',
      description: 'Perfect for beginners exploring trading',
      features: [
        'Basic stock data',
        'Simple portfolio tracking',
        '5 watchlists',
        'Basic price alerts',
        'Community access'
      ]
    },
    {
      id: 'basic',
      name: 'Basic Trader',
      price: 29,
      yearlyPrice: 290,
      interval: 'month',
      description: 'Essential tools for active traders',
      features: [
        'Real-time market data',
        'AI-powered insights',
        'Advanced charting',
        'Unlimited watchlists',
        'Email & SMS alerts',
        'Mobile app access',
        'Technical indicators'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Trader',
      price: 99,
      yearlyPrice: 990,
      interval: 'month',
      description: 'Advanced analytics for serious traders',
      popular: true,
      features: [
        'Everything in Basic',
        'Advanced AI predictions',
        'Options flow scanner',
        'Pattern recognition',
        'Custom alerts',
        'API access',
        'Priority support',
        'Risk management tools',
        'Backtesting platform'
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setView('payment');
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      onSubscribe(selectedPlan);
      onClose();
    }
  };

  const getPrice = (plan: Plan) => {
    if (plan.price === 0) return 'Free';
    const price = billingInterval === 'yearly' ? plan.yearlyPrice : plan.price;
    const interval = billingInterval === 'yearly' ? 'year' : plan.interval;
    return `$${price}/${interval}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {view === 'payment' && (
              <button
                onClick={() => setView('plans')}
                className="text-white hover:bg-white/10 p-2 rounded"
                title="Go back to plans"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {view === 'plans' ? 'Choose Your Plan' : 'Complete Your Subscription'}
              </h2>
              <p className="text-gray-300">
                {view === 'plans' 
                  ? 'Upgrade your trading experience with AlphaAI' 
                  : 'Secure payment powered by Stripe'
                }
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {view === 'plans' && (
            <>
              {/* Billing Toggle */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-white/10 rounded-lg p-1 flex">
                  <button
                    onClick={() => setBillingInterval('monthly')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      billingInterval === 'monthly' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingInterval('yearly')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      billingInterval === 'yearly' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Yearly
                    <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const isCurrentPlan = currentPlan === plan.id;
                  
                  return (
                    <div
                      key={plan.id}
                      className={`relative bg-white/5 rounded-xl border-2 p-6 transition-all hover:scale-105 ${
                        plan.popular 
                          ? 'border-yellow-500 bg-yellow-500/10' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium">
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center mb-4">
                          {plan.popular ? (
                            <Zap className="w-12 h-12 text-yellow-400" />
                          ) : plan.id === 'free' ? (
                            <Star className="w-12 h-12 text-blue-400" />
                          ) : (
                            <TrendingUp className="w-12 h-12 text-green-400" />
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                        
                        <div className="mb-4">
                          <div className="text-4xl font-bold text-white">
                            {getPrice(plan)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleSelectPlan(plan.id)}
                        disabled={isCurrentPlan}
                        className={`w-full ${
                          isCurrentPlan 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : plan.popular 
                            ? 'bg-yellow-600 hover:bg-yellow-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white font-semibold py-3 px-4 rounded transition-colors`}
                      >
                        {isCurrentPlan 
                          ? 'Current Plan' 
                          : plan.id === 'free' 
                          ? 'Get Started' 
                          : 'Upgrade Now'
                        }
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {view === 'payment' && selectedPlan && (
            <div className="max-w-md mx-auto">
              <div className="bg-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold mb-4">Order Summary</h3>
                {(() => {
                  const plan = plans.find(p => p.id === selectedPlan);
                  if (!plan) return null;
                  
                  return (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{plan.name}</span>
                        <span className="text-white font-semibold">{getPrice(plan)}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  <div>
                    <h4 className="text-green-400 font-semibold">Secure Payment</h4>
                    <p className="text-green-200 text-sm">SSL encrypted with Stripe</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded transition-colors"
              >
                <Lock className="w-5 h-5 mr-2 inline" />
                Complete Subscription
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                Cancel anytime. No questions asked.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
