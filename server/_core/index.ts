import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // Scheduled handler for certificate expiry notifications
  app.post("/api/scheduled/checkCertificateExpiry", async (req, res) => {
    try {
      const { notifyOwner } = await import("./notification");
      const { certificates } = await import("../../drizzle/schema");
      const { sql } = await import("drizzle-orm");
      const { db } = await import("../db");

      // Get all active certificates expiring within 30 days
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const expiringCerts = await db.query.certificates.findMany({
        where: (certs, { and, lte, gt, isNotNull, eq }) =>
          and(
            eq(certs.isActive, true),
            isNotNull(certs.expiryDate),
            lte(certs.expiryDate, thirtyDaysFromNow),
            gt(certs.expiryDate, new Date())
          ),
      });

      if (expiringCerts.length > 0) {
        const certList = expiringCerts
          .map(
            (cert) =>
              `- ${cert.title} (${cert.issuer}): Expires ${new Date(cert.expiryDate!).toLocaleDateString()}`
          )
          .join("\n");

        await notifyOwner({
          title: `Certificate Expiry Alert: ${expiringCerts.length} certificate(s) expiring soon`,
          content: `The following certificates will expire within 30 days:\n\n${certList}\n\nPlease renew them to maintain compliance.`,
        });
      }

      res.json({ ok: true, checked: expiringCerts.length });
    } catch (error) {
      console.error("Certificate expiry check failed:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        context: { url: req.url },
        timestamp: new Date().toISOString(),
      });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
