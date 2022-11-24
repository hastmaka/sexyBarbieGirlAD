import {useRef, useState} from "react";
import {useSelector} from "react-redux";
//material
import {Box, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//
import EzButton from "../EzButton/EzButton";
import EzRating from "../EzRating/EzRating";
import img_1 from '../../../resources/Barbie Bikinis/web_optimized/nob.jpg';
import img_2 from '../../../resources/Barbie Bikinis/web_optimized/nob_1.jpg';
import EzFormatPrice from "../EzFormatPrice/EzFormatPrice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Login from "../../../sections/login/Login";
import EzModalWithTransition from "../EzModalWithTransition/EzModalWithTransition";
import {userSliceActions} from "../../../store/userSlice";
import EzIconButton from "../EzIconButton/EzIconButton";
import EzProductDetails from "../../../sections/productDetail/EzProductDetails";
import {AddToWishlist} from "../../../helper/Helper";
import EzWishlistBtn from "../EzWishlistBtn/EzWishlistBtn";
import {useLocation} from "react-router-dom";

//------------------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    height: '451px',
    padding: '5px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 300ms',
    backgroundColor: '#fff',
    border: `1px solid ${'rgba(153,153,153,0.09)'}`,
    '&:hover': {
        boxShadow: theme.shadows[10]
    },
    [theme.breakpoints.down(600)]: {
        height: '330px',
        padding: 0
    }
}));

const ImageContainer = styled(Stack)(({theme}) => ({
    border: `1px solid ${'rgba(0,0,0,0.09)'}`,
    borderRadius: '4px',
    position: 'relative',
    height: 'calc(100% - 78px)',
    [theme.breakpoints.down(600)]: {
        height: 'calc(100% - 58px)',
        border: 0,
    }
}));

const Badge = styled(Box)(({theme}) => ({
    width: '74px',
    height: '96px',
    overflow: 'hidden',
    position: 'absolute',
    left: '-1px',
    top: '-1px'
}));

const BadgeContent = styled(Typography)(({theme}) => ({
    position: 'absolute',
    color: '#f1f1f1',
    zIndex: 11,
    left: '-40px',
    top: '15px',
    transform: 'rotate(315deg)',
    display: 'block',
    width: '142px',
    padding: '3px 0',
    backgroundColor: '#00aaa0',
    boxShadow: '0 0px 3px',
    textShadow: '0 1px 1px rgba(0,0,0,.2)',
    fontWeight: 600,
    textAlign: 'center',
    [theme.breakpoints.down(600)]: {
        padding: 0,
        left: '-47px',
        top: '14px',
        boxShadow: '0 0px 3px',
    }
}));

const HeartContainer = styled(Stack)(({theme}) => ({
    position: 'absolute',
    zIndex: 12,
    top: '10px',
    right: '10px',
}));

const NameContainer = styled(Stack)(({ishovered, theme}) => ({
    // opacity: ishovered === 'true' ? 1 : 0,
    // transform: ishovered === 'true' ? 'translateY(0px)' : 'translateY(47px)',
    position: 'absolute',
    zIndex: 12,
    bottom: 0,
    backgroundColor: 'rgba(73,73,73,0.18)',
    width: '100%',
    borderRadius: '0 0 4px 4px',
    padding: '15px 0',
    transition: 'all 400ms'
}));

const OutOfStockContent = styled(Stack)(({theme}) => ({
    position: 'absolute',
    padding: '2px 4px',
    zIndex: 11,
    top: '5px',
    left: '5px',
    backgroundColor: '#f55454',
    borderRadius: '4px',
}));

const Image = styled(Stack)(({active, theme}) => ({
    height: '100%',
    backgroundImage: `url(${active})`,
    backgroundPosition: 'top center',
    backgroundRepeat: 'no repeat',
    backgroundSize: 'cover',
    objectFit: 'cover',
    transition: 'all 300ms cubic-bezier(0.550, 0.085, 0.680, 0.530)',
    zIndex: 10,
    borderRadius: '4px',
}));

const InfoContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '78px',
    [theme.breakpoints.down(600)]: {
        height: '58px',
        padding: '0 5px'
    }
}));

//----------------------------------------------------------------
const image = [{
    url: img_1
}, {
    url: img_2
}];

export default function EzProductCard({product}) {
    const {name, price, discount, stock, statics} = product;
    const ref = useRef(null);
    const {user} = useSelector(slice => slice.user);
    const [active, setActive] = useState(image[0].url);
    const [isHovered, setIsHovered] = useState(false);
    const isProductInWishlist = user.dummy ? false : user.wish_list.some(item => item.id === product.id);
    const {screen} = useSelector(slice => slice.generalState);
    // debugger

    //modal
    const [open, setOpen] = useState({bool: false, who: ''});
    const handleClose = () => {
        setOpen({bool: false, who: ''})
    };

    return (
        <RootStyle>
            {open.bool && <EzModalWithTransition open={open.bool} handleClose={handleClose}>
                {open.who === 'quickView' && <EzProductDetails product={product} modal handleCloseCard={handleClose}/>}
                {open.who === 'login' && <Login handleClose={handleClose} modal/>}
            </EzModalWithTransition>}
            <ImageContainer
                onMouseEnter={_ => {
                    setActive(image[1].url)
                    setIsHovered(true)
                }}
                onMouseLeave={_ => {
                    setActive(image[0].url)
                    setIsHovered(false)
                }}
                onClick={e => {
                    if(!ref.current.contains(e.target)) {
                        setOpen({bool: true, who: 'quickView'})
                    }

                }}
            >
                <Image  active={active}/>
                {stock ?
                    <Badge>
                        <BadgeContent variant='span'>Sale</BadgeContent>
                    </Badge> :
                    <OutOfStockContent>
                        <Typography variant='span' sx={{color: 'white', fontWeight: 600}}>Out of Stock</Typography>
                    </OutOfStockContent>
                }
                <HeartContainer ref={ref}>
                    <EzWishlistBtn
                        product={product}
                        user={user}
                        isProductInWishlist={isProductInWishlist}
                        setOpen={setOpen}
                    />
                </HeartContainer>
                <NameContainer ishovered={isHovered.toString()}>
                    <Stack alignItems='center'>
                        {name}
                    </Stack>
                </NameContainer>
            </ImageContainer>
            <InfoContainer>
                <Stack gap='5px'>
                    <Stack>
                        <EzRating
                            temValue={4}
                            readOnly={true}
                        />
                    </Stack>
                    <Stack flexDirection='row' gap='10px'>
                        <EzFormatPrice
                            price={price}
                            justifyContent='flex-star'
                        />
                        {discount > 0 && <EzFormatPrice
                            price={discount > 0 ? price - ((discount / 100) * price) : price}
                            priceFS={14}
                            justifyContent={'left'}
                            oldPrice
                        />}
                    </Stack>
                </Stack>
                <EzButton
                    sx={{
                        backgroundColor: theme => theme.palette.ecommerce.pink,
                        color: theme => theme.palette.ecommerce.selectedColor,
                        border: `1px solid ${'#f438de'}`,
                        padding: '7px 15px',
                        '&:hover': {
                            border: `1px solid ${'#f438de'}`,
                            color: theme => theme.palette.ecommerce.pink,
                            backgroundColor: theme => theme.palette.ecommerce.selectedColor,
                        },
                        '& .MuiButton-startIcon': {
                            margin: '0 2px 0 0'
                        }
                    }}
                    startIcon={<AddShoppingCartIcon sx={{padding: 0}}/>}
                    onClick={_ => setOpen({bool: true, who: 'quickView'})}
                >
                    {screen >= 1366 ? 'Add to Cart' : ''}
                </EzButton>
            </InfoContainer>
        </RootStyle>
    );
}
