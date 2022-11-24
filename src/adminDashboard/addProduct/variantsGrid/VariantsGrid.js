import {useEffect, useMemo, useState} from "react";
// material
import {Box, Button, Stack, Typography} from "@mui/material";
import styled from 'styled-components';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import UpdateIcon from '@mui/icons-material/Update';

//----------------------------------------------------------------

const border = '#adadad';
const tableSx = {
    borderBottom: `1px solid ${border}`,
    borderLeft: `1px solid ${border}`,
    borderRight: `1px solid ${border}`,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,

};

const TableToolBar = styled(Stack)({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 700,
    backgroundColor: '#d9d9d9',
})

//----------------------------------------------------------------

export default function VariantsGrid({variation, dataToUpdateProducts, name}) {
    const [tempVariation, setTempVariation] = useState([]);
    useEffect(() => {
        setTempVariation(variation);
    },[variation]);
    const variantsGridColumns = useMemo(
        () => [{
            field: 'color',
            headerName: 'Color',
            flex: 1,
            editable: true,
        }, {
            field: 'size',
            headerName: 'Size',
            flex: 1,
            editable: true,
            valueFormatter: ({value}) =>
                value === 1 ? 'XS' :
                value === 2 ? 'S' :
                value === 3 ? 'M' :
                value === 4 ? 'L' :
                value === 5 ? 'XL' : ''
        }, {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            type: 'number',
            editable: true,
            valueFormatter: ({value}) => `$ ${value}`
        }, {
            field: 'stock',
            headerName: 'Stock',
            flex: 1,
            editable: true,
            type: 'number',
        }, {
            field: 'action',
            headerName: 'Action',
            type: 'actions',
            flex: 1,
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
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<FileCopyIcon/>}
                    label="Duplicate User"
                    onClick={duplicateUser(params.id)}
                    showInMenu
                />,
            ],
        }
        ], []);
    const deleteUser = (id) => {
        // debugger
        setTempVariation((prevRow) => prevRow.filter((row) => row.id !== id));
    }
    const toggleAdmin = () => {
    }
    const duplicateUser = () => {
    }
    // const handleEditRowsModelChange = (a) => {
    //     // debugger
    //     dataToUpdateProducts(a)
    // }
    const handleRowEditStop = (a, b, c, d) => {
        // debugger
        dataToUpdateProducts(a)
    }
    return (
        <Box sx={{height: '500px', width: '100%'}}>
            <TableToolBar>
                <Typography variant='span'>Variations of: {name}</Typography>
                <Button disabled variant="contained" startIcon={<UpdateIcon />}>
                    Update
                </Button>
            </TableToolBar>
            {tempVariation?.length ? <DataGrid
                sx={tableSx}
                rows={tempVariation}
                columns={variantsGridColumns}
                getRowId={row => row.id}
                // rowHeight={120}
                pageSize={10}
                rowsPerPageOptions={[10]}

                editMode="row"
                // onEditRowsModelChange={handleEditRowsModelChange}
                // onCellDoubleClick={handleDoubleCellClick}
                onRowEditStop={handleRowEditStop}

                // onRowClick={(data) => {
                //     setVariation(data.row.product_variation);
                // }}
            /> : <Box>No Data To Show</Box>}
        </Box>
    );
}
