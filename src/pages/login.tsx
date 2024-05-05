import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {useState} from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';

const Login = () => {
    const [gender,setGender]= useState("");
    const [date,setDate]=useState("");
    
    const loginHandler = async () =>{
      try{
        const provider = new GoogleAuthProvider()

        const {user} = await signInWithPopup(auth,provider);

        console.log(user);
        

      }catch(err){
        toast.error("Sign In Failed");
      }
    }


  return (
    <div className='login'>
      <main>
      <h1 className='heading'>LOGIN</h1>
        <div>
            <label >Gender</label>
            <select value={gender} required onChange={(e)=> setGender(e.target.value)}> 
                <option value=''>Choose Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </select>
        </div>
        <div>
            <label>Date of Birth</label>
            <input type='date' value={date} required placeholder="dd/mm/yy" onChange={(e)=>{e.target.value}}></input>
        </div>
        <div>
            <p>Already Signed in Once?</p>
            <button onClick={loginHandler}><FcGoogle/><span>Sign in with Google</span></button>
        </div>
      </main>
    </div>
  )
}

export default Login;
