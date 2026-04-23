import type { recentShops } from "../../config/auth/auth"



const RecentSellers = ({ recentShops }: { recentShops: recentShops[] }) => {




  return (
    <div className=" rounded-3xl   p-6 w-full h-full ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Recent Shop</h2>
        <button className="text-sm  text-gray-600 cursor-pointer  hover:underline">View All</button>
      </div>

      {/* Seller List */}
      <div className="divide-y divide-gray-200">
        {recentShops?.map((seller) => (
          <div
            key={seller.id}
            className="flex items-center justify-between py-2"
          >
            {/* Left side */}
            <div className="flex items-center gap-4">

              <img
                src={
                  seller.logoUrl ??
                  "https://res.cloudinary.com/dk8knw2un/image/upload/default-logo.jpg"
                }
                alt={seller.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-sm text-gray-500">{seller.productCount} products</p>
              </div>
            </div>

            {/* Right side */}
            <span
              className={`
                px-3 py-1 text-xs font-semibold rounded-full
                ${seller.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}
              `}
            >
              {seller.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentSellers
