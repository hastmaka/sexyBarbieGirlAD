// material
import {FormControlLabel, Input, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../EzText/EzText";
import EzButton from "../EzButton/EzButton";
import {deleteFileFromFirebaseStore} from "../../../helper/Helper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px',
    flexDirection: 'row',
    flex: 1
}));

//----------------------------------------------------------------

export default function EzFileInput({ image, onChange, url, setUrl, setImage, setProgress }) {
    debugger
    return (
        <RootStyle>
            <FormControlLabel
                label='Add Files...'
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
                        border: `1px solid ${'#2065D1'}`,
                        backgroundColor: 'rgba(158,187,245,0.26)'
                    }
                }}
                control={
                    <Input
                        inputProps={{multiple: true}}
                        sx={{ display: "none" }}
                        type="file"
                        onChange={e => {
                            onChange(e, [...e.target.files]);
                        }}
                    />
                }
            />
            {Boolean(image.length) && (
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
                                            if (url.length) {
                                                deleteFileFromFirebaseStore(null, image, setImage, url, setUrl, setProgress)
                                            } else {
                                                setImage([]);
                                                window.displayNotification({type: 'info', content: 'All images was cleared'})
                                            }
                                        }
                                    })
                            }}
                        />
                    </Stack>
                    <Stack width='100%' gap='5px'>
                        {image.map(item =>
                            <Stack key={item.name} flexDirection='row' justifyContent='space-between'>
                                <EzText text={item.name}/>
                                {!url.length && <EzText
                                    text='delete'
                                    sx={{
                                        borderBottom: '1px solid transparent',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #999'
                                        }
                                    }}
                                    onClick={_ => deleteFileFromFirebaseStore(item, image, setImage, url, setUrl)}
                                />}
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            )}
        </RootStyle>
    );
}
