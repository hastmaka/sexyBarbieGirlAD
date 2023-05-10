// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import VariationSize from "./VariationSize";
import VariationColor from "./VariationColor";
import VariationChooseType from "./VariationChooseType";
import {handleCheckbox, handleClickVariation} from "./VariationController";
import VariationGrid from "./variationGrid/VariationGrid";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Variation({tempProductState, tempProduct, editMode}) {
    return (
        <RootStyle gap={2}>
            {!editMode &&
                <>
                    <VariationChooseType
                        handleCheckbox={(value) => handleCheckbox(value, tempProductState)}
                        tempProductState={tempProductState}
                    />

                    {tempProductState.color && <VariationColor tempProduct={tempProduct}/>}

                    {tempProductState.size && <VariationSize tempProduct={tempProduct}/>}

                    <Button
                        variant='outlined'
                        disabled={!tempProduct?.size?.length || !tempProduct?.color?.length}
                        onClick={_ => handleClickVariation(tempProduct)}
                    >Create Variation</Button>
                </>
            }

            {tempProduct.variation.length > 0 &&
                <VariationGrid
                    editMode={editMode}
                    tempProduct={tempProduct}
                />
            }
        </RootStyle>
    );
}

