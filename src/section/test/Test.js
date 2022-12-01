// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useState} from "react";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------
const FileInput = ({ value, onChange, ...rest }) => (
    <div>
        {Boolean(value.length) && (
            <div>Selected files: {value.map(f => f.name).join(", ")}</div>
        )}
        <label>
            Click to select some files...
            <input
                {...rest}
                multiple={true}
                style={{ display: "none" }}
                type="file"
                onChange={e => {
                    onChange([...e.target.files]);
                }}
            />
        </label>
    </div>
);

export default function Test() {
    const [value, setValue] = useState([]);
    const handleChange = (v) => {
        setValue(v)
    }
    return (
        <RootStyle>
            <FileInput value={value} onChange={handleChange}/>
        </RootStyle>
    );
}
