import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const shipping=()=> {
    const navigate= useNavigate();

    const dispatch = useDispatch();
    const {cartItems,total} = useSelector((state:{cartReducer: CartReducerInitialState})=> state.cartReducer)


    const[shipppingInfo,setShippingInfo]= useState({
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:""
    })

    const changeHandler =(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
            setShippingInfo((prev)=>({...prev , [e.target.name]: e.target.value}))

    };

    const submitHandler = async (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      dispatch(saveShippingInfo(shipppingInfo))

      try{
        const {data} =await axios.post(`${server}/api/v1/payment/create`,{
          amount:total,
        },{
          headers:{
            "Content-Type":"application/json"
          },

        });
        navigate("/pay",{
          state:data.clientSecret,
        })

      }
      catch(error){
          console.log(error);
          toast.error("something went wrong")
      }
    };

    useEffect(()=>{
      
    if (cartItems.length<=0) return navigate("/cart")
    },[cartItems]
    )




  return (
    <div className="shipping" onClick={()=> navigate("/cart")}>
      <button className="back-btn">
            <BiArrowBack/>
      </button>

      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>

        <input type="text" 
        required
        placeholder="adddress" 
        name="address"
        value={shipppingInfo.address}
        onChange={changeHandler}
        />

        <input type="text" 
        required
        placeholder="city" 
        name="city"
        value={shipppingInfo.city}
        onChange={changeHandler}
        />  

        <input type="text" 
        required
        placeholder="state" 
        name="state"
        value={shipppingInfo.state}
        onChange={changeHandler}
        />  


        <select name="country" 
        required 
        value={shipppingInfo.country}
        onChange={changeHandler}
        >
            <option value="">Choose Country</option>
            <option value="india">India</option>
            <option value="india">USa</option>
        </select>


        <input type="number" 
        required
        placeholder="Pin code" 
        name="pinCode"
        value={shipppingInfo.pinCode}
        onChange={changeHandler}
        />  

            <button type="submit">
                Pay Now
            </button>
      </form>
    </div>
  )
}

export default shipping
