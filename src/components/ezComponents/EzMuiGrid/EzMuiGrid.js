// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridRowModes} from "@mui/x-data-grid";
import EzIconButton from "../EzIconButton/EzIconButton";
import AddIcon from "@mui/icons-material/Add";
import EzText from "../EzText/EzText";
import {useCallback, useState} from "react";
import {updateProductApi} from "../../../helper/FirestoreApi";

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

const border = '#adadad';
const tableSx = {
    borderBottom: `1px solid ${border}`,
    borderLeft: `1px solid ${border}`,
    borderRight: `1px solid ${border}`,
    borderRadius: '0 0 4px 4px',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
};

//----------------------------------------------------------------

export default function EzMuiGrid({row, columns, setOpen, GridContainerSx, headerText, rowModesModel, setRowModesModel}) {
    // debugger
    // const [rows, setRows] = useState(row);
    // // const [rowModesModel, setRowModesModel] = useState({});
    //
    // const handleRowEditStart = (params, event) => {
    //     event.defaultMuiPrevented = true;
    // };
    //
    // const handleRowEditStop = (params, event) => {
    //     event.defaultMuiPrevented = true;
    // };
    //
    // const handleProcessRowUpdateError = useCallback((error) => {
    //     window.displayNotification({type: 'info', content: error})
    //     console.log(error)
    // }, []);
    //
    // const processRowUpdate = useCallback(
    //     (newRow, oldRow) => {
    //         if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
    //             return oldRow
    //         } else {
    //             updateProductApi(newRow.id, newRow);
    //             window.displayNotification({type: 'info', content: 'Product Updated Successfully'})
    //             return newRow
    //         }
    //     },[]
    // );



    return (
        <RootStyle sx={{...GridContainerSx}}>
            {/*<TableHeader>*/}
            {/*    {(setOpen && typeof setOpen === 'function') && <EzIconButton*/}
            {/*        toolTipTitle='Add Product'*/}
            {/*        icon={<AddIcon/>}*/}
            {/*        onClick={_ => setOpen({bool: true, who: 'addProduct'})}*/}
            {/*    />}*/}
            {/*    <EzText text={headerText} sx={{color: '#fff', fontSize: '14px'}}/>*/}
            {/*</TableHeader>*/}
            {/*<DataGrid*/}
            {/*    sx={tableSx}*/}
            {/*    rows={rows}*/}
            {/*    columns={columns}*/}
            {/*    getRowId={row => row.id}*/}
            {/*    rowHeight={120}*/}
            {/*    pageSize={10}*/}
            {/*    rowsPerPageOptions={[10, 20]}*/}
            {/*    //to edit function in v5 editMode and experimentalFeatures are required*/}
            {/*    editMode='row'*/}
            {/*    onRowEditStart={handleRowEditStart}//disable edit with dbclick*/}
            {/*    onRowEditStop={handleRowEditStop}//disable edit with dbclick*/}
            {/*    experimentalFeatures={{ newEditingApi: true }}*/}
            {/*    onRowModesModelChange={model => setRowModesModel(model)}*/}
            {/*    rowModesModel={rowModesModel}*/}
            {/*    processRowUpdate={processRowUpdate}*/}
            {/*    onProcessRowUpdateError={handleProcessRowUpdateError}*/}
            {/*    // components={{*/}
            {/*    //     Toolbar: EzEditToolBar*/}
            {/*    // }}*/}
            {/*    // componentsProps={{*/}
            {/*    //     toolbar: {*/}
            {/*    //         rowMode,*/}
            {/*    //         rowModesModel,*/}
            {/*    //         setRowModesModel,*/}
            {/*    //         selectedRowParams*/}
            {/*    //     },*/}
            {/*    //     row: {*/}
            {/*    //         onFocus: handleRowFocus*/}
            {/*    //     }*/}
            {/*    // }}*/}
            {/*    // loading={productState.loading}*/}
            {/*/>*/}
        </RootStyle>
    );
}
