import { ShoppingBasket, Users } from "lucide-react"
import pendingIcon from '../../../assets/Group (5).png'
import questionsign from '../../../assets/bxs_error-alt.png'
import AllSeller from "./AllSeller"

export default function SellerManagment() {

  const sellerGrid = [
    {
      title: 'Pending Approval',
      count: 8,
      icon: <img src={pendingIcon}></img>
    }, {
      title: 'Total Products',
      count: 3455,
      icon: <ShoppingBasket size={40} />
    }, {
      title: 'Active Sellers',
      count: 320,
      icon: <Users size={40} />
    }, {
      title: 'Suspended Sellers',
      count: 5,
      icon: <img src={questionsign}></img>
    }
  ]



  return (
    <div>

      <h1 className="sm:text-[24px] font-semibold ">Shop Management</h1>
      <h1 className="sm:text-[12px]">Shop Management / All </h1>
      <div className="grid  my-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-y-2 sm:gap-x-6">
        {
          sellerGrid?.map((item) => {
            return <div className="bg-white flex flex-col gap-y-2 px-5.75 py-9.25 rounded-lg">
              <h1 className="text-[14px] font-semibold"> {item?.title}</h1>

              <div className="flex justify-between items-center">
                <h1 className="text-[24px] font-semibold">{item?.count}</h1>
                {item?.icon}
              </div>

            </div>
          })
        }
      </div>


      <AllSeller></AllSeller>

    </div>
  )
}
