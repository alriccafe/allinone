import { useState } from "react";
import { Link } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Services() {
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
          <div className="container px-4 py-6 md:px-6 lg:px-8 mx-auto max-w-7xl">
            {/* Services Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Marketing Services</h1>
              <p className="text-slate-500 max-w-2xl mx-auto">
                AllInOne provides essential marketing tools to help you grow your business and 
                connect with your audience.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              <ServiceCard 
                title="Email Campaigns" 
                description="Create and send email campaigns to your audience with our easy-to-use platform."
                icon="campaign"
                href="/campaigns"
              />
              <ServiceCard 
                title="Contact Management" 
                description="Organize and manage your subscriber lists with simple contact profiles."
                icon="people"
                href="/contacts"
              />
              <ServiceCard 
                title="Email Templates" 
                description="Access our library of pre-designed email templates for various purposes."
                icon="view_quilt"
                href="/templates"
              />
              <ServiceCard 
                title="Performance Tracking" 
                description="Monitor the success of your campaigns with basic analytics."
                icon="analytics"
                href="/campaigns"
              />
              <ServiceCard 
                title="Responsive Design" 
                description="All emails are automatically optimized for desktop, tablet, and mobile viewing."
                icon="devices"
                href="/templates"
              />
              <ServiceCard 
                title="Easy Scheduling" 
                description="Schedule your campaigns to send at the perfect time for your audience."
                icon="schedule"
                href="/campaigns"
              />
            </div>
            
            <div className="bg-slate-50 rounded-lg p-8 mt-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to start marketing?</h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                AllInOne offers the essential tools you need to create and manage your marketing campaigns.
                Start connecting with your audience today.
              </p>
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center mb-2">
          <div className="h-8 w-8 rounded-md bg-primary-100 text-primary-700 flex items-center justify-center mr-3">
            <i className="material-icons">{icon}</i>
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-slate-600 mb-4">{description}</CardDescription>
        <Button variant="link" className="p-0 h-auto" asChild>
          <Link href={href}>
            <div className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer flex items-center">
              Learn more
              <i className="material-icons text-sm ml-1">arrow_forward</i>
            </div>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}