import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPdfJobSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Create PDF job endpoint
  app.post("/api/pdf/process", upload.array("files"), async (req, res) => {
    try {
      const { toolType } = req.body;
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files provided" });
      }

      if (!toolType) {
        return res.status(400).json({ error: "Tool type is required" });
      }

      const jobId = uuidv4();
      const inputFiles = files.map(file => file.path);

      const jobData = {
        jobId,
        toolType,
        status: "pending",
        inputFiles,
        outputFile: null,
        errorMessage: null,
      };

      const validatedJob = insertPdfJobSchema.parse(jobData);
      const job = await storage.createPdfJob(validatedJob);

      // Simulate processing (in real app, this would be queued)
      setTimeout(async () => {
        try {
          const outputFile = await processPdfJob(job.jobId, toolType, inputFiles);
          await storage.updatePdfJobStatus(job.jobId, "completed", outputFile);
        } catch (error) {
          await storage.updatePdfJobStatus(
            job.jobId,
            "failed",
            undefined,
            error instanceof Error ? error.message : "Processing failed"
          );
        }
      }, 3000);

      res.json({
        jobId: job.jobId,
        status: job.status,
      });
    } catch (error) {
      console.error("Error creating PDF job:", error);
      res.status(500).json({ error: "Failed to create PDF job" });
    }
  });

  // Create batch PDF jobs endpoint
  app.post("/api/pdf/batch-process", upload.array("files"), async (req, res) => {
    try {
      const { toolType } = req.body;
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files provided" });
      }

      if (!toolType) {
        return res.status(400).json({ error: "Tool type is required" });
      }

      const jobs: PdfJobResponse[] = [];

      // Create a job for each file (for tools that process individual files)
      // or create a single job for all files (for tools like merge)
      const shouldBatchTogether = ['merge-pdf'].includes(toolType);

      if (shouldBatchTogether) {
        // Single job for all files
        const jobId = uuidv4();
        const inputFiles = files.map(file => file.path);

        const jobData = {
          jobId,
          toolType,
          status: "pending",
          inputFiles,
          outputFile: null,
          errorMessage: null,
        };

        const validatedJob = insertPdfJobSchema.parse(jobData);
        const job = await storage.createPdfJob(validatedJob);

        setTimeout(async () => {
          try {
            const outputFile = await processPdfJob(job.jobId, toolType, inputFiles);
            await storage.updatePdfJobStatus(job.jobId, "completed", outputFile);
          } catch (error) {
            await storage.updatePdfJobStatus(
              job.jobId,
              "failed",
              undefined,
              error instanceof Error ? error.message : "Processing failed"
            );
          }
        }, 3000);

        jobs.push({
          jobId: job.jobId,
          status: job.status,
        });
      } else {
        // Individual job for each file
        for (const file of files) {
          const jobId = uuidv4();
          const inputFiles = [file.path];

          const jobData = {
            jobId,
            toolType,
            status: "pending",
            inputFiles,
            outputFile: null,
            errorMessage: null,
          };

          const validatedJob = insertPdfJobSchema.parse(jobData);
          const job = await storage.createPdfJob(validatedJob);

          setTimeout(async () => {
            try {
              const outputFile = await processPdfJob(job.jobId, toolType, inputFiles);
              await storage.updatePdfJobStatus(job.jobId, "completed", outputFile);
            } catch (error) {
              await storage.updatePdfJobStatus(
                job.jobId,
                "failed",
                undefined,
                error instanceof Error ? error.message : "Processing failed"
              );
            }
          }, 2000 + Math.random() * 2000); // Stagger the processing

          jobs.push({
            jobId: job.jobId,
            status: job.status,
          });
        }
      }

      res.json(jobs);
    } catch (error) {
      console.error("Error creating batch PDF jobs:", error);
      res.status(500).json({ error: "Failed to create batch PDF jobs" });
    }
  });

  // Get job status endpoint
  app.get("/api/pdf/job/:jobId", async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = await storage.getPdfJob(jobId);

      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.json({
        jobId: job.jobId,
        status: job.status,
        downloadUrl: job.outputFile ? `/api/pdf/download/${job.jobId}` : undefined,
        errorMessage: job.errorMessage || undefined,
      });
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ error: "Failed to fetch job status" });
    }
  });

  // Download processed file endpoint
  app.get("/api/pdf/download/:jobId", async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = await storage.getPdfJob(jobId);

      if (!job || job.status !== "completed" || !job.outputFile) {
        return res.status(404).json({ error: "File not found or not ready" });
      }

      if (!fs.existsSync(job.outputFile)) {
        return res.status(404).json({ error: "File not found on disk" });
      }

      const filename = `${job.toolType}-${job.jobId}.pdf`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "application/pdf");
      
      const fileStream = fs.createReadStream(job.outputFile);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).json({ error: "Failed to download file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function processPdfJob(jobId: string, toolType: string, inputFiles: string[]): Promise<string> {
  // Mock PDF processing - in real app, this would use actual PDF libraries
  const outputDir = "outputs";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `${jobId}.pdf`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create a mock output file
  fs.writeFileSync(outputFile, Buffer.from("Mock PDF content"));
  
  return outputFile;
}
