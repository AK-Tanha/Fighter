import express from "express";
import fighterRoutes from "./routes/fighter.routes.js";
import refereeRoutes from "./routes/referee.routes.js";

const app = express();

app.use(express.json());
app.use("/api/fighters", fighterRoutes);
app.use("/api/referees", refereeRoutes);

export default app;