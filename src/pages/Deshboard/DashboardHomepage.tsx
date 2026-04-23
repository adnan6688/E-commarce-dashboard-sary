
import { useQuery } from '@tanstack/react-query'
import { createAxiosSecure } from '../../axios/axiosSequre'
import EcomChart from '../../components/EcomChart'
import StepsChart from '../../components/StepsChart'
import type {   DashboardData, TRecentOders } from '../../config/auth/auth'
import AuthReduxHook from '../../Hook/AuthReduxHook'
import DashboardGrid from './DashboardGrid'
import RecentOrders from './RecentOrders'
import RecentSellers from './RecentSellers'
import ActionLoading from '../../components/Loading/ActionLoading'



export interface TOrder {
  buyer: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  seller: {
    id: string;
    shopName: string;
  };
  orderId: string;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalPrice: number;
  createdAt: string;
}



export interface TStats {
  success: boolean;
  data: {
    totalOrders: number;
    totalRevenue: number;
    totalUnits: number;
    orderStatusCounts: {
      PENDING: number;
      ORDER_CONFIRMED: number
      SHIPPED: number;
      DELIVERED: number;
      CANCELLED: number;
      total: number
    }
  }
}


export interface FourGrids {
  success: boolean;
  data: {
    totalOrders: number;
    totalProducts: number;
    totalSales: number;
    totalPendingProducts: number;
  }
}




export default function DashboardHomepage() {

  const { token } = AuthReduxHook()
  const axiosSequre = createAxiosSecure(token)




  // get recent stats
  const { data: StatsOfDashboard, isLoading: StatsLoading } = useQuery<FourGrids>({
    queryKey: ['statsData'],
    queryFn: (async () => {
      const res = await axiosSequre.get('admin/dashboard/stats?orderStatus=ORDER CONFIRMED')
      return res.data
    }),
    enabled: !!token
  })



  // Get RecentOders
  const { data: TopRecentOder, isLoading: RecentLoading } = useQuery<TRecentOders>({
    queryKey: ['recentOdersData'],
    queryFn: (async () => {
      const res = await axiosSequre.get('/admin/recent-orders')
      return res.data.data
    }),
    enabled: !!token
  })



  // get recent shop
  const { data: RecentShopData, isLoading: RecentShopLoading } = useQuery<DashboardData>({
    queryKey: ['recentShopeData'],
    queryFn: (async () => {
      const res = await axiosSequre.get('/admin/dashboard/stats?orderStatus=ORDER CONFIRMED')
      return res.data.data
    }),
    enabled: !!token
  })




  if (StatsLoading || RecentLoading || RecentShopLoading) {
    return <div className='flex justify-center min-h-screen items-center'>
      <ActionLoading></ActionLoading>
    </div>
  }

  return (
    <div>
      <h1 className='sm:text-[24px] font-semibold'>Welcome to the admin Dashboard!</h1>

      <div className='my-2'>
        {
          StatsOfDashboard && <DashboardGrid StatsOfDashboard={StatsOfDashboard}></DashboardGrid>
        }
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full mt-6">
        {/* Left: Chart */}
        <div className="w-full lg:w-1/2 h-[40vh] sm:h-[55vh] lg:h-[60vh] ">
          <StepsChart />
        </div>

        {/* Right: Recent Sellers */}
        <div className="w-full lg:w-1/2 h-[55vh] lg:h-[60vh] overflow-y-auto bg-white rounded-3xl">
   
          {
            RecentShopData && Array.isArray(RecentShopData.recentShops) && (
                 <RecentSellers recentShops={RecentShopData.recentShops} />
            )
          }
         
        </div>
      </div>


      <div className='flex flex-col lg:flex-row gap-4 w-full mt-6'>

        <div className='w-full lg:w-1/2'>
          {TopRecentOder && Array.isArray(TopRecentOder) && (
            <RecentOrders recentOdersData={TopRecentOder} />
          )}
        </div>
        <div className='w-full lg:w-1/2 rounded-lg'>
          <div className='flex justify-between '>
            <h1 className='font-semibold'>Oder Overview</h1>
            <button
              className="
              cursor-pointer
    group flex items-center gap-2
    text-sm font-medium text-violet-600
    px-3 py-1.5 rounded-full
    bg-violet-50/60
    hover:bg-violet-100
    transition-all duration-300
    
  "
            >
              <span>View All</span>
              <span
                className="
      text-xs opacity-0 -translate-x-1
      group-hover:opacity-100 group-hover:translate-x-0
      transition-all duration-300
    "
              >
                →
              </span>
            </button>

          </div>
          <EcomChart></EcomChart>
        </div>
      </div>





    </div>
  )
}
