function CartItem({product, ram, hdd, color, total})
{
    return <div className="Item">
        <p>{product.lapModelName}</p>
        <p>RAM : {ram.rate}</p>
        <p>HDD : {hdd.rate}</p>
        <p>COLOR : {color.rate}</p>
        <p>TOTAL : {total}</p>
    </div>;
}

export default CartItem;