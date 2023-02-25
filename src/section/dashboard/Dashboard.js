// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import Wrapper from "../../components/Wrapper/Wrapper";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    flexGrow: 1,
    gap: '10px'
}));

const SectionContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '10px',
    width: '100%',
    height: '50%'
}));

const NotificationAreaContainer = styled(Stack)(({theme}) => ({
    width: '240px',
    height: 'calc(100vh - 80px)',
    gap: '10px'
}));


//----------------------------------------------------------------

export default function Dashboard() {
    return (
        <RootStyle>
            <Stack sx={{flexGrow: 1}} gap='10px'>

                {/*first section*/}
                <SectionContainer>
                    <Wrapper sx={{width: '65%'}}>
                        Total Revenue
                    </Wrapper>
                    <Wrapper sx={{width: '35%'}}>
                        Customers
                    </Wrapper>
                </SectionContainer>

                {/*second section*/}
                <SectionContainer>
                    <Wrapper sx={{width: '65%'}}>Top Products</Wrapper>
                    <Wrapper sx={{width: '35%'}}>Stats Overview</Wrapper>
                </SectionContainer>
            </Stack>

            {/*notificationArea area*/}
            <NotificationAreaContainer>
                <Wrapper sx={{flex: 1}}>notification</Wrapper>
                <Wrapper sx={{flex: 1}}>daily activities</Wrapper>
                <Wrapper sx={{flex: 1}}>notes</Wrapper>
            </NotificationAreaContainer>
        </RootStyle>
    );
}
