import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertCampaignSchema, insertTemplateSchema, insertSegmentSchema, insertAutomationSchema, insertCampaignStatsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - prefix all routes with /api
  
  // Contacts API
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  
  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contact = await storage.getContact(id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact" });
    }
  });
  
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const existingContact = await storage.getContactByEmail(validatedData.email);
      
      if (existingContact) {
        return res.status(409).json({ message: "Contact with this email already exists" });
      }
      
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });
  
  app.put("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertContactSchema.partial().parse(req.body);
      
      const updatedContact = await storage.updateContact(id, validatedData);
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      
      res.json(updatedContact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update contact" });
    }
  });
  
  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContact(id);
      
      if (!success) {
        return res.status(404).json({ message: "Contact not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact" });
    }
  });
  
  app.get("/api/contacts/search/:term", async (req, res) => {
    try {
      const term = req.params.term;
      const contacts = await storage.searchContacts(term);
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to search contacts" });
    }
  });

  // Segments API
  app.get("/api/segments", async (req, res) => {
    try {
      const segments = await storage.getSegments();
      res.json(segments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch segments" });
    }
  });
  
  app.get("/api/segments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const segment = await storage.getSegment(id);
      
      if (!segment) {
        return res.status(404).json({ message: "Segment not found" });
      }
      
      res.json(segment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch segment" });
    }
  });
  
  app.post("/api/segments", async (req, res) => {
    try {
      const validatedData = insertSegmentSchema.parse(req.body);
      const segment = await storage.createSegment(validatedData);
      res.status(201).json(segment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid segment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create segment" });
    }
  });
  
  app.put("/api/segments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSegmentSchema.partial().parse(req.body);
      
      const updatedSegment = await storage.updateSegment(id, validatedData);
      if (!updatedSegment) {
        return res.status(404).json({ message: "Segment not found" });
      }
      
      res.json(updatedSegment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid segment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update segment" });
    }
  });
  
  app.delete("/api/segments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSegment(id);
      
      if (!success) {
        return res.status(404).json({ message: "Segment not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete segment" });
    }
  });

  // Templates API
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });
  
  app.get("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getTemplate(id);
      
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });
  
  app.post("/api/templates", async (req, res) => {
    try {
      const validatedData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(validatedData);
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create template" });
    }
  });
  
  app.put("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertTemplateSchema.partial().parse(req.body);
      
      const updatedTemplate = await storage.updateTemplate(id, validatedData);
      if (!updatedTemplate) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(updatedTemplate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update template" });
    }
  });
  
  app.delete("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTemplate(id);
      
      if (!success) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  // Campaigns API
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });
  
  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const campaign = await storage.getCampaign(id);
      
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });
  
  app.post("/api/campaigns", async (req, res) => {
    try {
      const validatedData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(validatedData);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid campaign data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });
  
  app.put("/api/campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertCampaignSchema.partial().parse(req.body);
      
      const updatedCampaign = await storage.updateCampaign(id, validatedData);
      if (!updatedCampaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      res.json(updatedCampaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid campaign data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });
  
  app.delete("/api/campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCampaign(id);
      
      if (!success) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });

  // Campaign Stats API
  app.get("/api/campaigns/:campaignId/stats", async (req, res) => {
    try {
      const campaignId = parseInt(req.params.campaignId);
      const stats = await storage.getCampaignStats(campaignId);
      
      if (!stats) {
        return res.status(404).json({ message: "Campaign stats not found" });
      }
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaign stats" });
    }
  });
  
  app.post("/api/campaigns/:campaignId/stats", async (req, res) => {
    try {
      const campaignId = parseInt(req.params.campaignId);
      
      // Make sure campaignId in URL matches body
      const validatedData = insertCampaignStatsSchema.parse({
        ...req.body,
        campaignId
      });
      
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      const existingStats = await storage.getCampaignStats(campaignId);
      if (existingStats) {
        return res.status(409).json({ message: "Stats for this campaign already exist" });
      }
      
      const stats = await storage.createCampaignStats(validatedData);
      res.status(201).json(stats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid stats data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create campaign stats" });
    }
  });
  
  app.put("/api/campaigns/:campaignId/stats", async (req, res) => {
    try {
      const campaignId = parseInt(req.params.campaignId);
      const validatedData = insertCampaignStatsSchema.partial().parse(req.body);
      
      const updatedStats = await storage.updateCampaignStats(campaignId, validatedData);
      if (!updatedStats) {
        return res.status(404).json({ message: "Campaign stats not found" });
      }
      
      res.json(updatedStats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid stats data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update campaign stats" });
    }
  });

  // Automations API
  app.get("/api/automations", async (req, res) => {
    try {
      const automations = await storage.getAutomations();
      res.json(automations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch automations" });
    }
  });
  
  app.get("/api/automations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const automation = await storage.getAutomation(id);
      
      if (!automation) {
        return res.status(404).json({ message: "Automation not found" });
      }
      
      res.json(automation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch automation" });
    }
  });
  
  app.post("/api/automations", async (req, res) => {
    try {
      const validatedData = insertAutomationSchema.parse(req.body);
      const automation = await storage.createAutomation(validatedData);
      res.status(201).json(automation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid automation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create automation" });
    }
  });
  
  app.put("/api/automations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAutomationSchema.partial().parse(req.body);
      
      const updatedAutomation = await storage.updateAutomation(id, validatedData);
      if (!updatedAutomation) {
        return res.status(404).json({ message: "Automation not found" });
      }
      
      res.json(updatedAutomation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid automation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update automation" });
    }
  });
  
  app.delete("/api/automations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAutomation(id);
      
      if (!success) {
        return res.status(404).json({ message: "Automation not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete automation" });
    }
  });

  // Dashboard Summary API
  app.get("/api/dashboard/summary", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      const contacts = await storage.getContacts();
      
      // Calculate open and click rates from campaign stats
      let totalSent = 0;
      let totalOpened = 0;
      let totalClicked = 0;
      
      for (const campaign of campaigns) {
        const stats = await storage.getCampaignStats(campaign.id);
        if (stats) {
          totalSent += stats.sentCount;
          totalOpened += stats.openCount;
          totalClicked += stats.clickCount;
        }
      }
      
      const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
      const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;
      
      res.json({
        totalContacts: contacts.length,
        totalCampaigns: campaigns.length,
        totalSent,
        openRate: openRate.toFixed(1),
        clickRate: clickRate.toFixed(1),
        recentCampaigns: campaigns
          .sort((a, b) => {
            // Sort by scheduled date or created date
            const dateA = a.scheduledAt || a.createdAt;
            const dateB = b.scheduledAt || b.createdAt;
            return new Date(dateB).getTime() - new Date(dateA).getTime();
          })
          .slice(0, 5)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard summary" });
    }
  });

  // Create HttpServer
  const httpServer = createServer(app);
  return httpServer;
}
