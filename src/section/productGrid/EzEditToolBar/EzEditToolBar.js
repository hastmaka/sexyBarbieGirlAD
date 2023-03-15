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
//dynamic import
const AddOrEditProduct = lazy(() => import("../addProduct/AddOrEditProduct"))

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

export default function EzEditToolBar({rowMode, setRowModesModel, selectedRowParams, setRows, rows, from, productName}) {
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

    const handleAddRow = async () => {
        const id = await import('../../../helper').then(module => {return module.createId(20)});
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
                    onClick={async _ => {
                        if(from === 'product') {
                            await import('../../../helper').then(module =>
                                module.openModal(<Suspense fallback={<div>'...loading'</div>}><AddOrEditProduct tempData={staticData}/></Suspense>)
                            )
                        } else {
                            handleAddRow().then()
                        }
                    }}
                />
                <EzText
                    text={from === 'product' ? 'Product' : from === 'variation' ? `Variations of ${productName}` : ''}
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
