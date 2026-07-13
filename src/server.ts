import app from "./app.js";
import { AppDataSource } from "./lib/data-source.js";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: Error) => {
    console.error('Database connection failed:', err);
  });

