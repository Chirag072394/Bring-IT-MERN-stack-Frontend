import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/cart-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { cartItem } from "../types/types";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";



const Cart = () => {

  const {cartItems,subtotal,tax,total,shippingCharges,discount} = useSelector((state:{cartReducer: CartReducerInitialState})=> state.cartReducer)




  const dispatch= useDispatch();
  const [coupanCode,setCoupanCode]= useState<string>("");
  const [isValidcoupanCode,setIsValidcoupanCode]= useState<boolean>(false);


  const incrementHandler=(cartItem:cartItem)=>{

    if(cartItem.quantity>=cartItem.stock) return;

      dispatch(addToCart({...cartItem ,quantity:cartItem.quantity+1}))
     };


     const decrementHandler=(cartItem:cartItem)=>{
      if(cartItem.quantity<=1) return;
      dispatch(addToCart({...cartItem ,quantity:cartItem.quantity-1}))
     };

     const removerHandler=(productId:string)=>{

      dispatch(removeCartItem(productId))
     };



  useEffect(()=>{

    const {token,cancel} = axios.CancelToken.source()
    const timeOutId=setTimeout(()=>{

      axios.get(`${server}/api/v1/payment/discount?coupon=${coupanCode}`,{
        cancelToken:token,
      }).then(res=>{
        dispatch(discountApplied(res.data.discount))
        setIsValidcoupanCode(true);
        dispatch(calculatePrice())

      }).catch(()=>{
        dispatch(discountApplied(0))
        setIsValidcoupanCode(false);
        dispatch(calculatePrice())
      });
      },1000)

    return()=>{
      clearTimeout(timeOutId);
      cancel();
      setIsValidcoupanCode(false)
    }
  },[coupanCode])

  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])

  return (
    <div className="cart">
      <main>
        {
           cartItems.length>0 ? (cartItems.map((i,idx)=>
            <CartItemCard incrementHandler={incrementHandler} decrementHandler={decrementHandler} removerHandler={removerHandler} key={idx}  cartItem={i}/>
           )):(
            <h1> no items added </h1>

           )
        }

      </main>

      <aside>
        <p>Sub Total : ₹{subtotal}</p>
        <p>shipping Charges : ₹{shippingCharges}</p>
        <p>tax : ₹{tax}</p>

        <p>
          discount-<em>   
          ₹{discount}
             </em> 
        </p>

        <p>
          <b>
            Total:₹{total}
          </b>
          </p>

          <input type="text"  
          placeholder="coupan Code"
          value={coupanCode} onChange={e=>setCoupanCode(e.target.value)}/>



          {coupanCode&&(
            isValidcoupanCode ?( <span className="green">
          ₹{discount} off using the <code> {coupanCode}  </code>
          </span>
        )
          :(
          <span className="red">
            Invalid   <VscError />
          </span>
  )
          )}


          {
            cartItems.length>0 && <Link to="/shipping"> Checkout</Link>
          }
      </aside>
    </div>
  )
}

export default Cart
