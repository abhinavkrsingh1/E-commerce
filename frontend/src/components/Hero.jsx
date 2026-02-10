import React from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Zap } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 py-20 md:py-28">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-300 rounded-full opacity-20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 font-semibold text-sm px-4 py-1.5 rounded-full w-fit">
              <Zap className="w-4 h-4" /> Trending Now
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Latest Electronics at{' '}
              <span className="text-pink-600">Best Prices</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Discover cutting-edge technology and unbeatable deals on smartphones, laptops, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button className="bg-pink-600 text-white hover:bg-pink-700 px-8 py-3 text-base rounded-full shadow-lg shadow-pink-200 transition-all hover:scale-105 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Shop Now
              </Button>
              <Button variant="outline" className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3 text-base rounded-full bg-transparent transition-all hover:scale-105">
                View Deals
              </Button>
            </div>
            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">✓ Free Shipping</span>
              <span className="flex items-center gap-1">✓ Easy Returns</span>
              <span className="flex items-center gap-1">✓ Secure Payment</span>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-pink-200 rounded-full opacity-40 blur-2xl" />
            <img  width={400}
              height={500}
              src="/iphone1.jpg"
              alt="iPhone"
             
              className="relative max-h-[400px] w-auto rounded-2xl drop-shadow-2xl object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero