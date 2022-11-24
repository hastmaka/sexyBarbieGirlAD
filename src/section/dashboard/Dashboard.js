// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import ChildLocal from "./childLocal/ChildLocal";

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
                    <ChildLocal sx={{width: '65%'}}>
                        Total Revenue
                    </ChildLocal>
                    <ChildLocal sx={{width: '35%'}}>
                        Customers
                    </ChildLocal>
                </SectionContainer>

                {/*second section*/}
                <SectionContainer>
                    <ChildLocal sx={{width: '65%'}}>Top Products</ChildLocal>
                    <ChildLocal sx={{width: '35%'}}>Stats Overview</ChildLocal>
                </SectionContainer>
            </Stack>

            {/*notificationArea area*/}
            <NotificationAreaContainer>
                <ChildLocal sx={{flex: 1}}>notification</ChildLocal>
                <ChildLocal sx={{flex: 1}}>daily activities</ChildLocal>
                <ChildLocal sx={{flex: 1}}>notes</ChildLocal>
            </NotificationAreaContainer>
        </RootStyle>
    );
}
