import {useMemo, useState} from "react";
import PropTypes from "prop-types";
// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import VariationGrid from "../../variationGrid/VariationGrid";
import {create} from "../../../../helper/firebase/FirestoreApi";
import {productSliceActions} from "../../../../store/productSlice";
import {adminSliceActions} from "../../../../store/adminSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function ProductVariation({data, checkProduct}) {
    const [tempProduct, setTempProduct] = useState({});
    const [saveBtn, setSaveBtn] = useState(true);
    const allValidated = useMemo(() => !(
        data.image.every(i => i.uploaded) && //every img was uploaded
        data.image.length >= 1 && //there are all images
        !checkProduct.isOnDb && //name was already checked
        +data.price > 0 &&
        data.category.length > 0 &&
        data.color.length > 0 &&
        data.size.length > 0 &&
        data.description.length > 0
    ), [data]);

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
                    id: await import('../../../../helper').then(module => {return module.createId(20)}),
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
        setTempProduct({
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
            variation: await import('../../../../helper').then(module => {return module.sortArray([...variant])})
        })
        setSaveBtn(false)
    }
    const onSaveProduct = async (tempProduct) => {
        try{
            await import('../../../../helper').then(module => {return module.updateFilter(tempProduct)})
            window.dispatch(create({collection: 'products', data: tempProduct}));
            window.dispatch(productSliceActions.setTempProduct([]));
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
                    onClick={_ => onSaveProduct(tempProduct)}
                    variant='outlined'
                    sx={{width: 100}}
                    disabled={saveBtn || allValidated}
                > Save </Button>
            </Stack>
            <Stack>
                {Object.keys(tempProduct).length ?
                    <VariationGrid
                        variation={tempProduct.variation}
                        product={tempProduct}
                        productName={tempProduct.name}
                        dataToUpdateProduct={tempVariation => {
                            const {variation, ...rest} = tempProduct;
                            const updatedProduct = {variation: tempVariation, ...rest}
                            setTempProduct(updatedProduct)
                        }}
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