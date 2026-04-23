import React, { useState } from 'react';
import {
    Search,
    ChevronDown,
    ChevronRight,
    Check,
    X,
    Filter
} from 'lucide-react';
import { Link } from 'react-router';


// Reusing your provided logic for dynamic backgrounds


const Payoutlist: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All Request');


    const requests = [
        { seller: 'Alice Cooper', shop: 'Alice Electronics', date: '25 Dec, 2025', amount: '12,214.00', status: 'Pending', bank: '**********13364' },
        { seller: 'Alice Cooper', shop: 'Alice Electronics', date: '25 Dec, 2025', amount: '12,214.00', status: ' Approve', bank: '**********13364' },
        { seller: 'Alice Cooper', shop: 'Alice Electronics', date: '25 Dec, 2025', amount: '12,214.00', status: 'Rejected', bank: '**********13364' },
        { seller: 'Alice Cooper', shop: 'Alice Electronics', date: '25 Dec, 2025', amount: '12,214.00', status: ' Approve', bank: '**********13364' },
        { seller: 'Alice Cooper', shop: 'Alice Electronics', date: '25 Dec, 2025', amount: '12,214.00', status: 'Received', bank: '**********13364' },
        { seller: 'Alice Cooper', shop: 'Alice Electronics', date: '25 Dec, 2025', amount: '12,214.00', status: 'Pending', bank: '**********13364' },
    ];



    return (
        <div className=" bg-[#F4F9FD]   ">


            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <button className="flex items-center gap-2 bg-[#D2E9F6] text-slate-700 px-4 py-2 rounded-lg font-bold text-sm">
                    <Filter size={16} /> Filter
                </button>
                <div className="relative">
                    <select className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm font-bold outline-none focus:ring-2 focus:ring-sky-100">
                        <option value="">month: January</option>
                        <option value="">month: February</option>
                        <option value="">month: March</option>
                        <option value="">month: April</option>
                        <option value="">month: May</option>
                        <option value="">month: June</option>
                        <option value="">month: July</option>
                        <option value="">month: August</option>
                        <option value="">month: September</option>
                        <option value="">month: October</option>
                        <option value="">month: November</option>
                        <option value="selected">month: December</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
                <div className="flex-1 min-w-[200px] relative">
                    <input
                        type="text"
                        placeholder="Search payouts..."
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 pl-10 text-sm outline-none focus:ring-2 focus:ring-sky-100"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
                <button className="bg-[#2E90D1] text-white px-6 py-2 rounded-lg font-bold text-sm">Search</button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl  border border-slate-100 overflow-hidden">
                {/* Table Tabs */}
                <div className="flex pl-3 overflow-x-auto  py-4 bg-[#C1E0F6] border-b border-slate-100">
                    {['All Request', 'Pending', ' Approve', 'Received', 'Rejected'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 cursor-pointer py-2 text-sm sm:text-[16px] font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-[#2E90D1] rounded-l-full rounded-r-full text-white shadow-lg' : 'text-slate-800 hover:text-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className='bg-[#E3EFFB]'>
                            <tr className="text-[16px] border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold   tracking-wider">Seller</th>
                                <th className="px-6 py-4 text-xs font-bold    tracking-wider">Request Date</th>
                                <th className="px-6 py-4 text-xs font-bold    tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold    tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold    tracking-wider">Bank</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {requests.map((req, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={'/human.png'} className="w-10 h-10 rounded-full" alt="" />
                                            <div>
                                                <p className="text-sm  sm:text-[16px] font-bold text-slate-800">{req.seller}</p>
                                                <p className="text-[11px] sm:text-[14px] text-slate-400 font-semibold">{req.shop}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm sm:text-[15px] font-semibold text-slate-800">{req.date}</td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-900">${req.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 cursor-pointer rounded-full text-[16px] font-bold ${req.status === 'Pending' ? 'bg-[#FFB300] text-white' :
                                                    req.status === ' Approve' ? 'bg-[#2E7D32] text-white' :
                                                        req.status === 'Rejected' ? 'bg-[#D32F2F] text-white' :
                                                            'bg-[#0288D1] text-white'
                                                }`}>
                                                {req.status}
                                            </span>
                                            {req.status === 'Pending' && (
                                                <div className="flex gap-1">
                                                    <button className="p-1  cursor-pointer bg-[#D32F2F] text-white rounded-md hover:scale-110 transition-transform"><X size={14} strokeWidth={3} /></button>
                                                    <button className="p-1 cursor-pointer bg-[#2E7D32] text-white rounded-md hover:scale-110 transition-transform"><Check size={14} strokeWidth={3} /></button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    {/* /deshboard/payout/:id */}
                                    <td className="px-6 py-4 text-sm sm:text-[16px] font-bold text-slate-700">Bank {req.bank}</td>
                                    <td className="px-6 py-4 text-right">
                                  <Link to={'/deshboard/payout/:id'}>
                                        <button className="inline-flex items-center gap-2 px-4 py-1.5 text-[16px] cursor-pointer border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                            View <ChevronRight className="bg-[#2E90D1] text-white rounded p-0.5" size={16} />
                                        </button></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-[#C1E0F6] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-500">Showing 1 to 6 of 154 payouts</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-1 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg text-sm hover:bg-slate-50">Previous</button>
                        <button className="px-6 py-1 bg-[#2289C9] text-white font-bold rounded-lg text-sm shadow-md hover:bg-[#257ab3]">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payoutlist;