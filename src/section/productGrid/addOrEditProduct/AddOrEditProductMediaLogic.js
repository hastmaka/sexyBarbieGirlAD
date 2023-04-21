import ChildWrapper from "../../../components/ChildWrapper/ChildWrapper";
import ProductMedia from "./productMedia/ProductMedia";
import VariationGrid from "./variationGrid/VariationGrid";
import {Stack} from "@mui/material";
import {memo} from "react";

const AddOrEditProductMediaLogic = memo(({tempProduct}) => {

    return (
        <>
            {tempProduct?.variation?.length > 0 ? (
                tempProduct?.color.map(item => {
                    return (
                        <ChildWrapper key={item.color} sx={{gap: '10px'}}>
                            <ProductMedia item={item}/>
                            <VariationGrid
                                variation={tempProduct?.variation?.filter(i => i.color === item.color)}
                            />
                        </ChildWrapper>
                    )
                })
            ) : (
                <Stack>No Variation yet</Stack>
            )}
        </>
    );
});

export default AddOrEditProductMediaLogic;