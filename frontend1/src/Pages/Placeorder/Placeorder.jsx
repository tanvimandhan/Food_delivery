import React, { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
const Placeorder = () => {
  const { gettotalCartamount}=useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery info</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name'/>
          <input type="text" placeholder='Last name'/>
        </div>
        <input type="text" placeholder='email address' />
        <input type="text" placeholder='street' />
        <div className="multi-fields">
          <input type="text" placeholder='city'/>
          <input type="text" placeholder='state'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='zip code'/>
          <input type="text" placeholder='country'/>
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className='place-order-right'>
      <div className="cart-total">
            <h2>cart total</h2>
            <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>{gettotalCartamount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{gettotalCartamount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
               <b>Total</b>
               <b>{gettotalCartamount()==0?0: gettotalCartamount()+2}</b>
            </div>
            </div>
            
            <button >PROCEED TO PAY</button>
          </div>
      </div>
    </form>
  )
}

export default Placeorder