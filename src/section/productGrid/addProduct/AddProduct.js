import {useState} from "react";
// material
import {styled} from '@mui/material/styles';
import {Box, Button, Input, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography,} from "@mui/material";
//firestore
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../../../helper/FirebaseConfig"; //sometime work other don't. have to use getStorage
import {create} from "../../../helper/FirestoreApi";
import {collection, getDocs, setDoc, doc} from "firebase/firestore";
//
import CheckboxGroup from "./checkboxGroup/CheckboxGroup";
import PrevImages from "./prevImages/PrevImages";
import VariantsGrid from "./variantsGrid/VariantsGrid";
import {createId, handleDecimalsOnValue} from "../../../helper/Helper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    width: '100%',
    // height: 'calc(100vh - 60px)',
    padding: '10px',
    '& form': {
        position: 'relative'
    }
}));

const TopContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    height: '50px',
    borderBottom: '1px solid lightgrey',
    padding: '0 20px',
    gap: '15px'
}))

//----------------------------------------------------------------

export default function AddProduct({handleClose}) {
    const [image, setImage] = useState([]);
    const [url, setUrl] = useState([]);
    const [progress, setProgress] = useState(0);
    const [product, setProduct] = useState({product: {}});
    const [saveBtn, setSaveBtn] = useState(true);
    const [decimal, setDecimal] = useState(0);
    // debugger
    const checkValue = (event) => {
        setDecimal(handleDecimalsOnValue(event.target.value));
    }

    const handleChange = (e) => {
        setImage([]);
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            // if(newImage.size > 50000) return alert('Img size must be less than 50k');
            newImage['id'] = `${Date.now() * Math.random()}`;
            setImage((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const folder_name = image[0].name.split('.')[0];
        const promises = [];
        image.map((image) => {
            const storageRef = ref(storage, `products/${folder_name}/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            setUrl((prevState) => [...prevState, url]);
                        });
                }
            );
        });

        Promise.all(promises)
            .then()
            .catch((err) => console.log(err));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let name = data.get('name'),
            description = data.get('description'),
            category = data.get('category').split(','),
            price = parseFloat(data.get('price')),
            color = data.get('colors'),
            size = [
                data.get('xs') === 'on' ? 1 : '',
                data.get('s') === 'on' ? 2 : '',
                data.get('m') === 'on' ? 3 : '',
                data.get('l') === 'on' ? 4 : '',
                data.get('xl') === 'on' ? 5 : '',
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
            sales: 0,
            total_review: 0
        }
        if (url.length) {
            let urlWithIds = [];
            url.map(u => urlWithIds.push({url: u, id: u.slice(-27)}))
            color = color.split(',');
            let variant = [];
            for (const col of color) {
                for (const siz of size) {
                    variant.push({
                        id: createId(),
                        price: price,
                        color: col,
                        size: siz,
                        stock: 10,
                        active: true,
                        discount: 0
                    })
                }
            }
            setProduct({
                active: active === 'true',
                category: category,
                color: color,
                description: fix_description,
                discount: 0,
                image: urlWithIds,
                name: name,
                price: price,
                size: size,
                statistic: statistic,
                stock: true,
                variation: [...variant]
            })
            setSaveBtn(false)
        } else {
            alert('Please Save Images first')
        }
    }

    const handleDeleteImg = (img) => {
        window.confirm({type: 'warning', content: 'Want to delete this img'})
            .then(res => {
                if (res) {
                    let actualImages = url.filter(i => i !== img);
                    setUrl(actualImages);
                    setProgress(0);
                    const storage = getStorage();
                    deleteObject(ref(storage, img))
                        .then(_ => {
                            window.displayNotification({
                                title: 'Done',
                                type: 'info',
                                content: 'Image Deleted Successfully'
                            })
                        }).catch(err => console.log(err))
                }
            })
    }

    const onSaveProduct = async (product) => {
        const {size, color, price, category} = product;
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
            window.dispatch(create({collection: 'products', data: product}));
            handleClose()
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <RootStyle>
            <Box component='form' onSubmit={onSubmit}>
                <Stack flexDirection='row' gap='20px' sx={{padding: '5px'}}>
                    <Stack
                        flex={1}
                        gap='20px'
                        sx={{
                            '& > div': {
                                justifyContent: 'space-between',
                                '& > span': {
                                    color: '#6e6e73'
                                }
                            }
                        }}>

                        <Stack flexDirection='row' alignItems='center' gap='10px'>
                            <Typography variant='span'>Product Name</Typography>
                            <TextField
                                name='name'
                                size='small'
                                required
                                autoFocus
                                sx={{width: '200px'}}/>
                        </Stack>

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
                            <Typography variant='span'>Product Description</Typography>
                            <TextareaAutosize
                                name='description'
                                size='small'
                            />
                        </Stack>

                        <Stack flexDirection='row' alignItems='center' gap='10px'>
                            <Typography variant='span'>Product Category</Typography>
                            <TextField name='category' size='small' sx={{width: '200px'}}/>
                        </Stack>
                        <Stack flexDirection='row' alignItems='center' gap='10px'>
                            <Typography variant='span'>Product price ($)</Typography>
                            <TextField
                                value={decimal}
                                onChange={(event) => checkValue(event, 'change')}
                                name='price'
                                size='small'
                                sx={{width: '200px'}}
                            />
                        </Stack>
                        <Stack flexDirection='row' alignItems='center' gap='10px'>
                            <Typography variant='span'>Colors</Typography>
                            <TextField name='colors' size='small' sx={{width: '200px'}}/>
                        </Stack>

                        <CheckboxGroup/>

                        <Stack flexDirection='row'>
                            <Button
                                type='submit'
                                variant='outlined'
                                color="success"
                            > Create Variations </Button>
                            <Button
                                onClick={_ => onSaveProduct(product)}
                                variant='outlined'
                                sx={{width: 100}}
                                disabled={saveBtn}
                            > Save </Button>
                        </Stack>
                        <Stack>
                            <VariantsGrid
                                dataToUpdateProducts={vari => {
                                    const {variation, ...rest} = product;
                                    let tempV = [];
                                    product.variation.forEach((d, i) => tempV[i] = {...d})
                                    const {id} = variation.row;
                                    const indexToUpdate = tempV.findIndex(object => {return object.id === id});
                                    tempV[indexToUpdate] = variation.row;
                                    rest.variation = tempV;
                                    setProduct(rest)
                                    // debugger
                                }}
                                variation={product.variation}
                                product_name={product.name}
                            />
                        </Stack>
                    </Stack>

                    <Stack flex={1} gap='20px'>
                        <Stack flexDirection='row' alignItems='center' gap='10px'>
                            <Typography variant='span'>Product Active</Typography>
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
                        <Stack alignItems='center'>
                            {progress === 100 ?
                                <Typography variant='span' sx={{color: 'green'}}>Images Upload Complete {progress}%</Typography> :
                                <Typography variant='span' sx={{color: 'red'}}>Please Upload the Images</Typography>}
                            <progress value={progress} max='100' style={{width: '100%'}}/>
                        </Stack>

                        <Stack flexDirection='row' alignItems='center' gap='10px'>
                            <Typography variant='span'>Images</Typography>
                            <Input type='file' onChange={handleChange} inputProps={{multiple: true}}/>
                            <Button
                                disabled={progress === 100}
                                onClick={handleUpload}
                                variant='outlined'
                                sx={{width: 100}}
                            > Upload </Button>
                        </Stack>
                        <Stack gap='20px'>
                            <Typography variant='span'>Images Preview</Typography>
                            <PrevImages
                                urls={url}
                                onClick={handleDeleteImg}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </RootStyle>
    );
}
