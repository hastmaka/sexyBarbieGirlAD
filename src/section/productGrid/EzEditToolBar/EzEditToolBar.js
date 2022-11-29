// material
import {Stack} from "@mui/material";
import {GridRowModes} from "@mui/x-data-grid";
import Button from "@mui/material/Button";

//----------------------------------------------------------------

export default function EzEditToolBar({rowMode, setRowModesModel, selectedRowParams}) {

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

    return (
        <Stack
            sx={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
            }}
        >
            <Button
                onClick={handleSaveOrEdit}
                onMouseDown={handleMouseDown}
                disabled={!selectedRowParams}
                variant="outlined"
            >
                {rowMode === 'edit' ? 'Save' : 'Edit'}
            </Button>
            <Button
                onClick={handleCancel}
                onMouseDown={handleMouseDown}
                disabled={rowMode === 'view'}
                variant="outlined"
                sx={{ ml: 1 }}
            >
                Cancel
            </Button>
        </Stack>
    );
}
