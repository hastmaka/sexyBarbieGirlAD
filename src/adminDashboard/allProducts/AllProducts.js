import {useState} from "react";
import {useSelector} from "react-redux";
// material
import {Box, Button, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
//firestore
//
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {allProductsGridColumns, allProductsVariantsGridColumns} from "./AllProductsGridColumns";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import {formatSizeArray} from "../../helper/Helper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%'
}));

const TableHeader = styled(Stack)(({theme}) => ({
    color: theme.palette.ecommerce.swatch_2,
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 700,
    backgroundColor: theme.palette.ecommerce.tableHeader,
}))

const border = '#adadad';
const tableSx = {
    borderBottom: `1px solid ${border}`,
    borderLeft: `1px solid ${border}`,
    borderRight: `1px solid ${border}`,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
};

//---------------------------------------------------------------

export default function AllProducts() {
    const [tempRowEditingData, setTempRowEditingData] = useState([]);
    const [variationGridData, setVariationGridData] = useState({
        variations: [],
        productName: ''
    });
    const {product, productState} = useSelector(slice => slice.shop);

    const allProductsGridColumns = [
        // { field: 'product_id', headerName: 'ID', width: 130 },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: true,
            renderCell: (params) => {
                return <Typography variant='span'>{params.row.name}</Typography>
            }
        }, {
            field: 'image',
            headerName: 'Image',
            flex: 3,
            renderCell: (params) => {
                let addImgBtn = params.row.image.length === 4;
                return (
                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width: '100%'}}>
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
            editable: true,
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
        },{
            field: 'size',
            headerName: 'Size',
            flex: 1,
            editable: true,
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
            field: 'price',
            headerName: 'Price',
            flex: 1,
            editable: true,
            valueFormatter: ({value}) => `$ ${value}`
        }, {
            field: 'discount',
            headerName: 'Discount',
            flex: 1,
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
            editable: true,
            renderCell: (params) => {
                let tempColor = params.row.active === true ? 'green' : 'red';
                return <Typography sx={{color: tempColor }} variant='span'>{params.row.active? 'true' : 'false'}</Typography>

            }
        }, {
            field: 'action',
            headerName: 'Action',
            type: 'actions',
            sortable: false,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={_ => deleteUser(params.id)}

                />,
                <GridActionsCellItem
                    icon={<SecurityIcon/>}
                    label="Toggle Admin"
                    onClick={toggleAdmin(params.id)}
                    // showInMenu
                />,
            ],
        }
    ];

    const deleteUser = (id) => {
        // debugger
    }
    const toggleAdmin = () => {
    }
    const duplicateUser = () => {
    }

    const handleEditRowsModelChange = (row, reason) => {
        debugger
    }
    // const handleDoubleCellClick = (a,b,c,d) => {debugger}
    const handleRowEditStop = (row, e) => {
        debugger
        // dispatch(update({id: row.id, collection: 'productGrid', data: row.row}))
    }

    if (!productState.loaded) return;
    if (productState.loading) return <Box>Error All Product</Box>;

    return (
        <Stack gap='50px' sx={{height: 'calc(100vh - 55px)'}}>
             <Box sx={{height: 'calc((100% - 130px) / 2)', width: '100%'}}>
                <TableHeader>Products</TableHeader>
                {product.length && <DataGrid
                    sx={tableSx}
                    rows={product}
                    columns={allProductsGridColumns}
                    getRowId={row => row.name}
                    rowHeight={120}
                    pageSize={10}
                    rowsPerPageOptions={[10]}

                    editMode="row"
                    onEditRowsModelChange={handleEditRowsModelChange}
                    // onCellDoubleClick={handleDoubleCellClick}
                    onRowEditStop={handleRowEditStop}

                    onRowClick={(data) => {
                        setVariationGridData({
                            ...variationGridData,
                            variations: data.row.variation,
                            productName: data.row.name
                        });
                    }}
                />}
            </Box>


            <Box sx={{height: 'calc((100% - 60px) / 2)', width: '100%'}}>
                {variationGridData.variations.length &&
                    <>
                        <TableHeader>Variants of: {variationGridData.productName}</TableHeader>
                        <DataGrid
                            sx={tableSx}
                            rows={variationGridData.variations}
                            columns={allProductsVariantsGridColumns}
                            getRowId={row => row.id}

                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                        />
                    </>}
            </Box>
        </Stack>
    );
}

