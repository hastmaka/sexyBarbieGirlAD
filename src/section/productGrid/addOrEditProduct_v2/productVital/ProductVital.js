import {useRef} from "react";
// material
import {Stack} from "@mui/material";
//
import ProductVitalActive from "./ProductVitalActive";
import ProductVitalVariation from "./ProductVitalVariation";
import ProductVitalProductName from "./ProductVitalProductName";
import ProductVitalBrandName from "./ProductVitalBrandName";
import ProductVitalCategory from "./ProductVitalCategory";
import ProductVitalTags from "./ProductVitalTags";

export default function ProductVital({tempProduct, tempProductState}) {
    const formRef = useRef(null);

    return (
        <Stack component='form' ref={formRef} gap={3}>

            <ProductVitalActive tempProduct={tempProduct}/>

            <ProductVitalVariation tempProductState={tempProductState}/>

            <ProductVitalProductName tempProduct={tempProduct} tempProductState={tempProductState} formRef={formRef}/>

            <ProductVitalBrandName tempProduct={tempProduct} formRef={formRef}/>

            <ProductVitalCategory tempProduct={tempProduct}/>

            <ProductVitalTags tempProduct={tempProduct}/>

        </Stack>
    );
}
