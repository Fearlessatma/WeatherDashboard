import React from 'react'
import { useState,useEffect } from 'react'




const App = () => {
  //state for input
  const [text, setText] = useState()

  //array state to store data from api
  const[apidata,setapiData]=useState([])

  //state to store filtered data
  const[weather,setWeather]=useState([])

  //input value change
  const handlechange=(e)=>{
    setText(e.target.value.toLowerCase())
  }

  //fetching the data
  const fetchdata=async()=>{
    let url= await fetch('https://freetestapi.com/api/v1/weathers')
    let data=await url.json()
    console.log(data)
    setapiData(data)
  }
  useEffect(() => {
   fetchdata()
  }, [])

  //function for search city
  const search=()=>{
    let filtereddata=apidata.filter(data=>data.city.toLowerCase().includes(text))
    setWeather(filtereddata)
    console.log(filtereddata)
    setText("")
  }
  
  return (
    
    <div className='container w-75 p-5'>
      <h1 className='title'>Weather Dashboard</h1>
    <div className="input-group mb-5">
      
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="enter city" 
      value={text} onChange={handlechange}></input>
      <button  type="button" class="btn btn-dark" onClick={search}>Search</button>
    </div>
       <div className="display">
       { weather.length!=0 ? weather.map((city,id)=>{
           return <div key={id}>
           <h1 className='title-show'>{city.city}</h1>
           <p>Temperature:{city.temperature}</p>
           <p>Humidity:{city.humidity}</p>
           <p>Wind Speed:{city.wind_speed}</p>
           <p>Description:{city.weather_description}</p>
           </div>
        }):<p>No Data Found</p>
      
      }
      </div>
    </div>
  )
}

export default App
