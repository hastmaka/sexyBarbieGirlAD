// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {GridRowModes} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import EzIconButton from "../../../components/ezComponents/EzIconButton/EzIconButton";
import AddIcon from "@mui/icons-material/Add";
import EzText from "../../../components/ezComponents/EzText/EzText";
import {createId} from "../../../helper/Helper";

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

export default function EzEditToolBar({rowMode, setRowModesModel, selectedRowParams, setOpen, setRows, rows, from}) {
    // debugger
    const handleSaveOrEdit = () => {
        if (!selectedRowParams) {
            return;
        }
        const { id } = selectedRowParams;
        if (rowMode === 'edit') {
            setRowModesModel(prev => { return {...prev, [id]: {mode: GridRowModes.View}}});
        } else {
            setRowModesModel(prev => { return {...prev, [id]: {mode: GridRowModes.Edit}}});
        }
    };

    const handleCancel = () => {
        if (!selectedRowParams) {
            return;
        }
        const { id } = selectedRowParams;
        setRowModesModel(prev => { return {...prev, [id]: {mode: GridRowModes.View, ignoreModifications: true}}});
    };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    const handleAddRow = () => {
        const id = createId();
        setRows(prev => [{id, color: '', size: '', price: 0, stock: 0, discount: 0, active: false, isNew: true}, ...prev]);
        setRowModesModel(prev => {
            return {
                ...prev,
                [id]: {mode: GridRowModes.Edit, fieldToFocus: 'color'}
            }
        })
    }

    return (
        <RootStyle>
            <Stack flexDirection='row' alignItems='center'>
                <EzIconButton
                    toolTipTitle={from === 'product' ? 'Add Product' : 'Add Variation'}
                    icon={<AddIcon/>}
                    disabled={!!(rows?.find(item => item.isNew))}
                    onClick={_ => {
                        if(from === 'product') {
                            setOpen({bool: true, who: 'addProduct'})
                        } else {
                            handleAddRow()
                        }
                    }}
                />
                <EzText
                    text={from === 'product' ? 'Product' : from === 'variation' ? 'Variation' : ''}
                    sx={{color: '#fff', fontSize: '14px'}}
                />
            </Stack>
            <Stack flexDirection='row'>
                {/*<Button*/}
                {/*    onClick={handleSaveOrEdit}*/}
                {/*    onMouseDown={handleMouseDown}*/}
                {/*    disabled={!selectedRowParams}*/}
                {/*    variant="outlined"*/}
                {/*>*/}
                {/*    {rowMode === 'edit' ? 'Save' : 'Edit'}*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*    onClick={handleCancel}*/}
                {/*    onMouseDown={handleMouseDown}*/}
                {/*    disabled={rowMode === 'view'}*/}
                {/*    variant="outlined"*/}
                {/*    sx={{ ml: 1 }}*/}
                {/*>*/}
                {/*    Cancel*/}
                {/*</Button>*/}
            </Stack>
        </RootStyle>
    );
}
