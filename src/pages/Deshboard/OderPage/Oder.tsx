import React, { useState } from 'react';
import { Filter, MapPin, ChevronRight, Store, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { createAxiosSecure } from '../../../axios/axiosSequre';
import ActionLoading from '../../../components/Loading/ActionLoading';
import type { Tmeta } from '../Catalog/Catalog';

interface Order {
  id?: string;
  orderId: string;
  date: string;
  buyerName: string;
  buyerEmail: string;
  buyer: {
    id: string;
    name: string;
    email: string;
  };
  shop: {
    name: string;
  };
  createdAt: string;
  seller: string;
  totalPrice: string;
  status: 'PENDING' | 'ORDER_CONFIRMED' | 'SHIPPED' | 'DELIVERED';
}





const OrderManagement: React.FC = () => {
  // Mock data matching the visual variety in your image
  const [metaInfo, setMetaInfo] = useState<Tmeta>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [status, setStatus] = useState<string | "">("")
  const [month, setMonth] = useState<number | null>(null)




  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return { width: '15%', color: 'bg-[#FFC107]', border: 'border-[#FFC107]' };
      case 'ORDER_CONFIRMED': return { width: '50%', color: 'bg-[#2196F3]', border: 'border-[#2196F3]' }; // blue
      case 'SHIPPED': return { width: '50%', color: 'bg-[#2196F3]', border: 'border-[#2196F3]' };
      case 'DELIVERED': return { width: '100%', color: 'bg-[#2E7D32]', border: 'border-[#2E7D32]' };

      default: return { width: '0%', color: 'bg-gray-200', border: 'border-gray-200' };
    }
  };
  const { token } = AuthReduxHook()
  const axiosSequre = createAxiosSecure(token)


  const { data: AllOders, isLoading } = useQuery({
    queryKey: ['oderS', currentPage, status, month],
    queryFn: (async () => {
      let res;

      if (status) {
        res = await axiosSequre.get(`/admin/orders?status=${status}&page=1&limit=20`)
      }
      else {

        if (month) {
          res = await axiosSequre.get(`/admin/orders?monthly=${month-1}&page=${currentPage}&limit=20`)
          console.log("mongth", month)
          setMetaInfo(res?.data?.data?.meta)
          return res?.data?.data?.data || []
        }
        res = await axiosSequre.get(`/admin/orders?page=${currentPage}&limit=20`)
      }
      setMetaInfo(res?.data?.data?.meta)
      return res?.data?.data?.data || []
    })
  })




  return (
    <div className="p-4 md:p-8 bg-white min-h-screen rounded-2xl selection:bg-sky-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Order Management</h1>
        <p className="text-[13px] text-gray-500 font-medium">Review and manage vendor product listings pending approval.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#B3D9F2] hover:bg-[#a0cfe0] text-gray-800 rounded-lg font-bold text-[13px] transition-all">
          <Filter size={18} strokeWidth={2.5} /> Filter
        </button>

  

        <div className="relative">
          <select onChange={(e) => setStatus(e.target.value)} className="appearance-none bg-[#E3F2FD] border-none rounded-lg px-4 py-2.5 pr-10 text-[13px] font-bold text-gray-800 focus:ring-2 focus:ring-sky-200 cursor-pointer">
            <option value={""}>All Statuses</option>
            <option value={"PENDING"}>Pending</option>
            <option value={"SHIPPED"}>Shipped</option>
            <option value={"DELIVERED"}>Delivered</option>
            <option value={"CANCELLED"}>Cancelled</option>
          </select>
          <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-[10px]' size={14} strokeWidth={3} />
        </div>

        <div className="relative">
          <select onChange={(e) => setMonth(parseInt(e.target.value))} className="appearance-none bg-[#E3F2FD] border-none rounded-lg px-4 py-2.5 pr-10 text-[13px] font-bold text-gray-800 focus:ring-2 focus:ring-sky-200 cursor-pointer">

            <option value="">Select a Month</option>
            <option value="1">January</option>
            <option value="2"> February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5"> May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-[10px]' size={14} strokeWidth={3} />
        </div>

        <div className="flex-1 flex gap-2 min-w-70">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full bg-[#F5F9FC] border border-gray-100 rounded-lg px-4 py-2.5 text-[13px] font-medium outline-none focus:ring-2 focus:ring-sky-100"
          />
          <button className="px-8 py-2.5 bg-[#B3D9F2] hover:bg-[#a0cfe0] text-gray-800 font-bold rounded-lg text-[13px] transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-[#B3D9F2] bg-opacity-40 border-b border-gray-100">
              <tr className="text-left">
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Order ID</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Buyer</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Shop Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Total</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Fulfillment Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 min-h-[40vh]">
              {isLoading ? (
                <tr >
                  <td colSpan={6} className="py-20">
                    <div className="flex justify-center items-center">
                      <ActionLoading />
                    </div>
                  </td>
                </tr>
              ) : AllOders?.length === 0 ? (
                <tr >
                  <td colSpan={6} className="py-10">
                    <div className="flex justify-center items-center">
                      Not Found
                    </div>
                  </td>
                </tr>
              ) : (
                AllOders?.map((order: Order) => {
                  const config = getStatusConfig(order.status);
                  return (
                    <tr key={order?.orderId} className="hover:bg-gray-50/50 transition-all duration-300">
                      <td className="px-6 py-5">
                        <div className="text-[#0288D1] font-bold text-[14px] hover:underline cursor-pointer">{order.orderId}</div>
                        <div className="text-[11px] text-gray-400 font-bold mt-0.5">{order.date}</div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="">
                          {/* <img src={order.buyerAvatar} alt="avatar" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-50" /> */}
                          <div>
                            <div className="text-[14px] font-bold text-gray-900">{order.buyer.name}</div>
                            <div className="text-[11px] text-gray-400 font-medium">{order.buyer.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F9FC] border border-gray-100 rounded-lg">
                          <Store size={14} className="text-gray-400" />
                          <span className="text-[12px] font-bold text-gray-600">{order.shop.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-[15px] font-black text-gray-900">${order.totalPrice as string}</span>
                      </td>

                      {/* Progress Bar Column */}
                      <td className="px-6 py-5 min-w-65">
                        <div className="relative pt-2 w-full">


                          <div className="h-1.5 w-full bg-[#F0F4F8] rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000 ease-out ${config.color}`}
                              style={{ width: config.width }}
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            {['PENDING', 'ORDER_CONFIRMED', 'SHIPPED', 'DELIVERED'].map((label, i) => {
                              const isPast = (i === 0) || (i === 1 && order.status !== 'PENDING') || (i === 2 && order.status === 'ORDER_CONFIRMED') || (i === 2 && order.status === 'SHIPPED') || (i === 2 && order.status === 'DELIVERED');
                              return (
                                <div key={label} className="flex flex-col items-center first:items-start last:items-end flex-1">
                                  <div className={`w-3.5 h-3.5 rounded-full border-[3px] bg-white -mt-2.75 z-10 transition-all duration-500 ${isPast ? config.border : 'border-[#E0E7ED]'}`} />
                                  <span className={`text-[10px] font-bold mt-2 ${isPast ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {label.toLocaleLowerCase()}
                                  </span>
                                </div>
                              );
                            })}
                          </div>


                        </div>


                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-5">
                          <button className="flex items-center gap-1.5 text-[#0288D1] font-bold text-[12px] hover:brightness-90">
                            <MapPin size={16} /> Live Tracking
                          </button>

                          <Link to={`/deshboard/oder/${order.orderId}`}>
                            <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-all group">
                              View
                              <ChevronRight size={16} className="bg-[#0288D1] text-white rounded-sm p-0.5 group-hover:scale-110 transition-transform" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#B3D9F2] bg-opacity-20 px-8 py-4 flex items-center justify-between border-t border-gray-100">
          <p className="text-[13px] font-bold text-gray-600">Showing {AllOders?.length} of {metaInfo && metaInfo.total} orders.</p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={metaInfo?.page === 1}
              className={`px-5 py-2 font-bold rounded-lg text-[13px] transition-all
    ${metaInfo?.page === 1
                  ? "bg-gray-200 border border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-200 text-[#0288D1] hover:shadow-sm active:scale-95"
                }
  `}
            >
              Previous
            </button>
            <button

              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={metaInfo?.totalPages === metaInfo?.page}
              className={`px-8 py-2 font-bold rounded-lg text-[13px] transition-all shadow-md
    ${metaInfo?.totalPages === metaInfo?.page
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#0288D1] text-white hover:bg-[#0277BD] active:scale-95"
                }
  `}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;