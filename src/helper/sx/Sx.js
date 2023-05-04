//EzFileInput
export const withoutIconSx = (image) => {
    return {
        width: 'fit-content',
        height: 'fit-content',
        minWidth: '110px',
        border: `1px solid ${'#cecdcd'}`,
        color: '#2065D1',
        padding: '5px 14px',
        borderRadius: '8px',
        transition: 'all 200ms',
        margin: 0,
        '&:hover': {
            border: image.length >= 4 ? '' : `1px solid ${'#2065D1'}`,
            backgroundColor: image.length >= 4 ? '' : 'rgba(158,187,245,0.26)'
        }
    }
}

export const withIcon = () => {
    return {

    }
}

export const tableSx = (palette) => {
    return {
        color: palette.ecommerce['swatch_1'],
        backgroundColor: palette.ecommerce['tableBg'],
        border: `1px solid ${palette.ecommerce['tableBorder']}`,
        '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${palette.ecommerce['tableBorder']}`,
        },
        '& .MuiTablePagination-toolbar': {
            color: palette.ecommerce['tableColor'],
            '& * svg': {
                fill: palette.ecommerce['tableColor']
            }
        },
        '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders': {
            borderBottom: `1px solid ${palette.ecommerce['selectedBgColor']}`
        },
        '& .MuiDataGrid-row--editing': {
            '& .MuiDataGrid-cell': {
                boxShadow: '' +
                    '0px 3px 1px -2px rgba(145, 158, 171, 0.2), ' +
                    '0px 2px 2px 0px rgba(145, 158, 171, 0.14), ' +
                    '0px 1px 5px 0px rgba(145, 158, 171, 0.12)',

                '& .MuiInputBase-input': {
                    color: palette.ecommerce['tableColor'],
                }
            },
            '& div[data-field="action"]': {
                // backgroundColor: palette.ecommerce['tableBCActionCellInEditingMode']
            }
        },
    }
}

export const btnOutlined = {
    color: theme => theme.palette.grey[100],
    border: `1px solid ${'#353535ff'}`,
    '&:hover': {
        color: theme => theme.palette['white'],
        border: `1px solid ${'#fff'}`,
        backgroundColor: theme => theme.palette['jet'],
    }
}