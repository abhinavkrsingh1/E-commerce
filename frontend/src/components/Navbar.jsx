import { ShoppingCart, User } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';



const Navbar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.user)
  const accessToken=localStorage.getItem('accessToken')
  const logoutHandler = async ()=>{
    try {
      const res = await axios.post(`http://localhost:3000/api/users/logout`,{},{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }

    })
    if(res.data.success){
      dispatch(setUser(null))
      toast.success(res.data.message)
    }
      
    } catch (error) {
      console.log(error);

      
    }
  }
  return (
    <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200 shadow-sm'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-4'>
        {/* Logo or Brand Name */}
        <div className="flex items-center gap-3">
          <img src='/Ekart.png' alt="Ekart Logo" className="w-[60px] h-[60px] object-contain" />
          <span className="text-2xl font-bold text-pink-700 tracking-tight">Ekart</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link to="/" className="text-pink-700 hover:text-pink-900 font-medium transition">Home</Link>
          <Link to={"/products" }className="text-pink-700 hover:text-pink-900 font-medium transition">Products</Link>
           {
            user && <Link to="/profile" className="text-pink-700 hover:text-pink-900 font-medium transition">Hello,{user.firstName}</Link>
           }
           <Link to={"/cart"} className="text-pink-700 hover:text-pink-900 font-medium transition relative">
           <ShoppingCart/>
           <span className='bg-pink-500 rounded-full absolute text-white -right-5 -top-2 px-2 text-xs font-bold flex items-center justify-center w-6 h-6'>0</span>
           </Link>
           {user ? <Button onClick={logoutHandler} className="text-pink-700 hover:text-pink-900 font-medium transition">Logout</Button> : <Link to={"/login"} className="text-pink-700 hover:text-pink-900 font-medium transition">Login</Link>}
        </nav>
      </div>
    </header>
  )
}

export default Navbar