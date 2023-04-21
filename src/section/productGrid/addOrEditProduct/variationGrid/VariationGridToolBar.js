// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddIcon from "@mui/icons-material/Add";
//
import PropTypes from "prop-types";
import {GridRowModes} from "@mui/x-data-grid";
import EzIconButton from "../../../../components/ezComponents/EzIconButton/EzIconButton";
import EzText from "../../../../components/ezComponents/EzText/EzText";
import {createId} from "../../../../helper";

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

export default function VariationGridToolBar({setRows, tempProduct, ...rest}) {
    const handleAddRow = async () => {
        rest.setIsAddActive(true)
        const id = createId(20);
        setRows(prev => {
            return [...prev, {
                id,
                size: '',
                price: 0,
                stock: 0,
                discount: 0,
                active: true,
                isNew: true
            }]
        });
        rest.setRowModesModel(prev => {
            return {
                ...prev, [id]: {mode: GridRowModes.Edit, fieldToFocus: 'size'}
            }
        })
    }

    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center'>
                <EzIconButton
                    toolTipTitle={'Add Variation'}
                    icon={<AddIcon/>}
                    onClick={_ => handleAddRow().then()}
                />
                <EzText
                    text={`Variations of ${tempProduct?.productName}`}
                    sx={{color: '#fff', fontSize: '14px'}}
                />
            </Stack>
        </RootStyle>
    );
}

VariationGridToolBar.prototype = {
    setRowModesModel: PropTypes.func.isRequired,
    from: PropTypes.string.isRequired,
    tempProduct: PropTypes.object.isRequired,
    rest: PropTypes.object
}