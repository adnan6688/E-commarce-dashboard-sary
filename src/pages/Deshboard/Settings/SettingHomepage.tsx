import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; // Added 'type' keyword
import {
  Home,
  ChevronDown
} from 'lucide-react';

// --- Animation Variants (Fixed for TypeScript) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" // Now correctly recognized by TS
    }
  },
};

// --- Sub-Components ---

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${checked ? 'bg-[#2E90D1]' : 'bg-slate-200'
      }`}
  >
    <motion.span
      animate={{ x: checked ? 24 : 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="inline-block h-4 w-4 rounded-full bg-white"
    />
  </button>
);

const SettingHomepage: React.FC = () => {
  const [orderTracking, setOrderTracking] = useState(true);
  const [autoComplete, setAutoComplete] = useState(false);
  const [vendorApproval, setVendorApproval] = useState(true);
  const [vendorCustomization, setVendorCustomization] = useState(true);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#F4F9FD] min-h-screen font-medium tracking-tight text-slate-800"
    >
      <motion.main
        variants={itemVariants}
        className="flex-1 bg-white rounded-[32px] p-8 lg:p-12 border-2 border-slate-100"
      >

        {/* Platform Settings Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="flex items-center gap-3 mb-8 text-[#2E90D1]">
            <Home size={24} strokeWidth={2.5} />
            <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">Platform Settings</h2>
          </div>

          <div className="space-y-8 ml-9">
            {/* Localization Group */}
            <div>
              <h3 className="text-sm sm:text-[17px] font-bold text-slate-800  tracking-wider mb-3">Localization:</h3>

              <div className='ml-10'>
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-4 mb-6">
                  <label className="text-sm sm:text-[14px] font-bold text-slate-900">Currency :</label>
                  <div className="relative max-w-sm group">
                    <select className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#2E90D1]" size={18} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm sm:text-[14px] font-bold text-slate-900">Timezone :</label>
                  <div className="relative max-w-sm group">
                    <select className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all">
                      <option>Eastern Time (US & Canada) ( GMT-4 )</option>
                      <option>Pacific Time (US & Canada) ( GMT-8 )</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#2E90D1]" size={18} />
                  </div>
                </div>
              </div>

            </div>

            {/* Order Settings Group */}
            <div>
              <h3 className="text-sm sm:text-[17px] font-bold text-slate-900  tracking-wider mb-6">Order Settings:</h3>
              <div className="space-y-4 ml-10">
                <div className="flex items-center gap-6 max-w-md justify-between">
                  <div>
                    <p className="font-extrabold text-[15px] text-slate-900 leading-tight">Enable Order Tracking</p>
                    <p className="text-xs sm:text-[15px] text-slate-400 mt-1">Allow customers to track their orders</p>
                  </div>
                  <Toggle checked={orderTracking} onChange={() => setOrderTracking(!orderTracking)} />
                </div>
                <div className="flex items-center gap-6 max-w-md justify-between">
                  <div>
                    <p className="font-extrabold text-slate-900 leading-tight">Auto-Complete Orders</p>
                    <p className="text-xs text-slate-400 mt-1">Automatically mark orders completed after payment is confirmed</p>
                  </div>
                  <Toggle checked={autoComplete} onChange={() => setAutoComplete(!autoComplete)} />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Grid for Bottom Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-12">

          {/* Commission Settings */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8 text-[#2E90D1]">
              <Home size={24} strokeWidth={2.5} />
              <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">Commission Settings</h2>
            </div>
            <div className="space-y-8 ml-9">
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">Commission Settings</p>
                <p className="text-xs text-slate-400 mb-3">Platform commission rate for each sale</p>
                <input type="text" defaultValue="15%" className="w-full max-w-xs bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-sm outline-none focus:border-[#2E90D1] focus:bg-white transition-all" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">Minimum Payout Amount</p>
                <p className="text-xs text-slate-400 mb-3">Minimum amount sellers must reach before payout</p>
                <input type="text" defaultValue="$100" className="w-full max-w-xs bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-sm outline-none focus:border-[#2E90D1] focus:bg-white transition-all" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">Payout Frequency</p>
                <p className="text-xs text-slate-400 mb-3">How often payouts are processed</p>
                <div className="relative max-w-xs group">
                  <select className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-sm outline-none focus:border-[#2E90D1] focus:bg-white transition-all">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#2E90D1]" size={18} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Vendor Settings */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8 text-[#2E90D1]">
              <Home size={24} strokeWidth={2.5} />
              <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">Vendor Settings</h2>
            </div>
            <div className="space-y-8 ml-9">
              <div className="flex items-center justify-between gap-6 max-w-md">
                <div>
                  <p className="font-extrabold text-slate-900 leading-tight">Vendor Registration Approval</p>
                  <p className="text-xs text-slate-400 mt-1">Require admin approval for new vendor accounts</p>
                </div>
                <Toggle checked={vendorApproval} onChange={() => setVendorApproval(!vendorApproval)} />
              </div>
              <div className="flex items-center justify-between gap-6 max-w-md">
                <div>
                  <p className="font-extrabold text-slate-900 leading-tight">Allow Vendor Customization</p>
                  <p className="text-xs text-slate-400 mt-1">Allow vendors to customize their storefronts.</p>
                </div>
                <Toggle checked={vendorCustomization} onChange={() => setVendorCustomization(!vendorCustomization)} />
              </div>
            </div>
          </motion.section>
        </div>

        {/* Action Button */}
        <motion.div variants={itemVariants} className="mt-16 ml-9">
          <button className="bg-[#2E90D1] text-white px-12 py-4 rounded-2xl font-extrabold text-lg transition-all active:scale-95 shadow-xl shadow-blue-100 hover:bg-[#257ab3]">
            Save Changes
          </button>
        </motion.div>

      </motion.main>
    </motion.div>
  );
};

export default SettingHomepage;