import {lazy, Suspense, useEffect, useState} from "react";
// material
import {Box, Stack, Typography} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {styled} from '@mui/material/styles';
import EzText from "../../../components/ezComponents/EzText/EzText";
import AOEPTabPanel from "./AOEPTabPanel";
import {useSelector} from "react-redux";
//dynamic import
const ProductVital = lazy(() => import('./productVital/ProductVital'));
const Variation = lazy(() => import('./variation/Variation'));
const VariationImage = lazy(() => import('./variationImage/VariationImage'));
const Description = lazy(() => import('./description/Description'));

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    minWidth: '1122px',
    height: '80vh',
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

export default function AOEP({tempData, editMode}) {
    const {tempProduct, productInEditMode} = useSelector(slice => slice.product);
    const [value, setValue] = useState(false);
    const [data, setData] = useState({});

    //fix to a mui bugs
    useEffect(() => {
        setTimeout(() => {
            setValue(0);
        }, 100);
    }, []);

    useEffect(_ => {
        setData(editMode ? {...productInEditMode} : {...tempData})
    }, [productInEditMode])

    return (
        <RootStyle>
            <Header>
                <EzText text={'Add Product'} sx={{color: '#FFF', fontSize: '12px'}}/>
                {/*{Object.keys(data).length && <ProductMediaActions data={data} checkProductName={checkProductName}/>}*/}
            </Header>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={(e, value) => setValue(value)}
                        centered
                    >
                        <Tab label="Product Vital"/>
                        <Tab label="Variation"/>
                        <Tab label="Images"/>
                        <Tab label="Description"/>
                    </Tabs>
                </Box>
                <AOEPTabPanel value={value} index={0}>
                    <Suspense fallback={<div>Loading product vital</div>}><ProductVital data={data}/></Suspense>
                </AOEPTabPanel>
                <AOEPTabPanel value={value} index={1}>
                    <Suspense fallback={<div>Loading variation</div>}><Variation/></Suspense>
                </AOEPTabPanel>
                <AOEPTabPanel value={value} index={2}>
                    <Suspense fallback={<div>Loading image</div>}><VariationImage/></Suspense>
                </AOEPTabPanel>
                <AOEPTabPanel value={value} index={3}>
                    <Suspense fallback={<div>Loading description</div>}><Description data={data}/></Suspense>
                </AOEPTabPanel>
            </Box>
        </RootStyle>
    );
}
