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