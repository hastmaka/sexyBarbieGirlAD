import {useRoutes} from 'react-router-dom';
// Routes
import Login from '../section/login/Login'
import Layout from "../layout/Layout";
import Dashboard from "../section/dashboard/Dashboard";
import ProductGrid from "../section/productGrid/ProductGrid";
import Order from "../section/Order/Order";
import Shipping from "../section/shipping/Shipping";
import Test from "../section/test/Test";

//----------------------------------------------------------------
const FallBack = () => {
    return <div>Loading...</div>
}
export default function Router() {
    const user = JSON.parse(localStorage.getItem('user'))
    const children = [];


    return useRoutes([{
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
        }, {
            path: '/shipping',
            element: <Shipping/>
        }, {
            path: '/test',
            element: <Test/>
        }]
    }])
}
