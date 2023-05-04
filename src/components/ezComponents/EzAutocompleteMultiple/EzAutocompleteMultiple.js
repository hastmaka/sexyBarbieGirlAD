import React from 'react';
import {Autocomplete, TextField} from '@mui/material';
import {useMemo} from 'react';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import EzColor from "../EzColor/EzColor";
import {capitalizeFirstLetter} from "../../../helper";

/**
 *
 * @param initialData - Array of options
 * @param valueForIteration - value to check into the array, in case of object
 * @param freeSolo - let you input custom data beside the Array
 * @param value - initial temp value
 * @param setValue - setter for value
 * @param label
 * @returns {JSX.Element}
 * @constructor
 */
export default function EzAutocompleteMultiple({
    initialData, freeSolo, label, valueForIteration, value, setValue
}) {
    // const [value, setValue] = useState([]);
    const tempData = useMemo(() => initialData?.length ? [...initialData] : [], [initialData])

    const handleChange = (e, newValue, reason, option) => {
        if(reason === 'clear') {
            return setValue([])
        }
        switch (reason) {
            case 'selectOption':
                //color
                if (typeof option.option === 'object') {
                    const existedValue = value.findIndex(i => i[valueForIteration] === option.option[valueForIteration])
                    setValue(existedValue !== -1 ? [...value] :
                        valueForIteration === 'size' ?
                            [...value, {...option.option}] :
                            [...value, {...option.option, image: []}]
                    )
                }
                break;
            case 'createOption':
                //size and freeSolo
                if (typeof option.option === 'string') {
                    const textSanitized = option.option.replace(/\s+/g, ' ').trim();
                    const existedValue = value.findIndex(i => i === textSanitized)
                    setValue(existedValue !== -1 ? [...value] : [...value, textSanitized])
                }
                break;
            default:
                break;
        }
    }

    const CustomChip = React.memo((props) => {
        const isObj = typeof props?.item === 'object';
        return (
            <Chip
                onDelete={() => setValue(value.filter((i, index) => index !== props['data-tag-index']))}
                label={isObj ?
                    capitalizeFirstLetter(props?.item[valueForIteration]) :
                    capitalizeFirstLetter(props?.item)
                }
                variant='outlined'
                sx={{
                    backgroundColor: isObj ? props?.item?.color || 'inherit' : 'inherit',
                    color: isObj ? (!!props?.item?.size ? '#2d2d2d' : '#fff') : '#2d2d2d',
                    height: '',
                    '& .MuiChip-deleteIcon': {
                        color: isObj ? (!!props?.item?.size ? '#777777' : 'white') : '#777777',
                    },
                }}
            />
        );
    });

    return (
        <Autocomplete
            multiple
            id='ez-autocomplete-multiple'
            size='small'
            value={value}
            options={tempData}
            getOptionLabel={(option) => option[valueForIteration]}
            isOptionEqualToValue={(option, value) => {
                const optionTitle = typeof option === 'string' ? option : option[valueForIteration];
                const valueTitle = typeof value === 'string' ? value : value[valueForIteration];
                return optionTitle === valueTitle;
            }}
            freeSolo={freeSolo}
            onChange={handleChange}
            renderOption={(props, option, state) =>
                <li {...props} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <span>{valueForIteration === 'color' ? option.color.toUpperCase() : option.size.toUpperCase()}</span>
                    {valueForIteration === 'color' && <EzColor color={option.color}/>}
                </li>
            }
            renderInput={(params) =>
                <TextField
                    {...params}
                    variant='outlined'
                    label={label}
                />
            }
            renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) =>
                    <CustomChip
                        key={option[valueForIteration]}
                        valueForIteration={valueForIteration}
                        item={option}
                        {...getTagProps({index})}
                    />
                )
            }}
        />
    );
}

EzAutocompleteMultiple.propTypes = {
    initialData: PropTypes.arrayOf(PropTypes.object),
    freeSolo: PropTypes.bool,
    label: PropTypes.string.isRequired,
    valueForIteration: PropTypes.string,
}
