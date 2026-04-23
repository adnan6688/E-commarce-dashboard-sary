import React from 'react'
import buyer1 from '../../../assets/Buyer1.png'
import buyer2 from '../../../assets/Buyer2.png'
import buyer3 from '../../../assets/buyer3.png'
import buyer4 from '../../../assets/bxs_error-alt.png'
import AllBuyer from './AllBuyer'

export default function BuyerManagment() {

  const sellerGrid = [
    {
      title: 'Total Buyer',
      count: 8,
      icon: <img src={buyer1}></img>
    }, {
      title: 'Recently Joined',
      count: 3455,
      icon: <img src={buyer2}></img>
    }, {
      title: 'Active Buyers',
      count: 320,
      icon: <img src={buyer3}></img>
    }, {
      title: 'Suspended Buyers',
      count: 5,
      icon: <img src={buyer4}></img>
    }
  ]




  return (
    <div>
      <h1 className="sm:text-[24px] font-semibold ">Buyer Management</h1>
      <h1 className="sm:text-[12px]">Buyer Management / All </h1>
      <div className="grid  my-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-y-2 sm:gap-x-[24px] ">
        {
          sellerGrid?.map((item , i) => {
            return <div  key={i} className="bg-white flex flex-col gap-y-2 px-[23px] py-[37px] rounded-lg">
              <h1 className="text-[14px] font-semibold"> {item?.title}</h1>

              <div className="flex justify-between items-center">
                <h1 className="text-[24px] font-semibold">{item?.count}</h1>
                {item?.icon}
              </div>

            </div>
          })
        }
      </div>


      <AllBuyer></AllBuyer>
    </div>
  )
}
