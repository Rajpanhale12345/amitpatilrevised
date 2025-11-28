// Load env BEFORE anything else
import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/db.js";

import profileRoutes from "./routes/profile.js";
import clientRoutes from "./routes/clients.js";
import servicesRoutes from "./routes/services.js";
import contactRoutes from "./routes/contact.js";
import infoRoutes from "./routes/info.js";

const app = express();

// CORS: allow localhost only, no envs, no throwing
app.use(cors({
  origin: ["https://amipatilai.netlify.app", "http://localhost:5173"],
  credentials: true,
}));         
app.use(express.json());

// Health
app.get("/", (_req, res) => res.send("API running ✅"));
app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

// Routes
app.use("/profile", profileRoutes);
app.use("/clients", clientRoutes);
app.use("/services", servicesRoutes);
app.use("/contact", contactRoutes);
app.use("/info", infoRoutes);
app.get("/profile", (req, res) => {
  res.json({ ok: true, msg: "Test profile route" });
});
// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// Error handler (don’t hide the reason while developing)
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(500).json({ error: err.message || "Server error" });
});

// Start + quick DB ping
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at port ${PORT}`);
});