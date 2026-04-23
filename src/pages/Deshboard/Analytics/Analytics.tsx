
import AnalyticsStepchart from '../../../components/AnalyticsStepchart'
import AnalyticsGrid from './AnalyticsGrid'

import TopProduct from '../Product/TopProduct'
import TopSellers from '../OderPage/TopSellers'

export default function Analytics() {
  return (
    <div className='flex flex-col gap-y-6'>
        <div>
            <h1 className='text-[24px] font-semibold'>Analytics</h1>
            <h2 className='text-[#636363] text-[12px]'>Track and analyze your sales and payouts.</h2>
        </div>
    <AnalyticsGrid></AnalyticsGrid>

        <AnalyticsStepchart></AnalyticsStepchart>


        <div className='flex justify-between gap-3'>

                   <TopProduct></TopProduct>

<TopSellers></TopSellers>
     
        </div>
    </div>
  )
}
