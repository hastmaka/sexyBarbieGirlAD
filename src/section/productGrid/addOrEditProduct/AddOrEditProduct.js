import {memo, useEffect, useState} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import EzText from "../../../components/ezComponents/EzText/EzText";
import ProductProperties from "../addOrEditProduct/productProperties/ProductProperties";
import ChildWrapper from "../../../components/ChildWrapper/ChildWrapper";
import {handleDecimalsOnValue, sortArray} from "../../../helper";
import ProductMediaActions from "./productMedia/ProductMediaActions";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import AddOrEditProductMediaLogic from "./AddOrEditProductMediaLogic";
import {productSliceActions} from "../../../store/productSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    minWidth: '1122px',
    // height: '900px',
    backgroundColor: theme.palette.ecommerce.bg_parent
}));

const Header = styled(Stack)(({theme}) => ({
    color: theme.palette.grey[0],
    padding: '0 20px',
    height: '50px',
    minHeight: '50px',
    fontSize: '14px',
    fontWeight: 700,
    borderRadius: '4px0 0 0',
    backgroundColor: theme.palette.grey[700],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 10
}));

const Layout = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '10px',
    margin: '10px'
}));
//----------------------------------------------------------------
export default function AddOrEditProduct({tempData, editMode}) {
    //tempProduct depend of if there are temp data on store otherwise it's going ot be static dummy data
    const {tempProduct, productInEditMode} = useSelector(slice => slice.product);
    const [data, setData] = useState({});
    const [checkProductName, setCheckProductName] = useState({check: false, isOnDb: null, value: ''});

    useEffect(_ => {
        setData(editMode ? {...productInEditMode} : {...tempData})
    }, [productInEditMode])

    useEffect(_ => {
        //checkProductName.value store the checked name if isOnDb was false(means the name is not in the DB)
        //to check later if the user change the input value
        if(checkProductName.value !== '') {
            if(checkProductName.value !== data.name) {
                setCheckProductName(prev => {
                    return {...prev, check: false, isOnDb: null, value: ''}
                })
            }
        }

        if(data.name === '')
            setCheckProductName(prev => {
                return {...prev, check: false, isOnDb: null, value: ''}
            })
    }, [data.name])
    const onChangeHandler = (value, key) => {
        switch (key) {
            case 'price':
            case 'name':
            case 'category':
            case 'size':
                if(key === 'price') value = handleDecimalsOnValue(value.target.value)
                return setData({
                    ...data,
                    [key]: key === 'size' ? sortArray(value, 'id') : value
                })
            case 'color':
                return setData({...data, [key]: [...value]})
            default:
                break;
        }
    };




    return (
        <RootStyle>
            <Header>
                <EzText text={'Add Product'} sx={{color: '#FFF', fontSize: '12px'}}/>
                {Object.keys(data).length && <ProductMediaActions data={data} checkProductName={checkProductName}/>}
            </Header>
            <Layout>
                <ChildWrapper
                    sx={{
                        flex: '40%',
                        height: 'fit-content',
                        // position: 'sticky',
                        // top: '60px'
                    }}
                >
                    {Object.keys(data).length && <ProductProperties
                        data={data}
                        checkProductName={checkProductName}
                        onChangeHandler={onChangeHandler}
                        setCheckProductName={setCheckProductName}
                    />}
                </ChildWrapper>
                <Stack
                    sx={{
                        flex: '60%',
                        height: 'fit-content',
                        gap: '10px'
                    }}
                >
                    <AddOrEditProductMediaLogic tempProduct={data.id ? data : tempProduct}/>
                </Stack>
            </Layout>
        </RootStyle>
    );
}

AddOrEditProduct.prototype = {
    tempData: PropTypes.object.isRequired
}