import { useQuery } from '@tanstack/react-query';
import { Calendar, Locate, ShieldCheck, User, X } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import nidImage from '../../../assets/Nid.png';
import document2 from '../../../assets/document1.png';
import icon2 from '../../../assets/documentIcon.png';
import nidIcon from '../../../assets/nidDocument.png';
import icon3 from '../../../assets/nidIcon3.png';
import tax from '../../../assets/tax.png';
import verify from '../../../assets/verify.png';
import { createAxiosSecure } from '../../../axios/axiosSequre';
import ActionLoading from '../../../components/Loading/ActionLoading';
import { toast } from 'sonner';



const images = [
    { id: "nationalId", src: nidImage, icon: nidIcon, label: "NID" },
    { id: "companyRegistration", src: document2, icon: icon2, label: "Document" },
    { id: "taxDocument", src: tax, icon: icon3, label: "Tax" }, // NEW
]


export default function SellerDetailsPage() {

    const [activeIndex, setActiveIndex] = useState<string>("nationalId")
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [rejectId, setRejectedId] = useState<string>("")
    const [submit, setSubmitting] = useState<boolean>(false)
    const { token } = AuthReduxHook()


    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const { id } = useParams();

    const axiosSecure = createAxiosSecure(token);

    const { data: details, isLoading, error, refetch } = useQuery({
        queryKey: ["shop_details", id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/shops/${id}`);
            return res?.data?.data;
        },
    });

    console.log(details)



    // shop status chnage
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
                res = await axiosSecure.patch(url, { reason: inputValue });

            }
            else {
                res = await axiosSecure.patch(url)
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


    if (isLoading) {
        return <div className='flex justify-center min-h-[90vh] items-center'>
            <ActionLoading></ActionLoading>
        </div>
    }
    if (error) {
        console.log(error)
        return <div className='flex justify-center min-h-[90vh] items-center'>
            <h1 className='text-red-500'>Something Error</h1>
        </div>
    }

    return (
        <div>

            <div className='flex justify-between'>
                <div>
                    <h1 className='text-[24px] font-semibold'>Shop Verification</h1>
                    <h1 className='text-[12px] sm:text-[15px] '>Shop Management / View Details / Application #KYC-1254</h1>
                </div>
                <div className='flex items-end'>
                    <h1 className="text-[10px] sm:text-[12px]">
                        Submitted: {details?.createdAt
                            ? new Date(details.createdAt).toLocaleString("en-US", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })
                            : "N/A"
                        }
                    </h1>
                </div>



            </div>

            <div className='flex justify-between lg:flex-row flex-col gap-x-6 my-5 gap-y-5 sm:gap-y-0' >

                <div className="bg-[#333333] px-9.75 py-25 sm:py-44.75 rounded-3xl flex flex-col gap-y-7 lg:w-1/2">


                    <div className="flex justify-center items-center">
                        <img
                            className=" sm:h-[40vh] rounded-xl"
                            // src={images[activeIndex].src}
                            src={details?.documents[activeIndex]}
                            alt=""
                        />
                    </div>


                    <div className="flex justify-center items-center">
                        <div className="flex gap-x-2.5">

                            {images?.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setActiveIndex(item.id)}
                                    className={`
                bg-[#989898] rounded-lg p-4.25 cursor-pointer
                ${activeIndex === item.id ? "border-2 border-sky-500" : "border-2 border-transparent"}
              `}
                                >
                                    <img src={item.icon} alt={item.label} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>


                <div className='lg:w-1/2'>

                    <div className="bg-white p-4 lg:p-10 rounded-2xl border border-gray-100  w-full  h-full mx-auto ">

                        {/* Header with Back Button */}
                        <div className="flex items-center mb-5 border-b border-gray-50">
                            <div className="flex items-center gap-1 ">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer text-gray-500">
                                    <img src={verify} alt="" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Identity verification</h2>

                                </div>
                            </div>

                        </div>

                        <h1>Personal Details</h1>

                        {/* Grid Layout for Details */}
                        <div className="grid mt-4    grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-5">

                            {/* Full Name */}
                            <div className="flex flex-col col-span-2 sm:col-span-1 gap-y-2.5 ">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <User size={14} /> First Name
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    {details.userId.fullName}
                                </div>
                            </div>


                            <div className="flex col-span-2 sm:col-span-1  flex-col gap-y-2.5 ">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <User size={14} /> Last Name
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    {details.userId.fullName}
                                </div>
                            </div>

                            {/* Joining Date */}
                            <div className="flex flex-col gap-y-2.5 col-span-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <Locate size={14} /> Full Address
                                </label>
                                <div className="p-3.5  bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    {details?.businessAddress}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex col-span-2 sm:col-span-1 flex-col gap-y-2.5">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <Calendar size={14} /> Date of Birth
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    {details?.city}  {details?.country}
                                </div>
                            </div>

                            {/* Total Products */}
                            <div className="flex col-span-2 sm:col-span-1 flex-col gap-y-2.5">
                                <label className="flex items-center gap-2 text-[12px] text-gray-400  t">
                                    <ShieldCheck size={14} />  ID Number
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700  ">
                                    {details._id}
                                </div>
                            </div>
                            <h1 className='col-span-2'>Business Info</h1>


                            <div className="flex flex-col gap-y-2.5 col-span-2">
                                <label className="flex items-center gap-2 text-[12px] text-gray-400  t">
                                    Business Name
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl font-semibold ">
                                    {details?.shopName}
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2.5 col-span-2">
                                <label className="flex items-center gap-2 text-[12px]  text-gray-400  ">
                                    Shop-Category
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl  ">
                                    {details?.shopCategory}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className=" pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center gap-4">

                            {
                                details?.status == 'APPROVED' ? <button onClick={() => {
                                    setRejectedId(id as string)
                                    handleOpen()
                                }} className="w-full  px-8 py-3  text-red-500 rounded-xl hover:bg-gray-200 border-2 border-red-400 transition-all cursor-pointer ">
                                      {
                                        submit ? "Submitting.." : "Rejected"
                                    }
                                </button> : <button onClick={()=>{
                                    shopStatusChange("APPROVED" , id as string)
                                }} className="w-full  border px-8 py-3 bg-[#128635]  rounded-xl  text-white transition-all cursor-pointer shadow-blue-100">
                                    
                                    {
                                        submit ? "Submitting.." : "Approve"
                                    }
                                </button>
                            }


                        </div>
                    </div>
                </div>



            </div>






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
    )
}
