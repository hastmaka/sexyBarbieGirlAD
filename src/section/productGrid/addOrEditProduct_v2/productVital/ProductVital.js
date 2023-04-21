import {useRef} from "react";
// material
import {Stack} from "@mui/material";
import {checkProductNameApi} from "../../../../helper/firebase/FirestoreApi";
//
import useCheckProductName from "../../../../helper/hooks/useCheckProductName";
import ProductVitalActive from "./ProductVitalActive";
import ProductVitalVariation from "./ProductVitalVariation";
import ProductVitalProductName from "./ProductVitalProductName";
import ProductVitalBrandName from "./ProductVitalBrandName";
import ProductVitalCategory from "./ProductVitalCategory";

export default function ProductVital({data}) {
    const [checkProductName, setCheckProductName] = useCheckProductName(data);
    const formRef = useRef(null);
    const handleCheckProductName = (name) => {
        let a = formRef
        debugger
        //check if name already existed on db
        checkProductNameApi(name).then(res => {
            setCheckProductName(prev => {
                return {
                    ...prev,
                    check: !prev.check,
                    isOnDb: !res,
                    value: name
                }
            })
        })
    }

    return (
        <Stack component='form' ref={formRef} gap={3}>

            <ProductVitalActive/>

            <ProductVitalVariation/>

            <ProductVitalProductName
                checkProductName={checkProductName}
                handleCheckProductName={handleCheckProductName}
                data={data}
            />

            <ProductVitalBrandName data={data}/>

            <ProductVitalCategory data={data}/>

        </Stack>
    );
}
