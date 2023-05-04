import {lazy, Suspense, useEffect, useState} from "react";
// material
import {Box, Stack} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {styled} from '@mui/material/styles';
import EzText from "../../../components/ezComponents/EzText/EzText";
import AOEPTabPanel from "./AOEPTabPanel";
import {useSelector} from "react-redux";
import AOEPSave from "./AOEPSave";
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

export default function AOEP({editMode}) {
    const {tempProductState, tempProduct} = useSelector(slice => slice.product)
    const [value, setValue] = useState(false);

    //fix to a mui bugs
    useEffect(() => {
        setTimeout(() => {
            setValue(0);
        }, 100);
    }, []);

    return (
        <RootStyle>
            <Header>
                <EzText text={'Add Product'} sx={{color: '#FFF', fontSize: '12px'}}/>
                <AOEPSave tempProduct={tempProduct} editMode={editMode}/>
            </Header>

            <Box sx={{ width: '100%' }}>
                {/*tabs*/}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={(e, value) => setValue(value)}
                        centered
                    >
                        <Tab label="Product Vital" value={0}/>
                        {tempProductState.variation && <Tab label="Variation" value={1}/>}
                        <Tab label="Images" value={2}/>
                        <Tab label="Description" value={3}/>
                    </Tabs>
                </Box>

                <AOEPTabPanel value={value} index={0}>
                    <Suspense
                        fallback={<div>Loading product vital</div>}
                    >
                        <ProductVital
                            tempProduct={tempProduct}
                            tempProductState={tempProductState}
                        />
                    </Suspense>
                </AOEPTabPanel>

                {tempProductState.variation && <AOEPTabPanel value={value} index={1}>
                    <Suspense
                        fallback={<div>Loading variation</div>}
                    >
                        <Variation
                            editMode={editMode}
                            tempProduct={tempProduct}
                            tempProductState={tempProductState}
                        />
                    </Suspense>
                </AOEPTabPanel>}

                <AOEPTabPanel value={value} index={2}>
                    <Suspense
                        fallback={<div>Loading image</div>}
                    >
                        <VariationImage
                            editMode={editMode}
                            tempProduct={tempProduct}
                        />
                    </Suspense>
                </AOEPTabPanel>

                <AOEPTabPanel value={value} index={3}>
                    <Suspense
                        fallback={<div>Loading description</div>}
                    >
                        <Description
                            tempProduct={tempProduct}
                        />
                    </Suspense>
                </AOEPTabPanel>

            </Box>
        </RootStyle>
    );
}
