import {useRef} from "react";
// material
import {Stack} from "@mui/material";
//
import ProductVitalActive from "./ProductVitalActive";
import ProductVitalVariation from "./ProductVitalVariation";
import ProductVitalProductName from "./ProductVitalProductName";
import ProductVitalBrandName from "./ProductVitalBrandName";
import ProductVitalCategory from "./ProductVitalCategory";

export default function ProductVital() {
    const formRef = useRef(null);

    return (
        <Stack component='form' ref={formRef} gap={3}>

            <ProductVitalActive/>

            <ProductVitalVariation/>

            <ProductVitalProductName formRef={formRef}/>

            <ProductVitalBrandName/>

            <ProductVitalCategory/>

        </Stack>
    );
}
