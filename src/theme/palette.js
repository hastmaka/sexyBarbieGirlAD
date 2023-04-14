import {alpha} from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
};

const ecommerce = {
    fontColorOne: '#6e6e73',
    fontColorTwo: '#9a9999',
    fontColorNumbers: '#2c2c2c',
    bgColor: 'rgb(10,25,41)',
    colorOne: '#454F5B',
    colorTwo: '#C4CDD5',
    selectedColor: '#F4F6F8',
    selectedBgColor: 'rgba(145,158,171,0.32)',
    backDrop: 'rgba(10,25,41,0.55)',
    navBgColor: '#1F2021EA',

    swatch_1: '#141516',
    swatch_2: '#3a3a3a',
    swatch_3: '#a3a3a4',
    swatch_4: '#e0e0e0',
    swatch_5: '#cfcfd0',
    swatch_6: '#dd101d',

    swatch_7: '#1f2021',
    swatch_8: '#f7f8fa',
    swatch_9: '#a5a5a5',
    swatch_10: '#948775',
    swatch_11: '#ecb72d',
    swatch_12: '#d0a22c',
    swatch_13: 'rgba(235,126,0,0.7)',

    pink: '#f438de',
    pink_1: '#67005F',
    pink_2: '#89007D',
    pink_3: '#AC009C',
    middlePurple: '#db83cbff',
    orchidCrayola: '#ff99ecff',
    top_back: '#2a2d43',
    corn: '#ffec5eff',
    aryLideYellow: '#dece53ff',
    gold: '#ffa033',
    darkGold: '#eb7e00',
    darkBlue: '#022a47',

    checkBox: '#f438de',
    checkBoxActive: '#ffa033',
    accordionExpanded: 'rgba(255,153,236,0.16)',
    badgeBgColor: 'rgba(137,0,125,0.65)',
    //admin-dashboard
    tableHeader: '#3c6e71',
    toolBarAndSideBarBg: '#2f3e46',
    inactive_color: '#767193',
    bg_parent: '#EDEDED',
    tableBg: '#fff',
    tableBorder: '#e7e7e7',
    tableBCCellInEditingMode: '#d9d9d9',
    tableBCActionCellInEditingMode: '#e7e7e7',
}

const PRIMARY = {
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#fff',
};

const SECONDARY = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff',
};

const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff',
};

const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800],
};

const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800],
};

const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff',
};

const GRADIENTS = {
    primary: createGradient(PRIMARY.light, PRIMARY.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
    violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
    blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
    green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
    yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
    red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const palette = {
    ecommerce: {...ecommerce},
    common: {black: '#000', white: '#fff'},
    primary: {...PRIMARY},
    secondary: {...SECONDARY},
    info: {...INFO},
    success: {...SUCCESS},
    warning: {...WARNING},
    error: {...ERROR},
    grey: GREY,
    gradients: GRADIENTS,
    chart: CHART_COLORS,
    divider: GREY[500_24],
    text: {primary: GREY[800], secondary: GREY[600], disabled: GREY[500]},
    background: {paper: '#fff', default: GREY[100], neutral: GREY[200]},
    action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
};

export default palette;
