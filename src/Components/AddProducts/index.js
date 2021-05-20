import  './AddProducts.css'
import {useState} from 'react';
const configType = {
    ram : 1,
    hdd : 2,
    color : 3
}

function AddProducts({products, configs}){
    const[type, setType] = useState(null);
    const[category, setCategory] = useState(null);
    const[name, setName] = useState(null);
    const[price, setprice] = useState(null);
    const[saveStatus, setSaveStatus] = useState(null);

    const onTypeSelect=(event) => {
        switch(event.target.name){
            case "type":
                setType(event.target.value);
                setCategory(null);
                break;
            case "category":
                setCategory(event.target.value);
                break;
        }
    }

    const onInputChange=(event) => {
        switch(event.target.name){
            case "price":
                setprice(event.target.value);
                break;
            case "name":
                setName(event.target.value);
                break;
        }
    }

    async function postData(url = '', data ={}){
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const onAddProduct=(event) => {
        if(type === "lap"){
            postData('http://localhost:5000/save/lapmodel', {lapModelName: name, lapModelRate: Number(price)})
            .then(data => {
                setSaveStatus(data.message);
            });
        }
        else{
            postData('http://localhost:5000/save/lapconfig', {lapConfigType: configType[category], lapConfigName: name, lapConfigRate: Number(price)})
            .then(data => {
                setSaveStatus(data.message);
            });
        }
    }


    return <div className="AddConatiner">
        <div>
            <label>Type</label>
            <select onChange={onTypeSelect} name="type" id="type">
                <option value="">Select</option>
                <option value="lap">Laptop</option>
                <option value="config">Config</option>
            </select>
        </div>
        <div>
            {type && 
            (type==="lap" ? (
            <>
                <label>Name</label>
                <input id="lap_name" name="name" value={name} onChange={onInputChange}/>
                <label>Rate</label>
                <input id="lap_rate" name="rate" value={price} onChange={onInputChange}/>
                <button className="AddButton" onClick={onAddProduct}>Add</button>
            </>
            ) : (
            <>
                <label>Category</label>
                <select onChange={onTypeSelect} name="category" id="category">
                    <option value="">Select</option>
                    <option value="color">Color</option>
                    <option value="hdd">HDD</option>
                    <option value="ram">RAM</option>
                </select>
                <label>Name</label>
                <input id="config_name" name="name" value={name} onChange={onInputChange}/>
                <label>Price</label>
                <input id="config_price" name="price" value={price} onChange={onInputChange}/>
                <button className="AddButton" onClick={onAddProduct}>ADD</button>
            </>
            ))}
        </div>
        {saveStatus && <div>{saveStatus}</div>}
    </div>
}

export default AddProducts;