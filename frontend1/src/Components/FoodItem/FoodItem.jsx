import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {
    const [itemcount,setItemcount]=useState(0)
    const {url,cartItems,addtocart,removefromCart}=useContext(StoreContext);
  return (
     <div className='food-item'>
         <div className="food-item-img-container">
             <img className='food-item-image' src={url+"/images/"+image} alt="" />
             {
                !cartItems[id]?<img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white} alt=''/>:<div className='food-item-counter'>
                    <img onClick={()=>removefromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addtocart(id)} src={assets.add_icon_green} alt="" />
                </div>

             }
         </div>
         <div className="food-item-info">
             <div className='food-item-name-rating'>
                 <p>{name}</p>
                 <img src={assets.rating_starts} alt="" />
             </div>
              <p className='food-item-desc'>{description}</p>
             <p className='food-item-price'>Rs {price}</p> 
         </div>
     </div>
  )
}

export default FoodItem