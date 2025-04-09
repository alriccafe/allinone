import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Campaigns from "@/pages/campaigns";
import Contacts from "@/pages/contacts";
import Templates from "@/pages/templates";
import EmailBuilder from "@/pages/email-builder";
import Services from "@/pages/services";
import AboutUs from "@/pages/about-us";
import { useEffect } from "react";

function Router() {
  // Set page title
  useEffect(() => {
    document.title = "AllInOne - Complete Marketing Platform";
  }, []);

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/templates" component={Templates} />
      <Route path="/email-builder" component={EmailBuilder} />
      <Route path="/services" component={Services} />
      <Route path="/about-us" component={AboutUs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
