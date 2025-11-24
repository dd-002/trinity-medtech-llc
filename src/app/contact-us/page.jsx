// pages/contact.jsx

'use client';

import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react'; // Using lucide-react for icons

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <div className="w-full mx-auto bg-white rounded-lg overflow-hidden md:flex py-10">
          
          {/* Left Contact Info Section (White Background) */}
          <div className="md:w-1/3 p-8 border-r border-gray-100 hidden md:block">
            <h2 className="text-xl font-semibold mb-8 text-gray-900">Trinity Medtech LLC</h2>
            
            <div className="space-y-8">
              {/* Chat to us */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Chat to us</h3>
                  <p className="text-sm text-gray-500">Our friendly team is here to help.</p>
                  <a href="mailto:sales@trinitymt.ae" className="text-sm text-blue-600 hover:text-blue-700 font-medium">sales@trinitymt.ae</a>
                </div>
              </div>

              {/* Visit us */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Visit us</h3>
                  <p className="text-sm text-gray-500 font-medium">Makateb Building Office no.114 Port Saeed, Dubai<br/>P.O Box:91984 Deira Dubai,UAE</p>
                </div>
              </div>

              {/* Call us */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Call us</h3>
                  <p className="text-sm text-gray-900 font-medium">+971 4 2692453 </p>
                  <p className="text-sm text-gray-900 font-medium">+971 4 2692452 </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section (Dark Blue Background) */}
          <div className="md:w-2/3 p-8 md:p-12 lg:p-20 bg-green-700 text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight">
              Tell us more about yourself and what you've got in mind.
            </h1>

            <form className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className="text-sm font-medium opacity-80">Your name</label>
                <input
                  type="text"
                  id="name"
                  placeholder=""
                  className="w-full mt-1 p-2 bg-transparent border-b border-white placeholder-white/50 focus:outline-none focus:border-white focus:ring-0"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="text-sm font-medium opacity-80">you@company.com</label>
                <input
                  type="email"
                  id="email"
                  placeholder=""
                  className="w-full mt-1 p-2 bg-transparent border-b border-white placeholder-white/50 focus:outline-none focus:border-white focus:ring-0"
                />
              </div>

              {/* Project Details Field */}
              <div className="relative">
                <label htmlFor="project" className="text-sm font-medium opacity-80">Tell us a little about the project...</label>
                <textarea
                  id="project"
                  rows="1"
                  placeholder=""
                  className="w-full mt-1 p-2 bg-transparent border-b border-white placeholder-white/50 focus:outline-none focus:border-white focus:ring-0 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-white text-green-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-150"
                >
                  Let's get started!
                </button>
              </div>
            </form>
            {/* You can add the client logos section here if needed for this view */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;