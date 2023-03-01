// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px'
}));

//----------------------------------------------------------------

export default function PrevImages({image, onClick}) {
    return (
        <RootStyle>
                <Box
                    sx={{
                        margin: '0 auto',
                        display: 'grid',
                        gridGap: '5px 5px',
                        grid: 'auto / repeat(2, 1fr)',
                    }}>
                    {image.map(item => <Box
                            onClick={_ => onClick(item)}
                            key={item.File.name}
                            sx={{
                                position: 'relative',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.005)'
                                }
                            }}>
                            {item.uploaded && <Box
                                sx={{
                                    position: 'absolute'
                                }}
                            >
                                <CheckCircleIcon sx={{color: '#008000'}}/>
                            </Box>}
                            <img src={URL.createObjectURL(item.File)} alt={item.File.name}/>
                        </Box>
                    )}
                </Box>
        </RootStyle>
    );
}
