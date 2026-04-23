import { useState } from "react";
import {
  Home,
  User,
  Mail,
  CreditCard,
  Bell,
} from 'lucide-react';
import { Link, Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings() {
  const location = useLocation();
  
  const menuItems = [
    { name: 'General', icon: Home, link: '/deshboard/settings' },
    { name: 'Account', icon: User, link: '/deshboard/settings/account' },
    { name: 'Email', icon: Mail, link: '/deshboard/settings/email' },
    { name: 'Payments', icon: CreditCard, link: '/deshboard/settings/payments' },
    { name: 'Notification', icon: Bell, link: '/deshboard/settings/notification' },
  ];

  return (
    <div className=" mx-auto   bg-[#F4F9FD]">
      
      {/* Page Header */}
      <div className="mb-8 ml-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Manage your platform settings and preferences.
        </p>
      </div>

      {/* Main Container: Responsive Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <nav className="bg-white rounded-[24px] p-3 border-2 border-slate-100/50  space-y-1">
            {menuItems.map((item) => {
              // Determine active state based on the current URL path
              const isActive = location.pathname === item.link;

              return (
                <Link 
                  key={item.name}
                  to={item.link}
                  className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all duration-200 group ${
                    isActive
                      ? 'text-[#2E90D1] bg-sky-100'
                      : 'text-slate-900 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {/* Background Highlight for Active Tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#E3EFFB] rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <item.icon 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? 'text-[#2E90D1]' : 'text-slate-800 group-hover:text-slate-600'}
                  />
                  <span className="tracking-tight">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Content Area */}
        <div className="flex-1 w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}