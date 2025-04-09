import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button 
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <i className="material-icons">menu</i>
        </button>
      </div>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="container px-4 py-6 md:px-6 lg:px-8 mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">About AllInOne</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We help businesses grow through powerful, easy-to-use marketing tools
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h2>
                <p className="text-slate-600 mb-4">
                  At AllInOne, we believe that effective marketing shouldn't be complicated or expensive. Our mission is to provide businesses of all sizes with powerful, intuitive marketing tools that help them reach their audience, build meaningful relationships, and drive growth.
                </p>
                <p className="text-slate-600">
                  We're passionate about helping businesses succeed by making professional-grade marketing accessible to everyone, regardless of technical expertise or budget constraints.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-500/10 to-blue-500/10 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-20 w-20 mx-auto rounded-full bg-primary-600 flex items-center justify-center mb-4">
                    <i className="material-icons text-white text-4xl">all_inclusive</i>
                  </div>
                  <h3 className="text-xl font-bold text-primary-700">AllInOne Marketing</h3>
                  <p className="text-slate-600 mt-2">Established 2023</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-10" />
            
            <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">Meet Our Founder</h2>
            <Card className="mb-12 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-primary-500/20 to-blue-500/20 p-6 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border-4 border-white">
                    <i className="material-icons text-slate-300 text-7xl">person</i>
                  </div>
                </div>
                <CardContent className="md:w-2/3 p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Lakshmi Vijay</h3>
                  <p className="text-primary-600 font-medium mb-4">Co-Founder & CEO</p>
                  
                  <p className="text-slate-600 mb-6">
                    With over 10 years of experience in digital marketing and software development, Lakshmi founded AllInOne with a vision to democratize marketing technology for businesses worldwide.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 mb-1">Email</h4>
                      <p className="text-slate-800">lakshmivijayristo@gmail.com</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 mb-1">Phone</h4>
                      <p className="text-slate-800">+61 489 048 487</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 mb-1">Location</h4>
                      <p className="text-slate-800">NSW, Australia</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <i className="material-icons text-sm mr-1">email</i>
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <i className="material-icons text-sm mr-1">share</i>
                      Share
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
            
            <Separator className="my-10" />
            
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Get in Touch</h2>
              <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                Have questions about our services or want to learn more about how AllInOne can help your business? We'd love to hear from you!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Card className="p-6 text-center w-full max-w-xs">
                  <div className="h-12 w-12 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <i className="material-icons text-primary-600">email</i>
                  </div>
                  <h3 className="font-medium text-slate-900 mb-1">Email Us</h3>
                  <p className="text-slate-600 text-sm mb-3">For general inquiries and support</p>
                  <p className="text-primary-600 font-medium">lakshmivijayristo@gmail.com</p>
                </Card>
                
                <Card className="p-6 text-center w-full max-w-xs">
                  <div className="h-12 w-12 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <i className="material-icons text-primary-600">phone</i>
                  </div>
                  <h3 className="font-medium text-slate-900 mb-1">Call Us</h3>
                  <p className="text-slate-600 text-sm mb-3">Mon-Fri, 9am-5pm AEST</p>
                  <p className="text-primary-600 font-medium">+61 489 048 487</p>
                </Card>
                
                <Card className="p-6 text-center w-full max-w-xs">
                  <div className="h-12 w-12 mx-auto rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <i className="material-icons text-primary-600">location_on</i>
                  </div>
                  <h3 className="font-medium text-slate-900 mb-1">Visit Us</h3>
                  <p className="text-slate-600 text-sm mb-3">Our main office location</p>
                  <p className="text-primary-600 font-medium">NSW, Australia</p>
                </Card>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-lg p-8 text-center mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Join our team</h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our mission of empowering businesses through marketing.
              </p>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                View Career Opportunities
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}