import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import Elements from "@/components/email-builder/elements";
import Canvas from "@/components/email-builder/canvas";
import Properties from "@/components/email-builder/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function EmailBuilder() {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateSubject, setTemplateSubject] = useState("");
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleDragStart = (elementType: string) => {
    const event = new DragEvent("dragstart");
    const dataTransfer = new DataTransfer();
    dataTransfer.setData("text/plain", elementType);
    
    Object.defineProperty(event, "dataTransfer", {
      value: dataTransfer,
    });
    
    document.dispatchEvent(event);
  };
  
  const handleElementSelect = (elementId: string | null) => {
    setSelectedElement(elementId);
  };
  
  const handleSave = () => {
    // Validate inputs
    if (!templateName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your template",
        variant: "destructive"
      });
      return;
    }
    
    if (!templateSubject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter a subject line for your template",
        variant: "destructive"
      });
      return;
    }
    
    // Mock saving the template
    toast({
      title: "Template saved",
      description: `Template "${templateName}" has been saved successfully.`
    });
    
    setIsSaveDialogOpen(false);
    
    // In a real implementation, we would save the template to the API
    // and then navigate to the templates page
    navigate("/templates");
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
            {/* Builder Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Email Builder</h1>
                <p className="text-slate-500 mt-1">Create and customize your email template</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">Preview</Button>
                <Button onClick={() => setIsSaveDialogOpen(true)}>Save Template</Button>
              </div>
            </div>
            
            {/* Builder Interface */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900">Email Builder</h2>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <i className="material-icons mr-1 text-slate-500">undo</i>
                    Undo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <i className="material-icons mr-1 text-slate-500">redo</i>
                    Redo
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <Elements onDragStart={handleDragStart} />
                  <Canvas selectedElement={selectedElement} onElementSelect={handleElementSelect} />
                  <Properties selectedElement={selectedElement} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Save Template Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>
              Enter a name and subject line for your email template.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Template Name</label>
              <Input 
                id="name" 
                placeholder="e.g., Monthly Newsletter" 
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Email Subject</label>
              <Input 
                id="subject" 
                placeholder="e.g., Your Monthly Newsletter from [Company]" 
                value={templateSubject}
                onChange={(e) => setTemplateSubject(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
