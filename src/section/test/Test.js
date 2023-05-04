// material
import {Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import RegularList from "./RegularList";
import SmallPersonListItem from "./people/SmallPersonListItem";
import LargePersonListItem from "./people/LargePersonListItem";
import LargeProductListItem from "./product/LargeProductListItem";
import NumberedList from "./NumberedList";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------
const people = [
    {
        name: 'John Doe',
        age: 55,
        hairColor: 'brown',
        hobbies: ['swimming', 'bicycling', 'video games']
    },
    {
        name: 'Jose Garcia',
        age: 23,
        hairColor: 'black',
        hobbies: ['golf', 'mathematics']
    },
    {
        name: 'Maka',
        age: 33,
        hairColor: 'brown',
        hobbies: ['biology', 'medicine', 'gymnastic']
    }
]

const product = [
    {
        name: 'Flat-Screen TV',
        price: 300,
        description: 'Huge LCD screen, a great deal',
        rating: 4.5
    },
    {
        name: 'Baseball',
        price: 20,
        description: 'Just like the pros use',
        rating: 3.5
    },
    {
        name: 'Running Shoes',
        price: 120,
        description: 'State-of-the-art technologies for optimum running',
        rating: 4.2
    }
]

export default function Test() {
    return (
        <RootStyle>
            <RegularList
                items={people}
                resourceName='person'
                itemComponent={SmallPersonListItem}
            />
            <NumberedList
                items={people}
                resourceName='person'
                itemComponent={LargePersonListItem}
            />
            <RegularList
                items={product}
                resourceName='product'
                itemComponent={LargeProductListItem}
            />
        </RootStyle>
    );
}
