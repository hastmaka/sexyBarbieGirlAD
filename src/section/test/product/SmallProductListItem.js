export default function SmallProductListItem({product}) {
    const {name, price} = product
    return (
        <p>Name: {name}, Price: {price} Years</p>
    )
}
