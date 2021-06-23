import { useState, useEffect} from 'react';

import './App.css';

function App() {
  
  const [loading, setLoading] =useState(false)
  const [url, setUrl]=useState("https://api.magicthegathering.io/v1/sets")
  const [data, setData]=useState([])
  const [sets, setSets]=useState('')
  const [data2, setData2]=useState([])
  


  useEffect(()=>{
    setLoading(true)
    fetch(url).then(res => res.json()).then((datos)=>setData(datos.results))
    setLoading(false)
  },[url])

  useEffect(()=>{
    setLoading(true)
    fetch(`https://api.magicthegathering.io/v1/sets/${sets}`).then(res => res.json()).then((datos)=>setData2(datos.code))
    setLoading(false)
  },[sets])

  if(loading){
    return <h2>Cargando....</h2>
  }else{

  return (
    <>
     <h1>Cartas</h1>
     <select onChange={ (e) => setSets(e.target.value)}>{/* aqui se muestra el que ha elegido el usuario y que esta en planeta */}
      {data.map((cards) =>
      <option key={cards.id} value={cards.name}>{cards.name}</option>)}     
      
      </select>
      <h1>{sets}</h1>
     
      <ul>
     {data.map((data2, index)=>{
       if(index<=99){//esto condiciona que solo se puedan mostrar 10 elementos
        return <li key={data2.id}>{data2.name},<br/><p>{data2.set}</p><br/><img src={data2.imageUrl}></img></li>

       }
       
     })}
   </ul>

    </> 
  );
    }
}

export default App;
