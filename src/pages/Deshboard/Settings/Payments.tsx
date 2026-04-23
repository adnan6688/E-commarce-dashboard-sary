import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { CreditCard, Landmark } from 'lucide-react';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// --- Custom Toggle Component ---
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
      checked ? 'bg-[#2E90D1]' : 'bg-slate-300'
    }`}
  >
    <motion.span
      animate={{ x: checked ? 24 : 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
    />
  </button>
);

const   Payments: React.FC = () => {
  const [methods, setMethods] = useState({
    bankTransfer: true,
    payPal: false,
    stripe: false,
    manualPayout: true,
  });

  const toggleMethod = (key: keyof typeof methods) => {
    setMethods(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const paymentProviders = [
    { id: 'bankTransfer', name: 'Bank Transfer', icon: <Landmark size={20} className="text-slate-700" /> },
    { id: 'payPal', name: 'PayPal', icon: <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="w-6" /> },
    { id: 'stripe', name: 'Stripe', icon: <span className="text-[#635BFF] font-black italic text-xs">stripe</span> },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-white rounded-[32px] border-2 border-slate-100 p-8 lg:p-12 "
    >
      {/* Header */}
      <div className="flex items-center gap-3 text-[#2E90D1] mb-10">
        <CreditCard size={24} strokeWidth={2.5} />
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Payment Methods</h2>
      </div>

      <div className="max-w-2xl space-y-1">
        {/* Payment Provider List */}
        {paymentProviders.map((provider) => (
          <div 
            key={provider.id} 
            className="flex items-center justify-between py-5 border-b border-slate-200 last:border-0"
          >
            <div className="flex items-center gap-4 min-w-[180px]">
              <div className="w-8 flex justify-center">
                {provider.icon}
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight">
                {provider.name}
              </span>
            </div>

            <div className="flex items-center gap-12">
              <Toggle 
                checked={methods[provider.id as keyof typeof methods]} 
                onChange={() => toggleMethod(provider.id as keyof typeof methods)} 
              />
              <button className="bg-[#2E90D1] hover:bg-[#257ab3] text-white px-8 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-md shadow-blue-50">
                Configure
              </button>
            </div>
          </div>
        ))}

        {/* Manual Payout Section */}
        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-between gap-8">
            <div className="max-w-sm">
              <p className="font-extrabold text-slate-900 leading-tight">Manual Payout Settings</p>
              <p className="text-xs font-medium text-slate-400 mt-1.5 leading-relaxed">
                Allow vendor to manually request payout, which admins can review and approve
              </p>
            </div>
            <Toggle 
              checked={methods.manualPayout} 
              onChange={() => toggleMethod('manualPayout')} 
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-12">
        <button className="bg-[#2E90D1] hover:bg-[#257ab3] text-white px-10 py-4 rounded-2xl font-extrabold text-lg transition-all active:scale-95 shadow-xl shadow-blue-100/50">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default   Payments;