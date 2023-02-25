// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../components/ezComponents/EzText/EzText";
import EzSimpleLink from "../../components/ezComponents/EzSimpleLink/EzSimpleLink";
import EzFormatPrice from "../../components/ezComponents/EzFormatPrice/EzFormatPrice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row'
}));

const ImageContainer = styled(Stack)(({theme}) => ({
    width: '100px',
    borderRadius: '4px'
}));


//----------------------------------------------------------------

export default function OrderProduct({img, price, size, name, color, qty}) {
    return (
        <RootStyle>
            <ImageContainer>
                <img
                    src={img.url}
                    alt="order-product"
                    style={{borderRadius: '4px'}}
                />
            </ImageContainer>
            <Stack p={1} justifyContent='center' gap='2px'>
                <Stack flexDirection='row'>
                    <EzText text='Name: '/>
                    <EzText text={name}/>
                </Stack>
                <Stack flexDirection='row'>
                    <EzText text='Color: '/>
                    <EzText text={color}/>
                </Stack>
                <Stack flexDirection='row'>
                    <EzText text='Size: '/>
                    <EzText text={size}/>
                </Stack>
                <Stack flexDirection='row'>
                    <EzText text='Quantity: '/>
                    <EzText text={qty}/>
                </Stack>
                <Stack flexDirection='row' alignItems='center'>
                    <EzText text='Price: '/>
                    <EzText text={<EzFormatPrice price={price}/>}/>
                </Stack>
                <EzSimpleLink text='Write a review' to='' sx={{color: '#e105c3'}}/>
            </Stack>
        </RootStyle>
    );
}
