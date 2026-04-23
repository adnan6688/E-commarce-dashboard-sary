import { useQuery } from '@tanstack/react-query';
import { Filter, Star, Store, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import sneakers from '../../../assets/sneakers.jpg';
import { createAxiosSecure } from '../../../axios/axiosSequre';
import ActionLoading from '../../../components/Loading/ActionLoading';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { getCategoriesApi } from '../../../redux/features/Pcetegory/pcet.api';
import { getProductApi } from '../../../redux/features/Products/product.thunk';
import type { TProduct } from '../../../redux/features/Products/productSlice';
import type { IProductCategory, Tmeta } from '../Catalog/Catalog';


interface Product {
  id: string;
  name: string;
  seller: string;
  price: string;
  sku: string;
  image: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const Product: React.FC = () => {

  // const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token } = AuthReduxHook()
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | undefined>(undefined);
  const [catId, setCatId] = useState<string | undefined>(undefined)
  const [metaInfo, setMetaInfo] = useState<Tmeta | null>(null)
  const axiosSequre = createAxiosSecure(token)

  const [searchTerm, setSearchTerm] = useState("");




  // Handle smooth transition timing
  const openModal = (product: TProduct) => {
    setSelectedProduct(product);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedProduct(null), 1000); // Wait for transition to finish
  };




  // all products get

  const { data: allProducts = [], isLoading: ProductLoading, refetch } = useQuery({
    queryKey: ['products', status, catId, page, searchTerm],
    queryFn: async () => {
      if (!token) return [];

      let response;

      if (searchTerm) {
        // seaerch vlaue found
        response = await axiosSequre.get(`/admin/products?limit=8&page=${page}&search=${searchTerm}`);
      } else {
        // search not found thakle
        response = await getProductApi({ token, page, status, category: catId });
      }

      if (response?.data?.meta) {
        setMetaInfo(response.data.meta);
      }

      return response?.data?.data || response?.data || [];
    },

    enabled: !!token, // টোকেন না থাকলে কল হবে না
  });


  // categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!token) return [];
      return (await getCategoriesApi({ token })).data.data;
    },
    enabled: !!token,
  });


  const isPrevDisabled = page <= 1;
  const isNextDisabled = !allProducts?.length || allProducts.length < 8;


  // update producte status  fn 
  const approvedReject = async (status: string, id: string) => {


    if (!id) {
      return "product Id not found"
    }

    try {

      const res = await axiosSequre.patch(`/products/update-status/${id}`, {
        status: status
      })

      if (res.data.success) {
        toast.success(`product ${status.toLocaleLowerCase()} successfully!`)
        refetch()
      }
    } catch (err) {
      console.log(err)
    }


  }





  return (
    <div className=" md:p-8  min-h-screen relative">
      {/* Header & Description */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Product Moderation</h1>
        <p className="text-sm text-gray-500">Review and manage vendor product listings pending approval.</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C1E0F6] text-black rounded-lg font-bold text-sm">
          <Filter size={16} /> Filter
        </button>

        <div className="relative">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCatId(undefined)
              setStatus(e.target.value as "PENDING" | "APPROVED" | undefined)
            }

            }
            className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer bg-white text-gray-700 outline-none transition-all hover:border-sky-400 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 font-semibold"
          >
            <option value="">All Products</option>
            <option value="PENDING">Status : Pending</option>
            <option value="APPROVED">Status : Approved</option>
          </select>


          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            onChange={(e) => {
              setStatus(undefined)
              setCatId(e.target.value)
            }}
            className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm  cursor-pointer bg-white text-gray-700 outline-none transition-all hover:border-sky-400 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 font-semibold"
          >

            {
              categories?.map((item: IProductCategory) => {
                return <option key={item?._id} value={item?._id}>Status : {item?.name}</option>
              })
            }
          </select>


          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>


        <div className=" flex-1 flex gap-2 max-w-md">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product..."
            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm outline-none focus:ring-2 bg-white focus:ring-gray-500 font-semibold"
          />

        </div>

      </div>

      {/* Grid Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[14px] sm:text-xl font-bold text-gray-800"> {status && status.toLocaleLowerCase()} products ({metaInfo && metaInfo.total})</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">
            Page <strong>{page}</strong> — Showing <strong>{allProducts?.length}</strong> products
          </span>
          <button
            disabled={isPrevDisabled}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className={`border px-3 py-1.5 rounded-lg text-sm font-bold transition-all
      ${isPrevDisabled
                ? "cursor-not-allowed opacity-50 text-gray-400"
                : "cursor-pointer text-[#2289C9] hover:bg-white hover:scale-95"}
    `}
          >
            Previous
          </button>

          {/* Next */}
          <button
            disabled={isNextDisabled}
            onClick={() => setPage(prev => prev + 1)}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all
      ${isNextDisabled
                ? "cursor-not-allowed opacity-50 bg-gray-400"
                : "cursor-pointer bg-[#2289C9] text-white hover:scale-95"}
    `}
          >
            Next
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          ProductLoading ? (

            <div className="col-span-full flex justify-center py-20">
              <ActionLoading />
            </div>
          ) : allProducts && allProducts.length > 0 ? (

            allProducts.map((product: TProduct) => (
              <div
                key={product?._id}
                className="bg-sky-100 rounded-xl border border-gray-100 overflow-hidden group flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative w-full h-48 md:h-56 bg-[#A5C9E1] flex items-center justify-center overflow-hidden">
                  <span className={`absolute top-3 z-20 right-3 ${product?.approvalStatus === "PENDING" ? "bg-yellow-400" : "bg-green-600"} text-white text-[10px] font-bold px-3 py-1 rounded-full`}>
                    {product?.approvalStatus === "PENDING" ? "Pending" : "Approved"}
                  </span>

                  <img
                    src={product.media?.gallery?.[0] || sneakers}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col grow justify-between space-y-3">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-1 font-semibold text-gray-700 text-[14px] mt-1">
                        <Store size={18} /> {product?.category?.name}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-gray-900">${product?.pricing?.basePrice}</span>
                      <span className={`text-[12px] font-bold text-gray-800 px-2 py-1 rounded-full tracking-tighter ${product.isActive ? "bg-green-200" : "bg-red-200"}`}>
                        {product.isActive ? "Active" : "Block"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => openModal(product)}
                      className="w-full cursor-pointer py-2 bg-[#2289C9] text-white rounded-lg text-sm font-bold hover:bg-sky-900 transition-colors"
                    >
                      View Details
                    </button>

                    {product?.approvalStatus === "PENDING" && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => approvedReject("APPROVED", product._id)}
                          className="py-2 cursor-pointer bg-[#128635] text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => approvedReject("REJECTED", product._id)}
                          className="py-2 bg-[#DF2A16] cursor-pointer text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (

            <div className='flex flex-col justify-center items-center col-span-full py-20 opacity-50'>
              <h1 className="text-xl font-bold text-gray-500 tracking-tight">Items Not Found</h1>
              <p className="text-sm text-gray-400">Try adjusting your filters or check back later.</p>
            </div>
          )
        }
      </div>




      {selectedProduct && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-1000 ease-in-out ${isModalVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Backdrop/Blur - Click to close */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={closeModal}
          ></div>

          {/* Modal Content Container */}
          <div
            className={`relative bg-white w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-in-out transform ${isModalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
              } max-h-[95vh] flex flex-col`}
          >
            {/* Close Button - Sticky for Mobile */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md shadow-md rounded-full hover:bg-white transition-colors"
            >
              <X size={24} className="text-gray-800 cursor-pointer" />
            </button>

            {/* Internal Scrollable Wrapper */}
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                {/* Left Side - Image & Product Intro (Mobile: First) */}
                <div className="lg:col-span-5 bg-[#A5C9E1] p-6 sm:p-8 flex flex-col justify-center min-h-87.5 sm:min-h-0">
                  <div className="flex-1 flex items-center justify-center py-4">
                    {
                      selectedProduct.media?.gallery.length ? <img
                        src={selectedProduct.media.gallery[0]}
                        alt="Sneaker"
                        className="w-full max-w-70 sm:max-w-full object-contain mix-blend-multiply drop-shadow-2xl"
                      /> : <img
                        src={sneakers}
                        alt="Sneaker"
                        className="w-full max-w-70 sm:max-w-full object-contain mix-blend-multiply drop-shadow-2xl"
                      />
                    }


                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xl sm:text-2xl font-black text-gray-900">${selectedProduct?.pricing?.basePrice}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs sm:text-sm font-bold text-gray-700">(250 Reviews)</span>
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-800">4.5</span>
                      </div>
                    </div>

                    {/* Sizes */}
                    <div className="mt-4 flex gap-2 flex-wrap no-scrollbar pb-2">


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProduct?.variants?.map((variant, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-3 bg-white/50 border-white/30 shadow-sm flex justify-between items-center"
                          >
                            {/* LEFT: Dynamic attributes */}
                            <div className="text-sm space-y-1">
                              {variant.attributes &&
                                Object.entries(variant.attributes).map(([key, value]) => (
                                  <p key={key} className="capitalize text-xs text-gray-800 font-medium">
                                    {key}: <span className="text-gray-600">{String(value)}</span>
                                  </p>
                                ))}

                              <p className="text-xs text-gray-500">SKU: {variant.sku}</p>
                            </div>

                            {/* RIGHT: Price & Stock */}
                            <div className="text-right text-sm">
                              <p className="font-bold text-blue-600">৳{variant.price}</p>
                              <p
                                className={`text-xs ${variant.stock <= 10 ? "text-red-500" : "text-green-600"
                                  }`}
                              >
                                Stock: {variant.stock}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Shop Info Card */}
                    <div className="mt-6 bg-white/60 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between border border-white/40">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold italic shadow-lg">Z</div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Official Sneakers Store</p>
                          <p className="text-[11px] font-semibold text-gray-600">Verified Seller • 250 Sales</p>
                        </div>
                      </div>
                      <button className="bg-[#E97F3E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-95 transition-transform">
                        View Shop
                      </button>
                    </div>
                  </div>
                </div>

                {/* Middle Side - Specs (Mobile: Second) */}
                <div className="lg:col-span-3 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white">
                  <h4 className="font-bold text-gray-900 text-lg mb-3">Description</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-8">
                    {
                      selectedProduct?.description
                    }
                  </p>

                  <h4 className="font-bold text-gray-900 text-lg mb-4">Specifications</h4>
                  <div className="space-y-4">
                    {[
                      ['stock', selectedProduct?.inventory?.stock],
                      ['Shope Name', selectedProduct?.shop?.shopName],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">{label}</span>
                        <span className={`font-bold text-gray-800 text-xs`}>{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Status</span>
                      <span className={`font-bold text-gray-800 text-xs ${selectedProduct?.approvalStatus == "PENDING" ? 'bg-yellow-400 rounded-l-full rounded-r-full px-3 py-1' : 'bg-green-500 px-3 py-1 rounded-l-full rounded-r-full'} `}>{selectedProduct?.approvalStatus}</span>
                    </div>

                    <div>
                      <h1 className='text-black font-bold'>Category :  </h1>
                      <div>

                        <div className='flex justify-between '>
                          <h1> {selectedProduct?.category?.name} </h1>
                          <img className='w-28 h-28' src={selectedProduct?.category?.imageUrl} alt="" />
                        </div>

                      </div>
                    </div>




                  </div>
                </div>

                {/* Right Side - Reviews (Mobile: Last) */}
                <div className="lg:col-span-4 p-6 sm:p-8 bg-gray-50/80">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-gray-900 text-lg">Reviews (42)</h4>
                    <button className="text-xs font-bold text-[#2289C9]">Write a Review</button>
                  </div>

                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-orange-600 text-xs">WJ</div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">William Johnson</p>
                              <div className="flex text-yellow-400 gap-0.5 mt-0.5">
                                {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 ">10 Dec</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-normal mb-4">
                          Extremely comfortable for long runs. The cushioning is exactly what I needed.
                        </p>
                        <div className="flex gap-2">

                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-3  cursor-pointer rounded-2xl text-sky-600 text-sm font-bold hover:bg-gray-100 transition-colors">
                    Load More.....
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;