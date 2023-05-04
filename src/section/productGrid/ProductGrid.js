import {useSelector} from "react-redux";
import {lazy, Suspense, useCallback, useEffect, useRef, useState} from "react";
// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
//
import ChildWrapper from "../../components/ChildWrapper/ChildWrapper";
import EzIconButton from "../../components/ezComponents/EzIconButton/EzIconButton";
import EzText from "../../components/ezComponents/EzText/EzText";
import {getAll, updateProductApi} from "../../helper/firebase/FirestoreApi";
import ProductGridToolBar from "./ProductGridToolBar";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import EzSwiper from "../../components/ezComponents/EzSwiper/EzSwiper";
import {SwiperSlide} from "swiper/react";
import {findFirst, openModal} from "../../helper";
import {tableSx} from "../../helper/sx/Sx";
import EzMuiGrid from "../../components/EzMuiGrid/EzMuiGrid";
import AddOrEditProduct from "./addOrEditProduct/AddOrEditProduct";
import {productSliceActions} from "../../store/productSlice";
import ProductGridFooter from "./ProductGridFooter";
// dynamic import
const AOEP = lazy(() => import("./addOrEditProduct_v2/AOEP"))

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
    const {product, productState, productInEditMode} = useSelector(slice => slice.product);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isAddActive, setIsAddActive] = useState(false);
    const addBtnRef = useRef();

    useEffect(() => {
        if (!productState.loading && !productState.loaded) {
            window.dispatch(getAll({collection: 'tests', filter: null, lim: null}))
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


    const handleOnRowDoubleClick = (params, e) => {
        window.dispatch(productSliceActions.setTempProduct(params.row))
        openModal(
            <Suspense fallback={<div>'...loading'</div>}>
                <AOEP editMode/>
            </Suspense>
        )
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
            renderCell: (params) => {
                let value = params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1;
                return isNaN(value) ? '' : value.toString()
            }
        }, {
                field: 'image',
                headerName: 'Image',
                flex: 1,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => {
                    //found the first color with image to show
                    const found = findFirst(item => item.uploaded, params.row.color);
                    if(!!found) {
                        return (
                            <Stack>
                                <img
                                    style={{width: '60px'}}
                                    src={found.url} alt=""/>
                            </Stack>
                        )
                    } else {
                        return <p>No image to show</p>
                    }
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
                return (
                    <Stack flexDirection='row' gap='5px'>
                        {params.row.color.map((c, i) =>
                            <EzText key={c.color} text={(i ? ', ' : '') + c.color} sx={{fontSize: '13px'}}/>
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
        },
        // {
        //     field: 'price',
        //     headerName: 'Price',
        //     type: 'number',
        //     flex: 1,
        //     align: 'center',
        //     headerAlign: 'center',
        //     editable: true,
        //     renderCell: ({value}) => {
        //         return <EzText text={`$ ${value}`} sx={{fontSize: '13px'}}/>
        //     }
        // },
        {
            field: 'active',
            headerName: 'Active',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            type: 'boolean',
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.active === true ? 'green' : 'red';
                return <EzText text={params.row.active? 'true' : 'false'} sx={{fontSize: '13px', color: tempColor}}/>
            }
        }
    ];

    return (
        <ChildWrapper sx={{height: 'calc(100vh - 80px)', padding: 0}}>
            <Box sx={{height: '100%', width: '100%'}}>
                {rows.length ?
                    <EzMuiGrid
                        rows={rows}
                        setRows={setRows}
                        columns={columns}
                        autoPageSize
                        rowHeight={85}
                        setRowModesModel={setRowModesModel}
                        rowModesModel={rowModesModel}
                        processRowUpdate={processRowUpdate}
                        isloading={productState.loading}
                        isAddActive={isAddActive}
                        setIsAddActive={setIsAddActive}
                        onRowDoubleClick={handleOnRowDoubleClick}
                        components={{
                            Toolbar: ProductGridToolBar,
                            Footer: ProductGridFooter,
                        }}
                        componentsProps={{
                            toolbar: {
                                rowModesModel,
                                setRowModesModel,
                                // tempProduct
                            },
                        }}
                        disableSelectionOnClick
                        sx={({palette}) => tableSx(palette)}
                    /> :
                    <EzButton
                        onClick={_ =>
                            openModal(
                                <Suspense fallback={<div>'...loading'</div>}>
                                    <AOEP/>
                                </Suspense>
                            )
                    }
                    >First Product</EzButton>
                }
            </Box>
        </ChildWrapper>
    );
}
