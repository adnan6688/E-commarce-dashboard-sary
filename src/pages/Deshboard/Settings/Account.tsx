import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';

const   Account: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-white rounded-[32px] border-2 border-slate-100 p-8 lg:p-12"
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-12">
        
        {/* Left Column: Profile Information */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-[#2E90D1]">
            <User size={24} strokeWidth={2.5} />
            <h2 className="text-xl font-bold text-[#135B91] tracking-tight">Profile Information</h2>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-bold text-slate-900 mb-2  tracking-wider opacity-80 group-focus-within:text-[#2E90D1] transition-colors">
                Your Name
              </label>
              <input 
                type="text" 
                defaultValue="Alice Cooper"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-slate-900 mb-2  tracking-wider opacity-80 group-focus-within:text-[#2E90D1] transition-colors">
                Email Address
              </label>
              <input 
                type="email" 
                defaultValue="alicecooper123@gmail.com"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
        </section>

        {/* Right Column: Change Password */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-[#2E90D1]">
            <Lock size={24} strokeWidth={2.5} />
            <h2 className="text-xl font-bold text-[#135B91] tracking-tight">Change Password</h2>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-bold text-slate-900 mb-2  tracking-wider opacity-80 group-focus-within:text-[#2E90D1] transition-colors">
                Current Password
              </label>
              <input 
                type="password" 
                placeholder="****************"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-slate-900 mb-2  tracking-wider opacity-80 group-focus-within:text-[#2E90D1] transition-colors">
                New Password
              </label>
              <input 
                type="password" 
                placeholder="****************"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-slate-900 mb-2  tracking-wider opacity-80 group-focus-within:text-[#2E90D1] transition-colors">
                Confirm Password
              </label>
              <input 
                type="password" 
                placeholder="****************"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold outline-none focus:border-[#2E90D1] focus:bg-white transition-all"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Action Footer */}
      <div className="mt-12 pt-8 border-t-2 border-slate-50">
        <button className="bg-[#2E90D1] hover:bg-[#257ab3] text-white px-10 py-4 rounded-2xl font-extrabold text-lg transition-all active:scale-95 shadow-lg shadow-blue-100">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default   Account;