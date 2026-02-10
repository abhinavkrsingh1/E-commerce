import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Profile = () => {
  

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150')
  const now = new Date().toISOString().split('T')[0] 


  

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='pt-20 min-h-screen bg-gray-100 flex items-center justify-center px-4 pb-10'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className='grid w-full grid-cols-2 mb-8'>
            <TabsTrigger value="profile" className='text-base font-medium'>Profile</TabsTrigger>
            <TabsTrigger value="orders" className='text-base font-medium'>Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className='space-y-8'>
            {/* Header */}
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-gray-900 mb-8'>Update Profile</h2>
            </div>

            {/* Profile Picture Section */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-200 flex items-center justify-center'>
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className='w-full h-full object-cover'
                />
              </div>
              <label htmlFor="image-upload" className='cursor-pointer'>
                <Button 
                  className='bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full'
                  asChild
                >
                  <span>Change Picture</span>
                </Button>
                <input 
                  id="image-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className='hidden'
                />
              </label>
            </div>
          </TabsContent>

          <TabsContent value="orders" className='space-y-8'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-900'>Your Orders</h2>
            </div>
            
            <div className='space-y-4'>
              <div className='border border-gray-300 rounded-lg p-4'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold text-gray-900'>Order #12345</p>
                    <p className='text-sm text-gray-600'>{now}</p>
                  </div>
                  <span className='text-green-600 font-semibold'>Delivered</span>
                </div>
              </div>
              
              <div className='border border-gray-300 rounded-lg p-4'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold text-gray-900'>Order #12346</p>
                    <p className='text-sm text-gray-600'>Feb 8, 2026</p>
                  </div>
                  <span className='text-orange-600 font-semibold'>Processing</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile