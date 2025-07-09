import { users, pdfJobs, contactForms, type User, type InsertUser, type PdfJob, type InsertPdfJob, type ContactForm, type InsertContactForm } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createPdfJob(job: InsertPdfJob): Promise<PdfJob>;
  getPdfJob(jobId: string): Promise<PdfJob | undefined>;
  updatePdfJobStatus(jobId: string, status: string, outputFile?: string, errorMessage?: string): Promise<void>;
  getPdfJobsByStatus(status: string): Promise<PdfJob[]>;
  
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
  getContactForms(): Promise<ContactForm[]>;
  getContactFormsByStatus(status: string): Promise<ContactForm[]>;
  updateContactFormStatus(id: number, status: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pdfJobs: Map<string, PdfJob>;
  private contactForms: Map<number, ContactForm>;
  private currentUserId: number;
  private currentJobId: number;
  private currentContactFormId: number;

  constructor() {
    this.users = new Map();
    this.pdfJobs = new Map();
    this.contactForms = new Map();
    this.currentUserId = 1;
    this.currentJobId = 1;
    this.currentContactFormId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPdfJob(insertJob: InsertPdfJob): Promise<PdfJob> {
    const id = this.currentJobId++;
    const job: PdfJob = {
      id,
      jobId: insertJob.jobId,
      toolType: insertJob.toolType,
      status: insertJob.status || "pending",
      inputFiles: insertJob.inputFiles || null,
      outputFile: insertJob.outputFile || null,
      errorMessage: insertJob.errorMessage || null,
      createdAt: new Date(),
      completedAt: null,
    };
    this.pdfJobs.set(insertJob.jobId, job);
    return job;
  }

  async getPdfJob(jobId: string): Promise<PdfJob | undefined> {
    return this.pdfJobs.get(jobId);
  }

  async updatePdfJobStatus(
    jobId: string,
    status: string,
    outputFile?: string,
    errorMessage?: string
  ): Promise<void> {
    const job = this.pdfJobs.get(jobId);
    if (job) {
      job.status = status;
      if (outputFile) job.outputFile = outputFile;
      if (errorMessage) job.errorMessage = errorMessage;
      if (status === "completed" || status === "failed") {
        job.completedAt = new Date();
      }
      this.pdfJobs.set(jobId, job);
    }
  }

  async getPdfJobsByStatus(status: string): Promise<PdfJob[]> {
    return Array.from(this.pdfJobs.values()).filter(job => job.status === status);
  }

  async createContactForm(insertForm: InsertContactForm): Promise<ContactForm> {
    const id = this.currentContactFormId++;
    const form: ContactForm = {
      id,
      name: insertForm.name,
      email: insertForm.email,
      subject: insertForm.subject,
      category: insertForm.category,
      message: insertForm.message,
      status: "pending",
      createdAt: new Date(),
      resolvedAt: null,
    };
    this.contactForms.set(id, form);
    return form;
  }

  async getContactForms(): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactFormsByStatus(status: string): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values()).filter(form => form.status === status);
  }

  async updateContactFormStatus(id: number, status: string): Promise<void> {
    const form = this.contactForms.get(id);
    if (form) {
      form.status = status;
      if (status === "resolved") {
        form.resolvedAt = new Date();
      }
      this.contactForms.set(id, form);
    }
  }
}

export const storage = new MemStorage();
