import { useQuery } from '@tanstack/react-query';
import {
  Home,
  Mail,
  MapPin,
  Phone,
  Star
} from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router';
import { createAxiosSecure } from '../../../axios/axiosSequre';
import ActionLoading from '../../../components/Loading/ActionLoading';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import CopyEmail from './CopyEmail';

const ShopDetails: React.FC = () => {



  const shopData = {
    name: "Techzone Electronics",
    location: "New york city, United States",
    rating: 4.5,
    reviewCount: 245,
    followers: "2,451",
    description: "Welcome to TechZone Electronics! Explore our wide range of top-quality gadgets, including smartphones, laptops, smart home devices, and gaming accessories. We offer the latest tech at competitive prices with excellent customer service. Shop with confidence and upgrade your tech today!",
    stats: [
      { label: "TOTAL SALES", value: "$32,000" },
      { label: "RATING", value: "4.9", isRating: true },
      { label: "PRODUCTS", value: "412" },
      { label: "RETURNS", value: "1.2%" },
    ],
    contact: {
      email: "Support152@gmail.com",
      phone: "+1 (555) 5585 8588956",
      headquarters: "123 ECO Friendly Way, Portland, OR 97204"
    }
  };

  const { id } = useParams();
  

  const { token } = AuthReduxHook();
  const axiosSecure = createAxiosSecure(token);

  const { data: details, isLoading, error, } = useQuery({
    queryKey: ["shop_details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/shops/${id}`);
      return res.data;
    },
  });


  if (isLoading) {
    return <div className='flex justify-center min-h-[90vh] items-center'>
      <ActionLoading></ActionLoading>
    </div>
  }
  if (error) {
    return <div className='flex justify-center min-h-[90vh] items-center'>
      <h1 className='text-red-500'>Something Error</h1>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 md:bg-gray-100  flex justify-center items-start">

      <div className="w-full  bg-white md:rounded-2xl  overflow-hidden relative md:border md:border-gray-200">



        <div className="relative">
          <div className=" h-[20vh] sm:h-[50vh] w-full overflow-hidden">
            <img
              src={details?.data?.branding?.bannerUrl}
              alt="Shop Banner"
              className="w-full h-full object-cover"
            />
          </div>


          <div className="px-6 pb-6">
            <div className="flex items-end -mt-12 md:-mt-16 mb-4">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                <img
                  src={details?.data?.branding?.logoUrl}
                  alt="Shop Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{details?.data?.shopName}</h1>
                <h1 className="text-2xl md:text-[18px] font-extrabold text-gray-900">{details?.data?.shopCategory}</h1>
                <div className="flex items-center text-gray-500 text-sm gap-1 font-medium">
                  <MapPin size={16} />
                  <span> {details?.data?.businessAddress} ,{details?.data?.city} , {details?.data?.country}</span>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{shopData.rating}</span>
                  <span className="text-xs text-gray-400 font-medium">({shopData.reviewCount} Reviews)</span>
                </div>
                <span className="text-sm font-bold text-blue-600">{shopData.followers} followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="px-6 py-4 border-t border-gray-50">
          <h3 className="font-bold text-gray-900 mb-2 text-lg">Description</h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
            {details?.data?.shopDescription}
          </p>
        </div>

        {/* Stats Grid: Desktop এ 4 কলাম, Mobile এ 2 কলাম */}
        <div className="px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {shopData.stats.map((stat, index) => (
            <div key={index} className="bg-blue-50/40 border border-blue-100/50 rounded-xl p-4 text-center hover:bg-blue-50 transition-colors">
              <p className="text-[11px] font-bold text-blue-500/80 mb-1 tracking-widest ">{stat.label}</p>
              <div className="flex justify-center items-center gap-1">
                <span className="text-xl font-bold text-gray-800">{stat.value}</span>
                {stat.isRating && <Star size={18} fill="#FACC15" className="text-yellow-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information Section */}
        <div className="px-6 py-8 border-t border-gray-100 bg-gray-50/30">
          <h3 className="font-bold text-gray-900 mb-6  text-sm tracking-[0.2em]">Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Email */}
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Mail size={20} />
              </div>

              <CopyEmail supportEmail={details?.data?.userId?.email}></CopyEmail>

            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-gray-400  tracking-wider">Phone Number</p>
                <p className="text-sm font-bold text-gray-700">{details.data.phoneNumber}</p>
              </div>
            </div>

            {/* Headquarters (Full width on Desktop) */}
            <div className="flex items-center gap-4 group md:col-span-2">
              <div className="h-12 w-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Home size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-gray-400  tracking-wider">Headquarters</p>
                <p className="text-sm font-bold text-gray-700 leading-tight">
                  {details.data.userId.email}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopDetails;