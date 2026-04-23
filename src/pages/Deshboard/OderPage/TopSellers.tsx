import React from 'react';
import { ChevronRight } from 'lucide-react';

// সেলার ডেটার জন্য টাইপ ইন্টারফেস
interface Seller {
  name: string;
  image: string;
  revenue: string;
  orders: number;
}

const TopSellers: React.FC = () => {
  // আপনার ইমেজের মতো মক ডেটা
  const sellers: Seller[] = Array(5).fill({
    name: 'MacBook air pro',
    image: '/human.png',
    revenue: '$1,22,545',
    orders: 245
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full overflow-hidden">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center p-5 bg-[#C1E0F6]">
        <h2 className="text-lg font-bold text-gray-900">Top Sellers</h2>
        <button className="flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors">
          View all <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      <div className=" pb-5">
        {/* টেবিল হেডার - আপনার ইমেজের মতো নীল ব্যাকগ্রাউন্ড */}
        <div className="grid grid-cols-12 gap-4 py-2 px-3 text-xs font-semibold text-gray-600 bg-[#D9ECF8] ">
          <div className="col-span-6">Seller Name</div>
          <div className="col-span-4 text-right">Revenue</div>
          <div className="col-span-2 text-right">Orders</div>
        </div>

        {/* সেলার লিস্ট */}
        <div className="divide-y divide-gray-50 border-x border-b border-gray-50 rounded-b-lg">
          {sellers.map((seller, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 py-4 px-3 items-center hover:bg-gray-50 transition-colors group">
              {/* সেলার ইনফো (Image + Name) */}
              <div className="col-span-6 flex items-center gap-3">
                <img 
                  src={seller.image} 
                  alt={seller.name} 
                  className="w-10 h-10 rounded-lg object-cover bg-gray-100 shadow-sm" 
                />
                <span className="font-semibold text-gray-800 text-sm truncate">
                  {seller.name}
                </span>
              </div>

              {/* রেভিনিউ */}
              <div className="col-span-4 text-right font-bold text-gray-900 text-sm">
                {seller.revenue}
              </div>

              {/* অর্ডার সংখ্যা */}
              <div className="col-span-2 text-right font-semibold text-gray-800 text-sm">
                {seller.orders}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellers;