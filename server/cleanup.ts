import fs from "fs";
import path from "path";

// Cleanup temporary files older than 1 hour
export function cleanupTempFiles() {
  const uploadDir = "uploads";
  const outputDir = "outputs";
  const maxAge = 60 * 60 * 1000; // 1 hour in milliseconds

  [uploadDir, outputDir].forEach(dir => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    const now = Date.now();

    files.forEach(file => {
      const filePath = path.join(dir, file);
      try {
        const stats = fs.statSync(filePath);
        if (now - stats.mtime.getTime() > maxAge) {
          fs.unlinkSync(filePath);
          console.log(`Cleaned up old file: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error cleaning up file ${filePath}:`, error);
      }
    });
  });
}

// Run cleanup every 30 minutes
export function startCleanupScheduler() {
  setInterval(cleanupTempFiles, 30 * 60 * 1000); // 30 minutes
  console.log("Temporary file cleanup scheduler started");
}