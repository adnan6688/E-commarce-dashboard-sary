import React from 'react';
import { 
  User, 
  Activity, 
  CreditCard, 
  FileText, 
  ChevronLeft 
} from 'lucide-react';

const PayoutDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F9FD] p-4 md:p-8  text-slate-800">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Order Details</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#0288D1] font-bold text-sm">#ORD-1234</span>
          <span className="text-slate-700 text-xs font-semibold">December 3, 2025, 10:45 AM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          {/* Seller Information Card */}
          <div className="bg-white rounded-xl   border border-slate-100 overflow-hidden">
            <div className="bg-[#E3F2FD] px-5 py-3 flex items-center gap-2 text-[#135B91] font-bold text-sm sm:text-[20px] border-b border-slate-100">
              <User size={18} strokeWidth={2.5} /> Seller Information
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-4">
                <img 
                  src="/human.png" 
                  alt="Alice Cooper" 
                  className="w-14 h-14 rounded-full border-2 border-[#E3F2FD]"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900">Alice Cooper</h3>
                  <p className="text-slate-700 text-xs sm:text-[12px] font-semibold">alicecooper123@gmail.com</p>
                  <p className="text-slate-700 text-xs sm:text-[12px] leading-relaxed font-semibold mt-1">(123) 456-7894</p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <h4 className="font-bold text-[11px] sm:text-[16px] text-slate-800 mb-2 tracking-wider">Contact Information</h4>
                <p className="text-sm sm:text-[15px]  font-bold text-slate-800 ">Alice Cooper</p>
                <p className="text-slate-600 font-semibold text-xs sm:text-[13px] mt-1 leading-relaxed">123 Ethan street, New York<br/>United States</p>
              </div>
            </div>
          </div>

          {/* Payout Information Card */}
          <div className="bg-white rounded-xl   border border-slate-100 overflow-hidden">
            <div className="bg-[#E3F2FD] px-5 py-3 flex justify-between items-center border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#135B91] font-bold text-sm sm:text-[20px]">
                <CreditCard size={18} strokeWidth={2.5} /> Payout Information
              </div>
              <span className="bg-[#FFB300] text-white text-[10px] font-black px-3 py-1 rounded-full  tracking-wider">Pending</span>
            </div>
            <div className="p-2 md:p-4">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-slate-50">
                  {[
                    { label: 'Amount', value: '$12,214.00', bold: true },
                    { label: 'Request Date', value: 'December 20, 2025' },
                    { label: 'Bank', value: 'Bank **********1233556' },
                    { label: 'Payment Method', value: 'Bank Transfer' },
                    { label: 'Payment Status', value: 'Pending' },
                    { label: 'Total Payout', value: '$2,12,214.00', bold: true },
                    { label: 'Total Earnings', value: '$2,12,214.00', bold: true },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-800">{row.label}</td>
                      <td className={`px-4 py-4 text-right font-bold ${row.bold ? 'text-slate-900' : 'text-slate-500'}`}>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Activity Log Card */}
          <div className="bg-white rounded-xl   border border-slate-100 overflow-hidden">
            <div className="bg-[#E3F2FD] px-5 py-3 flex items-center gap-2 text-[#0288D1] font-bold text-sm sm:text-[20px] border-b border-slate-100">
              <Activity size={18} strokeWidth={2.5} /> Activity Log
            </div>
            <div className="p-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                   <div className="bg-[#2E7D32] p-1.5 rounded-md text-white">
                      <FileText size={16} />
                   </div>
                   <div className="w-[1px] h-12 bg-slate-200 mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-900">Payout Requested</p>
                    <span className="text-[10px] font-bold text-slate-700">December 20, 2025  10:30 AM</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add Note" 
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-sky-100"
                    />
                    <button className="bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold px-6 py-2 rounded-lg text-xs transition-colors  ">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payout Notes Card */}
          <div className="bg-white rounded-xl   border border-slate-100 overflow-hidden">
            <div className="bg-[#E3F2FD] px-5 py-3 flex items-center gap-2 text-[#0288D1] font-bold text-sm sm:text-[20px] border-b border-slate-100">
              <FileText size={18} strokeWidth={2.5} /> Payout Notes
            </div>
            <div className="p-6">
              <p className="text-[11px] font-semibold text-slate-700 mb-4 leading-relaxed">
                Add any notes regarding this payout that you want to remember.
              </p>
              <textarea 
                placeholder="Add Note" 
                rows={6}
                className="w-full font-semibold bg-white border border-slate-200 rounded-xl p-4 text-xs outline-none focus:ring-2 focus:ring-sky-100 resize-none mb-4"
              />
              <button className="bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-colors  ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold px-8 py-3 rounded-lg text-sm transition-all shadow-md active:scale-95">
          Approve Payout
        </button>
        <button className="bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-bold px-8 py-3 rounded-lg text-sm transition-all shadow-md active:scale-95">
          Reject Payout
        </button>
        <button className="bg-white border border-slate-300 text-slate-500 font-bold px-8 py-3 rounded-lg text-sm hover:bg-slate-50 transition-all">
          Back to Payout
        </button>
      </div>
    </div>
  );
};

export default PayoutDetails;