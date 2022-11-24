import {useState} from "react";
import {useSelector} from "react-redux";
// material
import {Box, Stack, Tab, Tabs} from "@mui/material";
//firestore
//
import Statistics from "../statistics/Statistics";
import AllProducts from "../allProducts/AllProducts";
import AddProduct from "../addProduct/AddProduct";
import Inventory from "../Inventory/Inventory";
import Shipping from "../shipping/Shipping";

//----------------------------------------------------------------

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <Stack
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{width: '100%'}}
            {...other}
        >
            {value === index && (
                <Box sx={{
                    padding: '5px',
                    height: 'calc(100% - 50px)',
                    position: 'absolute',
                    top: '50px', left: 0, right: 0, bottom: 0
                }}>
                    {children}
                </Box>
            )}
        </Stack>
    );
}

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

//---------------------------------------------------------------

export default function GeneralView() {
    const {productState} = useSelector(slice => slice.admin);

    //Tabs
    const [value, setValue] = useState(2);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!productState.loaded) return;
    if (productState.loading) return <Box>Loading...</Box>;

    return (
        <Box sx={{width: '100%', height: '100vh', position: 'relative'}}>
            <Box sx={{borderBottom: '1px dotted lightgrey', borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Statistics" {...a11yProps(0)} />
                    <Tab label="All Products" {...a11yProps(1)} />
                    <Tab label="Add ProductGrid" {...a11yProps(2)} />
                    <Tab label="Inventory" {...a11yProps(3)} />
                    <Tab label="Shipping" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Statistics/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AllProducts/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AddProduct/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Inventory/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Shipping/>
            </TabPanel>
        </Box>
    );
}

