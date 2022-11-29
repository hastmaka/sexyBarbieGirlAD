// material
import {Box, Stack, Tooltip, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import EzIconButton from "../../../components/ezComponents/EzIconButton/EzIconButton";
import AddIcon from "@mui/icons-material/Add";
import EzText from "../../../components/ezComponents/EzText/EzText";
import {useCallback, useMemo, useState} from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import EditIcon from "@mui/icons-material/Edit";
import {updateProductApi} from "../../../helper/FirestoreApi";
import {adminSliceActions} from "../../../store/adminSlice";
import AddProduct from "../addProduct/AddProduct";
import EzModalWithTransition from "../../../components/ezComponents/EzModalWithTransition/EzModalWithTransition";
import AddVariation from "../addVariation/AddVariation";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({datatoupdateproducts, theme}) => ({
    height: datatoupdateproducts === 'true' ? '500px' : '700px',
    width: '100%',
    '& > div': {
        height: 'calc(100% - 50px)',
        width: '100%'
    }
}));

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

export default function VariationGrid({variation, product, productName, dataToUpdateProducts}) {
    const [rowModesModel, setRowModesModel] = useState({});
    const handleEditClick = useCallback((id) => {
        setRowModesModel({...rowModesModel,[id]: {mode: GridRowModes.Edit}})
    }, [rowModesModel]);

    const handleSaveClick = useCallback((id) => {
        setRowModesModel({...rowModesModel,[id]: {mode: GridRowModes.View}})
    }, [rowModesModel]);

    const handleCancelClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true}})
    }, [rowModesModel]);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleProcessRowUpdateError = useCallback((error) => {
        window.displayNotification({type: 'info', content: error})
        console.log(error)
    }, []);

    const processRowUpdate = useCallback(
        (newRow, oldRow) => {
            if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
                return oldRow
            } else {
                let {variation, id, ...rest} = {...product},
                    tempV = [...variation],
                    indexTempVariation = variation.findIndex(item => item.id === newRow.id);
                tempV[indexTempVariation] = newRow;
                if(dataToUpdateProducts) {
                    dataToUpdateProducts(tempV)
                } else {
                    window.dispatch(adminSliceActions.updateProduct({variation: tempV, id, ...rest}))
                    updateProductApi(id, {id, variation: tempV, ...rest});
                }
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
            filterable: false,
            renderCell: (index) => index.api.getRowIndex(index.row.id) + 1
        }, {
            field: 'color',
            headerName: 'Color',
            flex: 1,
            align: 'center',
            editable: true,
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            align: 'center',
            editable: true,
            valueFormatter: ({value}) => value === 1 ? 'XS' : value === 2 ? 'S' : value === 3 ? 'M' : value === 4 ? 'L' : value === 5 ? 'XL' : ''
        }, {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            align: 'center',
            editable: true,
            valueFormatter: ({value}) => `$ ${value}`
        }, {
            field: 'stock',
            headerName: 'Stock',
            flex: 1,
            align: 'center',
            editable: true,
            renderCell: (params) => {
                let s = params.row.stock,
                    tempColor = s <= 5 ? '#d00000' : s <= 10 ? '#dc2f02' : s <= 20 ? '#ffb703' : s <= 50 ? '#006d77' : '';
                return (
                    <Box sx={{color: tempColor}}>{params.row.stock}</Box>
                )
            }
        }, {
            field: 'active',
            headerName: 'Active',
            flex: 1,
            align: 'center',
            type: 'boolean',
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.active === true ? 'green' : 'red';
                return (
                    <Typography
                        sx={{color: tempColor}}
                        variant='span'>{params.row.active ? 'true' : 'false'}
                    </Typography>
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
                    <>
                        <TableHeader>
                            <EzIconButton
                                toolTipTitle='Add Variation'
                                icon={<AddIcon/>}
                                onClick={_ => setOpen(true)}
                            />
                            <EzText text={`Variants of: ${productName}`} sx={{color: '#fff', fontSize: '14px'}}/>
                        </TableHeader>
                        <DataGrid
                            sx={tableSx}
                            rows={variation}
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
                            processRowUpdate={processRowUpdate}
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                        />
                    </>}
            </Box>

        </RootStyle>
    );
}
