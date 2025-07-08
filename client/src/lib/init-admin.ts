import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function initializeAdminUser(userId: string, email: string) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // Create admin user document
      await setDoc(userDocRef, {
        email,
        role: "admin",
        createdAt: new Date(),
        lastLogin: new Date()
      });
      
      console.log("Admin user initialized successfully");
    } else {
      // Update last login
      await setDoc(userDocRef, {
        lastLogin: new Date()
      }, { merge: true });
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}

// Function to initialize default collections with sample data
export async function initializeFirestoreCollections() {
  try {
    // Initialize default tools data
    const toolsData = [
      {
        name: "Merge PDF",
        slug: "merge-pdf",
        description: "Combine multiple PDF files into a single document",
        enabled: true,
        tags: ["merge", "combine", "pdf"],
        category: "Organize Tools",
        order: 1
      },
      {
        name: "Split PDF",
        slug: "split-pdf", 
        description: "Split a PDF into multiple files by page ranges",
        enabled: true,
        tags: ["split", "divide", "pdf"],
        category: "Organize Tools",
        order: 2
      },
      {
        name: "Compress PDF",
        slug: "compress-pdf",
        description: "Reduce PDF file size while maintaining quality",
        enabled: true,
        tags: ["compress", "reduce", "optimize"],
        category: "Security & Optimization",
        order: 3
      },
      {
        name: "Convert to PDF",
        slug: "convert-to-pdf",
        description: "Convert various file formats to PDF",
        enabled: true,
        tags: ["convert", "transform", "pdf"],
        category: "Conversion Tools",
        order: 4
      },
      {
        name: "PDF to Images",
        slug: "pdf-to-images",
        description: "Convert PDF pages to image files",
        enabled: true,
        tags: ["convert", "images", "extract"],
        category: "Conversion Tools",
        order: 5
      }
    ];

    // Initialize tools collection
    for (const tool of toolsData) {
      const toolRef = doc(db, "tools", tool.slug);
      const toolDoc = await getDoc(toolRef);
      
      if (!toolDoc.exists()) {
        await setDoc(toolRef, {
          ...tool,
          createdAt: new Date()
        });
      }
    }

    // Initialize default tags
    const defaultTags = [
      { name: "pdf", type: "tool", color: "#0066cc", visible: true },
      { name: "merge", type: "tool", color: "#00cc66", visible: true },
      { name: "split", type: "tool", color: "#cc6600", visible: true },
      { name: "compress", type: "tool", color: "#cc0066", visible: true },
      { name: "convert", type: "tool", color: "#6600cc", visible: true },
      { name: "tutorial", type: "blog", color: "#0066cc", visible: true },
      { name: "guide", type: "blog", color: "#00cc66", visible: true },
      { name: "tips", type: "blog", color: "#cc6600", visible: true }
    ];

    for (const tag of defaultTags) {
      const tagRef = doc(db, "tags", tag.name);
      const tagDoc = await getDoc(tagRef);
      
      if (!tagDoc.exists()) {
        await setDoc(tagRef, {
          ...tag,
          createdAt: new Date(),
          usageCount: 0
        });
      }
    }

    console.log("Firestore collections initialized successfully");
  } catch (error) {
    console.error("Error initializing Firestore collections:", error);
  }
}