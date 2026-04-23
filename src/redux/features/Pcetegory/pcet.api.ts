// pcet.api.ts
import axios from "axios";
import { createAxiosSecure } from "../../../axios/axiosSequre";

interface FetchCategoriesArgs {
  token: string | null;
  page?: number | null;
}

// GET categories
export const getCategoriesApi = async ({ token, page }: FetchCategoriesArgs) => {
  if (!token) throw new Error("Token missing");

  const axiosSe = createAxiosSecure(token);
  const url = page
    ? `admin/categories?type=PRODUCT&limit=10&page=${page}`
    : `admin/categories?type=PRODUCT`;

  const res = await axiosSe.get(url);
  return res;
};

// ADD category

export type CategoryType = "PRODUCT" | "SHOP";
interface IProductCategory {
  token: string | undefined;
  image: File;
  name: string;
  type :CategoryType
}

export const addNewCategoryApi = async ({ token, image, name , type  }: IProductCategory) => {
  if (!token) throw new Error("Token missing");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  console.log(type , 'ty[peeeee')

  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}admin/products/add-category?type=${type}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

// UPDATE category
interface IUpdateCategory {
  token: string | undefined;
  _id: string;
  name: string;
  image?: File;
}

export const updateCategoryApi = async ({ token, _id, name, image }: IUpdateCategory) => {
  if (!token) throw new Error("Token missing");

  const formData = new FormData();
  formData.append("name", name);
  if (image) formData.append("image", image);

  const res = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}admin/categories/${_id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
