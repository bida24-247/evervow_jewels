import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Timeless Elegance, Crafted for You</h1>
            <p className="text-lg mb-8">Discover our exquisite collection of handcrafted jewelry that tells your unique story.</p>
            <Link href="/shop">
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md transition-colors inline-block">Shop Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-gray-800 mb-4">Explore EverVow Jewels</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Navigate through our website to discover everything we offer.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/shop">
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <i className="fas fa-shopping-bag text-4xl text-amber-700 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Shop Collections</h3>
                <p className="text-gray-600">Browse our complete jewelry collection</p>
              </div>
            </Link>
            
            <Link href="/about">
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <i className="fas fa-gem text-4xl text-amber-700 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Heritage</h3>
                <p className="text-gray-600">Learn about our craftsmanship story</p>
              </div>
            </Link>
            
            <Link href="/testimonials">
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <i className="fas fa-star text-4xl text-amber-700 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Testimonials</h3>
                <p className="text-gray-600">Read customer experiences</p>
              </div>
            </Link>
            
            <Link href="/contact">
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <i className="fas fa-envelope text-4xl text-amber-700 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h3>
                <p className="text-gray-600">Get in touch with our team</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
