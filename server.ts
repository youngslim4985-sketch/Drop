import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import nodemailer from "nodemailer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// S3 Client Configuration (Placeholder for real credentials)
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "mock",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "mock",
  },
});

// Email Transporter (Placeholder for real SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "user",
    pass: process.env.SMTP_PASS || "pass",
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Mock Admin API
  app.get("/api/admin/stats", (req, res) => {
    res.json({
      totalUsers: 1240,
      activeDrops: 3,
      totalRevenue: 45200,
      pendingRequests: 12
    });
  });

  app.get("/api/admin/drops", (req, res) => {
    res.json([
      { id: "1", title: "Genesis Album", status: "live", type: "album", progress: 85 },
      { id: "2", title: "Midnight Cellar", status: "upcoming", type: "wine", progress: 0 },
      { id: "3", title: "World Tour 2026", status: "sold-out", type: "tour", progress: 100 }
    ]);
  });

  app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public/admin/dashboard.html"));
  });

  // Email Service Endpoint
  app.post("/api/email/send", async (req, res) => {
    const { to, subject, text, html } = req.body;
    try {
      // In a real app, you'd use the transporter
      console.log(`Sending email to ${to}: ${subject}`);
      res.json({ success: true, message: "Email queued (mock)" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  });

  // S3 Upload Service Endpoint (Presigned URL)
  app.post("/api/upload/url", async (req, res) => {
    const { fileName, fileType } = req.body;
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || "the-drop-assets",
        Key: `drops/${Date.now()}-${fileName}`,
        ContentType: fileType,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      res.json({ url });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to generate upload URL" });
    }
  });

  // Seed Data Endpoint
  app.post("/api/admin/seed", (req, res) => {
    console.log("Seeding initial platform data...");
    res.json({ success: true, message: "Platform seeded with genesis data." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
