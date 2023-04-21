// material
import {Box, Button, Stack, TextField} from "@mui/material";
import {styled} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {getDummyData, uploadDummyData} from "../../helper/firebase/FirestoreApi";
import data from '../../dummyData.json'
//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    padding: '20px'
}));

//----------------------------------------------------------------
const RenderTags = ({tags}) => {
    return (
        <Stack direction='row' gap='5px'>
            {tags.map((item, index) =>
                <span key={index}>{(index ? ', ' : '') + item}</span>
            )}
        </Stack>
    )
}

export default function Test() {
    const [data, setData] = useState([]);
    const [inputData, setInputData] = useState('');

    useEffect(_ => {
        getDummyData(inputData, setData).then()
    }, [])

    return (
        <RootStyle>
            <Button
                // onClick={_ => uploadDummyData(data)}
            >Upload</Button>
            <Stack direction='row' gap='10px'>
                <TextField
                    onChange={e => setInputData(e.target.value)}
                />
                <Button
                    onClick={_ => getDummyData(inputData !== '' ? inputData : {}, setData).then()}
                >Search</Button>
            </Stack>
            <Stack>
                {data.length > 0 &&
                    <ul>
                        {data.map(item =>
                            <li key={item.id}>
                                <RenderTags tags={item.tags}/>
                            </li>
                        )}
                    </ul>
                }
            </Stack>
        </RootStyle>
    );
}
