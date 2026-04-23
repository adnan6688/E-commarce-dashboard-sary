import { useQuery } from '@tanstack/react-query';
import { CheckCircle, ChevronLeft, ChevronRight, Eye, Filter, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { createAxiosSecure } from '../../../axios/axiosSequre';
import ActionLoading from '../../../components/Loading/ActionLoading';
import type { TShopData } from '../../../config/auth/auth';
import type { Tmeta } from '../Catalog/Catalog';




const AllSeller: React.FC = () => {



  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<string>('')
  const itemsPerPage = 10;


  const [search, setSearch] = useState<string>("")
  const [finalSearch, setFinalSearch] = useState<string>("")
  const { token } = AuthReduxHook()
  const axiosSequre = createAxiosSecure(token)
  const [metainfo, setMetaInfo] = useState<Tmeta | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [rejectId, setRejectedId] = useState<string>("")
  const [submit, setSubmitting] = useState<boolean>(false)


  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);





  const { data: allSellers = [], isLoading: sellersLoading, refetch } = useQuery({
    queryKey: ['sellers', currentPage, finalSearch, status],
    queryFn: async () => {
      if (!token) return [];

      let response;

      // /admin/shops?page=1&limit=10&status=APPROVED
      if (status) {
        response = await axiosSequre.get(`/admin/shops?page=${currentPage}&limit=${itemsPerPage}&status=${status}`)
        return response?.data?.data || response?.data || [];
      }
      if (finalSearch) {
        // seaerch vlaue found
        response = await axiosSequre.get(`/admin/shops?limit=${itemsPerPage}&page=${currentPage}&search=${finalSearch}`);
      } else {
        // search not found thakle
        response = await axiosSequre.get(`/admin/shops?page=${currentPage}&limit=${itemsPerPage}`)
      }

      if (response?.data?.pagination) {
        setMetaInfo(response.data.pagination);
      }

      return response?.data?.data || response?.data || [];
    },
    enabled: !!token,
  });





  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinalSearch(search);
    }, 1000); // 1 second

    return () => clearTimeout(timeout); // cleanup on every search change
  }, [search]);

  const shopStatusChange = async (type: string, id: string) => {
    setSubmitting(true)
    if (type == "REJECTED") {
      if (inputValue.length < 5) {
        return
      }
    }
    try {
      const url =
        type === "APPROVED"
          ? `/admin/shops/${id}/approve`
          : `/admin/shops/${id}/reject`;

      let res;
      if (type == 'REJECTED' && inputValue) {
        res = await axiosSequre.patch(url, { reason: inputValue });

      }
      else {
        res = await axiosSequre.patch(url)
        toast.success('Shop Approved Successfully!')
      }
      if (res.data.success) {
        if (type === "APPROVED") {
          toast.success("Shop Approved Successfully!");
        } else {
          toast.error("Shop Rejected Successfully!");
        }
      }
    } catch (err) {
      console.log(err)

    } finally {
      refetch()
      handleClose()
      setSubmitting(false)
    }
  }



  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100  w-full ">

      {/* Top Header & Filters Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">All shopes</h2>

        {/* Center: Select & Filter */}
        <div className="flex items-center gap-3">
          <select onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border rounded-l-full rounded-r-full border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer">
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#C1E0F6] border border-gray-200 rounded-lg   hover:scale-95   transition-all  hover:bg-sky-300  duration-1000   cursor-pointer font-medium text-sm">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Right: Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search seller..."
              className="pl-10 pr-4 py-2.5 bg-gray-50 border rounded-l-full rounded-r-full border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full lg:w-64 text-sm"
            />
          </div>

        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className='  '>
            <tr className="bg-[#C1E0F6] border-y rounded-lg border-gray-100">
              <th className="p-4 font-bold text-gray-600 text-sm">shop Name</th>
              <th className="p-4 font-bold text-gray-600 text-sm text-center">Join Date</th>
              <th className="p-4 font-bold text-gray-600 text-sm text-center">Status</th>
              <th className="p-4 font-bold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellersLoading ? (
              // টেবিলের ভেতরে লোডার দেখানোর সঠিক নিয়ম
              <tr>
                <td colSpan={4} className="py-20">
                  <div className="flex justify-center items-center w-full">
                    <ActionLoading />
                  </div>
                </td>
              </tr>
            ) : allSellers.length > 0 ? (
              allSellers?.map((seller: TShopData) => (
                <tr key={seller._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* <img src={seller.} alt={seller.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm" /> */}
                      <div>
                        <p className="text-gray-800 font-bold text-sm">{seller.shopName}</p>
                        <p className="text-gray-400 text-xs font-medium">{seller._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center text-gray-500 font-medium text-sm">
                    {new Date(seller.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border tracking-wider ${seller.status === "APPROVED"
                      ? 'bg-green-50 text-green-600 border-green-100'
                      : 'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* ডায়নামিক আইডি পাঠানোর সঠিক নিয়ম: `${seller.id}` */}
                      <Link to={seller?.status === 'APPROVED'
                        ? `/deshboard/sellerManagement/shopDetails/${seller._id}`
                        : `/deshboard/sellerManagement/details/${seller._id}`}>
                        <button className="flex px-2.5 text-[12px] items-center gap-1.5 py-2.5 text-white bg-[#2289C9] hover:scale-105 rounded-lg transition-all text-xs font-bold cursor-pointer">
                          <Eye size={14} />
                          View Details
                        </button>
                      </Link>

                      {
                        seller.status !== "APPROVED" && <button onClick={() => shopStatusChange("APPROVED", seller._id)} className="flex items-center gap-1.5 px-2.5 py-2.5 text-white bg-[#128635] hover:scale-105 text-[12px] rounded-lg transition-all text-xs font-bold cursor-pointer shadow-sm shadow-green-200">
                          <CheckCircle size={14} />
                          Approve
                        </button>
                      }
                      {
                        seller.status !== "PENDING" && seller.status !== "REJECTED" && <button onClick={() => {
                          handleOpen()
                          setRejectedId(seller._id)
                        }} className="flex items-center gap-1.5 px-2.5 py-2.5 text-red-600 bg-[#f7e3e3] hover:scale-105 text-[12px] rounded-lg transition-all text-xs font-bold cursor-pointer ">
                          <CheckCircle size={14} />
                          Rejected
                        </button>
                      }
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // ডাটা না থাকলে মেসেজ
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400 italic">
                  No sellers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-gray-500 font-medium">
          {/* Showing <span className="text-gray-800">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, allSellers.length)}</span> of <span className="text-gray-800">{allSellers.length}</span> sellers */}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border border-gray-200 transition-all cursor-pointer ${currentPage === 1 ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100 text-gray-600'
              }`}
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(metainfo?.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all cursor-pointer ${currentPage === i + 1
                ? 'bg-[#2289C9] text-white shadow-md shadow-blue-200'
                : 'text-gray-500 hover:bg-gray-50 border border-transparent'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === metainfo?.totalPages}
            className={`p-2 rounded-lg border border-gray-200 transition-all cursor-pointer ${currentPage === metainfo?.totalPages ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100 text-gray-600'
              }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>



      <div className="flex  items-center justify-center p-10">


        {/* ২. মোডাল ওভারলে */}
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">

            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-800">
                  Add Reason
                </h3>
                <button onClick={handleClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-red-500 tracking-wider">
                    Reason
                  </label>

                  <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Explain the reason clearly..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-red-300 transition"
                  />

                  {/* Helper text */}
                  <div className="flex justify-between text-xs text-slate-400">
                    {!submit && (
                      <div className="flex  w-full justify-between text-xs text-slate-400">
                        <p
                          className={inputValue.length < 5 ? "text-red-500" : "text-green-500"}
                        >
                          Minimum 5 characters
                        </p>
                        <p>{inputValue.length} / 100</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Button */}
                <button
                  disabled={inputValue.length < 5 || submit} // disabled if less than 5 chars or submitting
                  onClick={() => shopStatusChange("REJECTED", rejectId)}
                  className={`w-full font-bold py-3 rounded-xl transition shadow-md active:scale-[0.98] 
    ${inputValue.length >= 5 && !submit
                      ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                      : "bg-red-300 text-white cursor-not-allowed"
                    }`}
                >
                  {submit ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllSeller;