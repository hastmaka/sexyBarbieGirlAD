import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const CustomToolbar = () => {
    const apiRef = useGridApiContext();
    // debugger
    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
        <GridToolbarContainer>
            <Button onClick={handleGoToPage1}>Go to page 1</Button>
        </GridToolbarContainer>
    );
};

export default function UseGridApiContext() {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 6,
        rowsPerPageOptions: 10
    });

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                {...data}
                components={{
                    Toolbar: CustomToolbar,
                }}
                pageSize={10}
            />
        </Box>
    );
}
