import { campaigns, contacts, templates, segments, automations, campaignStats, type Contact, type InsertContact, type InsertCampaign, type Campaign, type InsertSegment, type Segment, type InsertTemplate, type Template, type InsertAutomation, type Automation, type InsertCampaignStats, type CampaignStats, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contacts management
  createContact(contact: InsertContact): Promise<Contact>;
  getContact(id: number): Promise<Contact | undefined>;
  getContactByEmail(email: string): Promise<Contact | undefined>;
  getContacts(): Promise<Contact[]>;
  updateContact(id: number, data: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<boolean>;
  searchContacts(searchTerm: string): Promise<Contact[]>;
  
  // Segments management
  createSegment(segment: InsertSegment): Promise<Segment>;
  getSegment(id: number): Promise<Segment | undefined>;
  getSegments(): Promise<Segment[]>;
  updateSegment(id: number, data: Partial<InsertSegment>): Promise<Segment | undefined>;
  deleteSegment(id: number): Promise<boolean>;
  
  // Templates management
  createTemplate(template: InsertTemplate): Promise<Template>;
  getTemplate(id: number): Promise<Template | undefined>;
  getTemplates(): Promise<Template[]>;
  updateTemplate(id: number, data: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: number): Promise<boolean>;
  
  // Campaigns management
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  getCampaigns(): Promise<Campaign[]>;
  updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;
  
  // Campaign Stats management
  createCampaignStats(stats: InsertCampaignStats): Promise<CampaignStats>;
  getCampaignStats(campaignId: number): Promise<CampaignStats | undefined>;
  updateCampaignStats(campaignId: number, data: Partial<InsertCampaignStats>): Promise<CampaignStats | undefined>;
  
  // Automations management
  createAutomation(automation: InsertAutomation): Promise<Automation>;
  getAutomation(id: number): Promise<Automation | undefined>;
  getAutomations(): Promise<Automation[]>;
  updateAutomation(id: number, data: Partial<InsertAutomation>): Promise<Automation | undefined>;
  deleteAutomation(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private segments: Map<number, Segment>;
  private templates: Map<number, Template>;
  private campaigns: Map<number, Campaign>;
  private campaignStats: Map<number, CampaignStats>;
  private automations: Map<number, Automation>;
  
  private userCurrentId: number;
  private contactCurrentId: number;
  private segmentCurrentId: number;
  private templateCurrentId: number;
  private campaignCurrentId: number;
  private campaignStatsCurrentId: number;
  private automationCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.segments = new Map();
    this.templates = new Map();
    this.campaigns = new Map();
    this.campaignStats = new Map();
    this.automations = new Map();
    
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.segmentCurrentId = 1;
    this.templateCurrentId = 1;
    this.campaignCurrentId = 1;
    this.campaignStatsCurrentId = 1;
    this.automationCurrentId = 1;
    
    // Initialize with demo data
    this.seedDemoData();
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contacts management
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async getContactByEmail(email: string): Promise<Contact | undefined> {
    return Array.from(this.contacts.values()).find(
      (contact) => contact.email === email,
    );
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async updateContact(id: number, data: Partial<InsertContact>): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;
    
    const updatedContact = { ...contact, ...data };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  async deleteContact(id: number): Promise<boolean> {
    return this.contacts.delete(id);
  }

  async searchContacts(searchTerm: string): Promise<Contact[]> {
    const term = searchTerm.toLowerCase();
    return Array.from(this.contacts.values()).filter(
      (contact) => 
        contact.email.toLowerCase().includes(term) ||
        contact.firstName.toLowerCase().includes(term) ||
        contact.lastName.toLowerCase().includes(term) ||
        (contact.company && contact.company.toLowerCase().includes(term))
    );
  }

  // Segments management
  async createSegment(insertSegment: InsertSegment): Promise<Segment> {
    const id = this.segmentCurrentId++;
    const segment: Segment = {
      ...insertSegment,
      id,
      createdAt: new Date(),
    };
    this.segments.set(id, segment);
    return segment;
  }

  async getSegment(id: number): Promise<Segment | undefined> {
    return this.segments.get(id);
  }

  async getSegments(): Promise<Segment[]> {
    return Array.from(this.segments.values());
  }

  async updateSegment(id: number, data: Partial<InsertSegment>): Promise<Segment | undefined> {
    const segment = this.segments.get(id);
    if (!segment) return undefined;
    
    const updatedSegment = { ...segment, ...data };
    this.segments.set(id, updatedSegment);
    return updatedSegment;
  }

  async deleteSegment(id: number): Promise<boolean> {
    return this.segments.delete(id);
  }

  // Templates management
  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.templateCurrentId++;
    const template: Template = {
      ...insertTemplate,
      id,
      createdAt: new Date(),
    };
    this.templates.set(id, template);
    return template;
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async updateTemplate(id: number, data: Partial<InsertTemplate>): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;
    
    const updatedTemplate = { ...template, ...data };
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<boolean> {
    return this.templates.delete(id);
  }

  // Campaigns management
  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.campaignCurrentId++;
    const campaign: Campaign = {
      ...insertCampaign,
      id,
      createdAt: new Date(),
      sentAt: null,
      totalRecipients: 0,
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = { ...campaign, ...data };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  // Campaign Stats management
  async createCampaignStats(insertStats: InsertCampaignStats): Promise<CampaignStats> {
    const id = this.campaignStatsCurrentId++;
    const stats: CampaignStats = {
      ...insertStats,
      id,
      lastUpdatedAt: new Date(),
    };
    this.campaignStats.set(id, stats);
    return stats;
  }

  async getCampaignStats(campaignId: number): Promise<CampaignStats | undefined> {
    return Array.from(this.campaignStats.values()).find(
      (stats) => stats.campaignId === campaignId
    );
  }

  async updateCampaignStats(campaignId: number, data: Partial<InsertCampaignStats>): Promise<CampaignStats | undefined> {
    const statsEntry = Array.from(this.campaignStats.values()).find(
      (stats) => stats.campaignId === campaignId
    );
    
    if (!statsEntry) return undefined;
    
    const updatedStats = {
      ...statsEntry,
      ...data,
      lastUpdatedAt: new Date(),
    };
    
    this.campaignStats.set(statsEntry.id, updatedStats);
    return updatedStats;
  }

  // Automations management
  async createAutomation(insertAutomation: InsertAutomation): Promise<Automation> {
    const id = this.automationCurrentId++;
    const automation: Automation = {
      ...insertAutomation,
      id,
      createdAt: new Date(),
    };
    this.automations.set(id, automation);
    return automation;
  }

  async getAutomation(id: number): Promise<Automation | undefined> {
    return this.automations.get(id);
  }

  async getAutomations(): Promise<Automation[]> {
    return Array.from(this.automations.values());
  }

  async updateAutomation(id: number, data: Partial<InsertAutomation>): Promise<Automation | undefined> {
    const automation = this.automations.get(id);
    if (!automation) return undefined;
    
    const updatedAutomation = { ...automation, ...data };
    this.automations.set(id, updatedAutomation);
    return updatedAutomation;
  }

  async deleteAutomation(id: number): Promise<boolean> {
    return this.automations.delete(id);
  }

  // Demo data for initial application state
  private seedDemoData() {
    // Add demo user
    this.createUser({
      username: "john",
      password: "password123",
      email: "john@example.com",
      fullName: "John Smith"
    });

    // Add demo contacts
    for (let i = 1; i <= 20; i++) {
      this.createContact({
        email: `contact${i}@example.com`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        company: `Company ${i}`,
        phone: `555-000-${1000 + i}`,
        isSubscribed: true,
        tags: ["tag1", "tag2"]
      });
    }

    // Add demo segments
    this.createSegment({
      name: "Active Subscribers",
      description: "All currently active subscribers",
      criteria: { isSubscribed: true }
    });
    
    this.createSegment({
      name: "New Contacts",
      description: "Recently added contacts",
      criteria: { dateAdded: "last30days" }
    });

    // Add demo templates
    this.createTemplate({
      name: "Newsletter Template",
      subject: "Monthly Newsletter",
      content: {
        blocks: [
          { type: "header", content: "Monthly Newsletter" },
          { type: "text", content: "Here's what's new this month." },
          { type: "image", content: "https://via.placeholder.com/600x200" },
          { type: "button", content: "Read More", url: "#" }
        ]
      },
      thumbnailUrl: "https://via.placeholder.com/100x100"
    });
    
    this.createTemplate({
      name: "Welcome Email",
      subject: "Welcome to Our Service",
      content: {
        blocks: [
          { type: "header", content: "Welcome!" },
          { type: "text", content: "Thank you for joining our platform." },
          { type: "button", content: "Get Started", url: "#" }
        ]
      },
      thumbnailUrl: "https://via.placeholder.com/100x100"
    });

    // Add demo campaigns
    const campaign1 = this.createCampaign({
      name: "May Newsletter",
      subject: "May Newsletter - Latest Updates",
      fromName: "Marketing Team",
      fromEmail: "marketing@example.com",
      status: "sent",
      templateId: 1,
      segmentId: 1,
      scheduledAt: new Date("2023-05-15T10:00:00")
    });
    
    const campaign2 = this.createCampaign({
      name: "Special Promotion",
      subject: "Special Offer Just For You",
      fromName: "Sales Team",
      fromEmail: "sales@example.com",
      status: "sent",
      templateId: 1,
      segmentId: 1,
      scheduledAt: new Date("2023-05-08T10:00:00")
    });
    
    const campaign3 = this.createCampaign({
      name: "Product Update",
      subject: "New Features Available Now",
      fromName: "Product Team",
      fromEmail: "product@example.com",
      status: "sent",
      templateId: 1,
      segmentId: 1,
      scheduledAt: new Date("2023-05-01T10:00:00")
    });
    
    const campaign4 = this.createCampaign({
      name: "Welcome Series",
      subject: "Welcome to Our Service",
      fromName: "Support Team",
      fromEmail: "support@example.com",
      status: "active",
      templateId: 2,
      segmentId: 2,
      scheduledAt: null
    });
    
    const campaign5 = this.createCampaign({
      name: "June Newsletter",
      subject: "June Newsletter - Upcoming Events",
      fromName: "Marketing Team",
      fromEmail: "marketing@example.com",
      status: "scheduled",
      templateId: 1,
      segmentId: 1,
      scheduledAt: new Date("2023-06-01T10:00:00")
    });

    // Add demo campaign stats
    campaign1.then(c => {
      this.createCampaignStats({
        campaignId: c.id,
        sentCount: 8294,
        deliveredCount: 8100,
        openCount: 2942,
        clickCount: 1894,
        unsubscribeCount: 32,
        bounceCount: 194
      });
    });
    
    campaign2.then(c => {
      this.createCampaignStats({
        campaignId: c.id,
        sentCount: 5182,
        deliveredCount: 5060,
        openCount: 2175,
        clickCount: 1850,
        unsubscribeCount: 22,
        bounceCount: 122
      });
    });
    
    campaign3.then(c => {
      this.createCampaignStats({
        campaignId: c.id,
        sentCount: 7842,
        deliveredCount: 7700,
        openCount: 2227,
        clickCount: 1404,
        unsubscribeCount: 28,
        bounceCount: 142
      });
    });
    
    campaign4.then(c => {
      this.createCampaignStats({
        campaignId: c.id,
        sentCount: 350,
        deliveredCount: 345,
        openCount: 158,
        clickCount: 103,
        unsubscribeCount: 3,
        bounceCount: 5
      });
    });

    // Add demo automation
    this.createAutomation({
      name: "Welcome Series",
      trigger: "new_subscriber",
      status: "active",
      steps: [
        {
          type: "email",
          templateId: 2,
          delay: 0,
          subject: "Welcome to Our Service"
        },
        {
          type: "wait",
          delay: 3,
          delayUnit: "days"
        },
        {
          type: "email",
          templateId: 1,
          delay: 0,
          subject: "Getting Started Guide"
        }
      ]
    });
  }
}

export const storage = new MemStorage();
