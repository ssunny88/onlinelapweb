import { useEffect, useState } from 'react';
import Product from '../Product';
import './ProductContainer.css';
import CartItem from '../CartItem';
import AddProducts from '../AddProducts';

function ProductContainer({products, configs}){
    const tabs =['add_products', 'available_products', 'cart'];
    const [activeTab, setActiveTab] = useState('available_products');
    const [productConfig, setProductConfig] = useState({});
    const [cart, addToCart] = useState([]);

    const Constants = {
        add_products: 'Add Models/Config',
        available_products: 'Available Products',
        cart: 'Cart'
    };

    useEffect(()=>{
        if(configs !== []){
            const ram = configs.filter(item => item.lapConfigType === 1);
            const hdd = configs.filter(item => item.lapConfigType === 2);
            const color = configs.filter(item => item.lapConfigType === 3);

            setProductConfig({ram: ram, hdd: hdd, color: color});
        }
    }, [products, configs]);

    const onTabSwitch = (event) => {
        setActiveTab(event.target.value);
    }

    const onAdd = (productDetails) => {
        addToCart([...cart, productDetails]);
        setActiveTab("cart");
    }

    return <>
        <div className="TabContainer">
            {
                tabs.map(tab => <button className={activeTab === tab ? 'active' : ''} value={tab} onClick={onTabSwitch}>{Constants[tab]}</button>)
            }
        </div>

        {
            activeTab === 'available_products' && <div className="Container">
            {products && products.map(item => <Product item={item} configs={productConfig} onAdd={onAdd}/>)}
            </div>
        }

        {
            activeTab === 'cart' && (cart.length > 0 ? 
                <div className="Container">
                    {
                        cart.map(item => <CartItem product={item.product} hdd={item.hdd} color={item.color} total={item.total} ram={item.ram}/>)
                    }
                </div> : <span className="Container">Cart is Empty!</span>
                )
        }
        {activeTab === 'add_products' && <AddProducts/>}
    </>
}

export default ProductContainer;