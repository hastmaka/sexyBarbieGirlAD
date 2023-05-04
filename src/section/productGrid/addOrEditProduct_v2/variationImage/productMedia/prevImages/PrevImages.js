// material
import {Box, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useState} from "react";
import EzText from "../../../../../../components/ezComponents/EzText/EzText";
import PropTypes from "prop-types";
import {getNameFromUrl} from "../../../../../../helper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px'
}));

//----------------------------------------------------------------

export default function PrevImages({image, onClick}) {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <RootStyle>
                <Box
                    onMouseOver={_ => setIsHovering(true)}
                    onMouseOut={_ => setIsHovering(false)}
                    sx={{
                        margin: '0 auto',
                        display: 'grid',
                        gridGap: '5px 5px',
                        grid: 'auto / repeat(4, 1fr)',
                    }}>
                    {image.map(item =>
                        <Box
                            onClick={_ => onClick(item)}
                            key={item.id}
                            sx={{
                                position: 'relative',
                                cursor: 'pointer',
                                border: `1px solid ${'#efefef'}`,
                                borderRadius: '4px',
                                transition: 'all 200ms',
                                '&:hover': {
                                    boxShadow: 'rgb(0 0 0 / 25%) 0px 4px 4px',
                                }
                            }}>
                            {item.uploaded &&
                                <CheckCircleIcon
                                    sx={{
                                        position: 'absolute',
                                        top: '5px', left: '5px',
                                        color: '#008000'
                                    }}
                                />
                            }
                            {isHovering &&
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '5px', right: '5px',
                                        borderRadius: '4px',
                                        padding: '1px 5px',
                                        background: 'rgba(255, 255, 255, 0.71)',
                                        border: '1px solid rgb(233, 233, 233)',
                                        boxShadow: 'rgb(0 0 0 / 25%) 0px 4px 4px',
                                    }}
                                >
                                    <EzText text={getNameFromUrl(item.url) || item.File.name}/>
                                </Box>
                            }
                            <img
                                src={item.url || URL.createObjectURL(item.File)}
                                alt={getNameFromUrl(item.url) || item.File.name}
                                style={{
                                    borderRadius: '4px',
                                    // maxHeight: table ? '105px' : ''
                                }}
                            />
                        </Box>
                    )}
                </Box>
        </RootStyle>
    );
}

PrevImages.prototype = {
    image: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    table: PropTypes.string
}