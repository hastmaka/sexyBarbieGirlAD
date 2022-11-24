// material
import {Box, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {DataGrid} from "@mui/x-data-grid";
import EzIconButton from "../../../components/ezComponents/EzIconButton/EzIconButton";
import AddIcon from "@mui/icons-material/Add";
import EzText from "../../../components/ezComponents/EzText/EzText";
import {useMemo} from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '700px',
    width: '100%',
    '& > div': {
        height: 'calc(100% - 60px)',
        width: '100%'
    }
}));

const TableHeader = styled(Stack)(({theme}) => ({
    color: theme.palette.grey[0],
    padding: '10px 20px',
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

export default function VariationGrid({variationGridData}) {

    const allProductsVariantsGridColumns = useMemo(() => [{
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
        }
    ], []);

    return (
        <RootStyle>
            <Box>
                {variationGridData.variations.length &&
                    <>
                        <TableHeader>
                            <EzIconButton
                                toolTipTitle='Add Variation'
                                icon={<AddIcon/>}
                            />
                            Variants of: {variationGridData.productName}
                        </TableHeader>
                        <DataGrid
                            sx={tableSx}
                            rows={variationGridData.variations}
                            columns={allProductsVariantsGridColumns}
                            getRowId={row => row.id}
                            editMode='row'
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                    </>}
            </Box>

        </RootStyle>
    );
}
