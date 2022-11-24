import styled from 'styled-components';
//material
import {IconButton} from '@mui/material';

const CustomIconButton = styled(IconButton)((props) => ({
    width: props.width,
    '&:hover': {
        backgroundColor: 'transparent'
    }
}))


export const PathIcon = ({color, width, path}) => {
    return (
        <CustomIconButton
            width={width}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
                viewBox='0 0 50 50'
                fill={'#484848'}
            >
                <path d={path}></path>
            </svg>
        </CustomIconButton>
    );
};