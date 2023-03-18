import {useMemo, useState} from "react";
import PropTypes from "prop-types";
// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import VariationGrid from "../../variationGrid/VariationGrid";
import {create} from "../../../../helper/firebase/FirestoreApi";
import productSlice, {productSliceActions} from "../../../../store/productSlice";
import {adminSliceActions} from "../../../../store/adminSlice";
import {createId, sortArray, updateFilter} from "../../../../helper";
import {useSelector} from "react-redux";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function ProductVariation({data, checkProductName}) {
    const {tempProduct} = useSelector(slice => slice.product);
    const [saveBtn, setSaveBtn] = useState(true);
    const allValidated = useMemo(() => !(
        //every img was uploaded
        data.image.every(i => i.uploaded) &&
        data.image.length >= 1 &&
        //name was already checked
        !checkProductName.isOnDb &&
        checkProductName.check &&
        checkProductName.value !== ''
        +data.price > 0 &&
        data.category.length > 0 &&
        data.color.length > 0 &&
        data.size.length > 0 &&
        data.description.length > 0
    ), [data, checkProductName.isOnDb, checkProductName.check]);

    const onSubmit = async (e) => {
        e.preventDefault();
        let statistic = {
            average_rating: 0,
            date_on_sale_from: '',
            date_on_sale_to: '',
            sales: {},
            total_review: 0
        }
        let urlWithIds = [];
        data.image.map(u => urlWithIds.push({
            url: u.url,
            id: u.id,
            name: u.File.name
        }));
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
                    varImage: []
                })
            }
        }
        window.dispatch(productSliceActions.setTempProduct({
            active: data.active,
            category: data.category,
            color: data.color.map(i => i.color),
            description: data.description,
            image: urlWithIds,
            name: data.name,
            price: +data.price,
            size: data.size.map(i => i.size),
            statistic: statistic,
            stock: true,
            variation: sortArray([...variant])
        }))

        setSaveBtn(false)
    }
    const onSaveProduct = (tempProduct) => {
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
        <>
            <Stack direction='row' justifyContent='space-between'>
                <Button
                    disabled={allValidated}
                    onClick={onSubmit}
                    variant='outlined'
                    color="primary"
                > Create Variations </Button>
                <Button
                    disabled={allValidated}
                    onClick={_ => {
                        const {variation, ...rest} = tempProduct;
                        window.dispatch(productSliceActions.setTempProduct({variation: [], ...rest}))
                    }}
                    variant='outlined'
                    color="primary"
                > reset var </Button>
                <Button
                    onClick={_ => onSaveProduct(tempProduct)}
                    variant='outlined'
                    sx={{width: 80}}
                    disabled={saveBtn || allValidated}
                > Save </Button>
            </Stack>
            <Stack>
                {Object.keys(tempProduct).length ?
                    <VariationGrid
                        productName={tempProduct.name}
                    /> :
                    <Stack sx={{height: '500px'}}>No Variation Yet</Stack>
                }
            </Stack>
        </>
    );
}

ProductVariation.prototype = {
    data: PropTypes.object.isRequired,
    checkProduct: PropTypes.object.isRequired,
}