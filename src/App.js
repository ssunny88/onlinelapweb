import React, {useEffect, useState} from 'react';
import './App.css';
import ProductContainer from './Components/ProductContainer';

function App() {
  const [lapmodels, setLapModels] = useState([]);
  const [lapconfigs, setLapConfigs] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/search/lapmodels")
    .then(response => response.json())
    .then((result) => {
      setLapModels(result.lapModels);
    });

    fetch("http://localhost:5000/search/lapconfigs")
    .then(response => response.json())
    .then((result) => {
      setLapConfigs(result.lapconfigs);
    });

  },[]);

  return (
    <div className="App">
        <ProductContainer products={lapmodels} configs={lapconfigs} />
    </div>
  );
}

export default App;
