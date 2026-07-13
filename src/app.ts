import express from "express";
import fighterRoutes from "./routes/fighter.routes.js";

const app = express();

app.use(express.json());
app.use("/api/fighters", fighterRoutes);

export default app;