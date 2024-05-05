import {Link} from 'react-router-dom'
import { FaSearch,FaShoppingBag,FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useState} from 'react'
import { User } from '../types/types';

const user={
    _id:"",
    role: ""
}

interface PropsType{
  user : User | null;
}

const Header = ({user}:PropsType) => {

  const [isOpen,setIsOpen]=useState<boolean>(false)
  const logoutHandler=()=>{
    setIsOpen(false);
  }
  return (
    <nav className='header'>
        <Link onClick={()=>setIsOpen(false)} to={'/'}>HOME</Link>
        <Link onClick={()=>setIsOpen(false)} to={'/search'}><FaSearch></FaSearch></Link>
        <Link onClick={()=>setIsOpen(false)} to={'/cart'}><FaShoppingBag></FaShoppingBag></Link>
        
{       
    user?._id?(
    <>
      <button onClick={()=>setIsOpen((prev)=> !prev)}>
        <FaUser></FaUser>
      </button>
      <dialog open={isOpen}>
        <div>
          {
            user.role === "admin" && (<Link to='/admin/dashboard'>Admin</Link>)
          }
          <Link onClick={()=>setIsOpen(false)} to='/orders'>Orders </Link>
          <button onClick={logoutHandler}><FaSignOutAlt/></button>
        </div>
      </dialog>
    </>
    ): <Link onClick={()=>setIsOpen(false)} to={'/login'}><FaSignInAlt></FaSignInAlt></Link>
}
    </nav>
  )
}

export default Header
