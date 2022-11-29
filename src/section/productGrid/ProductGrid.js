import {useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
// material
import {Box, Button, Stack, Tooltip, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
//
import ChildLocal from "../dashboard/childLocal/ChildLocal";
import {formatSizeArray} from "../../helper/Helper";
import VariationGrid from "./variationGrid/VariationGrid";
import EzModalWithTransition from "../../components/ezComponents/EzModalWithTransition/EzModalWithTransition";
import EzIconButton from "../../components/ezComponents/EzIconButton/EzIconButton";
import EzText from "../../components/ezComponents/EzText/EzText";
import AddProduct from "./addProduct/AddProduct";
import {updateProductApi} from "../../helper/FirestoreApi";
// import EzEditToolBar from "./EzEditToolBar/EzEditToolBar";

//----------------------------------------------------------------

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

export default function ProductGrid() {
    const {product, productState} = useSelector(slice => slice.admin);
    const [row, setRows] = useState([]);
    const [variationGridData, setVariationGridData] = useState({
        variations: [],
        productName: '',
        product: {}
    });

    //region
    // const [selectedRowParams, setSelectedRowParams] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});

    // const handleRowFocus = useCallback((event) => {
    //     const row = event.currentTarget;
    //     const id = row.dataset.id;
    //     const field = event.target.dataset.field;
    //     setSelectedRowParams({ id, field });
    // }, []);

    // const rowMode = useMemo(() => {
    //     if (!selectedRowParams) {
    //         return 'view';
    //     }
    //     const { id } = selectedRowParams;
    //     return rowModesModel[id]?.mode || 'view';
    // }, [rowModesModel, selectedRowParams]);

    const handleEditClick = useCallback((id) => {
        setRowModesModel({...rowModesModel,[id]: {mode: GridRowModes.Edit}})
    }, [rowModesModel]);

    const handleSaveClick = useCallback((id) => {
        setRowModesModel({...rowModesModel,[id]: {mode: GridRowModes.View}})
    }, [rowModesModel]);

    const handleCancelClick = useCallback((id) => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true}})
    }, [rowModesModel]);

    const handleProcessRowUpdateError = useCallback((error) => {
        window.displayNotification({type: 'info', content: error})
        console.log(error)
    }, []);

    const processRowUpdate = useCallback(
        (newRow, oldRow) => {
            if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
                return oldRow
            } else {
                updateProductApi(newRow.id, newRow);
                return newRow
            }
        },[]
    );

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };
    //endregion

    useEffect(_ => {
        if(productState.loaded)
        setRows(product)
    }, [product, productState]);

    //modal
    const [open, setOpen] = useState({bool: false, who: ''});
    const handleClose = () => setOpen({bool: false, who: ''});

    const allProductsGridColumns = useMemo(
        () => [
        {
            field: 'id',
            headerName: '#',
            width: 40,
            align: 'center',
            filterable: false,
            renderCell: (index) => index.api.getRowIndex(index.row.id) + 1
        }, {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            align: 'center',
            editable: true,
            renderCell: (params) => {
                return <Typography variant='span'>{params.row.name}</Typography>
            }
        }, {
            field: 'image',
            headerName: 'Image',
            flex: 3,
            align: 'center',
            renderCell: (params) => {
                let addImgBtn = params.row.image.length === 4;
                return (
                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width: 'fit-content'}} gap='10px'>
                        <Stack flexDirection='row' sx={{height: '100%'}}>
                            {params.row.image.map(i =>
                                <img key={i.id} src={i.url} alt='1' style={{height: '100%', width: '80px'}}/>
                            )}
                        </Stack>
                        <Button disabled={addImgBtn} variant="outlined" component="label" sx={{marginRight: '20px', minWidth: '46px', cursor: 'pointer'}}>
                            <input hidden accept="image/*" multiple type="file" />
                            <CameraAltIcon/>
                        </Button>
                    </Stack>
                )
            }
        }, {
            field: 'color',

            headerName: 'Color',
            flex: 1,
            align: 'center',
            renderCell: (params) => {
                let color = [];
                color = color.length ? params.row.color.map(c => color += `${c} `) : params.row.color;
                return (
                    <Stack flexDirection='row' gap='5px'>
                        {color.map((c, i) =>
                            <Typography key={c} variant='span'>
                                {(i ? ', ' : '') + c}
                            </Typography>
                        )}
                    </Stack>
                )
            }
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            align: 'center',
            renderCell: (params) => {
                return (
                    <Stack flexDirection='row' gap='5px'>
                        {params.row.size.map((s, i) =>
                            <Typography key={s} variant='span'>
                                {formatSizeArray(s, i)}
                            </Typography>
                        )}
                    </Stack>
                )
            }
        }, {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            align: 'center',
            editable: true,
            renderCell: (params) => {
                return (
                    <Stack flexDirection='row' gap='5px'>
                        {params.row.category.map((c, i) =>
                            <Typography key={c} variant='span'>
                                {(i ? ', ' : '') + c}
                            </Typography>
                        )}
                    </Stack>
                )
            }
        }, {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            flex: 1,
            align: 'center',
            editable: true,
            valueFormatter: ({value}) => `$ ${value}`
        }, {
            field: 'discount',
            headerName: 'Discount',
            type: 'number',
            flex: 1,
            align: 'center',
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.discount > 0 ? 'green' : 'red';
                return (
                    <Box sx={{color: tempColor}}>{params.row.discount}</Box>
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
                return <Typography sx={{color: tempColor }} variant='span'>{params.row.active? 'true' : 'false'}</Typography>
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
                    <Tooltip title="Variants">
                        <GridActionsCellItem
                            icon={<BorderAllIcon/>}
                            label="Variants"
                            onClick={_ => {
                                setVariationGridData({
                                    ...variationGridData,
                                    variations: params.row.variation,
                                    productName: params.row.name,
                                    product: params.row
                                });
                                setOpen({bool: true, who: 'variation'})
                            }}
                            // showInMenu
                        />
                    </Tooltip>,
                    <Tooltip title="Edit">
                        <GridActionsCellItem
                            icon={<EditIcon/>}
                            label="Edit"
                            // disabled={true}
                            onClick={_ => handleEditClick(params.id)}
                            // showInMenu
                        />
                    </Tooltip>,
                    // <Tooltip title="Delete">
                    //     <GridActionsCellItem
                    //         icon={<DeleteIcon/>}
                    //         label="Delete"
                    //         onClick={_ => {
                    //             window.confirm({type: 'warning', content: 'Sure want to delete this Product?'})
                    //                 .then(res => {
                    //                     if (res) {
                    //                         setRows(prev => prev.filter(item => item.id !== params.id))
                    //                         window.displayNotification({
                    //                             title: 'Done',
                    //                             type: 'success',
                    //                             content: 'Product Deleted Successfully'
                    //                         })
                    //                     }
                    //                 })
                    //
                    //         }}
                    //
                    //     />
                    // </Tooltip>,
                ]
            },
        }
    ], [handleEditClick, handleSaveClick, handleCancelClick, rowModesModel, variationGridData]);

    return (
        <ChildLocal sx={{height: 'calc(100vh - 80px)', padding: 0}}>
            {open.bool && <EzModalWithTransition open={open.bool} handleClose={handleClose}>
                {open.who === 'variation' &&
                    <VariationGrid
                        variation={variationGridData.variations}
                        product={variationGridData.product}
                        productName={variationGridData.productName}
                    />
                }
                {open.who === 'addProduct' && <AddProduct handleClose={handleClose}/>}
            </EzModalWithTransition>}
            <Box sx={{height: 'calc(100% - 49px)', width: '100%'}}>
                <TableHeader>
                    <EzIconButton
                        toolTipTitle='Add Product'
                        icon={<AddIcon/>}
                        onClick={_ => setOpen({bool: true, who: 'addProduct'})}
                    />
                    <EzText text='Product' sx={{color: '#fff', fontSize: '14px'}}/>
                </TableHeader>
                {row.length &&
                    <DataGrid
                        sx={tableSx}
                        rows={row}
                        columns={allProductsGridColumns}
                        getRowId={row => row.id}
                        rowHeight={120}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20]}
                        //to edit function in v5 editMode and experimentalFeatures are required
                        editMode='row'
                        onRowEditStart={handleRowEditStart}//disable edit with dbclick
                        onRowEditStop={handleRowEditStop}//disable edit with dbclick
                        experimentalFeatures={{ newEditingApi: true }}
                        onRowModesModelChange={model => setRowModesModel(model)}
                        rowModesModel={rowModesModel}
                        // components={{
                        //     Toolbar: EzEditToolBar
                        // }}
                        // componentsProps={{
                        //     toolbar: {
                        //         rowMode,
                        //         rowModesModel,
                        //         setRowModesModel,
                        //         selectedRowParams
                        //     },
                        //     row: {
                        //         onFocus: handleRowFocus
                        //     }
                        // }}
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        // loading={productState.loading}
                    />
                }
            </Box>
        </ChildLocal>
    );
}
