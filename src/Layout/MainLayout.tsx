import { Outlet, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X, BarChart2, Settings, LayoutDashboard, ShoppingCart, Wallet, ChartNoAxesCombined, Handbag, Settings2, SlidersHorizontal, LogOut, TicketSlash } from "lucide-react";
import NavItem from "./NavItem";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";


const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation()
  const pathname = location.pathname


  const distpatch = useAppDispatch()




  const logutFromapp = () => {

    try {
      distpatch(logout())
      toast.error('Logout Successfully!')
    }
    catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="min-h-screen bg-[#F1F8FE] MyCustomFont">

      <aside
        className={`
          fixed top-0  left-0 z-50 h-screen w-64 bg-[#38404E] text-white 
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">


          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">

          <NavItem
            destination="/deshboard"
            icon={LayoutDashboard}
            label="Dashboard"
            active={pathname === "/deshboard"}
          />

          <NavItem
            destination="/deshboard/sellerManagement"
            icon={BarChart2}
            label="Shop Management"
            active={pathname.startsWith("/deshboard/sellerManagement")}
          />

          <NavItem
            destination="/deshboard/BuyerManagment"
            icon={Settings2}
            label="Buyer Management"
            active={pathname.startsWith("/deshboard/BuyerManagment")}
          />

          <hr className="mx-1 my-6 border-gray-400" />

          <NavItem
            destination="/deshboard/product"
            icon={ShoppingCart}
            label="Product"
            active={pathname.startsWith("/deshboard/product")}
          />

          <NavItem
            destination="/deshboard/oder"
            icon={Handbag}
            label="Order"
            active={pathname.startsWith("/deshboard/oder")}
          />

          <NavItem
            destination="/deshboard/payout"
            icon={Wallet}
            label="Payouts"
            active={pathname.startsWith("/deshboard/payout")}
          />

          <NavItem
            destination="/deshboard/catalog"
            icon={SlidersHorizontal}
            label="Product Catalog"
            active={pathname.startsWith("/deshboard/catalog")}
          />

          <NavItem
            destination="/deshboard/analytics"
            icon={ChartNoAxesCombined}
            label="Analytics"
            active={pathname.startsWith("/deshboard/analytics")}
          />

          <NavItem
            destination='/deshboard/banner'
            icon={TicketSlash}
            label="Banner Mannagement"
            active={pathname.startsWith('/deshboard/banner')}
          />


          <hr className="mt-7 mx-1 border-gray-400" />






          <NavItem
            destination="/deshboard/settings"
            icon={Settings}
            label="Settings"
            active={pathname.startsWith("/deshboard/settings")}
          />
        </nav>


        <div className="flex justify-center items-center ">
          <div className="p-4 absolute  bottom-3 bg-white/20 backdrop-blur-2xl rounded-lg border-t border-white/10 flex items-center gap-3">
            <img
              src="human.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Adnan Khan</p>
              <p className="text-xs text-gray-300">Admin</p>
            </div>
            <button
              className="p-2  hover:cursor-pointer hover:bg-white/30 rounded-lg transition-colors"
              onClick={() => logutFromapp()}
            >
              <LogOut className="text-red-500" />

            </button>

          </div>
        </div>

      </aside>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}


      <div className="md:pl-64 flex flex-col min-h-screen">


        <header className="sticky top-0 z-30 flex items-center h-12 sm:h-10  px-2 sm:px-6 bg-(--primary-color) ">
          <button
            className="text-gray-600 md:hidden hover:text-gray-900"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="text-white" size={28} />
          </button>



        </header>

        {/* PAGE CONTENT */}
        <main className="p-3 lg:p-6  ">

          <Outlet />

        </main>
      </div>
    </div>
  );
};



export default MainLayout;