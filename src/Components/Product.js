import {useState} from 'react';

function Product({item, configs, onAdd}){
    const [ram, setRam] = useState({rate:0, name:''});
    const [hdd, setHdd] = useState({rate:0, name:''});
    const [color, setColor] = useState({rate:0, name:''});

    const selectChange = (event) => {
        let value = event.target.value.split(',');
        
        switch(event.target.name){
            case 'ram':
                setRam({rate:value[0], name:value[1]});
                break;
            case 'hdd':
                setHdd({rate:value[0], name:value[1]});
                break;
            case 'color':
                setColor({rate:value[0], name:value[1]});
                break;
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();

        let result = {
            product: item,
            ram: ram,
            hdd: hdd,
            color: color,
            total: (Number(color.rate) + Number(hdd.rate) + Number(ram.rate) + Number(item.lapModelRate)).toFixed(2)
        }

        onAdd(result);
    }

    return <div className="Item">
            <p>{item.lapModelName}</p>
            <form onSubmit={submitHandler}>
                {
                    Object.entries(configs).map(config =>{
                        return<>
                            <label>{config[0].toUpperCase()}</label>
                            <select onChange={selectChange} name={config[0]} id={config[0]}>
                                <option value={0}>select</option>
                                {
                                    config[1].map(value=><option value={[value.lapConfigRate, value.lapConfigName]}>{value.lapConfigName}</option>)
                                }
                            </select>
                            <br/>
                        </>
                    })
                }
                <p>Total Price:{(Number(color.rate) + Number(ram.rate) + Number(hdd.rate) + Number(item.lapModelRate)).toFixed(2)}</p>
                <input type="submit" value="Add"></input>
            </form>
        </div>
}

export default Product;