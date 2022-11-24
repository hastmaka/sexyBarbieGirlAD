import {Box} from "@mui/material";



export const allProductsVariantsGridColumns = [{
        field: 'color',
        headerName: 'Color',
        flex: 1,
        editable: true,
    }, {
        field: 'size',
        headerName: 'Size',
        flex: 1,
        editable: true,
        valueFormatter: ({value}) => value === 1 ? 'XS' : value === 2 ? 'S' : value === 3 ? 'M' : value === 4 ? 'L' : value === 5 ? 'XL' : ''
    }, {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        editable: true,
        valueFormatter: ({value}) => `$ ${value}`
    }, {
        field: 'stock',
        headerName: 'Stock',
        flex: 1,
        editable: true,
        renderCell: (params) => {
            let s = params.row.stock,
                tempColor = s <= 5 ? '#d00000' : s <= 10 ? '#dc2f02' : s <= 20 ? '#ffb703' : s <= 50 ? '#006d77' : '';
            return (
                <Box sx={{color: tempColor}}>{params.row.stock}</Box>
            )
        }
    },
];

