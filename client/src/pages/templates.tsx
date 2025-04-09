import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Edit, Copy, Trash2, Eye } from "lucide-react";
import { Template } from "@shared/schema";

interface TemplateCardProps {
  template: Template;
}

function TemplateCard({ template }: TemplateCardProps) {
  const thumbnailUrl = template.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Preview";

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full relative group">
        <img 
          src={thumbnailUrl} 
          alt={template.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
          <Link href={`/email-builder?template=${template.id}`}>
            <Button size="sm" variant="outline" className="bg-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="bg-white">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-slate-900">{template.name}</h3>
            <p className="text-sm text-slate-500">
              {new Date(template.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost">
              <Copy className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Templates() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: templates, isLoading } = useQuery({
    queryKey: ['/api/templates'],
  });
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const filteredTemplates = templates?.filter((template: Template) => {
    if (!searchQuery) return true;
    return template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           template.subject.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
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
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Email Templates</h1>
                <p className="text-slate-500 mt-1">Manage your email templates for campaigns</p>
              </div>
              
              <Link href="/email-builder">
                <Button className="inline-flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    type="search" 
                    placeholder="Search templates..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="custom" className="flex-1">Custom</TabsTrigger>
                    <TabsTrigger value="system" className="flex-1">System</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex space-x-1">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTemplates?.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No templates found</h3>
                <p className="text-slate-500 mb-6">
                  {searchQuery 
                    ? "Try adjusting your search query." 
                    : "You haven't created any templates yet."}
                </p>
                <Link href="/email-builder">
                  <Button>Create your first template</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates?.map((template: Template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
