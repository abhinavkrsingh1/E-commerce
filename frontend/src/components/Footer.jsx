import React from 'react'
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">🛒</span>
              </div>
              <h2 className="text-2xl font-bold text-pink-400">KART</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Powering Your World with the Best in Electronics.
            </p>
            <div className="space-y-1 text-sm text-gray-400">
              <p>123 Electronics St, Style City, NY 10001</p>
              <p>Email: support@zaptro.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay in the Loop</h3>
            <p className="text-sm text-gray-300">
              Subscribe to get special offers, free giveaways, and more
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white border-gray-600 text-black placeholder-gray-400 focus:border-pink-400"
              />
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-400">
            © 2025 <span className="text-pink-400">KART</span>. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer