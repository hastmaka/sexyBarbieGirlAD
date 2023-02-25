// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid} from "@mui/x-data-grid";

//----------------------------------------------------------------

const RootStyle = styled(Box)(({theme}) => ({}));

const TableHeader = styled(Stack)(({theme}) => ({
    color: theme.palette.grey[0],
    padding: '0 20px',
    height: '50px',
    fontSize: '14px',
    fontWeight: 700,
    borderRadius: '4px 4px 0 0',
    backgroundColor: theme.palette.grey[700],
    flexDirection: 'row',
    alignItems: 'center'
}));

const tableSx = {
    borderRadius: '4px',
    border: '1px solid lightgrey'
};

//----------------------------------------------------------------

export default function EzMuiGrid({
    rows,
    columns,
    setOpen,
    GridContainerSx,
    rowModesModel,
    setRowModesModel,
    processRowUpdate,
    handleProcessRowUpdateError,
    ...rest
}) {
    const handleRowEditStart = (params, event) => event.defaultMuiPrevented = true;
    const handleRowEditStop = (params, event) => event.defaultMuiPrevented = true;


    return (
        <RootStyle sx={{...GridContainerSx}}>
            <DataGrid
                sx={tableSx}
                rows={rows}
                columns={columns}
                getRowId={row => row.id}
                rowHeight={120}
                pageSize={10}
                rowsPerPageOptions={[10, 20]}
                //to edit function in v5 editMode and experimentalFeatures are required
                editMode='row'
                onRowEditStart={handleRowEditStart}//disable edit with dbclick
                onRowEditStop={handleRowEditStop}//disable edit with dbclick
                experimentalFeatures={{newEditingApi: true}}
                onRowModesModelChange={model => setRowModesModel(model)}
                rowModesModel={rowModesModel}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                {...rest}
            />
        </RootStyle>
    );
}
