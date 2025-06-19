import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
    const Navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("TOKEN");
        if(!token){
            Navigate("/login");
        }
    })
  return (
     <div className="card">
            <div>HOME</div>
            <div>
                <span> {localStorage.getItem('EMAIL')} </span>
                <button onClick={()=>{
                    localStorage.clear();
                    Navigate("/login");
                }}> LOGOUT </button>
            </div>



        </div>
  )
}

export default Home