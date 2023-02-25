import {useCallback, useEffect, useMemo, useState} from "react";
// material
import {Box, Stack, Tooltip, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
//
import EzModalWithTransition from "../../../components/ezComponents/EzModalWithTransition/EzModalWithTransition";
import AddVariation from "../addVariation/AddVariation";
import {updateProductApi} from "../../../helper/FirestoreApi";
import EzEditToolBar from "../EzEditToolBar/EzEditToolBar";
import {adminSliceActions} from "../../../store/adminSlice";
import {SortArray} from "../../../helper/Helper";
import EzText from "../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({datatoupdateproducts, theme}) => ({
    height: datatoupdateproducts === 'true' ? '500px' : '689px',
    '& > div': {
        height: '100%',
    }
}));

const tableSx = {
    borderRadius: '4px',
    border: 0,
    '&.MuiDataGrid-main': {
        backgroundColor: 'red'
    },
    '&.MuiDataGrid-columnHeaderTitleContainer': {
        justifyContent: 'center'
    }
};

//----------------------------------------------------------------

export default function VariationGrid({variation, product, productName, dataToUpdateProducts}) {
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows, setRows] = useState([]);

    useEffect(_ => {
        if (variation.length){
            setRows(variation)
        }
    }, [variation])


    const handleEditClick = useCallback((id) => {
        setRowModesModel({...rowModesModel,[id]: {mode: GridRowModes.Edit}})
    }, [rowModesModel]);

    const handleSaveClick = useCallback((id) => {
        setRowModesModel({...rowModesModel,[id]: {mode: GridRowModes.View}})
    }, [rowModesModel]);

    const handleCancelClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true}});

        const editedRow = rows.find(item => item.id === id);
        if(editedRow.isNew) {
            setRows(rows.filter(item => item.id !== id))
        }
    }, [rowModesModel]);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleProcessRowUpdateError = useCallback((error) => {
        window.displayNotification({type: error.type, content: error.content})
        console.log(error)
    }, []);

    const processRowUpdate = useCallback(
        async (newRow, oldRow, rows) => {
            debugger
            await new Promise((resolve, reject) => {
                //check empty field
                if(!(!!newRow.color) || !(!!newRow.size)) {
                    return reject({type: 'error', content: 'No empty field allowed'});
                }
                //check if variation exist
                if(newRow.isNew) {
                    let tempRows = [...rows];
                    tempRows.splice(0,1);
                    const existVariation = tempRows.find(item => (
                        item.color.toLowerCase() === newRow.color.toLowerCase()) &&
                        item.size.toLowerCase() === newRow.size.toLowerCase()
                    );
                    if(!!existVariation) {
                        return reject({type: 'error', content: 'Variant already exit'});
                    }
                }
                resolve()
            })

            if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
                return oldRow
            } else {
                let {id, variation, ...rest} = {...product},
                    tempRows = [];
                if(newRow.isNew) {
                    tempRows = [...rows]
                    tempRows.splice(0,1);
                } else {
                    tempRows = [...rows]
                }
                let indexTempVariation = tempRows.findIndex(item => item.id === newRow.id);
                if(indexTempVariation >= 0) {
                    tempRows[indexTempVariation] = newRow;
                    if(dataToUpdateProducts) {
                        debugger
                        //update variation when product is in creating mode
                        dataToUpdateProducts(SortArray(tempRows))
                    }
                } else {
                    //new variation
                    const {isNew, ...rest} = newRow;
                    tempRows = [...tempRows, rest];
                }
                setRows(SortArray(tempRows))
                window.dispatch(adminSliceActions.updateProduct({variation: SortArray(tempRows), id, ...rest}))
                updateProductApi(id, {id, variation: tempRows, ...rest});
                return newRow
            }
        },[]
    );

    //modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const allProductsVariantsGridColumns = useMemo(
        () => [
            {
            field: 'id',
            headerName: '#',
            width: 40,
            align: 'center',
            headerAlign: 'center',
            filterable: false,
            renderCell: (index) => index.api.getRowIndex(index.row.id) + 1
        }, {
            field: 'color',
            headerName: 'Color',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        }, {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            valueFormatter: ({value}) => `$ ${value}`
        }, {
            field: 'stock',
            headerName: 'Stock',
            flex: 1,
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: (params) => {
                let s = params.row.stock,
                    tempColor = s <= 5 ? '#d00000' : s <= 10 ? '#dc2f02' : s <= 20 ? '#ffb703' : s <= 50 ? '#006d77' : '';
                return (
                    <Box sx={{color: tempColor}}>{params.row.stock}</Box>
                )
            }
        }, {
            field: 'discount',
            headerName: 'Discount',
            type: 'number',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.discount > 0 ? 'green' : 'red';
                return (
                    <EzText text={params.row.discount} sx={{fontSize: '13px', color: tempColor}}/>
                )
            }
        }, {
            field: 'action',
            headerName: 'Action',
            align: 'center',
            type: 'actions',
            sortable: false,
            getActions: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
                // debugger
                if(isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={_ => handleSaveClick(params.id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={_ => handleCancelClick(params.id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <Tooltip title="Edit">
                        <GridActionsCellItem
                            icon={<EditIcon/>}
                            label="Edit"
                            disabled={isInEditMode === true}
                            onClick={_ => handleEditClick(params.id)}
                            // showInMenu
                        />
                    </Tooltip>
                ]
            },
    }], [rowModesModel, handleSaveClick, handleCancelClick, handleEditClick]);

    return (
        <RootStyle datatoupdateproducts={(!!dataToUpdateProducts).toString()}>
            {open && <EzModalWithTransition open={open} handleClose={handleClose}>
                <AddVariation/>
            </EzModalWithTransition>}
            <Box>
                {variation?.length &&
                    <DataGrid
                        sx={tableSx}
                        rows={rows}
                        columns={allProductsVariantsGridColumns}
                        getRowId={row => row.id}
                        editMode='row'
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        onRowEditStart={handleRowEditStart}//disable edit with dbclick
                        onRowEditStop={handleRowEditStop}//disable edit with dbclick
                        experimentalFeatures={{ newEditingApi: true }}
                        onRowModesModelChange={model => setRowModesModel(model)}
                        rowModesModel={rowModesModel}
                        processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow, rows)}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        components={{
                            Toolbar: EzEditToolBar
                        }}
                        componentsProps={{
                            toolbar: {
                                // rowMode,
                                // selectedRowParams
                                setOpen,
                                rowModesModel,
                                setRowModesModel,
                                setRows,
                                rows,
                                from: 'variation',
                                productName
                            },
                            // row: {
                            //     onFocus: handleRowFocus
                            // }
                        }}
                    />
                }
            </Box>

        </RootStyle>
    );
}
