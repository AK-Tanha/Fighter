import express from "express";
import fighterRoutes from "./routes/fighter.routes.js";
import officialRoutes from "./routes/official.routes.js";

const app = express();

app.use(express.json());
app.use("/api/fighters", fighterRoutes);
app.use("/api/officials", officialRoutes);

export default app;