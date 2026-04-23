import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import VerifyAccount from "../pages/auth/VerifyAccount";
import ForgetPassword from "../pages/auth/Forgetpassword";
import NewPassConfirmPass from "../pages/auth/NewPassConfirmPass";
import DashboardHomepage from "../pages/Deshboard/DashboardHomepage";
import SellerManagment from "../pages/Deshboard/SellerManagment/SellerManagment";
import BuyerManagment from "../pages/Deshboard/BuyerManagement/BuyerManagment";
import Product from "../pages/Deshboard/Product/Product";
import Oder from "../pages/Deshboard/OderPage/Oder";
import Payout from "../pages/Deshboard/Payout/Payout";
import Catalog from "../pages/Deshboard/Catalog/Catalog";
import Analytics from "../pages/Deshboard/Analytics/Analytics";
import Settings from "../pages/Deshboard/Settings/Settings";
import SellerDetailsPage from "../pages/Deshboard/SellerManagment/SellerDetailsPage";
import ShopDetails from "../pages/Deshboard/SellerManagment/ShopDetails";
import BuyerDetails from "../pages/Deshboard/BuyerManagement/BuyerDetails";

import OderDetails from "../pages/Deshboard/OderPage/OderDetails";
import PayoutDetails from "../pages/Deshboard/Payout/PayoutDetails";
import NotFound from "../components/NotFound/NotFound";
import SettingHomepage from "../pages/Deshboard/Settings/SettingHomepage";
import Account from "../pages/Deshboard/Settings/Account";
import EmailSettings from "../pages/Deshboard/Settings/EmailSettings";
import Payments from "../pages/Deshboard/Settings/Payments";
import Notification from "../pages/Deshboard/Settings/Notification";
import MainLayout from "../Layout/MainLayout";
import  PrivetRoute from "./PrivetRoute";
import AuthRoute from "./AuthRoute";
import Banner from "../pages/Deshboard/Banner/Banner";



export const router = createBrowserRouter([
    {
        path: '/',
        element :  <AuthRoute>
            <Login></Login>
        </AuthRoute>
    },
    {
        path: '/OTP',
        element : <VerifyAccount></VerifyAccount>
    }, {
        path: '/sendOTP',
        element : <ForgetPassword></ForgetPassword>
    }, {
        path: "/newPassConPass",
        element : <NewPassConfirmPass></NewPassConfirmPass>
    }, {
        path: "/deshboard",
        element : <PrivetRoute>
            <MainLayout></MainLayout>
        </PrivetRoute>,

        children: [
            {
                path: '/deshboard',
                Component: DashboardHomepage
            }, {
                path: '/deshboard/sellerManagement',
                Component: SellerManagment
            }, {
                path: '/deshboard/sellerManagement/details/:id',
                Component: SellerDetailsPage
            }
            , {
                path: '/deshboard/sellerManagement/shopDetails/:id',
                Component: ShopDetails
            },

            {
                path: '/deshboard/BuyerManagment',
                Component: BuyerManagment
            }, {
                path: '/deshboard/BuyerManagment/:id',
                Component: BuyerDetails
            }
            ,
            {
                path: '/deshboard/product',
                Component: Product
            }, {
                path: '/deshboard/oder',
                Component: Oder
            },
            {
                path: '/deshboard/oder/:id',
                Component: OderDetails
            },
            {
                path: '/deshboard/payout',
                Component: Payout
            }, {
                path: '/deshboard/payout/:id',
                Component: PayoutDetails
            }, 
            {
                path : '/deshboard/banner',
                Component : Banner
            }
            ,
            {
                path: '/deshboard/catalog',
                Component: Catalog
            }, {
                path: '/deshboard/analytics',
                Component: Analytics
            }, {
                path: '/deshboard/settings',
                Component: Settings,
                children : [
                    {
                        path : '/deshboard/settings',
                        Component : SettingHomepage
                    },{
                        path : '/deshboard/settings/account',
                        Component : Account
                    },
                    {
                        path :  '/deshboard/settings/email',
                        Component : EmailSettings
                    },{
                        path :  '/deshboard/settings/payments',
                        Component : Payments
                    },{
                        path :   '/deshboard/settings/notification',
                        Component : Notification
                    }
                ]
            }
        ]
    }
    , {
        path: '/*',
        Component: NotFound
    }

])