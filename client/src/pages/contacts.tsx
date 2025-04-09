import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Edit, Trash2, Mail, Phone, Building, Tag, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = insertContactSchema.extend({
  tags: z.string().optional() // Convert array to string for form handling
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contacts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      phone: "",
      isSubscribed: true,
      tags: ""
    }
  });
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['/api/contacts'],
  });
  
  const filteredContacts = contacts?.filter((contact: any) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      contact.email.toLowerCase().includes(query) ||
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      (contact.company && contact.company.toLowerCase().includes(query))
    );
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Convert tags from comma-separated string to array
      const tagsArray = data.tags ? data.tags.split(",").map(tag => tag.trim()) : [];
      const contactData = { ...data, tags: tagsArray };
      delete contactData.tags; // Remove the string version
      
      const response = await apiRequest("POST", "/api/contacts", {
        ...contactData,
        tags: tagsArray
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      toast({
        title: "Contact created",
        description: "The contact has been created successfully.",
      });
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to create contact",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const deleteContactMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      toast({
        title: "Contact deleted",
        description: "The contact has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      setContactToDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete contact",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    createContactMutation.mutate(data);
  };

  const confirmDelete = (id: number) => {
    setContactToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = () => {
    if (contactToDelete !== null) {
      deleteContactMutation.mutate(contactToDelete);
    }
  };

  const toggleSelectContact = (id: number) => {
    setSelectedContacts(prev => 
      prev.includes(id) 
        ? prev.filter(contactId => contactId !== id) 
        : [...prev, id]
    );
  };

  const selectAllContacts = () => {
    if (selectedContacts.length === filteredContacts?.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts?.map((c: any) => c.id) || []);
    }
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
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
                <p className="text-slate-500 mt-1">Manage your contacts and segments</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  className="inline-flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button 
                  variant="outline" 
                  className="inline-flex items-center"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="inline-flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Contacts</TabsTrigger>
                  <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
                  <TabsTrigger value="unsubscribed">Unsubscribed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative max-w-md w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                      type="search" 
                      placeholder="Search contacts..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-500">
                    {selectedContacts.length > 0 ? (
                      <>
                        <span className="mr-2">{selectedContacts.length} selected</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 p-0"
                          onClick={() => setSelectedContacts([])}
                        >
                          Clear
                        </Button>
                      </>
                    ) : (
                      <span>{filteredContacts?.length || 0} contacts</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <Checkbox 
                            checked={selectedContacts.length > 0 && selectedContacts.length === filteredContacts?.length}
                            onCheckedChange={selectAllContacts}
                          />
                        </th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Company</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Tags</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {isLoading ? (
                        Array(5).fill(0).map((_, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-4" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                            <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-4 py-3 text-right"><Skeleton className="h-4 w-16 ml-auto" /></td>
                          </tr>
                        ))
                      ) : filteredContacts?.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                            No contacts found. {searchQuery && 'Try adjusting your search.'}
                          </td>
                        </tr>
                      ) : (
                        filteredContacts?.map((contact: any) => (
                          <tr key={contact.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3">
                              <Checkbox 
                                checked={selectedContacts.includes(contact.id)}
                                onCheckedChange={() => toggleSelectContact(contact.id)}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium text-slate-900">{contact.firstName} {contact.lastName}</div>
                              {contact.phone && (
                                <div className="text-xs text-slate-500 flex items-center mt-1">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {contact.phone}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1 text-slate-400" />
                                <span>{contact.email}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {contact.company ? (
                                <div className="flex items-center">
                                  <Building className="h-3 w-3 mr-1 text-slate-400" />
                                  <span>{contact.company}</span>
                                </div>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant={contact.isSubscribed ? "default" : "outline"}>
                                {contact.isSubscribed ? "Subscribed" : "Unsubscribed"}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {contact.tags && contact.tags.length > 0 ? (
                                  contact.tags.map((tag: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="bg-slate-100">
                                      {tag}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => confirmDelete(contact.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Create Contact Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Comma separated tags" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isSubscribed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Subscribed</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createContactMutation.isPending}>
                  {createContactMutation.isPending ? "Creating..." : "Create Contact"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500">
            Are you sure you want to delete this contact? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={executeDelete}
              disabled={deleteContactMutation.isPending}
            >
              {deleteContactMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
