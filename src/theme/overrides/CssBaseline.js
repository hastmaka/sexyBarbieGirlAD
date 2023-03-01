// ----------------------------------------------------------------------

import {useSelector} from "react-redux";

export default function CssBaseline() {
    const {screen} = useSelector(slice => slice.admin);
    return {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    fontWeight: '500 !important',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    fontFamily: 'Roboto,serif !important',
                    '&::-webkit-scrollbar': {
                        height: '8px',
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#cccccc'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c203ab',
                        borderBottom: '1px solid #999'
                    }
                },
                html: {
                    width: '100%',
                    height: '100%',
                    WebkitOverflowScrolling: 'touch',
                    // scrollBehavior: 'smooth'
                },
                body: {
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    lineHeight: 1.3,
                    color: '#323232'
                },
                '#root': {
                    width: '100%',
                    height: '100%',
                    fontSize: screen <= 786 ? '12px' : '13px',
                    position: 'relative'
                },
                input: {
                    '&[type=number]': {
                        MozAppearance: 'textfield',
                        '&::-webkit-outer-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none',
                        },
                        '&::-webkit-inner-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none',
                        },
                    },
                },
                img: {
                    display: 'block',
                    maxWidth: '100%',
                },
            },
        },
    };
}