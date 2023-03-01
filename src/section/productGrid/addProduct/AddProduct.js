import {useEffect, useRef, useState} from "react";
// material
import {styled} from '@mui/material/styles';
import {Button, MenuItem, Select, Stack, TextareaAutosize, Typography,} from "@mui/material";
//firestore
import {db} from "../../../helper/FirebaseConfig"; //sometime work other don't. have to use getStorage
import {create} from "../../../helper/FirestoreApi";
import {collection, getDocs, setDoc, doc} from "firebase/firestore";
//
import CheckboxGroup from "./checkboxGroup/CheckboxGroup";
import PrevImages from "./prevImages/PrevImages";
import {
    createId,
    deleteFileFromFirebaseStore,
    handleDecimalsOnValue, SortArray,
    uploadToFirebaseStorage
} from "../../../helper/Helper";
import VariationGrid from "../variationGrid/VariationGrid";
import EzText from "../../../components/ezComponents/EzText/EzText";
import NameInputField from "./nameInputField/NameInputField";
import EzFileInput from "../../../components/ezComponents/EzFileInput/EzFileInput";
import {adminSliceActions} from "../../../store/adminSlice";
import {useSelector} from "react-redux";
import {productSliceActions} from "../../../store/productSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    minWidth: '1122px',
    '& form': {
        position: 'relative'
    }
}));

const GeneralContainer = styled(Stack)(({theme}) => ({
    flex: 1,
    gap: '10px',
    '& > div': {
        justifyContent: 'space-between',
        '& > span': {
            color: '#6e6e73'
        }
    }
}));

const TableHeader = styled(Stack)(({theme}) => ({
    color: theme.palette.grey[0],
    padding: '0 20px',
    height: '50px',
    fontSize: '14px',
    fontWeight: 700,
    borderRadius: '4px 4px 0 0',
    backgroundColor: theme.palette.grey[700],
    flexDirection: 'row',
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function AddProduct() {
    const {image, progress, tempProduct} = useSelector(slice => slice.product);
    const [saveBtn, setSaveBtn] = useState(true);
    const [decimal, setDecimal] = useState(0);
    //firebase storage
    const [error, setError] = useState([]);
    // const [progress, setProgress] = useState(0);
    // debugger
    const checkValue = (event) => {
        setDecimal(handleDecimalsOnValue(event.target.value));
    }
    const hiddenInputRef = useRef(null);

    /**
     * use cases
     * check if image is local or, it was uploaded
     * upload 1 photo *
     * same as before plus another one
     * upload 1 pic click btn Upload and then rey to add the same
     * upload 1 pic click btn Upload and then rey to add a new one
     * @param e
     */
    const handleChange = (e) => {
        let tempImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
            //check if image was already added
            if(image.length) {
                if(!!image.find(item => item.File.name === e.target.files[i].name)) continue;
            }
            // if(newImage.size > 50000) return alert('Img size must be less than 50k');
            tempImg.push({File: e.target.files[i], id: createId(), uploaded: false})
        }
        //be sure always simple name goes first to name folder on firestore
        let temp = [...image, ...tempImg].sort((a,b) => a.File.name > b.File.name ? 1 : -1);
        window.dispatch(productSliceActions.setImage(temp))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let name = data.get('name'),
            description = data.get('description'),
            category = data.get('category').split(','),
            price = parseFloat(data.get('price')),
            color = data.get('color').split(','),
            size = [
                data.get('xs') === 'on' ? 'XS' : '',
                data.get('s') === 'on' ? 'S' : '',
                data.get('m') === 'on' ? 'M' : '',
                data.get('l') === 'on' ? 'L' : '',
                data.get('xl') === 'on' ? "XL" : '',
            ].filter(s => s !== ''),
            active = data.get('active');
        let fix_description = {};
        description.split('\n').map(s => {
            let str = s.split(':');
            fix_description = {
                ...fix_description,
                [str[0]]: str[1]
            };
        });
        let statistic = {
            average_rating: 0,
            date_on_sale_from: '',
            date_on_sale_to: '',
            sales: {},
            total_review: 0
        }
        let urlWithIds = [];
        image.map(u => urlWithIds.push({url: u.url, id: u.id}));
        let variant = [];
        for (const col of color) {
            for (const siz of size) {
                variant.push({
                    id: createId(),
                    price: price,
                    color: col,
                    size: siz,
                    stock: 10,
                    discount: 0,
                    checked: true
                })
            }
        }
        window.dispatch(productSliceActions.setTempProduct({
            active: active === 'true',
            category: category,
            color: color,
            description: fix_description,
            image: urlWithIds,
            name: name,
            price: price,
            size: size,
            statistic: statistic,
            stock: true,
            variation: SortArray([...variant])
        }))
        setSaveBtn(false)
    }

    const onSaveProduct = async (tempProduct) => {
        const {size, color, price, category} = tempProduct;
        try{
            let filter = {};
            const response = await getDocs(collection(db, 'filters'));
            response.docs.map(doc => {filter = {...doc.data()}});

            if(!!filter.color && filter.color.length) {
                const newColor = color.filter(fColor => !filter.color.some(color => fColor === color.name))
                if(newColor.length) {
                    newColor.map(color => filter.color.push({name: color, checked: false}))
                }
            } else {
                filter.color = [];
                color.map(color => filter.color.push({name: color, checked: false}))
            }

            if(!!filter.size && filter.size.length) {
                const newSize = size.filter(fSize => !filter.size.some(size => fSize === size.name))
                if(newSize.length) {
                    newSize.map(size => filter.size.push({name: size, checked: false}))
                }
            } else {
                filter.size = [];
                size.map(size => filter.size.push({name: size, checked: false}))
            }

            if(!!filter.priceRange && filter.priceRange.length) {
                filter.priceRange[0] = price < filter.priceRange[0] ? price : filter.priceRange[0];
                filter.priceRange[1] = price > filter.priceRange[1] ? price : filter.priceRange[1];
            } else {
                filter.priceRange = [price, price];
            }

            if(!!filter.category && filter.category.length) {
                const newCategory = category.filter(fCategory => !filter.category.some(category => fCategory === category.name))
                if(newCategory.length) {
                    newCategory.map(category => filter.category.push({name: category, checked: false}))
                }
            } else {
                filter.category = [];
                category.map(category => filter.category.push({name: category, checked: false}))
            }

            await setDoc(doc(db, 'filters', 'filters'), filter, {merge: true});
            window.dispatch(create({collection: 'products', data: tempProduct}));
            window.dispatch(adminSliceActions.closeModal())
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <RootStyle>
            <TableHeader>
                <EzText text='Add Product' sx={{color: '#FFF', fontSize: '12px'}}/>
            </TableHeader>
            <Stack component='form' onSubmit={onSubmit} p='10px'>
                <Stack flexDirection='row' gap='20px' sx={{padding: '5px'}}>
                    <GeneralContainer>
                        <Stack width='100%' alignItems='center'>
                            <EzText text='Product Properties' sx={{fontSize: '20px'}}/>
                        </Stack>
                        <Stack flexDirection='row' alignItems='center' gap='10px'>
                            <EzText text='Product Active'/>
                            <Select
                                variant="standard"
                                name='active'
                                defaultValue='true'
                                sx={{width: '100px'}}
                            >
                                <MenuItem value='true'>True</MenuItem>
                                <MenuItem value='false'>False</MenuItem>
                            </Select>
                        </Stack>
                        <NameInputField name='name' text='Product Name (check if product exist)' sx={{width: '200px'}} autoFocus/>
                        <Stack
                            flexDirection='row'
                            alignItems='center'
                            gap='10px'
                            sx={{
                                '& textarea': {
                                    width: '400px',
                                    resize: 'none',
                                    border: '1px solid lightgrey',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    '&:focus': {
                                        outline: 'none'
                                    }
                                }
                            }}>
                            <EzText text='Product Description'/>
                            <TextareaAutosize
                                name='description'
                                size='small'
                            />
                        </Stack>
                        <NameInputField name='category' text='Product Category' sx={{width: '200px'}}/>
                        <NameInputField
                            name='price'
                            text='Product price ($)'
                            value={decimal}
                            onChange={(event) => checkValue(event, 'change')}
                            sx={{width: '200px'}}
                        />
                        <NameInputField name='color' text='Colors (red,blue,pink)' sx={{width: '200px'}}/>

                        <CheckboxGroup/>

                        <Stack flexDirection='row'>
                            <Button
                                disabled={!(image.every(i => i.uploaded) && image.length)}
                                type='submit'
                                variant='outlined'
                                color="primary"
                            > Create Variations </Button>
                            <Button
                                onClick={_ => onSaveProduct(tempProduct)}
                                variant='outlined'
                                sx={{width: 100}}
                                disabled={saveBtn}
                            > Save </Button>
                        </Stack>
                        <Stack>
                            {Object.keys(tempProduct).length ?
                                <VariationGrid
                                    variation={tempProduct.variation}
                                    product={tempProduct}
                                    productName={tempProduct.name}
                                    dataToUpdateProducts={tempVariation => {
                                        const {variation, ...rest} = tempProduct;
                                        const updatedProduct = {variation: tempVariation, ...rest}
                                        window.dispatch(productSliceActions.setTempProduct(updatedProduct))
                                    }}
                                /> :
                                <Stack sx={{height: '500px'}}>No Variation Yet</Stack>
                            }
                        </Stack>
                    </GeneralContainer>

                    <Stack flex={1} gap='20px'>
                        <Stack width='100%' alignItems='center'>
                            <EzText text='Product Media' sx={{fontSize: '20px'}}/>
                        </Stack>
                        <Stack alignItems='center'>
                            {progress === 100 ?
                                <EzText text={`Images Upload Complete ${progress}%`} sx={{color: 'green'}}/> :
                                <EzText text='Please Upload the Images' sx={{color: 'red'}}/>}
                            <progress value={progress} max='100' style={{width: '100%'}}/>
                        </Stack>

                        <Stack flexDirection='row' alignItems='flex-start' justifyContent='space-between' gap='10px'>
                            <EzFileInput
                                hiddenInputRef={hiddenInputRef}
                                image={image}
                                onChange={(e, img) => handleChange(e, img)}
                            />
                            <Button
                                disabled={progress === 100 || !image.length}
                                onClick={_ => uploadToFirebaseStorage(image)}
                                variant='outlined'
                                sx={{width: 100}}
                            > Upload </Button>
                        </Stack>
                        <Stack gap='20px'>
                            <Stack alignItems='center'>
                                <EzText text='Image Preview' sx={{fontSize: '20px'}}/>
                            </Stack>
                            {image.length > 0 && <PrevImages
                                image={image}
                                onClick={item => {
                                    window.confirm({type: 'warning', content: 'Want to delete this Image'})
                                        .then(res => {
                                            if (res) {
                                                debugger
                                                if (res) {
                                                    deleteFileFromFirebaseStore(item, image)
                                                } else {
                                                    //reset input value
                                                    if (image.length === 1) hiddenInputRef.current.lastChild.value = null
                                                    window.dispatch(productSliceActions.setImage(image.filter(i => i.id !== item.id)));
                                                    window.displayNotification({
                                                        type: 'info',
                                                        content: 'Image was Deleted'
                                                    })
                                                }
                                            }
                                        })
                                }}
                            />}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </RootStyle>
    );
}
