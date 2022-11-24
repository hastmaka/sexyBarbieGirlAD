// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({checked, theme}) => ({
    marginTop: '10px',
    padding: '7px 17px',
    borderRadius: '35%',
    color: checked ? '#FFF' : theme.palette.ecommerce.swatch_3,
    backgroundColor: checked ? theme.palette.ecommerce.pink : 'rgba(153,153,153,0.34)',
    transition: 'all 200ms',
    '&:hover': {
        cursor: 'pointer',
        color: 'white',
        backgroundColor: checked ? theme.palette.ecommerce.pink : 'rgba(153,153,153,0.34)'
    }
}));

//----------------------------------------------------------------

export default function EzSizePicker({size, onClick, checked}) {
    return (
        <RootStyle
            checked={checked}
            onClick={_ => onClick(size)}
        >
            {size === 1 ? 'XS' : size === 2 ? 'S' : size === 3 ? 'M' : size === 4 ? 'L' : size === 5 ? 'XL' : ''}
        </RootStyle>
    );
}
