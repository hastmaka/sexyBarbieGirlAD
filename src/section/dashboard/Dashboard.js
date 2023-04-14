// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import ChildWrapper from "../../components/ChildWrapper/ChildWrapper";

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
                    <ChildWrapper sx={{width: '65%'}}>
                        Total Revenue
                    </ChildWrapper>
                    <ChildWrapper sx={{width: '35%'}}>
                        Customers
                    </ChildWrapper>
                </SectionContainer>

                {/*second section*/}
                <SectionContainer>
                    <ChildWrapper sx={{width: '65%'}}>Top Products</ChildWrapper>
                    <ChildWrapper sx={{width: '35%'}}>Stats Overview</ChildWrapper>
                </SectionContainer>
            </Stack>

            {/*notificationArea area*/}
            <NotificationAreaContainer>
                <ChildWrapper sx={{flex: 1}}>notification</ChildWrapper>
                <ChildWrapper sx={{flex: 1}}>daily activities</ChildWrapper>
                <ChildWrapper sx={{flex: 1}}>notes</ChildWrapper>
            </NotificationAreaContainer>
        </RootStyle>
    );
}
