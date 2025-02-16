import React, { useEffect } from 'react'
import './List.css'
import { assets } from '../../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'


const List = ({url}) => {
    //const url="http://localhost:4000"
    const [List,setList]=useState([]);
    const fetchList=async()=>{
        const response=await axios.get(`${url}/api/food/list`);
        //console.log(response.data);
        if(response.data.success){
            setList(response.data.data)
        }else{
            toast.error("Error");
        }
    }
    const removeFood=async(foodId)=>{
       const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
       await fetchList();
    }
    useEffect(()=>{
        fetchList();
    },[])
  return (
    <div className='list add flex-col'>
        <p>All foods list</p>
        <div className="list-table">
            <div className="list-table-format">
                <b>Image</b>
                <b>name</b>
                <b>category</b>
                <b>price</b>
                <b>action</b>
            </div>
            {List.map((item,index)=>{
            return(
                <div key={index} className="list-table-format">
                    <img src={`${url}/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p onClick={()=>removeFood(item._id)}className='cursor'>x</p>
                </div>
            )
        })}
                
            
        </div>
        
    </div>
  )
}

export default List