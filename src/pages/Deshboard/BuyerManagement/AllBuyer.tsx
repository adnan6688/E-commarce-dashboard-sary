import { CheckCircle, ChevronLeft, ChevronRight, Eye, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Link } from 'react-router';


interface Buyer {
  id: string;
  name: string;
  image: string;
  joinDate: string;
  status: 'Pending' | 'Approved';
}


export default function AllBuyer() {

  const initialBuyers: Buyer[] = Array(12).fill({
    name: 'TectGedgeHub',
    image: 'https://i.pravatar.cc/150?u=tech',
    joinDate: 'Jan 12, 2024',
    status: 'Pending',
  }).map((s, i) => ({ ...s, id: `#S-100${i}`, status: i % 2 === 0 ? 'Approved' : 'Pending' }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(initialBuyers.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBuyers = initialBuyers.slice(indexOfFirstItem, indexOfLastItem);



  return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100  w-full ">

      {/* Top Header & Filters Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">All Buyer</h2>

        {/* Center: Select & Filter */}
        <div className="flex items-center gap-3">
          <select className="bg-gray-50 border rounded-l-full rounded-r-full border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
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
              placeholder="Search seller..."
              className="pl-10 pr-4 py-2.5 bg-gray-50 border rounded-l-full rounded-r-full border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full lg:w-64 text-sm"
            />
          </div>
          <button className="px-5 py-2.5 bg-[#C1E0F6]  rounded-lg  text-black  transition-all font-semibold text-sm cursor-pointer ">
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className='  '>
            <tr className="bg-[#C1E0F6] border-y rounded-lg border-gray-100">
              <th className="p-4 font-bold text-gray-600 text-sm">Buyer Name</th>
              <th className="p-4 font-bold text-gray-600 text-sm text-center">Join Date</th>
              <th className="p-4 font-bold text-gray-600 text-sm text-center">Status</th>
              <th className="p-4 font-bold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBuyers.map((buyer, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={buyer.image} alt={buyer.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm" />
                    <div>
                      <p className="text-gray-800 font-bold text-sm">{buyer.name}</p>
                      <p className="text-gray-400 text-xs font-medium">{buyer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center text-gray-500 font-medium text-sm">
                  {buyer.joinDate}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border  tracking-wider ${buyer.status === 'Approved'
                      ? 'bg-green-50 text-green-600 border-green-100'
                      : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                    {buyer.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">


                    <Link to={'/deshboard/BuyerManagment/:id'}>
                      <button className="flex  px-[10px] text-[12px] items-center  py-[10px] text-white bg-[#2289C9] hover:scale-105 rounded-lg transition-all text-xs font-bold cursor-pointer">

                        View Details
                      </button></Link>

                    <button className="flex items-center  px-[10px] py-[10px]  text-red-500 border-1 border-red-600 hover:scale-105 text-[12px] rounded-lg transition-all text-xs font-bold cursor-pointer shadow-sm shadow-red-200">
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-800">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, initialBuyers.length)}</span> of <span className="text-gray-800">{initialBuyers.length}</span> Buyer
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border border-gray-200 transition-all cursor-pointer ${currentPage === 1 ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100 text-gray-600'
              }`}
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border border-gray-200 transition-all cursor-pointer ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100 text-gray-600'
              }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
