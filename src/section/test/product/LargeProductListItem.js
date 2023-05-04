export default function LargeProductListItem({product}) {
    const {name, price, description, rating} = product
    return (
        <div>
            <h3>{name}</h3>
            <p>Price: {price}</p>
            <p>Description: {description}</p>
            <h3>Rating: {rating}</h3>
        </div>
    )
}
