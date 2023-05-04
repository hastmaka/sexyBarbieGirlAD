// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import ChildWrapper from "../../../../components/ChildWrapper/ChildWrapper";
import ProductMedia from "./productMedia/ProductMedia";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function VariationImage({tempProduct, editMode}) {
    return (
        <RootStyle gap='10px'>
            {tempProduct?.variation?.length > 0 ? (
                tempProduct?.color.map(item => {
                    return (
                        <ChildWrapper key={item.color}>
                            <ProductMedia
                                item={item}
                                editMode={editMode}
                                tempProduct={tempProduct}
                            />
                        </ChildWrapper>
                    )
                })
            ) : (
                <Stack>No Variation yet</Stack>
            )}
        </RootStyle>
    );
}
