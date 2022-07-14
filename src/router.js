import {DRIVER_ROUTE, COMPANY_ROUTE, ROUTES_ROUTE, WAYBILL_ROUTE, HOME_ROUTE, CARS_ROUTE} from "./utils/consts";
import Driver from "./pages/Driver";
import Company from "./pages/Company";
import Routes from "./pages/Routes";
import Waybill from "./pages/Waybill"
import Home from "./pages/Home"
import Cars from "./pages/Cars"


export const publicRoutes = [
    {
        path: DRIVER_ROUTE,
        Component: Driver
    },

    {
        path: CARS_ROUTE,
        Component: Cars
    },

    {
        path: COMPANY_ROUTE,
        Component: Company
    },
    {
        path: ROUTES_ROUTE,
        Component: Routes
    },
    {
        path: WAYBILL_ROUTE,
        Component: Waybill
    },
    {
        path: HOME_ROUTE,
        Component: Home
    }

]