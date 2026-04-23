import moneyBag from '../../../assets/Money.png'
import revenueImage from '../../../assets/flat-color-icons_money-transfer.png'
import totalPay from '../../../assets/dollerSign.png'
import timesign from '../../../assets/timesign.png'
import refreshSign from '../../../assets/refresh.png'
import Payoutlist from './Payoutlist'

export default function Payout() {

  const gridArray = [
    {
      title: 'Total Payouts',
      amount: '58,353.10',
      image: totalPay,
      colour: 'E3EFFB'
    },
    {
      title: 'Pending Payout',
      amount: '24,353.10',
      image: timesign,
      colour: 'FDECD7'
    },
    {
      title: 'Processing',
      amount: '16,353.10',
      image: refreshSign,
      colour: 'E5F5EA'
    }
  ]

  return (
    <div className='flex flex-col gap-y-6 md:gap-y-10 p-4 md:p-0 transition-all duration-300'>

      {/* Header Section */}
      <div>
        <h1 className='text-[19px] sm:text-[20px] md:text-[24px] font-bold text-slate-900 tracking-tight'>Seller Payouts</h1>
        <h2 className='text-[12px] md:text-[14px] text-slate-500 font-medium'>
          Review pending approval requests and monitor platform liquidity.
        </h2>
      </div>

      {/* Main Stats Cards (Available Funds & Revenue) */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-20'>
        
        {/* Total Available Funds */}
        <div className='flex   justify-between border border-[#D1D1D1] gap-x-5  sm:gap-x-[61px] px-3 sm:px-6 py-3 sm:py-8 bg-white rounded-2xl '>
          <div className='flex flex-col  gap-y-1 sm:gap-y-2 order-2 sm:order-1'>
            <h1 className='text-[15px] md:text-[24px] font-bold text-slate-800'>Total Available Funds</h1>
            <h2 className='text-[20px] md:text-[48px] font-black text-slate-900 leading-tight'>$1,22,354.00</h2>
            <h2 className='text-[12px] md:text-[16px] text-slate-500 font-medium '>
              Platform liquid assets ready for disbursement
            </h2>
          </div>
          <div className='flex items-center justify-start sm:justify-center order-1 sm:order-2'>
            <img src={moneyBag} alt="Money Bag" className=" md:w-auto object-contain" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className='flex  justify-between border border-[#D1D1D1]  gap-x-12  sm:gap-x-[61px] px-3 sm:px-6 py-3 sm:py-8 bg-white rounded-2xl  '>
          <div className='flex flex-col  gap-y-1 sm:gap-y-2 order-2 sm:order-1'>
            <h1 className='text-[15px] md:text-[24px] font-bold text-slate-800'>Total Revenue</h1>
            <h2 className='text-[20px] md:text-[48px] font-black text-slate-900 leading-tight'>$18,353.10</h2>
            <h2 className='text-[12px] md:text-[16px] text-slate-500 font-medium'>
              Total revenue generated from all sales across the platform, before any deductions.
            </h2>
          </div>
          <div className='flex items-center justify-start sm:justify-center order-1 sm:order-2'>
            <img src={revenueImage} alt="Revenue" className="w-[100%] md:w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Bottom Grid Cards (Payouts Info) */}
      <div className='flex flex-wrap gap-4 md:gap-6'>
        {
          gridArray?.map((item, index) => {
            return (
              <div key={index} className='flex  flex-1 sm:flex-none items-center gap-x-4 bg-white px-5 py-4 rounded-xl border border-slate-100  hover:shadow-md transition-shadow'>
                <div
                  className="flex items-center justify-center p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `#${item.colour}` }}
                >
                  <img src={item?.image} alt={item?.title} className=" object-contain" />
                </div>

                <div className="overflow-hidden">
                  <h1 className='text-[14px] md:text-[20px]  tracking-wider font-bold text-slate-800   truncate'>
                    {item?.title}
                  </h1>
                  <h2 className='text-[20px] md:text-[24px] tracking-wider font-black text-slate-900'>
                    ${item?.amount}
                  </h2>
                </div>
              </div>
            );
          })
        }
      </div>




      <Payoutlist></Payoutlist>
    </div>
  )
}