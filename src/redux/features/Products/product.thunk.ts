

import { createAxiosSecure } from "../../../axios/axiosSequre";

interface GetProductsParams {
  token: string;
  page: number;
  status?: "PENDING" | "APPROVED";
  category?: string;
}

export const getProductApi = async ({ token, page, status, category }: GetProductsParams) => {
  try {
    let url = `admin/products?limit=8&page=${page}`;
    if (status) url += `&status=${status}`;
    if (category) url += `&category=${category}`;

    const axiosSecure = createAxiosSecure(token);
    const res = await axiosSecure.get(url);

    // Return the product array (assuming backend returns res.data.data)
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};
