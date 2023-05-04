import {Stack} from "@mui/material";

export default function RegularList ({
    items,
    resourceName,
    itemComponent: ItemComponent
}) {
    return (
        <Stack gap={2}>
            {items.map((item, i) => (
                <ItemComponent key={i} {...{[resourceName]: item}}/>
            ))}
        </Stack>
    )
}