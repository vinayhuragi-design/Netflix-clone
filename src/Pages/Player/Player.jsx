import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const{id}= useParams()
  const navigate = useNavigate() //for navigating back to previous page using arrow icon//
  
const[apiData , setApiData] = useState({
  name:"",
  key:"",
  published_at:"",
  type:""
})

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzFmZDk5ZTE2YjE1YWEzY2E5YTU4MWZiNDVmMDc5YyIsIm5iZiI6MTc1NzY1OTU0Ni44NjYsInN1YiI6IjY4YzNjMTlhMGE4NjU2NTg0NzdjZTUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ONQ1FGYtXda_hoIUTA9ksge1zWotaUatw6lcbHquSH8'
    }
  };
  
 useEffect(()=>{
   fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  
 })

 
  
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-2)}}/>
      <iframe width= '90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder= '0'></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>


      </div>
      </div>
  )
}

export default Player