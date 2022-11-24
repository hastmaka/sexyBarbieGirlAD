import {useRoutes} from 'react-router-dom';
// Routes
import Login from '../section/login/Login'
import Layout from "../layout/Layout";
import Dashboard from "../section/dashboard/Dashboard";
import ProductGrid from "../section/productGrid/ProductGrid";
import Order from "../section/Order/Order";

//----------------------------------------------------------------

export default function Router() {
    return useRoutes([{
        path: '/login',
        element: <Login/>
    }, {
        path: '/',
        element: <Layout/>,
        children: [{
            index: true,
            element: <Dashboard/>
        }, {
            path: '/admin-dashboard',
            element: <Dashboard/>
        },{
            path: '/product-grid',
            element: <ProductGrid/>
        }, {
            path: '/order',
            element: <Order/>
        }]
    }, {
            path: '/error',
        // element: <Error/>,
    }, {
        path: '/test',
        // element: <Test/>,
    },
        //     {
        //     path: '*',
        //     element: <Navigate to='/error' replace/>
        // }
    ])
}
