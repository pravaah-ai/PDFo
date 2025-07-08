import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const pdfJobs = pgTable("pdf_jobs", {
  id: serial("id").primaryKey(),
  jobId: text("job_id").notNull().unique(),
  toolType: text("tool_type").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  inputFiles: text("input_files").array(),
  outputFile: text("output_file"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPdfJobSchema = createInsertSchema(pdfJobs).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const pdfJobResponseSchema = z.object({
  jobId: z.string(),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  downloadUrl: z.string().optional(),
  errorMessage: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPdfJob = z.infer<typeof insertPdfJobSchema>;
export type PdfJob = typeof pdfJobs.$inferSelect;
export type PdfJobResponse = z.infer<typeof pdfJobResponseSchema>;
