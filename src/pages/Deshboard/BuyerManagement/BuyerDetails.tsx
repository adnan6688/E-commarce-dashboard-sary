import { Store } from "lucide-react";
import RecentOrders from "../RecentOrders";

export default function BuyerDetails() {


  const statsData = [
    { id: 1, title: "Total Orders", value: "32" },
    { id: 2, title: "Total Orders", value: "32" },
    { id: 3, title: "Total Orders", value: "32" },
    { id: 4, title: "Total Orders", value: "32" },
  ];



  const orders = Array(8).fill({
    id: "#ORD-1234",
    date: "20 Dec, 2025",
    buyerName: "Alice Cooper",
    buyerEmail: "alicecooper123@gmail.com",
    buyerImg: "https://i.pravatar.cc/150?u=alice", // Example avatar
    seller: "SneakersHub",
    total: "$150.00"
  });


  return (
    <div className="flex flex-col gap-y-[24px]">

      <div className='flex flex-col gap-y-2'>
        <h1 className='text-[24px] font-semibold'>Buyer Management</h1>

        <h1 className='text-[14px]'>Buyer Management / Alice Cooper </h1>
      </div>

      <div className="bg-white p-[20px] rounded-lg border-2  border-gray-300 flex items-center gap-x-3">

        <div className=" w-[80px] h-[80px] ">
          <img className="w-full h-full" src="/human.png" alt="" />
        </div>
        <div className="flex gap-y-1 flex-col">
          <h1 className="text-[#636363] sm:text-[20px] font-semibold">Alice Cooper</h1>
          <h2 className="text-[14px] font-semibold">Support152@gmail.com</h2>

          <h3 className="text-[14px] font-semibold">Buyer Since April 14, 2026</h3>
        </div>

      </div>

      <div className="flex lg:flex-row flex-col  gap-x-[24px]">

        <div className=" w-full lg:w-1/3  flex flex-col gap-y-[24px]">

          <div className="border-2 rounded-2xl  border-gray-300">
            <div className="bg-white flex flex-col gap-y-[10px]  rounded-2xl px-[11px] py-[49px]">
              <h1 className="text-[20px] font-semibold ">Account Information</h1>

              <hr className="border border-gray-100" />

              <div className="flex justify-between">
                <h1 className="text-[16px] font-semibold">Full Name</h1>
                <h2 className="text-[#636363]  font-semibold text-[14px]">Alice Cooper</h2>
              </div>

              <div className="flex justify-between">
                <h1 className="text-[16px] font-semibold">Email</h1>
                <h2 className="text-[#636363] font-semibold text-[14px]">example@gmail.com</h2>
              </div>

              <div className="flex justify-between">
                <h1 className="text-[16px] font-semibold">Phone Number</h1>
                <h2 className="text-[#636363] font-semibold text-[14px]">+1 (555) 34234324 434324</h2>
              </div>


              <div className="flex justify-between">
                <h1 className="text-[16px] font-semibold">Status</h1>
                <h2 className="text-[#636363] font-semibold text-[14px]">Active</h2>
              </div>

              <div className="flex justify-between">
                <h1 className="text-[16px] font-semibold">Join Date</h1>
                <h2 className="text-[#636363] font-semibold text-[14px]">Apr 16,2026</h2>
              </div>

              <div className="flex justify-between">
                <h1 className="text-[16px] font-semibold">Last Login</h1>
                <h2 className="text-[#636363] font-semibold text-[14px]">Apr 16,2026</h2>
              </div>

            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-2xl  p-[20px] sm:p-[40px] flex flex-col gap-y-[24px]">
            <h1 className="text-[20px] font-semibold">Shipping Address</h1>

            <div className="grid grid-cols-2 gap-[10px] p-4">
              {statsData.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F1F8FE] border border-[#135B91] p-[10px] flex justify-center items-center rounded-lg shadow-sm"
                >
                  <div className="flex text-center flex-col gap-y-[4px]">
                    <h1 className="text-[14px] font-semibold text-gray-600">
                      {item.title}
                    </h1>
                    <h1 className="text-[16px] font-bold text-[#135B91]">
                      {item.value}
                    </h1>
                  </div>
                </div>
              ))}
            </div>




          </div>


        </div>



        <div className="lg:w-2/3 mt-5 sm:mt-0">


          <div className="bg-white   border-2 border-gray-300 rounded-2xl   border border-gray-100 p-6 w-full mx-auto ">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#D1E9FF] text-gray-800 text-sm font-bold">
                    <th className="px-6 py-3 rounded-l-lg">Order ID</th>
                    <th className="px-6 py-3">Buyer</th>
                    <th className="px-6 py-3">Seller</th>
                    <th className="px-6 py-3 rounded-r-lg text-right">Total</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      {/* Order ID & Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-[#135B91] font-bold text-sm">{order.id}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{order.date}</p>
                      </td>

                      {/* Buyer Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.buyerImg}
                            alt={order.buyerName}
                            className="w-10 h-10 rounded-full object-cover border border-gray-100"
                          />
                          <div className="overflow-hidden">
                            <p className="text-gray-900 font-bold text-sm truncate">{order.buyerName}</p>
                            <p className="text-gray-400 text-xs truncate">{order.buyerEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Seller Badge */}
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2 bg-[#F1F8FE] text-[#135B91] px-3 py-1.5 rounded-md font-bold text-xs border border-blue-50">
                          <Store size={14} />
                          {order.seller}
                        </div>
                      </td>

                      {/* Total Price */}
                      <td className="px-6 py-4 text-right">
                        <span className="text-gray-900 font-extrabold text-base">
                          {order.total}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>


      </div>

    </div>
  )
}
