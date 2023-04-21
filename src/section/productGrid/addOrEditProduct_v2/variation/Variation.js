// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import VariationSize from "./VariationSize";
import VariationColor from "./VariationColor";
import VariationChooseType from "./VariationChooseType";
import {useSelector} from "react-redux";
import {productSliceActions} from "../../../../store/productSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Variation() {
    const {tempProductState, tempProduct} = useSelector(slice => slice.product)

    const handleCheckbox = (value) => {
        window.dispatch(
            productSliceActions.updateTempProductState({
                ...tempProductState,
                [value]: !tempProductState[value]
            })
        )
    }

    return (
        <RootStyle gap={2}>
            <VariationChooseType
                handleCheckbox={handleCheckbox}
                tempProductState={tempProductState}
            />

            {tempProductState.size && <VariationSize tempProduct={tempProduct}/>}

            {tempProductState.color && <VariationColor tempProduct={tempProduct}/>}

        </RootStyle>
    );
}
