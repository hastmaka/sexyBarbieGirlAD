import PropTypes from "prop-types";
// material
import {FormControlLabel, Input, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import {withIcon, withoutIconSx} from "../../../helper/sx/Sx";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '10px',
    flexDirection: 'row',
    // flex: 1,
    '& 	.MuiFormControlLabel-label': {
        display: 'flex',
        color: 'red'
    }
}));

//----------------------------------------------------------------
/**
 *
 * @param icon - icon to show
 * @param image - array of images to disable button conditionally
 * @param onChange - onChange func
 * @param hiddenInputRef - ref to the input to reset lastChild value and prevent bugs
 * when delete an img
 * @param setProgress - to reset progress in case of use it
 * @returns {JSX.Element}
 * @constructor
 */
export default function EzFileInput({icon, image, onChange, hiddenInputRef, setProgress}) {
    return (
        <RootStyle>
            <FormControlLabel
                label={icon || 'Add Files...'}
                //limit for now to only 4 images per product
                disabled={image.length >= 4}
                sx={!!icon ? withIcon() : withoutIconSx(image)}
                control={
                    <Input
                        ref={hiddenInputRef}
                        accept='image/*'
                        inputProps={{multiple: true}}
                        sx={{ display: "none" }}
                        type="file"
                        onChange={e => {onChange(e);if(setProgress)setProgress(0)}}
                    />
                }
            />
        </RootStyle>
    );
}

EzFileInput.prototype = {
    icon: PropTypes.elementType,
    image: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    hiddenInputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ]),
    setProgress: PropTypes.func
}