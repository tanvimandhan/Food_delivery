import React, { useEffect, useState } from 'react'
import './Add.css'
import Navbar from '../../Navbar/Navbar'
import { assets } from '../../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
  //const url="http://localhost:4000";
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"salad"
  })
  const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
  }
  // useEffect(()=>{
  //    console.log(data);
  // },[data])
  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    const formData=new FormData();
    console.log(Number(data.price+1));
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const response=await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
       setData({
          name:"",
          description:"",
          price:"",
          category:"salad"
       })
       setImage(false);
       toast.success(response.data.message)
    }else{
       toast.error(response.data.message)
    }
  }
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='write content'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} value={data.price} name="category" >
                        <option value="salad">salad</option>
                        <option value="rolls">rolls</option>
                        <option value="desert">desert</option>
                        <option value="sandwich">sandwich</option>
                        <option value="cake">cake</option>
                        <option value="pure-veg">pure-veg</option>
                        <option value="pasta">pasta</option>
                        <option value="noodles">noodels</option>
                        
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input type="Number" name='price' placeholder='$20'/>
                    
                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
        
    </div>
  )
}

export default Add