import {Stack} from "@mui/material";

export default function NumberedList ({
    items,
    resourceName,
    itemComponent: ItemComponent
}) {
    return (
        <Stack gap={2}>
            {items.map((item, i) => (
                <div key={i}>
                    <h3>{i + 1}</h3>
                    <ItemComponent {...{[resourceName]: item}}/>
                </div>
            ))}
        </Stack>
    )
}