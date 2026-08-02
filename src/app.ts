import express from "express";
import fighterRoutes from "./routes/fighter.routes.js";
import officialRoutes from "./routes/official.routes.js";
import boutRoutes from "./routes/bout.rout.js";
import eventRoutes from "./routes/event.rout.js";

const app = express();

app.use(express.json());
app.use("/api/fighters", fighterRoutes);
app.use("/api/officials", officialRoutes);
app.use("/api/bouts", boutRoutes);
app.use("/api/events", eventRoutes);

export default app;