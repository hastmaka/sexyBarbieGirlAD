import {useEffect, useState} from 'react';
//material
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Star} from '@mui/icons-material';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function EzRating({temValue, readOnly, label, size, getValue}) {
    // debugger
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

    useEffect(_ => {
        setValue(typeof temValue === 'string' ? parseInt(temValue) : temValue)
    }, [temValue])


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: label ? 'center' : ''
            }}
        >
            <Rating
                readOnly={readOnly}
                icon={<Star
                    fontSize='inherit'
                    sx={{
                        color: theme => theme.palette.ecommerce.pink,
                        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                    }}
                />}
                emptyIcon={<StarBorderIcon
                    fontSize='inherit'
                    sx={{
                        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                    }}
                />}
                size={size || 'small'}
                name='hover-feedback'
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    getValue(newValue)
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {(value !== null && label === true) && (
                <Box sx={{ ml: 1, fontWeight: 600 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}
