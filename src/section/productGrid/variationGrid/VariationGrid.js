import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
// material
import {Box, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
//
import EzEditToolBar from "../EzEditToolBar/EzEditToolBar";
import EzText from "../../../components/ezComponents/EzText/EzText";
import {productSliceActions} from "../../../store/productSlice";
import EzFileInput from "../../../components/ezComponents/EzFileInput/EzFileInput";
import PrevImages from "../addProduct/productMedia/prevImages/PrevImages";

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

export default function VariationGrid({variation, product, productName, dataToUpdateProducts: dataToUpdateProduct}) {
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows, setRows] = useState([]);
    //to restore input lastChild value and prevent bugs
    const hiddenInputRef = useRef();

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
        debugger
        window.displayNotification({type: 'info', content: error.message})
        console.log(error)
    }, []);

    const processRowUpdate = useCallback(
        async (newRow, oldRow, rows) => {
            // debugger
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
                    if(dataToUpdateProduct) {
                        // debugger
                        //update variation when product is in creating mode
                        dataToUpdateProduct(await import('../../../helper').then(module => {
                            return module.sortArray(tempRows)
                        }))
                    }
                } else {
                    //new variation
                    const {isNew, ...rest} = newRow;
                    tempRows = [...tempRows, rest];
                }
                setRows(await import('../../../helper').then(module => {return module.sortArray(tempRows)}))
                window.dispatch(productSliceActions.updateProduct({
                    ...rest,
                    id,
                    variation: await import('../../../helper').then(module => {return module.sortArray(tempRows)})
                }))
                //if no id, the product was not uploaded yet
                if(id) await import('../../../helper/firebase/FirestoreApi').then(module =>
                    module.updateProductApi(id, {id, variation: tempRows, ...rest})
                );
                return newRow
            }
        },[]
    );

    const handleAddImage = async (e, row) => {
        debugger
        const indexToUpdate = variation.findIndex(i => i.id === row.id);
        for (let i = 0; i < e.target.files.length; i++) {
            //check if image was already added
            if(row.varImage.length) {
                if(!!row.varImage.find(item => item.File.name === e.target.files[i].name)) continue;
            }
            // if(newImage.size > 50000) return alert('Img size must be less than 50k');
            variation[indexToUpdate].varImage.push({
                File: e.target.files[i],
                id: await import('../../../helper').then(module => {return module.createId(20)}),
                uploaded: false
            })
        }
        // let temp = [...variation[indexToUpdate].varImage].sort((a,b) => a.File.name > b.File.name ? 1 : -1);
        // setRows(prev => { return {...prev, varImage: temp}})
        dataToUpdateProduct(variation)
    }

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
            field: 'image',
            headerName: 'Image',
            flex: 3,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                // debugger
                let addImgBtn = params.row.varImage.length === 4;
                return (
                    <>
                        <PrevImages image={params.row.varImage}/>
                        <EzFileInput
                            icon={<CameraAltIcon/>}
                            image={params.row.varImage}
                            onChange={e => handleAddImage(e, params.row)}
                            hiddenInputRef={hiddenInputRef}
                        />
                    </>
                    // <Stack
                    //     // onClick={e => onImageClickHandler(params.row.image, e)}
                    //     flexDirection='row'
                    //     justifyContent='space-between'
                    //     alignItems='center'
                    //     sx={{width: 'fit-content', cursor: 'pointer'}}
                    //     gap='10px'
                    // >
                    //     <Stack flexDirection='row' sx={{height: '100%'}}>
                    //         {params.row.varImage.map(i =>
                    //             <img
                    //                 // onClick={onImageClickHandler} //delete or update
                    //                 key={i.id}
                    //                 src={i.url}
                    //                 alt={i.url}
                    //                 style={{height: '100%', width: '50px'}}
                    //             />
                    //         )}
                    //     </Stack>
                    //     <Button
                    //         ref={addBtnRef}
                    //         disabled={addImgBtn}
                    //         variant="outlined"
                    //         component="label"
                    //         sx={{
                    //             // marginRight: '20px',
                    //             minWidth: '46px',
                    //             cursor: 'pointer'
                    //         }}
                    //     >
                    //         <input hidden accept="image/*" multiple type="file" />
                    //         <CameraAltIcon/>
                    //     </Button>
                    // </Stack>
                )
            }
        }, {
            field: 'color',
            headerName: 'Color',
            flex: 1.3,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Stack direction='row' justifyContent='space-between' width='80%'>
                        <span>{params.row.color}</span>
                        <Box
                            style={{
                                height: '20px',
                                width: '20px',
                                borderRadius: '5px',
                                backgroundColor: params.row.color
                            }}
                        />
                    </Stack>
                )
            }
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
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
        <RootStyle datatoupdateproducts={(!!dataToUpdateProduct).toString()}>
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
                                // setOpen,
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

VariationGrid.prototype = {
    variation: PropTypes.array.isRequired,
    product: PropTypes.object.isRequired,
    productName: PropTypes.string.isRequired,
    dataToUpdateProduct: PropTypes.func.isRequired
}