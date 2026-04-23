import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, ShieldCheck } from 'lucide-react';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// --- Reusable Toggle Component ---
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
      checked ? 'bg-[#2E90D1]' : 'bg-slate-200'
    }`}
  >
    <motion.span
      animate={{ x: checked ? 24 : 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="inline-block h-4 w-4 rounded-full bg-white"
    />
  </button>
);

const   EmailSettings: React.FC = () => {
  const [useSSL, setUseSSL] = useState(true);
  const [notifications, setNotifications] = useState({
    newOrder: true,
    vendorReg: true,
    orderStatus: true,
    weeklySummary: true
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full space-y-8 font-medium tracking-tight text-slate-800"
    >
      {/* Top Section: SMTP and Notifications */}
      <motion.div variants={itemVariants} className="bg-white rounded-[32px] border-2 border-slate-100 p-8 lg:p-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-12">
          
          {/* Left: SMTP Configuration */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-[#2E90D1]">
              <Mail size={24} strokeWidth={2.5} />
              <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">SMTP Configuration</h2>
            </div>

            <div className="space-y-6">
              {[
                { label: "SMTP Host", value: "smtpexample@gmail.com" },
                { label: "SMTP Port", value: "1234" },
                { label: "SMTP Username", value: "noreply@example.com" }
              ].map((field) => (
                <div key={field.label} className="group">
                  <label className="block text-sm font-bold text-slate-900 mb-2  tracking-wider opacity-80 group-focus-within:text-[#2E90D1]">
                    {field.label}
                  </label>
                  <input 
                    type="text" 
                    defaultValue={field.value}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all"
                  />
                </div>
              ))}

              <div className="group">
                <label className="block text-sm font-bold text-slate-900 mb-2  tracking-wider opacity-80 group-focus-within:text-[#2E90D1]">
                  SMTP Password
                </label>
                <input 
                  type="password" 
                  placeholder="****************"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setUseSSL(!useSSL)}>
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${useSSL ? 'bg-[#2E90D1] border-[#2E90D1]' : 'border-slate-200'}`}>
                  {useSSL && <ShieldCheck size={16} className="text-white" />}
                </div>
                <span className="text-sm font-bold text-slate-700">Use SSL/TLS for secure connection</span>
              </div>
              
              <button className="bg-[#2E90D1] hover:bg-[#257ab3] text-white px-8 py-3.5 rounded-2xl font-extrabold transition-all active:scale-95 shadow-lg shadow-blue-50">
                Save Changes
              </button>
            </div>
          </section>

          {/* Right: Email Notification */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-[#2E90D1]">
              <Mail size={24} strokeWidth={2.5} />
              <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">Email Notification</h2>
            </div>

            <div className="space-y-8">
              {[
                { id: 'newOrder', title: "New Order Notification", desc: "Send email notification to admin when new orders are place" },
                { id: 'vendorReg', title: "Vendor Registration Notification", desc: "Notify the admin when a new vendor registers." },
                { id: 'orderStatus', title: "Order Status Update Notification", desc: "Send email notifications to customers on order status changes" },
                { id: 'weeklySummary', title: "Weekly Summary Report", desc: "Send a weekly summary report to admin." }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-6">
                  <div>
                    <p className="font-extrabold text-slate-900 leading-tight">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-[280px]">{item.desc}</p>
                  </div>
                  <Toggle 
                    checked={notifications[item.id as keyof typeof notifications]} 
                    onChange={() => toggleNotification(item.id as keyof typeof notifications)} 
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>

      {/* Bottom Section: Email Templates */}
      <motion.div variants={itemVariants} className="bg-white rounded-[32px] border-2 border-slate-100 p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-2 border-slate-50 pb-6">
          <div className="flex items-center gap-3 text-[#2E90D1]">
            <Mail size={24} strokeWidth={2.5} />
            <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">Email Templates</h2>
          </div>
          <button className="bg-[#2E90D1] hover:bg-[#257ab3] text-white px-6 py-3 rounded-2xl font-extrabold text-sm transition-all shadow-lg shadow-blue-50">
            Manage Templates
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {["Order Confirmation", "Vendor Registration", "Weekly Summary"].map((template) => (
            <button key={template} className="bg-[#E3EFFB] hover:bg-slate-100 border-2 border-slate-100 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 transition-all">
              {template}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default   EmailSettings;