import  {createContext, useEffect, useState}  from 'react';
import axios from 'axios';
export const StoreContext = createContext(null);
//import { assets } from '../assets/assets';
 import { food_list } from "../assets/assets";

// Create the context with an initial value


const StoreContextProvider = (props) => {
  // Set the context value (assumed to be the food_list)
  const [cartItems,setcartItems]=useState({});
  const url="http://localhost:4000"
  const [token,setToken]=useState("");
  const [food_list,setFoodlist]=useState([])

  const addtocart=async(itemid)=>{
      if(!cartItems[itemid]){
        setcartItems((prev)=>({...prev,[itemid]:1}))
      }else{
        setcartItems((prev)=>({...prev,[itemid]:prev[itemid]+1}))
      }
      if(token){
        await axios.post(url+"api/cart/add",{itemid},{headers:{token}})
      }
  }
  const removefromCart=async(itemid)=>{
    setcartItems((prev)=>({...prev,[itemid]:prev[itemid]-1}));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemid},{headers:{token}})
    }
  }
  // useEffect(()=>{
  //    console.log(cartItems)
  // },[cartItems])
  const gettotalCartamount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo=food_list.find((product)=>product._id===item);
        totalAmount+=itemInfo.price* cartItems[item];
      }
      

    }return totalAmount;
  } 
  const fetchFoodlist=async()=>{
    const response=await axios.get(url+"/api/food/list");
    setFoodlist(response.data.data)
  }
  useEffect(()=>{
    
    async function loadData(){
      await fetchFoodlist();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  },[])

  const contextValue = {food_list,cartItems,setcartItems,addtocart,removefromCart,gettotalCartamount,url,token,setToken}

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;
