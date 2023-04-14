import {useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
// material
import {Box, Button, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import EditIcon from '@mui/icons-material/Edit';
//
import ChildWrapper from "../../components/ChildWrapper/ChildWrapper";
import VariationGrid from "./variationGrid/VariationGrid";
import EzIconButton from "../../components/ezComponents/EzIconButton/EzIconButton";
import EzText from "../../components/ezComponents/EzText/EzText";
import AddOrEditProduct from "./addProduct_v2/AddOrEditProduct";
import {getAll, updateProductApi} from "../../helper/firebase/FirestoreApi";
import EzEditToolBar from "./EzEditToolBar/EzEditToolBar";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import EzSwiper from "../../components/ezComponents/EzSwiper/EzSwiper";
import {SwiperSlide} from "swiper/react";
import {staticData} from "../../helper/staticData/StaticData";
import {openModal} from "../../helper";
import {tableSx} from "../../helper/sx/Sx";
import EzMuiGrid from "../../components/EzMuiGrid/EzMuiGrid";
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

//----------------------------------------------------------------

export default function ProductGrid() {
    const {product, tempProduct, productState} = useSelector(slice => slice.product);
    const [rows, setRows] = useState([]);
    const addBtnRef = useRef();
    const [rowModesModel, setRowModesModel] = useState({});
    const [isAddActive, setIsAddActive] = useState(false);

    useEffect(() => {
        if (!productState.loading && !productState.loaded) {
            window.dispatch(getAll({collection: 'products'}))
        }
    }, [productState]);

    useEffect(_ => {
        if(productState.loaded)
            setRows(product)
    }, [product, productState]);

    //region
    // const [selectedRowParams, setSelectedRowParams] = useState(null);

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
    //endregion


    const handleDoubleClick = (params, e) => {
        // openModal(<AddOrEditProduct tempData={params.row}/>)
    }

    const processRowUpdate = useCallback(
        async (newRow, oldRow) => {
            await new Promise((resolve, reject) => {
                //check empty field
                if(!(!!newRow.name) || !(!!newRow.category)) {
                    return reject({type: 'error', content: 'No empty field allowed'});
                } else if (newRow.price <= 0) {
                    return reject({type: 'error', content: 'Price must be greater then 0'});
                }
                resolve()
            })
            if(JSON.stringify(newRow) === JSON.stringify(oldRow)) {
                return oldRow
            } else {
                updateProductApi(newRow.id, newRow)
                return newRow
            }
        },[]
    );

    const handleChangeImage = (item) => {
      debugger
    }

    const handleDeleteImage = (item) => {
      debugger
    }

    const onImageClickHandler = async (images, e) => {
        // debugger
        openModal(<Stack
            sx={{
                height: 'calc(90vh)',
                // width: '60vw',
                maxHeight: '950px',
                maxWidth: '768px',
                '& .swiper': {
                    width: '100%',
                    height: '100%',
                }
            }}>
            <EzSwiper allowTouchMove show data={images.map(item => {
                return ({id: item.id, el:
                        <SwiperSlide>
                            <Stack sx={{position: 'relative'}}>
                                <Stack
                                    sx={{
                                        position: 'absolute',
                                        top: '7px',
                                        right: '10px',
                                        color: 'whitesmoke',
                                        flexDirection: 'row',
                                        backgroundColor: 'rgba(153,153,153,0.70)',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <EzIconButton
                                        icon={<PublishedWithChangesIcon/>}
                                        toolTipTitle='Change Image'
                                        size='small'
                                        ariaLabel='change-image'
                                        onClick={_ => handleChangeImage(item)}
                                    />
                                    <EzIconButton
                                        icon={<DeleteOutlineIcon/>}
                                        toolTipTitle='Delete Image'
                                        size='small'
                                        ariaLabel='delete-icon'
                                        onClick={_ => handleDeleteImage(item)}
                                    />
                                </Stack>
                                <img src={item.url} alt={item.url} style={{width: '100%', height: '100%'}}/>
                            </Stack>
                        </SwiperSlide>
                })
            })}/>
        </Stack>, 'swiper')
    }

    const columns = [
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
                flex: 1,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => {
                    return (
                        <Stack>
                            <img
                                style={{width: '60px'}}
                                src={params.row.color[0].image[0].url} alt=""/>
                        </Stack>
                    )
                }
        }, {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return <EzText text={params.row.name} sx={{fontSize: '13px'}}/>
            }
        }, {
            field: 'color',
            headerName: 'Color',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                let color = [];
                color = params.row.color.map(c => color += `${c.color} `);
                return (
                    <Stack flexDirection='row' gap='5px'>
                        {color.map((c, i) =>
                            <EzText key={c} text={(i ? ', ' : '') + c} sx={{fontSize: '13px'}}/>
                        )}
                    </Stack>
                )
            }
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Stack flexDirection='row' gap='5px'>
                        {params.row.size.map((s, i) =>
                            <EzText key={s.size} text={(i ? ', ' : '') + s.size} sx={{fontSize: '13px'}}/>
                        )}
                    </Stack>
                )
            }
        }, {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Stack flexDirection='row' gap='5px'>
                        {params.row.category.map((c, i) =>
                            <EzText key={c} text={(i ? ', ' : '') + c} sx={{fontSize: '13px'}}/>
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
            headerAlign: 'center',
            editable: true,
            renderCell: ({value}) => {
                return <EzText text={`$ ${value}`} sx={{fontSize: '13px'}}/>
            }
        }, {
            field: 'active',
            headerName: 'Active',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            type: 'boolean',
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.active === true ? 'green' : 'red';
                return <EzText text={params.row.active? 'true' : 'false'} sx={{fontSize: '13px', color: tempColor}}/>
            }
        }
    ]

    return (
        <ChildWrapper sx={{height: 'calc(100vh - 80px)', padding: 0}}>
            <Box sx={{height: '100%', width: '100%'}}>
                {rows.length ?
                    <EzMuiGrid
                        rows={rows}
                        setRows={setRows}
                        columns={columns}
                        rowHeight={85}
                        setRowModesModel={setRowModesModel}
                        rowModesModel={rowModesModel}
                        processRowUpdate={processRowUpdate}
                        isAddActive={isAddActive}
                        setIsAddActive={setIsAddActive}
                        components={{
                            Toolbar: EzEditToolBar
                        }}
                        componentsProps={{
                            toolbar: {
                                rowModesModel,
                                setRowModesModel,
                                tempProduct,
                                from: 'product'
                            },
                        }}
                        disableSelectionOnClick
                        sx={({palette}) => tableSx(palette)}
                    /> :
                    <EzButton
                        onClick={_ => openModal(<AddOrEditProduct tempData={staticData}/>)}
                    >First Product</EzButton>
                }
            </Box>
        </ChildWrapper>
    );
}
