import {useState} from "react";
// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import VariationSize from "./VariationSize";
import VariationColor from "./VariationColor";
import VariationChooseType from "./VariationChooseType";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Variation() {
    const [state, setState] = useState({
        size: false,
        color: false,
    });

    const handleCheckbox = (value) => {
        setState(prev => {return {...prev, [value]: !prev[value]}})
    }

    return (
        <RootStyle gap={2}>
            <VariationChooseType handleCheckbox={handleCheckbox}/>

            {state.size && <VariationSize/>}

            {state.color && <VariationColor/>}

        </RootStyle>
    );
}
