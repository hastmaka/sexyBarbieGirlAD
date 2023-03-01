// material
import {FormControlLabel, Input, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../EzText/EzText";
import EzButton from "../EzButton/EzButton";
import {deleteFileFromFirebaseStore} from "../../../helper/Helper";
import {useRef} from "react";
import {productSliceActions} from "../../../store/productSlice";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px',
    flexDirection: 'row',
    flex: 1
}));

//----------------------------------------------------------------

export default function EzFileInput({ image, onChange, hiddenInputRef }) {
    return (
        <RootStyle>
            <FormControlLabel
                label='Add Files...'
                //limit for now to only 4 images per product
                disabled={image.length >= 4}
                sx={{
                    width: 'fit-content',
                    height: 'fit-content',
                    minWidth: '110px',
                    border: `1px solid ${'#cecdcd'}`,
                    color: '#2065D1',
                    padding: '5px 14px',
                    borderRadius: '8px',
                    transition: 'all 200ms',
                    '&:hover': {
                        border: image.length >= 4 ? '' : `1px solid ${'#2065D1'}`,
                        backgroundColor: image.length >= 4 ? '' : 'rgba(158,187,245,0.26)'
                    }
                }}
                control={
                    <Input
                        ref={hiddenInputRef}
                        accept='image/*'
                        inputProps={{multiple: true}}
                        sx={{ display: "none" }}
                        type="file"
                        onChange={e => {
                            onChange(e);
                            window.dispatch(productSliceActions.setProgress(0))
                        }}
                    />
                }
            />
            {image.length > 0 && (
                <Stack width='100%' gap='5px'>
                    <Stack flexDirection='row' justifyContent='space-between'>
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
                            onClick={_ => {
                                window.confirm({type: 'warning', content: 'Want to clear all Images'})
                                    .then(res => {
                                        if(res) {
                                            debugger
                                            if (res) {
                                                deleteFileFromFirebaseStore(null, image)
                                            } else {
                                                //reset input value
                                                hiddenInputRef.current.lastChild.value = null
                                                window.dispatch(productSliceActions.setImage([]))
                                                window.displayNotification({type: 'info', content: 'All images was cleared'})
                                            }
                                        }
                                    })
                            }}
                        />
                    </Stack>
                    <Stack width='100%' gap='5px'>
                        {image.map(item =>
                            <Stack key={item.File.name} flexDirection='row' justifyContent='space-between'>
                                <EzText text={item.File.name}/>
                                {image.length && <EzText
                                    text='delete'
                                    sx={{
                                        borderBottom: '1px solid transparent',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #999'
                                        }
                                    }}
                                    onClick={_ => {
                                        window.confirm({type: 'warning', content: 'Want to delete this Image'})
                                            .then(res => {
                                                if(res) {
                                                    debugger
                                                    if (res) {
                                                        deleteFileFromFirebaseStore(item, image)
                                                    } else {
                                                        //reset input value
                                                        if(image.length === 1) hiddenInputRef.current.lastChild.value = null
                                                        window.dispatch(productSliceActions.setImage(image.filter(i => i.id !== item.id)))
                                                        window.displayNotification({type: 'info', content: 'All images was cleared'})
                                                    }
                                                }
                                            })
                                    }}
                                />}
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            )}
        </RootStyle>
    );
}
