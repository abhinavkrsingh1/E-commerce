import React,{useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction, 
  CardContent,
  CardDescription,

  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeOff, Eye, Loader, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'sonner'
import {useDispatch} from 'react-redux'
import { setUser } from '@/redux/userSlice'

const Login = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false); 
     const [loading, setLoading] = useState(false);
     const [formData, setFormData] = useState({
        email: "",
        password: "",
     })
    const navigate = useNavigate();
     const handleChange = (e) => {
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
       }
         const handleSubmit = async(e) => {
        e.preventDefault();
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error("Please enter a valid email address.");
          return;
        }
        setLoading(true);
        try {
          setLoading(true);
          const res= await axios.post(`http://localhost:3000/api/users/login`,formData,{
            headers:{
              "Content-type":"application/json"
            }
          })
          if(res.data.success){
            navigate('/')
            localStorage.setItem('accessToken', res.data.accessToken);
            dispatch(setUser(res.data.user))
            toast.success(res.data.message)

          }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "An error occurred during login. Please try again.");
        } finally {
          setLoading(false);
        }
         }    
  return (
    <div className='flex justify-center items-center min-h-screen bg-pink-100'>
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>

      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              
            </div>
            <div className='grid gap-2'></div>
            <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email} onChange={handleChange}
              />
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Enter your Password</Label>
              </div>
              <div className="relative">
             <Input id="password" type={showPassword ? 'text' : "password"} name="password" placeholder="create password"  required value={formData.password} onChange={handleChange} />
             {showPassword ? <EyeOff className='w-5 h-5 text-gray-700 absolute right-5 bottom-2' onClick={()=>setShowPassword(false)} /> : <Eye className='w-5 h-5 text-gray-700 absolute right-5 bottom-2' onClick={()=>setShowPassword(true)} />}

              </div>
            </div>
            
          </div>
        
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleSubmit} className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin m-2"/></>  : "Login"}
        </Button>
                  <p className="text-gray-700 text-sm">Don't have an account? <Link to={"/signup"} className='hover:underline cursor-pointer text-pink-800'>Sign Up</Link></p>

      </CardFooter>
    </Card>
    </div>
  )
}

export default Login