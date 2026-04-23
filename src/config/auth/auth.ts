


// type user
export type TUser = {
  user: {
    _id: string,
    fullName: string,
    email: string,
    role: 'BUYER' | 'SELLER' | 'ADMIN',
    isEmailVerified: boolean,
    createdAt: string,
    updatedAt: string,
    _v: number
  }
  accessToken: string
}



// type auth
export type TAuth = {
  user: TUser | null,
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}



// Login request type
export type LoginPayload = {
  email: string;
  password: string;
  loginAs?: "ADMIN";
};



// recentoderType
export interface TRecentOders {
  orderId: string,
  status: string,
  totalPrice: number,
  buyer: {
    id: string,
    name: string,
    email: string
  },
  seller: {
    id: string,
    shopName: string
  },
  createdAt: string
}






export type DashboardData = {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalPendingProducts: number;
  recentShops: recentShops[];
};

export type ShopStatus = "PENDING" | "APPROVED" | "REJECTED";

export type recentShops = {
  id: string;
  name: string;
  status: ShopStatus;
  logoUrl: string | null;
  productCount: number;
  createdAt: string; // ISO date string
};



// ১. ব্রান্ডিং সংক্রান্ত ইন্টারফেস
interface TBranding {
  logoUrl: string;
  bannerUrl: string;
}


interface TDocuments {
  nationalId: string;
  companyRegistration: string;
  taxDocument: string;
}


interface TUserId {
  _id: string;
  fullName: string;
  email: string;
}


export interface TShopData {
  _id: string;
  userId: TUserId;
  branding: TBranding;
  documents: TDocuments;
  shopName: string;
  shopCategory: string;
  businessType: "INDIVIDUAL" | "COMPANY"; 
  shopDescription: string;
  country: string;
  city: string;
  businessAddress: string;
  pickupLocation: string;
  phoneNumber: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  __v: number;
}