import React from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../../../components/ezComponents/EzText/EzText";
import ProductAttribute from "./productAttribute/ProductAttribute";
import PropTypes from "prop-types";
import ProductForm from "./productForm/ProductForm";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1,
    gap: '10px'
}));

//----------------------------------------------------------------

export default function ProductProperties({data, checkProductName, onChangeHandler, setCheckProductName}) {
    return (
        <RootStyle>
            <Stack gap='20px'>

                <ProductFormMemoized
                    data={data}
                    checkProductName={checkProductName}
                    onChangeHandler={onChangeHandler}
                    setCheckProductName={setCheckProductName}
                />

                <ProductAttribute
                    data={data}
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