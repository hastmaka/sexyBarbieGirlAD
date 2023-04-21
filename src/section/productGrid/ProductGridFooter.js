// material
import {GridFooterContainer, GridPagination} from "@mui/x-data-grid";
import {Stack} from "@mui/material";

export default function ProductGridFooter({page, setPage, apiRef, pageSize, totalRows, onChange}) {
    return (
        <GridFooterContainer>
            <Stack direction='row' alignItems='center' p='0 0 0 20px' gap='20px'>
                wherever u want in the footer
            </Stack>
            <GridPagination/>
        </GridFooterContainer>
    );
}
