import React, { useState, useRef, type ChangeEvent, useEffect } from 'react';
import { Upload, X, Smartphone, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useAppDispatch } from '../../../redux/hook';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { AddNewBannerThunk, DeleteBannerThunk, getBannerThunk } from '../../../redux/features/Banner/banner.thunk';
import { toast } from 'sonner';

interface Banner {
  url: string;
  name: string;
  createdAt?: string;
  imageUrl?: string | undefined;
  updatedAt?: string;
  isActive?: boolean;
  __v?: string;
  _id: string;

}



const Banner: React.FC = () => {


  const [banners, setBanners] = useState<Banner[]>([]);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = AuthReduxHook()


  const distpatch = useAppDispatch()

  useEffect(() => {
    const getBannerData = async () => {
      if (token) {
        const res = await distpatch(getBannerThunk({ token }));
        setBanners(res?.payload?.data)
      }
    }
    getBannerData()

  }, [token, distpatch])




  // 1. Handle Instant Preview when selecting image
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setTempPreview(objectUrl);
    }
  };

  // 2. Mock upload function to add to the bottom gallery
  const handleUpload = async () => {
    if (tempPreview && selectedFile) {
      const newBanner: Banner = {
        _id: Math.random().toString(36).substr(2, 9),
        url: tempPreview,
        name: selectedFile.name,
      };
      setBanners([newBanner, ...banners]);

      if (selectedFile && token) {
        const result = await distpatch(AddNewBannerThunk({ token, image: selectedFile }))
        if (result.meta.requestStatus == 'fulfilled') {
          const res = await distpatch(getBannerThunk({ token }));
          setBanners(res?.payload?.data)
          return toast.success('Banner Added Successfully!')
        }
        else if (result.meta.requestStatus == 'rejected') {
          return toast.error("Banner Doesn't Added!")
        }
      }
      // Reset upload state
      setTempPreview(null);
      setSelectedFile(null);
    }
  };

  // 3. Remove banner from gallery
  const removeBanner = async (id: string) => {

    try {
      const deleteRes = await distpatch(DeleteBannerThunk({ token, id }))
      console.log(deleteRes)
      if (deleteRes.meta.requestStatus == 'fulfilled') {
        const res = await distpatch(getBannerThunk({ token }));
        setBanners(res?.payload?.data)
        return toast.success("Bannar Deleted!")
      } else if (deleteRes.meta.requestStatus == 'rejected') {
        return toast.error("Banner Doesn't Delete!")
      }
    }
    catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="p-2 md:p-8 bg-gray-50 ">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Banner Management</h1>
          <p className="text-gray-500">Upload and manage onboarding screen banners</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Side: Upload Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Upload New Banner</h3>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Upload className="text-blue-600 w-6 h-6" />
                </div>
                <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm mt-1">PNG, JPG or WebP (Recommended: 1080x1920)</p>
              </div>

              {tempPreview && (
                <button
                  onClick={handleUpload}
                  className="w-full mt-4 bg-[#2289C9] text-white py-3 rounded-xl font-semibold hover:bg-[#2289C9] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" /> Confirm & Post Banner
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Instant Mobile Preview */}
          <div className="flex flex-col items-center">
            <div className="sticky top-8 ">
              <div className="flex items-center gap-2 mb-4 text-gray-600 font-medium">
                <Smartphone className="w-5 h-5" />
                <span>Live App Preview</span>
              </div>

              {/* Phone Frame */}
              <div className="relative  w-80 h-145 bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>

                {/* Screen Content */}
                <div className="w-full h-full  bg-gray-100 relative">
                  {tempPreview ? (
                    <img src={tempPreview} alt="Preview" className="w-100 mx-auto  h-1/2 top-[25%] absolute     " />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6 text-center">
                      <ImageIcon className="w-12  h-12 mb-2 opacity-20" />
                      <p className="text-sm">Select an image to see it live in the app frame</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* Bottom Section: Gallery */}
        <section className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Published Banners</h3>
          {banners?.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-400">
              No banners uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
              {banners?.map((banner) => (
                <div
                  key={banner._id}
                  className="group relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200"
                >
                  {/* Banner Image */}
                  <img
                    src={banner.imageUrl}
                    alt={banner.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay - Always visible slightly for text readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Actions Overlay - Hidden by default, shown on hover */}
                  <div className="absolute inset-0 flex items-start justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2.5 group-hover:translate-y-0">
                    <button
                      onClick={() => removeBanner(banner._id)}
                      className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-500 hover:scale-110 transition-all duration-300 shadow-2xl border border-white/30"
                      title="Remove Banner"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content Section - Clean & Floating */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 overflow-hidden">
                        <p className="text-white text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                          Banner Asset
                        </p>
                        <h3 className="text-white text-sm md:text-base font-semibold truncate drop-shadow-md">
                          {banner.name}
                        </h3>
                      </div>

                      {/* Optional: Small tag for status or type */}
                      <span className="px-2 py-1 bg-blue-500 text-white text-[9px] font-black rounded-md uppercase shadow-lg shadow-blue-500/40">
                        Live
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Banner;