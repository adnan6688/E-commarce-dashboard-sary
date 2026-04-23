import React, { useState } from 'react';
import { motion } from 'framer-motion';
import  type {Variants} from 'framer-motion'
import { ShoppingCart, Store, Grid } from 'lucide-react';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } 
  },
};

// --- Custom Toggle Component ---
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
      className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
    />
  </button>
);

// --- Notification Row Sub-component ---
const NotificationRow = ({ 
  title, 
  desc, 
  checked, 
  onToggle 
}: { 
  title: string; 
  desc: string; 
  checked: boolean; 
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between gap-6 py-2">
    <div className="max-w-[280px]">
      <p className="font-extrabold text-slate-900 leading-tight">{title}</p>
      <p className="text-[11px] font-medium text-slate-400 mt-1 leading-relaxed">
        {desc}
      </p>
    </div>
    <Toggle checked={checked} onChange={onToggle} />
  </div>
);

const   Notification: React.FC = () => {
  const [settings, setSettings] = useState({
    newOrder: true,
    orderStatus: true,
    newVendor: true,
    productApproval: true,
    vendorPayout: true,
    emailNotif: true,
    pushNotif: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-white rounded-[32px] border-2 border-slate-100 p-8 lg:p-12 "
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-12">
        
        {/* --- Order Notification Section --- */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-[#2E90D1]">
            <ShoppingCart size={22} strokeWidth={2.5} />
            <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">Order Notification</h2>
          </div>
          <div className="space-y-6">
            <NotificationRow 
              title="New Order Notification" 
              desc="Notify admin when new orders are placed." 
              checked={settings.newOrder} 
              onToggle={() => handleToggle('newOrder')}
            />
            <NotificationRow 
              title="Order Status Updates" 
              desc="Notify admin and customers on order status updates." 
              checked={settings.orderStatus} 
              onToggle={() => handleToggle('orderStatus')}
            />
          </div>
        </section>

        {/* --- Vendor Notification Section --- */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-[#2E90D1]">
            <Store size={22} strokeWidth={2.5} />
            <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">Vendor Notification</h2>
          </div>
          <div className="space-y-6">
            <NotificationRow 
              title="New Vendor Registrations" 
              desc="Notify admin when a new vendor registers." 
              checked={settings.newVendor} 
              onToggle={() => handleToggle('newVendor')}
            />
            <NotificationRow 
              title="Product Approval Notification" 
              desc="Notify admin about new or updated products requiring approval." 
              checked={settings.productApproval} 
              onToggle={() => handleToggle('productApproval')}
            />
            <NotificationRow 
              title="Vendor Payout Notification" 
              desc="Notify admin when a vendor payout is requested." 
              checked={settings.vendorPayout} 
              onToggle={() => handleToggle('vendorPayout')}
            />
          </div>
        </section>

        {/* --- System Notification Section --- */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-[#2E90D1]">
            <Grid size={22} strokeWidth={2.5} />
            <h2 className="text-xl font-extrabold text-[#135B91] tracking-tight">System Notification</h2>
          </div>
          <div className="space-y-6">
            <NotificationRow 
              title="Send Email Notification" 
              desc="Notify admin when new orders are placed." 
              checked={settings.emailNotif} 
              onToggle={() => handleToggle('emailNotif')}
            />
            <NotificationRow 
              title="Push Mobile Notification" 
              desc="Notify admin via push notifications on connected mobile devices." 
              checked={settings.pushNotif} 
              onToggle={() => handleToggle('pushNotif')}
            />
          </div>
        </section>
      </div>

      {/* --- Action Button --- */}
      <div className="mt-16 pt-4">
        <button className="bg-[#2E90D1] hover:bg-[#257ab3] text-white px-10 py-4 rounded-2xl font-extrabold text-lg transition-all active:scale-95 shadow-xl shadow-blue-100/50">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default   Notification;