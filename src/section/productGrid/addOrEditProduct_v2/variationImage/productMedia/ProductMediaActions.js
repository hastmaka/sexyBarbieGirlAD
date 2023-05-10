// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {productSliceActions} from "../../../../../store/productSlice";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {createId, sanitizeProduct, sortArray, updateFilter} from "../../../../../helper";
import {create} from "../../../../../helper/firebase/FirestoreApi";
import {adminSliceActions} from "../../../../../store/adminSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '10px'
}));

const ColorButton = styled(Button)(({theme}) => ({
    color: theme.palette.grey[100],
    border: '1px solid #fff',
    '&:hover': {
        color: theme.palette.grey[400],
        border: '1px solid #fff',
    },
}))

//----------------------------------------------------------------

export default function ProductMediaActions({data, checkProductName}) {
    const {tempProduct} = useSelector(slice => slice.product);
    const allValidated = useMemo(() => !(
        //name was already checked
        // !checkProductName.isOnDb &&
        // checkProductName.check &&
        // checkProductName.value !== ''
        // +data.price > 0 &&
        // data.category.length > 0 &&
        // data.color.length > 0 &&
        // data.size.length > 0 &&
        data.description.length > 0
    ), [data, checkProductName.isOnDb, checkProductName.check]);
    const allColorHasUploadedImage = useMemo(() => {
        return tempProduct?.color?.every(color => {
            return color.image.length > 0 && color.image.every(image => {
                return image.uploaded === true;
            });
        });
    }, [tempProduct.color])

    const onSubmit = async (e) => {
        e.preventDefault();
        let statistic = {
            average_rating: 0,
            date_on_sale_from: '',
            date_on_sale_to: '',
            sales: {},
            total_review: 0
        }
        let variant = [];
        for (const col of data.color) {
            for (const siz of data.size) {
                variant.push({
                    id: createId(20),
                    price: +data.price,
                    color: col.color,
                    size: siz.size,
                    stock: 10,
                    discount: 0,
                    checked: true,
                    active: true
                })
            }
        }
        window.dispatch(
                productSliceActions.setTempProduct({
                active: data.active,
                category: data.category,
                color: data.color,
                description: data.description,
                name: data.name,
                price: +data.price,
                size: data.size,
                statistic: statistic,
                stock: true,
                variation: sortArray([...variant])
            })
        )
    }
    const onSaveProduct = (tempProduct) => {
        // const sanitizedProduct = sanitizeTempProduct(tempProduct)
        try{
            updateFilter(tempProduct).then()
            window.dispatch(create({collection: 'products', data: tempProduct}));
            window.dispatch(productSliceActions.setTempProduct({}));
            window.dispatch(adminSliceActions.closeModal());
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <RootStyle>
            <ColorButton
                disabled={allValidated}
                onClick={onSubmit}
                variant='outlined'
            > Create Variations </ColorButton>
            <ColorButton
                onClick={_ => onSaveProduct(tempProduct)}
                variant='outlined'
                sx={{width: 80}}
                disabled={!allColorHasUploadedImage || allValidated}
            > Save </ColorButton>
        </RootStyle>
    );
}
