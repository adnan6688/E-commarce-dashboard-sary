import React, { useEffect, useRef, useState } from 'react';
import { Plus, ChevronRight, Edit3, Upload, X, ChevronLeft } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { toast } from 'sonner';
import { getCategoriesApi, addNewCategoryApi, updateCategoryApi, type CategoryType } from '../../../redux/features/Pcetegory/pcet.api';
import ActionLoading from '../../../components/Loading/ActionLoading';

interface IUpdate {
  _id: string;
  image: string;
  name: string;
}

export interface Tmeta {
  total: number,
  page: number,
  limit: number,
  totalPages: number
}

export interface IProductCategory {
  _id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  type: "PRODUCT" | "SHOP" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Catalog: React.FC = () => {
  const { token } = AuthReduxHook();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cetName, setCetName] = useState<string>(""); // Initialize as empty string
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("Create Category");
  const [modalSubtitle, setModalSubtitle] = useState<string>("");
  const [updateCategoryInfo, setUpdateCategoryinfo] = useState<IUpdate | null>(null);
  const [metaInfo, setMetaInfo] = useState<Tmeta | null>(null)
  const [cetaType, setCetatype] = useState<CategoryType>("PRODUCT");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjusted from 2 for better UI, keep as 2 if intended

  const queryClient = useQueryClient();

  // ===================== GET categories =====================
  const { data: categories = [], isLoading } = useQuery<IProductCategory[]>({
    queryKey: ['categories', currentPage],
    queryFn: async () => {
      if (!token) return [];
      const response = await getCategoriesApi({ token, page: currentPage });
      setMetaInfo(response?.data?.meta)
      return response.data.data || [];
    },
    enabled: !!token,
  });


  const totalPages = metaInfo && Math.ceil(metaInfo?.total / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;

  // ===================== Mutations =====================
  const addCategoryMutation = useMutation({
    mutationFn: (newCategory: { image: File; name: string; type: CategoryType }) =>
      addNewCategoryApi({ token: token as string, ...newCategory }),

    onSuccess: () => {
      toast.success('Product Category Created Successfully!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleCloseModal();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to create category');
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (updateData: { _id: string; name: string; image?: File }) =>
      updateCategoryApi({ token: token as string, ...updateData }),
    onSuccess: () => {
      toast.success('Update Category Successfully!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleCloseModal();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err?.message || "Doesn't Update!!");
    },
  });

  // ===================== Handlers =====================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };



  const onUploadClick = () => fileInputRef.current?.click();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCetName("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setUpdateCategoryinfo(null);
  };

  const handleSubmit = () => {
    if (!token) return toast.error("Authentication token missing");

    if (modalTitle.startsWith('Create')) {
      if (!cetName || !selectedFile) return toast.error('Name and Image field is required!!');
      console.log(cetaType, "type")
      addCategoryMutation.mutate({ name: cetName, image: selectedFile, type: cetaType });
    } else {
      if (!updateCategoryInfo) return;
      updateCategoryMutation.mutate({
        _id: updateCategoryInfo._id,
        name: cetName || updateCategoryInfo.name,
        image: selectedFile || undefined,
      });
    }
  };

  useEffect(() => {
    if (modalTitle.startsWith('Create')) {
      setPreviewUrl(null);
      setCetName("");
    } else if (updateCategoryInfo) {
      setPreviewUrl(updateCategoryInfo.image);
      setCetName(updateCategoryInfo.name);
    }
  }, [updateCategoryInfo, modalTitle]);

  // Clean up preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);






  return (
    <div className="bg-[#F4F9FD] text-slate-800 relative transition-all duration-100 min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[18px] sm:text-[24px] font-bold text-slate-900 tracking-tight">
          Product Category Management
        </h1>
        <p className="text-[14px] text-slate-500 mt-1">
          Manage product taxonomy, hierarchy, and custom attributes fields.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
          <span className="text-[14px] sm:text-[18px] font-bold text-slate-900 whitespace-nowrap">
            Total Categories: {metaInfo?.total}
          </span>
          <button
            onClick={() => {
              setModalTitle('Create Category');
              setModalSubtitle('Create new product category for the marketplace');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 sm:gap-2 bg-[#2E90D1] hover:bg-[#257ab3] text-white px-2 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold text-[11px] sm:text-[14px] transition-all duration-100 active:scale-95"
          >
            <Plus size={16} className="sm:w-4.5" />
            <span className="whitespace-nowrap">Add New Category</span>
          </button>
        </div>

        <div className="flex w-full lg:max-w-md items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full bg-white border border-slate-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[16px] font-semibold outline-none focus:ring-2 focus:ring-[#D2E9F6] transition-all duration-100"
            />
          </div>
          <button className="bg-[#D2E9F6] text-[#2E90D1] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-[12px] sm:text-[14px] hover:bg-[#C1E1F5] transition-colors duration-100">
            Search
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-[#C1E0F6] border-b border-slate-200">
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700">Category Image</th>
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700">Category Name</th>
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr >
                  <td colSpan={6} className="py-10">
                    <div className="flex justify-center items-center">
                      <ActionLoading></ActionLoading>
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr >
                  <td colSpan={6} className="py-10">
                    <div className="flex justify-center items-center">
                      Not Found
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((cat: IProductCategory) => (
                  <tr key={cat._id} className="bg-[#E3EFFB]/50 hover:bg-[#E3EFFB] transition-colors duration-100">
                    <td className="px-6 py-4">
                      <img
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-sky-500 object-cover"
                        src={cat.imageUrl}
                        alt={cat.name}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-[15px]">{cat.name}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setModalTitle('Update Category');
                          setModalSubtitle('Update product category for the marketplace');
                          setUpdateCategoryinfo({ _id: cat._id, name: cat.name, image: cat.imageUrl });
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#2E90D1] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#257ab3] transition-all duration-100"
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 gap-4">
        <p className="text-sm text-slate-600 font-medium">
          {
            metaInfo && ` Showing ${metaInfo.total > 0 ? startIndex + 1 : 0} to ${Math.min(startIndex + itemsPerPage, metaInfo.total)} of ${' '}
          ${metaInfo.total} entries`
          }
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-sky-500 text-white shadow-md shadow-sky-200' : 'text-slate-600 hover:bg-sky-50'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* CREATE / UPDATE MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] transition-all duration-500 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={handleCloseModal}
      >
        <div
          className={`bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative transition-all duration-500 transform ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[20px] font-bold text-slate-900">{modalTitle}</h2>
              <p className="text-[13px] text-slate-500">{modalSubtitle}</p>
            </div>
            <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-bold text-slate-900 mb-1">Category Name</label>
              <p className="text-[12px] text-slate-400 mb-2">Name your category</p>
              <input
                value={cetName}
                onChange={(e) => setCetName(e.target.value)}
                type="text"
                placeholder="Enter Category Name"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#D2E9F6]"
              />
            </div>


            <div className="w-full border  rounded-xl p-4  shadow-md">

              <label className="block text-sm text-gray-400 mb-2">
                Select Product Shop 🛍️
              </label>

              <div className="relative">
                <select
                  value={cetaType}
                  onChange={(e) => setCetatype(e.target.value as CategoryType)}
                  className="w-full appearance-none px-4 py-3 pr-10 rounded-lg text-black border  focus:outline-none focus:ring-2 focus:ring-pink-500 transition cursor-pointer"
                >
                  <option value="PRODUCT">Product</option>
                  <option value="SHOP">Shop</option>
                </select>

                {/* Dropdown Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none">
                  ▼
                </div>
              </div>

            </div>

            {/* Upload Area */}
            <div
              onClick={onUploadClick}
              className="border-2 border-dashed border-[#D2E9F6] bg-[#F4F9FD] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#E3F2FD] transition-colors group overflow-hidden"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <img src={previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg mb-2 border-2 border-white shadow-md" />
                  {selectedFile && (
                    <p className="text-[12px] font-semibold text-[#2E90D1] truncate max-w-50">{selectedFile.name}</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 rounded-lg mb-3 text-[#2E90D1] group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-[14px] font-bold text-[#2E90D1]">Drag & drop or click to upload</p>
                  <p className="text-[12px] text-slate-400 mt-1">JPEG or PNG; Max size 1 MB</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold text-[14px] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={addCategoryMutation.isPending || updateCategoryMutation.isPending}
                onClick={handleSubmit}
                className="flex-1 bg-[#2E90D1] text-white py-3 rounded-xl font-bold text-[14px] hover:bg-[#257ab3] shadow-md shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
              >
                {addCategoryMutation.isPending || updateCategoryMutation.isPending ? 'Processing...' : modalTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;