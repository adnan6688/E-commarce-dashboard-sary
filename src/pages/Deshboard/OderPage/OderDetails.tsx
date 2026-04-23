import { useQuery } from '@tanstack/react-query';
import {
    Activity,
    CheckCircle2,
    ClipboardList,
    Home,
    Package,
    Truck,
    User
} from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { createAxiosSecure } from '../../../axios/axiosSequre';
import ActionLoading from '../../../components/Loading/ActionLoading';


interface OderType {
    productId: string,
    productName: string,
    shopName: string,
    variantSku: string,
    quantity: number,
    price: number,
    imageUrl: {
        gallery: string[]
    }
    totalPrice: string

}

export type OrderItem = {
    productId: string;
    productName: string;
    shopName: string;
    variantSku: string;
    quantity: number;
    price: number;
    totalPrice: number;
    imageUrl: {
        gallery: string[];
    };
};




const OderDetails: React.FC = () => {

    const { id } = useParams()
    const { token } = AuthReduxHook()
    const axiosSequre = createAxiosSecure(token)


    const { data: OderDetailsInformation, isLoading } = useQuery({
        queryKey: ['oderDetails', id],
        queryFn: (async () => {
            const res = await axiosSequre.get(`/admin/orders/${id}`)
            return res.data.data || []
        }),
        enabled: !!token
    })


    const getStatusConfig = (status: 'PENDING' | 'ORDER_CONFIRMED' | 'SHIPPED' | 'DELIVERED') => {
        switch (status) {
            case 'PENDING': return { width: '15%', color: 'bg-[#FFC107]', border: 'border-[#FFC107]' };
            case 'ORDER_CONFIRMED': return { width: '50%', color: 'bg-[#2196F3]', border: 'border-[#2196F3]' }; // blue
            case 'SHIPPED': return { width: '50%', color: 'bg-[#2196F3]', border: 'border-[#2196F3]' };
            case 'DELIVERED': return { width: '100%', color: 'bg-[#2E7D32]', border: 'border-[#2E7D32]' };

            default: return { width: '0%', color: 'bg-gray-200', border: 'border-gray-200' };
        }
    };



    const items = OderDetailsInformation?.items || [];

    const totalAmount = items.reduce((sum: number, item: OrderItem) => {
        return sum + (item?.totalPrice || 0);
    }, 0);

    const config = getStatusConfig(OderDetailsInformation?.status);

    console.log(OderDetailsInformation)


    if (isLoading) {
        return <div className='flex justify-center items-center min-h-[70vh]'>
            <ActionLoading></ActionLoading>
        </div>
    }

    return (
        <div className="p-0 md:p-8 bg-[#F4F9FD] min-h-screen  text-slate-900">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#0288D1] font-bold text-sm">#ORD-{OderDetailsInformation?.orderId}</span>
                    <span className="text-slate-400 text-xs font-medium">
                        {OderDetailsInformation?.createdAt
                            ? new Date(OderDetailsInformation.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })
                            : ""}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Customer & Summary */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Customer Information Card */}
                    <div className="bg-white rounded-xl  border border-slate-100 overflow-hidden">
                        <div className="bg-[#E3F2FD] px-4 py-3 flex justify-between items-center border-b border-slate-100">
                            <div className="flex items-center gap-2 text-[#0288D1] font-bold text-sm sm:text-[20px]">
                                <User size={24} /> Customer Information
                            </div>
                            <span className="bg-[#B3D9F2] text-[#4A4A4A] text-[10px] sm:text-[16px] font-black px-2 py-0.5 rounded "> {OderDetailsInformation?.items?.length} Items</span>
                        </div>
                        <div className="p-4 flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex gap-4">
                                <img
                                    src="https://i.pravatar.cc/150?u=alice"
                                    alt="Alice"
                                    className="w-14 h-14 rounded-full border-2 border-[#E3F2FD]"
                                />
                                <div className='flex flex-col gap-y-0.75 '>
                                    <h3 className="font-bold text-base">{OderDetailsInformation?.buyer?.name}</h3>
                                    <p className="text-[#636363] text-xs sm:text-[14px] font-medium">{OderDetailsInformation?.buyer?.email}</p>
                                    <p className="text-[#636363] text-xs sm:text-[14px] font-medium mt-1">{OderDetailsInformation?.shippingAddress?.phone}</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col gap-y-2.5 md:text-right">
                                <h4 className="font-bold text-xs  sm:text-[16px] mb-1">Shipping Address</h4>
                                <p className="text-sm font-medium ">Name: {OderDetailsInformation?.shippingAddress?.fullName}</p>
                                <p className="text-slate-500 text-xs ">AddressLine: {OderDetailsInformation?.shippingAddress?.addressLine} </p>
                                <p className="text-slate-500 text-xs">city: {OderDetailsInformation?.shippingAddress?.city}</p>
                                <p className="text-slate-500 text-xs">Postal Code: {OderDetailsInformation?.shippingAddress?.postalCode}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Card */}
                    <div className="bg-white rounded-xl     overflow-hidden">
                        <div className="bg-[#E3F2FD] px-4 py-3 flex items-center gap-2 text-[#0288D1] font-bold  text-[16px] sm:text-[20px] border-b border-slate-100">
                            <ClipboardList size={18} /> Order Summary
                        </div>
                        <div className="overflow-x-auto  mx-4 mt-4 rounded-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-[#C1E0F6] border-b border-slate-50">
                                    <tr>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider">Product</th>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider">Price</th>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider text-center">Quantity</th>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2  divide-gray-200 bg-sky-50">


                                    {OderDetailsInformation?.items.map((oderItems: OderType, key: string) => {

                                        // setTotalAmount(parseInt(totalAmount+oderItems?.totalPrice))
                                        return <tr key={key} className="hover:bg-slate-50/50 transition-colors  ">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0">
                                                    {
                                                        oderItems?.imageUrl?.gallery.length ? <img src={oderItems?.imageUrl?.gallery[0]} className="rounded-lg h-full object-cover" alt="shoe" /> : ""
                                                    }
                                                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" className="rounded-lg h-full object-cover" alt="shoe" />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] sm:text-[14px] font-bold">{oderItems?.productName}</p>
                                                    <p className="text-[11px] text-slate-400 font-medium">shop: {oderItems?.shopName} </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-700">$500</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-700 text-center">{oderItems?.quantity === 0 ? '2' : '1'}</td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">${oderItems?.totalPrice}</td>

                                        </tr>
                                    })}


                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 border-t border-slate-100 flex justify-end">
                            <div className="w-48 space-y-2">
                                <div className="flex justify-between text-xs font-bold text-slate-400">
                                    <span>Subtotal:</span>
                                    <span className="text-slate-600">${totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-slate-400">
                                    <span>Shipping:</span>
                                    <span className="text-slate-600">${OderDetailsInformation?.shippingFee}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-slate-200">
                                    <span className="text-sm font-bold">Total</span>
                                    <span className="text-lg font-black text-slate-900">${totalAmount + OderDetailsInformation?.shippingFee}</span>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                {/* RIGHT COLUMN: Status & Activity */}
                <div className="space-y-6">

                    {/* Fulfillment Status Card */}
                    <div className="bg-white rounded-2xl  border border-slate-100 overflow-hidden ">

                        <div className="flex bg-[#E3EFFB] items-center gap-2 p-4 text-[#0288D1] font-bold text-sm sm:text-[20px] mb-6">
                            <Truck size={18} /> Fulfillment Status
                        </div>

                        {/* Progress Bar Logic */}
                        <div className='px-4   pb-5'>
                            <div className="relative pt-2 w-full">


                                <div className="h-1.5 w-full bg-[#F0F4F8] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ease-out ${config.color}`}
                                        style={{ width: config.width }}
                                    />
                                </div>
                                <div className="flex justify-between w-full">
                                    {['PENDING', 'ORDER_CONFIRMED', 'SHIPPED', 'DELIVERED'].map((label, i) => {
                                        const isPast = (i === 0) || (i === 1 && OderDetailsInformation.status !== 'PENDING') || (i === 2 && OderDetailsInformation.status === 'ORDER_CONFIRMED') || (i === 2 && OderDetailsInformation.status === 'SHIPPED') || (i === 2 && OderDetailsInformation.status === 'DELIVERED');
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
                            <div className="pt-4 border-t border-slate-50">
                                <p className="text-sm font-bold text-slate-800">Total: ${totalAmount + OderDetailsInformation?.shippingFee}</p>
                            </div>
                        </div>


                    </div>

                    {/* Activity Log Card */}
                    <div className="bg-white rounded-xl  border border-slate-100 overflow-hidden p-6">
                        <div className="flex items-center gap-2 text-[#135B91] font-bold text-sm sm:text-[20px]  mb-6">
                            <Activity size={18} /> Activity Log
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg sm:text-[24px]  font-extrabold  text-slate-900 leading-tight">Arriving Today</h4>
                            <p className="text-[11px] sm:text-[13px] font-bold text-slate-800">Estimated : 2:00 PM - 4:00 PM</p>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-6 relative before:absolute before:inset-0 before:left-2.75 before:w-0.5 before:bg-slate-100 before:h-full">
                            {/* Order Pending */}
                            <div className="relative flex gap-4 items-start pl-8">
                                <CheckCircle2
                                    size={24}
                                    className={`absolute left-0 bg-white ${OderDetailsInformation?.status === "PENDING" ? 'text-amber-300' :
                                            OderDetailsInformation?.status === "ORDER_CONFIRMED" || OderDetailsInformation?.status === "SHIPPED" || OderDetailsInformation?.status === "DELIVERED"
                                                ? 'text-amber-300'  // past steps also colored amber
                                                : 'text-slate-300'
                                        }`}
                                />
                                <span className="text-sm font-bold text-slate-800">Order Pending</span>
                            </div>

                            {/* Order Confirmed */}
                            <div className="relative flex gap-4 items-start pl-8">
                                <CheckCircle2
                                    size={24}
                                    className={`absolute left-0 bg-white ${OderDetailsInformation?.status === "ORDER_CONFIRMED" || OderDetailsInformation?.status === "SHIPPED" || OderDetailsInformation?.status === "DELIVERED"
                                            ? 'text-blue-500'
                                            : 'text-slate-300'
                                        }`}
                                />
                                <span className="text-sm font-bold text-slate-800">Order Confirmed</span>
                            </div>

                            {/* Shipped */}
                            <div className="relative flex gap-4 items-start pl-8">
                                <Package
                                    size={24}
                                    className={`absolute left-0 bg-white ${OderDetailsInformation?.status === "SHIPPED" || OderDetailsInformation?.status === "DELIVERED"
                                            ? 'text-blue-500'
                                            : 'text-slate-400'
                                        }`}
                                />
                                <span className="text-sm font-bold text-slate-800">Shipped</span>
                            </div>

                            {/* Delivered */}
                            <div className="relative flex gap-4 items-start pl-8">
                                <Home
                                    size={24}
                                    className={`absolute left-0 bg-white ${OderDetailsInformation?.status === "DELIVERED"
                                            ? 'text-green-600'
                                            : 'text-slate-400'
                                        }`}
                                />
                                <span className="text-sm font-bold text-slate-800">Delivered</span>
                            </div>


                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default OderDetails;