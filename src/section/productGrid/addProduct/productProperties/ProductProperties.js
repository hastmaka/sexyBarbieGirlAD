import React from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import ProductForm from "./productForm/ProductForm";
import ProductDescription from "./productDescription/ProductDescription";
import PropTypes from "prop-types";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 2,
    gap: '10px'
}));

//----------------------------------------------------------------

export default function ProductProperties({data, checkProduct, onChangeHandler, setCheckProductName}) {
    return (
        <RootStyle>
            <Stack width='100%' alignItems='center'>
                <EzText text='Product Properties' sx={{fontSize: '20px'}}/>
            </Stack>
            <Stack direction='row' gap='20px'>

                <ProductFormMemoized
                    data={data}
                    checkProduct={checkProduct}
                    onChangeHandler={onChangeHandler}
                    setCheckProductName={setCheckProductName}
                />

                <ProductDescription
                    onchange={value => onChangeHandler(value, 'description')}
                />
            </Stack>
        </RootStyle>
    );
}

const ProductFormMemoized = React.memo(ProductForm);

ProductProperties.prototype = {
    data: PropTypes.object.isRequired,
    checkProduct: PropTypes.object.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    setCheckProduct: PropTypes.func.isRequired
}