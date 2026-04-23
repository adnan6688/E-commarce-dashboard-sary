import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TopItem {
  name: string;
  image: string;
  revenue: string;
  orders: number;
}

interface TopItemsCardProps {
  title?: string;
}

const TopProduct: React.FC<TopItemsCardProps> = ({ title = "Top Products" }) => {
  // Mock data representing the items in your image
  const items: TopItem[] = Array(5).fill({
    name: 'MacBook air pro',
    image: '/human.png',
    revenue: '$1,22,545',
    orders: 245
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-center px-5 py-4 bg-[#C1E0F6]  border-gray-50">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h2>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
          View all <ChevronRight size={14} />
        </button>
      </div>

      <div className=" pb-4">
        {/* Table Header - Matching the light blue style in image */}
        <div className="grid grid-cols-12 gap-4  py-2 px-3 text-xs font-bold text-gray-600 bg-[#D9ECF8] ">
          <div className="col-span-7">Products</div>
          <div className="col-span-3 text-right">Revenue</div>
          <div className="col-span-2 text-right">Orders</div>
        </div>

        {/* List Items */}
        <div className="border-x border-b border-gray-100 rounded-b-lg">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-12 gap-4 py-3 px-3 items-center hover:bg-gray-50 transition-colors ${
                index !== items.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Product Info */}
              <div className="col-span-7 flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-md object-cover border border-gray-100" 
                  />
                </div>
                <span className="font-semibold text-gray-800 text-sm truncate">
                  {item.name}
                </span>
              </div>

              {/* Revenue */}
              <div className="col-span-3 text-right font-bold text-gray-900 text-sm">
                {item.revenue}
              </div>

              {/* Orders */}
              <div className="col-span-2 text-right font-medium text-gray-700 text-sm">
                {item.orders}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProduct;