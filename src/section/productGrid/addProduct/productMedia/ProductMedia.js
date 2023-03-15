import {useRef, useState} from "react";
import PropTypes from "prop-types";
// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import EzText from "../../../../components/ezComponents/EzText/EzText";
import EzFileInput from "../../../../components/ezComponents/EzFileInput/EzFileInput";
import PrevImages from "./prevImages/PrevImages";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flex: 1,
    gap: '20px'
}));

//----------------------------------------------------------------

export default function ProductMedia({data, setData}) {
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
            if(data.image.length) {
                if(!!data.image.find(item => item.File.name === e.target.files[i].name)) continue;
            }
            // if(newImage.size > 50000) return alert('Img size must be less than 50k');
            tempImg.push({
                File: e.target.files[i],
                id: await import('../../../../helper').then(module => {return module.createId(20)}),
                uploaded: false
            })
        }
        //be sure always simple name goes first to name folder on firestore
        let temp = [...data.image, ...tempImg].sort((a,b) => a.File.name > b.File.name ? 1 : -1);
        setData(prev => { return {...prev, image: temp}})
    };

    return (
        <RootStyle>
            <Stack width='100%' alignItems='center'>
                <EzText text='Product Media' sx={{fontSize: '20px'}}/>
            </Stack>
            <Stack alignItems='center'>
                <Stack direction='row' justifyContent='space-around' width='100%'>
                    <EzText text='Number of Images Allow (4)'/>
                    <EzText text={`${4 - data.image.length} left - ${data.image.filter(i => i.uploaded).length} uploaded`}/>
                    <EzText
                        text={progress === 100 ? `Images Upload Complete ${progress}%` : 'Please Upload the Images'}
                        sx={{color: progress === 100 ? 'green' : 'red'}}
                    />
                </Stack>
                <progress value={progress} max='100' style={{width: '100%'}}/>
            </Stack>

            <Stack flexDirection='row' alignItems='flex-start' justifyContent='space-between' gap='10px'>
                <EzFileInput
                    hiddenInputRef={hiddenInputRef}
                    setProgress={setProgress}
                    image={data.image}
                    onChange={e => handleChange(e)}
                />
                {data.image.length > 0 && (
                    <Stack width='100%' gap='5px'>
                        <Stack direction='row' justifyContent='space-between'>
                            <EzText text='Selected Files:'/>
                            <EzText
                                text='Clear All'
                                sx={{
                                    color: '#2065D1',
                                    borderBottom: '1px solid transparent',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #999'
                                    }
                                }}
                                onClick={async _ => {
                                    await import('../../../../helper').then(module => {
                                        module.handleDeleteImage('all', data, setData, hiddenInputRef, setProgress)
                                    })
                                }}
                            />
                        </Stack>
                        <Stack width='100%' gap='5px'>
                            {data.image.map(item =>
                                <Stack key={item.id} direction='row' justifyContent='space-between'>
                                    <EzText text={item.File.name}/>
                                    {data.image.length && <EzText
                                        text='delete'
                                        sx={{
                                            borderBottom: '1px solid transparent',
                                            '&:hover': {
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #999'
                                            }
                                        }}
                                        onClick={async _ => {
                                            await import('../../../../helper').then(module => {
                                                module.handleDeleteImage(item, data, setData, hiddenInputRef, setProgress)
                                            })
                                        }}
                                    />}
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                )}
                <Button
                    disabled={progress === 100 || !data.image.length}
                    onClick={async _ => {
                        //check at least one file meet required to use it as Firestore
                        //folder name
                        const nameChecked = await import('../../../../helper').then(module => {
                            return module.checkImageNameBeforeUpload(data.image)
                        })
                        if(!!nameChecked) {
                            await import('../../../../helper').then(module =>
                                module.uploadToFirebaseStorage(data.image, setProgress, setData)
                            )
                        } else {
                            window.displayNotification({
                                type: 'warning',
                                content: 'Check file names meet requirements'
                            })
                        }
                    }}
                    variant='outlined'
                    sx={{width: 100}}
                > Upload </Button>
            </Stack>
            <Stack gap='20px'>
                <Stack alignItems='center'>
                    <EzText text='Image Preview' sx={{fontSize: '20px'}}/>
                </Stack>
                {/*{image.length > 0 || !!edit &&*/}
                <PrevImages
                    image={data.image}
                    onClick={async (item) => {
                        await import('../../../../helper').then(module => {
                            module.handleDeleteImage(item, data, setData, hiddenInputRef, setProgress)
                        })
                    }}
                />
                {/*}*/}
            </Stack>
        </RootStyle>
    );
}

ProductMedia.prototype = {
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired
}
