// material
import {Box, Stack} from '@mui/material';
//---------------------------------------------------------------

const EzFormatPrice = ({price, currencyTop, priceFS, decimalTop, oldPrice, color, justifyContent}) => {
    // debugger
    let nPrice = typeof price === 'string' ? parseInt(price) : price;
    return (
        <Stack
            justifyContent={justifyContent ? justifyContent: 'center'}
            flexDirection='row'
            alignItems='center'>
            <Box component='span'
                sx={{
                    color: color ? color : theme => theme.palette.ecommerce.pink,
                    position: 'relative',
                    fontWeight: 700,
                    fontSize: {xs: `${priceFS ? priceFS - 5: 10}px`, md:`${priceFS ? priceFS - 5: 12}px`},
                    top: `${currencyTop ? currencyTop : -0.2}rem`,
                    opacity: oldPrice ? 0.5 : '',
                }}>$</Box>

            {nPrice > 0 ?
                <Box component='span'
                    sx={{
                        fontSize: {xs: `${priceFS ? priceFS : 12}px`, md: `${priceFS ? priceFS : 16}px`},
                        textDecoration: oldPrice ? 'line-through' : '',
                        opacity: oldPrice ? 0.5 : '',
                        color: color ? color : theme => theme.palette.ecommerce.pink,
                        fontWeight: 700,
                        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.20)'
                }}>
              {nPrice.toFixed(2).split('.')[0]}
            </Box> : ''}

            {nPrice > 0 ?
                <Box component='span'
                    sx={{
                        color: color ? color : theme => theme.palette.ecommerce.pink,
                        fontSize: {xs: `${priceFS ? priceFS - 4: 8}px`, md: `${priceFS ? priceFS - 7: 10}px`},
                        top: `${decimalTop ? decimalTop : -0.2}rem`,
                        textDecoration: oldPrice ? 'line-through' : '',
                        opacity: oldPrice ? 0.5 : '',
                        fontWeight: 700,
                        position: 'relative',
                        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.20)'
                }}>
              {nPrice.toFixed(2).split('.')[1]}
            </Box> : ''}
        </Stack>
    );
}

export default EzFormatPrice;