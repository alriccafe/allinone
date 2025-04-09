import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Link } from "wouter";

export default function Dashboard() {
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
          <div className="px-4 py-6 md:px-6 lg:px-8">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Welcome to AllInOne Marketing</h1>
              <p className="text-slate-500 mt-1">Simplify your marketing with our streamlined platform.</p>
            </div>
            
            {/* Main Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Email Campaigns */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-md bg-sky-100 flex items-center justify-center mr-4">
                    <i className="material-icons text-sky-600 text-2xl">email</i>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">Email Campaigns</h2>
                </div>
                <p className="text-slate-600 mb-4">Create and send email campaigns to your audience.</p>
                <button 
                  onClick={() => window.location.href = "/campaigns"}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  View Campaigns
                  <i className="material-icons text-sm ml-1">arrow_forward</i>
                </button>
              </div>
              
              {/* Contacts */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center mr-4">
                    <i className="material-icons text-purple-600 text-2xl">people</i>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">Contacts</h2>
                </div>
                <p className="text-slate-600 mb-4">Manage your contact list and audience segments.</p>
                <button 
                  onClick={() => window.location.href = "/contacts"}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  View Contacts
                  <i className="material-icons text-sm ml-1">arrow_forward</i>
                </button>
              </div>
              
              {/* Templates */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-md bg-amber-100 flex items-center justify-center mr-4">
                    <i className="material-icons text-amber-600 text-2xl">view_quilt</i>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">Email Templates</h2>
                </div>
                <p className="text-slate-600 mb-4">Choose from our library of pre-designed email templates.</p>
                <button 
                  onClick={() => window.location.href = "/templates"}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  View Templates
                  <i className="material-icons text-sm ml-1">arrow_forward</i>
                </button>
              </div>
              
              {/* Services */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center mr-4">
                    <i className="material-icons text-primary-600 text-2xl">featured_play_list</i>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">Our Services</h2>
                </div>
                <p className="text-slate-600 mb-4">Learn about all the marketing services we offer.</p>
                <button 
                  onClick={() => window.location.href = "/services"}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  View Services
                  <i className="material-icons text-sm ml-1">arrow_forward</i>
                </button>
              </div>
            </div>
            
            {/* Quick Start */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-md p-6 text-white mb-8">
              <h2 className="text-xl font-bold mb-2">Quick Start Guide</h2>
              <p className="opacity-90 mb-4">Follow these steps to get started with AllInOne Marketing:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Add your contacts to build your audience</li>
                <li>Choose an email template that fits your brand</li>
                <li>Create your first email campaign</li>
                <li>Schedule and send your campaign</li>
              </ol>
              <button className="bg-white text-primary-700 px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                Create Your First Campaign
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
