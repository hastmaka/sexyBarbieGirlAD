// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useEffect, useMemo, useState} from "react";
import {getAll} from "../../helper/firebase/FirestoreApi";
import {useSelector} from "react-redux";
import Wrapper from "../../components/Wrapper/Wrapper";
import EzMuiGrid from "../../components/EzMuiGrid/EzMuiGrid";
import EzText from "../../components/ezComponents/EzText/EzText";
import OrderProduct from "./OrderProduct";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Order() {
    const {order, orderState} = useSelector(slice => slice.admin);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (!orderState.loading && !orderState.loaded) {
            window.dispatch(getAll({collection: 'orders'}))
        }
    }, [orderState]);

    useEffect(_ => {
        if(orderState.loaded) {
            setRows(order)
        }
    }, [orderState])


    const orderColumns = useMemo(
        () => [
            {
                field: 'receipt_email',
                headerName: 'Email',
                flex: 1,
                align: 'center',
                editable: true,
                // renderCell: (params) => {
                //     debugger
                //     return <EzText text={params.row.receipt_email} sx={{fontSize: '13px'}}/>
                // }
            }, {
                field: 'item',
                headerName: 'Items',
                flex: 1,
                align: 'center',
                editable: true,
                renderCell: (params) => {
                    return params.row.item.map(item =>
                        <OrderProduct
                            key={item.variation_id}
                            img={item.image.url}
                            name={item.name}
                            color={item.color}
                            size={item.size}
                            price={item.price}
                            qty={item.quantity}
                        />
                    )
                }
            }, {
                field: 'create_at',
                headerName: 'Create At',
                flex: 1,
                align: 'center',
                // editable: true,
                // renderCell: (params) => {
                //     return <EzText text={params.row.create_at} sx={{fontSize: '13px'}}/>
                // }
            }, {
                field: 'shipping',
                headerName: 'Shipping(UPS)',
                flex: 1,
                align: 'center',
                // editable: true,
                // renderCell: (params) => {
                //     return <EzText text={params.row.amount} sx={{fontSize: '13px'}}/>
                // }
            }, {
                // field: 'order_status',
                // headerName: 'Order Status',
                // flex: 1,
                // align: 'center',
                // editable: true,
                // renderCell: (params) => {
                //     return <EzText text={params.row.order_status} sx={{fontSize: '13px'}}/>
                // }
            }, {
                // field: 'item',
                // headerName: 'Item',
                // flex: 1,
                // align: 'center',
                // editable: true,
                // renderCell: (params) => {
                //     return <EzText text={params.row.item} sx={{fontSize: '13px'}}/>
                // }
            }
    ], []);

    return (
        <Wrapper sx={{height: 'calc(100vh - 80px)', padding: 0}}>
            {/*<EzMuiGrid*/}
            {/*    rows={rows}*/}
            {/*    columns={orderColumns}*/}
            {/*    GridContainerSx={{height: '100%', width: '100%'}}*/}
            {/*/>*/}
        </Wrapper>
    );
}
