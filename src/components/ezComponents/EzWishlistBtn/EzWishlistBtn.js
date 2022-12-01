// material
import EzIconButton from "../EzIconButton/EzIconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//
import {AddToWishlist} from "../../../helper/Helper";

//----------------------------------------------------------------

export default function EzWishlistBtn({isProductInWishlist, product, user, setOpen}) {
    return (
        <>
            {/*{isProductInWishlist ?*/}
            {/*    <EzIconButton*/}
            {/*        icon={<FavoriteIcon*/}
            {/*            sx={{*/}
            {/*                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',*/}
            {/*                fill: theme => theme.palette.ecommerce.pink*/}
            {/*            }}*/}
            {/*        />}*/}
            {/*        toolTipTitle='Remove from Wishlist'*/}
            {/*        onClick={_ => {*/}
            {/*            window.dispatch(userSliceActions.removeFromWishlist({product, user}));*/}
            {/*            window.displayNotification({type: 'success', content: `Product '${product.name}' remove to the Wishlist`})*/}
            {/*        }*/}
            {/*        }*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <EzIconButton*/}
            {/*        icon={<FavoriteBorderIcon*/}
            {/*            sx={{*/}
            {/*                color: theme => theme.palette.ecommerce.pink,*/}
            {/*                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'*/}
            {/*            }}*/}
            {/*        />}*/}
            {/*        toolTipTitle='Add to Wishlist'*/}
            {/*        onClick={_ => AddToWishlist(product, user, (e) => setOpen({bool: e, who: 'login'}))}*/}
            {/*    />}*/}
        </>
    );
}
