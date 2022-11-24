// ----------------------------------------------------------------------

export default function Backdrop(theme) {
    return {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    background: theme.palette.ecommerce.backDrop,
                    '&.MuiBackdrop-invisible': {
                        background: 'transparent',
                    },
                },
            },
        },
    };
}
