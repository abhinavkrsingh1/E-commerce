import React, { useState } from 'react'
    import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
    import { Button } from '@/components/ui/button'
    import { Input } from '@/components/ui/input'
    import { Label } from '@/components/ui/label'
// import { useParams } from 'react-router-dom'

  

    const Profile = () => {
      // const params = useParams();
      // const userId = params.userId;
      const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        city:'',
        zipCode:'',
        address:'',
        phoneNo:''

      })
      const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prev)=>{
          return {
            ...prev,
            [name]:value
          }
        })
      }
      // const res = axios.post('http://localhost:3000/api/users/update',{setFormData},
      //   headers:{ "Content-type":"application/json",
      //    `Bearer ${token}`}
      // )
      const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150')
      const now = new Date().toISOString().split('T')[0]

      const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => setProfileImage(event.target.result)
          reader.readAsDataURL(file)
        }
      }

      return (
        <div className="pt-20 min-h-screen bg-gray-100 flex items-center justify-center px-4 pb-10">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile" className="text-base font-medium">Profile</TabsTrigger>
                <TabsTrigger value="orders" className="text-base font-medium">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Update Profile</h2>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-200 flex items-center justify-center">
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full">
                        <span>Change Picture</span>
                      </Button>
                    </Label>
                    <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </div>

                  <form className="w-full mt-4 space-y-4" action="#" method="post">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-700"  on>First Name</Label>
                        <Input  required placeholder="John" className="mt-1" name='firstName' value={formData.firstName} onChange={handleChange} />
                      </div>

                      <div>
                        <Label className="block text-sm font-medium text-gray-700">Last Name</Label>
                        <Input name="lastName" required placeholder="Doe" className="mt-1" value={formData.lastName} onChange={handleChange} />
                      </div>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-700">Email</Label>
                      <Input name="email" type="email" required placeholder="you@example.com" className="mt-1 bg-gray-50" value={formData.email} onChange={handleChange} />
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-700">Phone Number</Label>
                      <Input name="phone" required placeholder="Enter your Contact No" className="mt-1" value={formData.phone} onChange={handleChange} />
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-700">Address</Label>
                      <Input name="address" required placeholder="Enter your Address" className="mt-1" value={formData.address} onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-700">City</Label>
                        <Input name="city" required placeholder="Enter your City" className="mt-1" value={formData.city} onChange={handleChange} />
                      </div>

                      <div>
                        <Label className="block text-sm font-medium text-gray-700">Zip Code</Label>
                        <Input name="zip" required placeholder="Enter your ZipCode" className="mt-1" value={formData.zip} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" className="w-full inline-flex justify-center items-center rounded-md bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 font-medium">Update Profile</Button>
                    </div>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Your Orders</h2>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Order #12345</p>
                        <p className="text-sm text-gray-600">{now}</p>
                      </div>
                      <span className="text-green-600 font-semibold">Delivered</span>
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Order #12346</p>
                        <p className="text-sm text-gray-600">Feb 8, 2026</p>
                      </div>
                      <span className="text-orange-600 font-semibold">Processing</span>
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