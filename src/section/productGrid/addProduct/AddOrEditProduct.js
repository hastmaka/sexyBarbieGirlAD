import {useEffect, useState} from "react";
import PropTypes from "prop-types";
// material
import {styled} from '@mui/material/styles';
import {Stack} from "@mui/material";
//
import EzText from "../../../components/ezComponents/EzText/EzText";
import ProductProperties from "./productProperties/ProductProperties";
import ProductMedia from "./productMedia/ProductMedia";
import ProductVariation from "./productVariation/ProductVariation";
import {handleDecimalsOnValue} from "../../../helper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    minWidth: '1122px',
    '& form': {
        position: 'relative'
    }
}));

const TableHeader = styled(Stack)(({theme}) => ({
    color: theme.palette.grey[0],
    padding: '0 20px',
    height: '50px',
    fontSize: '14px',
    fontWeight: 700,
    borderRadius: '4px0 0 0',
    backgroundColor: theme.palette.grey[700],
    flexDirection: 'row',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10
}));

const Layout = styled(Stack)(({theme}) => ({
    padding: '10px',
    gap: '20px'
}));

const TopParentContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '20px'
}));


//----------------------------------------------------------------

export default function AddOrEditProduct({tempData}) {
    const [data, setData] = useState({...tempData});
    const [checkProduct, setCheckProduct] = useState({check: false, isOnDb: null})
    //reset name field
    useEffect(_ => {
        if(data.name === '')
            setCheckProduct(prev => {
                return {...prev, check: false, isOnDb: null}
            })
    }, [data.name])
    const onChangeHandler = async (value, key) => {
        switch (key) {
            case 'price':
            case 'name':
            case 'category':
            case 'size':
                if(key === 'price') value = handleDecimalsOnValue(value.target.value)
                return setData({
                    ...data,
                    [key]: key === 'size' ?
                        await import('../../../helper').then(module => module.sortArray(value, 'id')):
                        value
                })
            case 'description':
                if(value.action === 'delete') {
                    let indexToDelete = data[key].findIndex(i => i.name === value.item.text)
                    data[key].splice(indexToDelete, 1)
                    return setData({...data})
                }
                if(value.action === 'delete-all') {
                    return setData({...data, [key]: []})
                }
                let indexToUpdate = key === 'description' && data[key].findIndex(i => i.name === value.name)
                if(indexToUpdate === -1) {
                    return setData({ ...data, [key]: [...data[key], value]})
                } else {
                    data[key][indexToUpdate] = value;
                    return setData({...data})
                }
            case 'color':
                return setData({...data, [key]: [...value]})
            default:
                break;
        }
    };

    return (
        <RootStyle>
            <TableHeader>
                <EzText text={'Add Product'} sx={{color: '#FFF', fontSize: '12px'}}/>
            </TableHeader>
            <Layout>
                <TopParentContainer>
                    <ProductProperties
                        data={data}
                        checkProduct={checkProduct}
                        onChangeHandler={onChangeHandler}
                        setCheckProduct={setCheckProduct}
                    />
                    <ProductMedia
                        data={data}
                        setData={setData}
                    />
                </TopParentContainer>

                {/*variation section*/}
                <ProductVariation
                    data={data}
                    checkProduct={checkProduct}
                />
            </Layout>
        </RootStyle>
    );
}

AddOrEditProduct.prototype = {
    tempData: PropTypes.object.isRequired
};