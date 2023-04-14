import {lazy, Suspense} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {GridRowModes} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
//
import EzIconButton from "../../../components/ezComponents/EzIconButton/EzIconButton";
import EzText from "../../../components/ezComponents/EzText/EzText";
import {staticData} from "../../../helper/staticData/StaticData";
import {createId, openModal} from "../../../helper";
import PropTypes from "prop-types";
//dynamic import
// const AddOrEditProduct = lazy(() => import("../addProduct_v1/AddOrEditProduct"))
const AddOrEditProduct = lazy(() => import("../addProduct_v2/AddOrEditProduct"))

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 1,
    backgroundColor: theme.palette.grey[700],
    borderRadius: '4px 4px 0 0',
    borderColor: 'divider',
    padding: '0 20px',
    height: '50px',
}));

//----------------------------------------------------------------

export default function EzEditToolBar({
                                          setRowModesModel,
                                          // setRows,
                                          from,
                                          tempProduct,
                                          ...rest
}) {

    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center'>
                <EzIconButton
                    toolTipTitle={from === 'product' ? 'Add Product' : 'Add Variation'}
                    icon={<AddIcon/>}
                    onClick={_ => {
                        if (from === 'product') {
                            openModal(
                                <Suspense fallback={<div>'...loading'</div>}>
                                    <AddOrEditProduct
                                        tempData={Object.keys(tempProduct).length > 0 ?
                                            tempProduct : staticData}
                                    />
                                </Suspense>)
                        } else {
                            // handleAddRow().then()
                        }
                    }}
                />
                <EzText
                    text={from === 'product' ? 'Product' : from === 'variation' ? `Variations of ${rest?.productName}` : ''}
                    sx={{color: '#fff', fontSize: '14px'}}
                />
            </Stack>
        </RootStyle>
    );
}

EzEditToolBar.prototype = {
    setRowModesModel: PropTypes.func.isRequired,
    from: PropTypes.string.isRequired,
    tempProduct: PropTypes.object.isRequired,
    rest: PropTypes.object
}