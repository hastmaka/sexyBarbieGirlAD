import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ViewListIcon from '@mui/icons-material/ViewList';
import QuizIcon from '@mui/icons-material/Quiz';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export const item = [{
    id: 1,
    icon: <DashboardIcon/>,
    text: 'Dashboard',
    to: '/admin-dashboard',
    element: '',
}, {
    id: 2,
    icon: <Inventory2Icon/>,
    text: 'Product',
    to: '/product-grid',
    element: '',
}, {
    id: 3,
    icon: <ViewListIcon/>,
    text: 'Order',
    to: '/order',
    element: '',
}, {
    id: 4,
    icon: <LocalShippingIcon/>,
    text: 'Shipping',
    to: '/shipping',
    element: '',
}, {
    id: 5,
    icon: <QuizIcon/>,
    text: 'FileInput',
    to: '/test',
    element: '',
}]