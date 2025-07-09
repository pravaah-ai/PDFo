import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, pdfJobs, contactForms } from '@shared/schema';
import type { User, InsertUser, PdfJob, InsertPdfJob, ContactForm, InsertContactForm, IStorage } from '@shared/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class PostgresStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async createPdfJob(job: InsertPdfJob): Promise<PdfJob> {
    const result = await db.insert(pdfJobs).values(job).returning();
    return result[0];
  }

  async getPdfJob(jobId: string): Promise<PdfJob | undefined> {
    const result = await db.select().from(pdfJobs).where(eq(pdfJobs.jobId, jobId));
    return result[0];
  }

  async updatePdfJobStatus(jobId: string, status: string, outputFile?: string, errorMessage?: string): Promise<void> {
    await db.update(pdfJobs)
      .set({ 
        status, 
        outputFile, 
        errorMessage,
        completedAt: status === 'completed' || status === 'failed' ? new Date() : null
      })
      .where(eq(pdfJobs.jobId, jobId));
  }

  async getPdfJobsByStatus(status: string): Promise<PdfJob[]> {
    return await db.select().from(pdfJobs).where(eq(pdfJobs.status, status));
  }

  async createContactForm(form: InsertContactForm): Promise<ContactForm> {
    const result = await db.insert(contactForms).values(form).returning();
    return result[0];
  }

  async getContactForms(): Promise<ContactForm[]> {
    return await db.select().from(contactForms).orderBy(desc(contactForms.createdAt));
  }

  async getContactFormsByStatus(status: string): Promise<ContactForm[]> {
    return await db.select().from(contactForms).where(eq(contactForms.status, status));
  }

  async updateContactFormStatus(id: number, status: string): Promise<void> {
    await db.update(contactForms)
      .set({ 
        status, 
        resolvedAt: status === 'resolved' ? new Date() : null 
      })
      .where(eq(contactForms.id, id));
  }
}

export const storage = new PostgresStorage();