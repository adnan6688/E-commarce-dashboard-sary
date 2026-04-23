

import type { TRecentOders } from '../../config/auth/auth';



export interface RecentOrdersProps {
  recentOdersData: TRecentOders[];
}

const RecentOrders = ({recentOdersData} : RecentOrdersProps) => {


    // Helper to style status badges
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'ORDER_CONFIRMED':
                return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'SHIPPED':
                return 'bg-green-100 text-green-600 border-green-200';
            case 'PENDING':
                return 'bg-orange-100 text-orange-600 border-orange-200';
            default:
                return 'bg-green-400 text-black border-gray-200';
        }
    };

    return (
        <div className="w-full bg-white rounded-lg  border border-gray-100 p-4 md:p-6 ">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                    View All
                </button>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-50 text-gray-700 font-semibold  text-xs tracking-wider">
                            <th className="px-4 py-3 first:rounded-l-lg">Order ID</th>
                            <th className="px-4 py-3">Buyer</th>
                            <th className="px-4 py-3">Seller</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 last:rounded-r-lg">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentOdersData.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-4 py-4 text-sm text-gray-600 font-medium">
                                    {order?.orderId}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        {/* <img
                                            src={order.buyer?.image ? order.buyer?.image : '/human.png' }
                                            alt={order.buyer.name}
                                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                        /> */}
                                        <span className="text-sm font-medium text-gray-800">
                                            {order.buyer.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-600">
                                    {order.seller?.shopName}
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-sm font-bold text-gray-900">
                                    {order.totalPrice}$
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;