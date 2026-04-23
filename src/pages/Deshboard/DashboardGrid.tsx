import { ChartNoAxesCombined, CircleDashed, Handbag, TrendingUp, Users } from 'lucide-react';
import type { FourGrids } from './DashboardHomepage';

interface DashboardGridProps {
    StatsOfDashboard: FourGrids;
}
// 'Total Sales', 'Total Oders', 'Total Sellers', 'Products Pending'

interface statsIfno {
    name: string;
    value: number;
}

export default function DashboardGrid({ StatsOfDashboard }: DashboardGridProps) {


    const gridArray: statsIfno[] = [{
        name: "Total Oders",
        value: StatsOfDashboard?.data?.totalOrders,
    },
    {
        name: "Total Products",
        value: StatsOfDashboard?.data?.totalProducts
    }, {
        name: "Total Sales",
        value: StatsOfDashboard?.data?.totalSales
    },{
        name : "Pending Products",
        value :StatsOfDashboard?.data?.totalPendingProducts
    }

    ]



    return (

        <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-x-[24px] gap-y-2'>

            {
                gridArray?.map((item: statsIfno, i) => {
                    return <div key={i} className={`px-[14px]  flex flex-col  sm:gap-y-[10px] rounded-lg py-[16px] bg-gradient-to-r   ${item.name == 'Total Oders' ? 'from-[#68AAFF] to-[#288CE0]' : item.name == 'Total Products' ? 'from-[#3AC4A5] to-[#1F9171]' : item.name == 'Total Sales' ? 'from-[#FFB872] to-[#E46C3E]' : 'from-[#FF8984] to-[#F94943]'}`}>
                        <h2 className='sm:text-[14px] text-white'> {item.name} </h2>

                        <h1 className='sm:text-[24px]    tracking-[.1rem] text-white font-semibold'>{item?.value}</h1>

                        <div className='flex justify-between'>

                            <div className='flex  items-center gap-x-[4px]'>
                                <TrendingUp size={20} className='text-white' />
                                <h1 className='text-[10px] sm:text-[12px] text-white'>12% From the last Month</h1>
                            </div>


                            {
                                item.name == 'Total Sales' ? <ChartNoAxesCombined size={48} className='text-gray-500 opacity-55' /> : item.name == 'Total Sellers' ? <Users size={48} className='text-gray-500 opacity-55' /> : item.name == 'Total Oders' ? <Handbag size={48} className='text-gray-500 opacity-55' /> : <CircleDashed size={48} className='text-gray-500 opacity-55' />
                            }

                        </div>

                    </div>
                })
            }



        </div>
    )
}
