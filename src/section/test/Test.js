// material
import {Box, Button, Stack, Tooltip, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzMuiGrid from "../../components/ezComponents/EzMuiGrid/EzMuiGrid";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {formatSizeArray} from "../../helper/Helper";
import {GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import EditIcon from "@mui/icons-material/Edit";
import ChildLocal from "../dashboard/childLocal/ChildLocal";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Test() {
    const {product, productState} = useSelector(slice => slice.admin);
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
                                // onClick={_ => {
                                //     setVariationGridData({
                                //         ...variationGridData,
                                //         variations: params.row.variation,
                                //         productName: params.row.name
                                //     });
                                //     setOpen({bool: true, who: 'variation'})
                                // }}
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
        ], []);

    return (
        <ChildLocal sx={{height: 'calc(100vh - 80px)', padding: 0}}>
            {productState.loaded &&
                <EzMuiGrid
                    row={product}
                    columns={allProductsGridColumns}
                    GridContainerSx={{height: 'calc(100vh - 130px)', width: '100%'}}
                    rowModesModel={rowModesModel}
                    setRowModesModel={setRowModesModel}
                    headerText='Test environment'
                />
            }
        </ChildLocal>
    );
}
