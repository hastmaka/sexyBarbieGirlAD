import {lazy, Suspense} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddIcon from "@mui/icons-material/Add";
//
import EzIconButton from "../../components/ezComponents/EzIconButton/EzIconButton";
import EzText from "../../components/ezComponents/EzText/EzText";
import {openModal} from "../../helper";
import PropTypes from "prop-types";
//dynamic import
// const AddOrEditProduct = lazy(() => import("../addProduct_v1/AddOrEditProduct"))
const AOEP = lazy(() => import("./addOrEditProduct_v2/AOEP"))

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

export default function ProductGridToolBar({setRowModesModel, ...rest}) {

    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center'>
                <EzIconButton
                    toolTipTitle={'Add Product'}
                    icon={<AddIcon/>}
                    onClick={_ =>
                        openModal(
                            <Suspense fallback={<div>'...loading'</div>}>
                                <AOEP/>
                            </Suspense>
                        )
                    }
                />
                <EzText
                    text='Product'
                    sx={{color: '#fff', fontSize: '14px'}}
                />
            </Stack>
        </RootStyle>
    );
}

ProductGridToolBar.prototype = {
    setRowModesModel: PropTypes.func.isRequired,
    // tempProduct: PropTypes.object.isRequired,
    rest: PropTypes.object
}