import express, { json } from "express";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

export const app = express();
app.use(json()); // Middleware to parse JSON bodies

// Routes
app.use("/api/v1/appointments", appointmentRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
export const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
