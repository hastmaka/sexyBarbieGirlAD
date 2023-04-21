import React from "react";
import {useRef, useState} from "react";
import PropTypes from "prop-types";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import EzText from "../../../../components/ezComponents/EzText/EzText";
import PrevImages from "./prevImages/PrevImages";
import {createId, handleDeleteImage} from "../../../../helper";
import ProductMediaStatusBar from "./ProductMediaStatusBar";
import ProductMediaInputFiles from "./ProductMediaInputFiles";
import EzColor from "../../../../components/ezComponents/EzColor/EzColor";
import {productSliceActions} from "../../../../store/productSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1,
    gap: '20px',
    minHeight: '400px'
}));

//----------------------------------------------------------------

export default function ProductMedia({item}) {
    const [progress, setProgress] = useState(0);
    const hiddenInputRef = useRef(null);

    /**
     * use cases
     * check if image is local or, it was uploaded
     * upload 1 photo *
     * same as before plus another one
     * upload 1 pic click btn Upload and then try to add the same
     * upload 1 pic click btn Upload and then try to add a new one
     * @param e.target.files - array of images
     */
    const handleChange = async (e) => {
        let tempImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
            //check if image was already added
            if(item.image.length) {
                if(!!item.image.find(item => item.File.name === e.target.files[i].name)) continue;
            }
            // if(newImage.size > 50000) return alert('Img size must be less than 50k');
            tempImg.push({
                File: e.target.files[i],
                id: createId(20),
                uploaded: false
            })
        }
        window.dispatch(
            productSliceActions.addImageToColor({
                data: [...item.image, ...tempImg],
                item
            })
        )
    };

    return (
        <RootStyle>
            <Stack direction='row' gap='5px' alignItems='center'>
                <EzText text={`Product Media of Color ${item.color}`}/>
                <EzColor color={item.color}/>
            </Stack>
            <ProductMediaStatusBar item={item} progress={progress}/>

            <ProductMediaInputFilesMemoized
                item={item}
                progress={progress}
                setProgress={setProgress}
                hiddenInputRef={hiddenInputRef}
                handleChange={handleChange}
            />

            <Stack gap='20px'>
                <EzText text='VariationImage Preview'/>
                {item.image.length > 0 &&
                    <PrevImages
                        image={item.image}
                        onClick={img => handleDeleteImage(img, item, hiddenInputRef, setProgress)}
                    />
                }
            </Stack>
        </RootStyle>
    );
}

const ProductMediaInputFilesMemoized = React.memo(ProductMediaInputFiles);

ProductMedia.prototype = {
    item: PropTypes.object.isRequired
}
