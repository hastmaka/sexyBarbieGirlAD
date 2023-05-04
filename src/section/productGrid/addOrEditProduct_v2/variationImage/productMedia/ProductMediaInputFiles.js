// material
import {Box, Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzFileInput from "../../../../../components/ezComponents/EzFileInput/EzFileInput";
import EzText from "../../../../../components/ezComponents/EzText/EzText";
import {
    getNameFromUrl,
    handleDeleteImage,
    uploadToFirebaseStorage
} from "../../../../../helper";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '10px'
}));

//----------------------------------------------------------------

export default function ProductMediaInputFiles({
    item,
    progress,
    setProgress,
    hiddenInputRef,
    handleChange,
    editMode,
    tempProduct
}) {
    return (
        <RootStyle>
            <EzFileInput
                hiddenInputRef={hiddenInputRef}
                setProgress={setProgress}
                image={item.image}
                onChange={e => handleChange(e)}
            />
            <Stack flex={1} gap='5px'>
                <Stack direction='row' justifyContent='space-between'>
                    <EzText text='Selected Files:'/>
                    <EzText
                        text='Clear All'
                        sx={{
                            color: item.image.length > 0 ? '#2065D1' : '#808080',
                            borderBottom: '1px solid transparent',
                            pointerEvents: item.image.length > 0 ? '' : 'none',
                            '&:hover': {
                                cursor: 'pointer',
                                borderBottom: '1px solid #999'
                            }
                        }}
                        onClick={_ => handleDeleteImage('all', item, hiddenInputRef, setProgress, tempProduct)}
                    />
                </Stack>
                <Box>
                    {item.image.length > 0 && item.image.map(img =>
                        <Chip
                            key={img.id}
                            variant="outlined"
                            sx={{margin: '5px'}}
                            label={img.url ? getNameFromUrl(img.url) : img.File.name}
                            onDelete={_ => handleDeleteImage(img, item, hiddenInputRef, setProgress, tempProduct)}
                        />
                    )}
                </Box>
            </Stack>
            <Button
                disabled={progress === 100 || !item.image.length}
                onClick={async _ => {
                    uploadToFirebaseStorage(item, setProgress, editMode, tempProduct)
                }}
                variant='outlined'
                sx={{width: 100}}
            > Upload </Button>
        </RootStyle>
    );
}

ProductMediaInputFiles.prototype = {
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired,
    progress: PropTypes.number,
    setProgress: PropTypes.func.isRequired,
    hiddenInputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ]).isRequired,
    handleChange: PropTypes.func.isRequired
}