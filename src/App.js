import { useState, useEffect} from 'react';

import './App.css';

function App() {
  
  const [loading, setLoading] =useState(false)
  const [url, setUrl]=useState("https://api.magicthegathering.io/v1/sets")
  const [data, setData]=useState([])
  const [sets, setSets]=useState('')
  const [data2, setData2]=useState([])

  function Carta(props){
    const[cartasset, setCartaset]=useState([])
    useEffect(() =>{
      Promise.all(props.urls.map((urll) => fetch(urll)))
      .then((respuesta)=> Promise.all(respuesta.map((res)=> res.json())))
      .then((datos)=>{
        setCartaset(datos)
      })
    },[setData2])
 
    
  const cartaHTML=cartasset.map((cartafinal)=>{
    return <li>{cartafinal}</li>
  })
  return <ul>{cartaHTML}</ul>

}

  useEffect(()=>{
    setLoading(true)
    fetch(url).then(res => res.json()).then((datos)=>setData(datos.sets))
    setLoading(false)
  },[url])

  useEffect(()=>{
    setLoading(true)
    fetch(`https://api.magicthegathering.io/v1/cards?set=${sets}`).then(res => res.json()).then((datos)=>setData2(datos.cards))
    setLoading(false)
  },[sets])
  

  let setGuardado=data.map((cards) => {return(
  <option key={cards.id} value={cards.code}>{cards.name}</option>)})

   if(loading){
    return <h2>Cargando....</h2>
  }else{

  return (
    <>
     <h1>Cartas</h1>
     <select onChange={ (e) => setSets(e.target.value)}>{/* aqui se muestra el que ha elegido el usuario y que esta en planeta */}
      {setGuardado}     
      
      </select>
      <h1>{sets}</h1>
      <Carta urls={data2}/>
     
  </>
  );
    }
}

export default App;
