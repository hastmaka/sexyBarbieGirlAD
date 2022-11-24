import PropTypes from 'prop-types';
import {useMemo} from 'react';
import {ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
// material
import {CssBaseline} from '@mui/material';
import {createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, {customShadows} from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({children}) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: {borderRadius: 8},
            typography,
            shadows,
            customShadows,
        }),
        []
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <StyledComponentsThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </StyledComponentsThemeProvider>
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}
