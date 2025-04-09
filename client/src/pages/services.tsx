import { useState } from "react";
import { Link, useLocation } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                AllInOne provides a comprehensive suite of marketing tools to help you grow your business, 
                connect with your audience, and increase conversions.
              </p>
            </div>
            
            <Tabs defaultValue="email" className="mb-12">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="email">Email Marketing</TabsTrigger>
                <TabsTrigger value="content">Content Creation</TabsTrigger>
                <TabsTrigger value="audience">Audience Management</TabsTrigger>
                <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <ServiceCard 
                    title="Campaign Management" 
                    description="Create, schedule and manage email campaigns with ease. Track performance metrics in real-time."
                    icon="campaign"
                    href="/campaigns"
                  />
                  <ServiceCard 
                    title="Email Builder" 
                    description="Drag-and-drop editor to create beautiful, responsive emails without coding knowledge."
                    icon="design_services"
                    href="/email-builder"
                  />
                  <ServiceCard 
                    title="Automation Workflows" 
                    description="Build automated email sequences triggered by subscriber actions and behaviors."
                    icon="auto_awesome"
                    href="/automations"
                  />
                  <ServiceCard 
                    title="A/B Testing" 
                    description="Test different email versions to optimize open rates, click-through rates, and conversions."
                    icon="science"
                    href="/ab-testing"
                  />
                  <ServiceCard 
                    title="Template Gallery" 
                    description="Access a library of pre-designed email templates for various industries and purposes."
                    icon="view_quilt"
                    href="/templates"
                  />
                  <ServiceCard 
                    title="Scheduling & Delivery" 
                    description="Schedule campaigns for optimal send times and manage email delivery for best performance."
                    icon="schedule"
                    href="/campaigns?filter=scheduled"
                  />
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <ServiceCard 
                    title="Content Library" 
                    description="Store and organize your marketing content in one centralized location."
                    icon="storage"
                    href="/templates"
                  />
                  <ServiceCard 
                    title="Rich Media Support" 
                    description="Include images, videos, GIFs, and interactive elements in your marketing materials."
                    icon="perm_media"
                    href="/email-builder"
                  />
                  <ServiceCard 
                    title="Social Media Integration" 
                    description="Coordinate email campaigns with social media content for consistent messaging."
                    icon="share"
                    href="/integrations"
                  />
                  <ServiceCard 
                    title="Landing Page Creator" 
                    description="Build campaign-specific landing pages that match your email designs."
                    icon="web"
                    href="/landing-pages"
                  />
                  <ServiceCard 
                    title="Content Personalization" 
                    description="Create dynamic content that adapts based on subscriber data and behavior."
                    icon="person_pin"
                    href="/email-builder"
                  />
                  <ServiceCard 
                    title="Content Calendar" 
                    description="Plan and visualize your content strategy across multiple channels."
                    icon="calendar_month"
                    href="/content-calendar"
                  />
                </div>
              </TabsContent>

              <TabsContent value="audience" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <ServiceCard 
                    title="Contact Management" 
                    description="Organize and manage your subscriber lists with detailed contact profiles."
                    icon="people"
                    href="/contacts"
                  />
                  <ServiceCard 
                    title="Segmentation" 
                    description="Create targeted audience segments based on demographics, behavior, and engagement."
                    icon="segment"
                    href="/segments"
                  />
                  <ServiceCard 
                    title="List Growth Tools" 
                    description="Grow your email list with customizable signup forms, popups, and landing pages."
                    icon="trending_up"
                    href="/list-growth"
                  />
                  <ServiceCard 
                    title="Data Import/Export" 
                    description="Easily import contacts from other platforms or export your data when needed."
                    icon="file_upload"
                    href="/import"
                  />
                  <ServiceCard 
                    title="Subscriber Profiles" 
                    description="View detailed subscriber profiles with engagement history and preferences."
                    icon="person_search"
                    href="/contacts"
                  />
                  <ServiceCard 
                    title="Compliance Tools" 
                    description="Stay compliant with GDPR, CAN-SPAM, and other email regulations."
                    icon="verified_user"
                    href="/compliance"
                  />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <ServiceCard 
                    title="Campaign Analytics" 
                    description="Track opens, clicks, conversions, and other key performance metrics."
                    icon="analytics"
                    href="/reports"
                  />
                  <ServiceCard 
                    title="Custom Reports" 
                    description="Build and save custom reports to track the metrics that matter most to your business."
                    icon="summarize"
                    href="/reports"
                  />
                  <ServiceCard 
                    title="Engagement Tracking" 
                    description="Monitor how subscribers interact with your emails over time."
                    icon="touch_app"
                    href="/reports"
                  />
                  <ServiceCard 
                    title="ROI Measurement" 
                    description="Calculate the return on investment for your email marketing campaigns."
                    icon="monetization_on"
                    href="/reports"
                  />
                  <ServiceCard 
                    title="Heatmap Analysis" 
                    description="Visualize where subscribers click in your emails with click heatmaps."
                    icon="whatshot"
                    href="/reports"
                  />
                  <ServiceCard 
                    title="Deliverability Monitoring" 
                    description="Track and improve your email deliverability rate across different email clients."
                    icon="mark_email_read"
                    href="/deliverability"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="bg-slate-50 rounded-lg p-8 mt-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to elevate your marketing?</h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                AllInOne offers everything you need to create, manage, and optimize your marketing campaigns.
                Start growing your audience and driving conversions today.
              </p>
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                Get Started Today
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