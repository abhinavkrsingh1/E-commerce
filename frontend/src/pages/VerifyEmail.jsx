import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying...");
    const navigate=useNavigate();
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(`http://localhost:3000/api/users/verify`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.success) {
                    setStatus("✅ Email verified successfully! You can now log in.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
                setStatus("❌ Verification failed. Please try again.");
            }
        };
        verifyEmail();
    }, [token, navigate])



  return (
    <div className='relative w-full bg-pink-100 overflow-hidden'>
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
                <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
        </div>
    </div>
    </div>
  )
}

export default VerifyEmail