import { useState } from "react";
import { Link } from "wouter";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center md:hidden">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
              <i className="material-icons text-white text-lg">all_inclusive</i>
            </div>
            <h1 className="text-lg font-bold">AllInOne</h1>
          </div>
        </div>
        
        <div className="flex-1 px-4 md:ml-0">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="material-icons text-slate-400 text-lg">search</i>
            </div>
            <input 
              type="search" 
              placeholder="Search campaigns, contacts, templates..." 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-slate-500 hover:text-slate-700">
            <i className="material-icons">help_outline</i>
          </button>
          <button className="text-slate-500 hover:text-slate-700 relative">
            <i className="material-icons">notifications</i>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="md:hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" 
              alt="Profile" 
              className="h-8 w-8 rounded-full" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
