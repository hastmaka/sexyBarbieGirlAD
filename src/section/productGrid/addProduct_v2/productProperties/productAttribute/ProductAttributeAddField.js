import {useState} from "react";
import PropTypes from "prop-types";
// material
import {Stack, TextField, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//
import EzText from "../../../../../components/ezComponents/EzText/EzText";

//----------------------------------------------------------------

export default function ProductAttributeAddField({item, onChange, onDelete}) {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <Stack
            onMouseOver={_ => setIsHovering(true)}
            onMouseOut={_ => setIsHovering(false)}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            my='5px'
        >
            <EzText text={item.text || item.name}/>
            <Stack direction='row' gap='5px' alignItems='center'>
                {isHovering &&
                    <Tooltip title='Delete Property'>
                        <DeleteIcon
                            onClick={onDelete}
                            sx={{
                                cursor: 'pointer',
                                fill: 'red'
                            }}
                        />
                    </Tooltip>
                }
                <TextField
                    value={item.value}
                    onChange={e => onChange({name: item.text, value: e.target.value})}
                    name={item.text || item.name}
                    size='small'
                    sx={{width: '300px'}}
                />
            </Stack>
        </Stack>
    )
}

ProductAttributeAddField.prototype = {
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}