import express, { json } from "express";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

/**
 * Express application instance.
 * @type {import('express').Application}
 */
export const app = express();

/**
 * Middleware to parse incoming requests with JSON payloads.
 */
app.use(json());

/**
 * Appointment routes.
 * Handles all routes starting with `/api/v1/appointments`.
 */
app.use("/api/v1/appointments", appointmentRoutes);

/**
 * Global error handling middleware.
 * Catches and processes errors that occur during route handling.
 */
app.use(errorMiddleware);

/**
 * Start the server and listen on the specified port.
 * @const {number} PORT - The port the server will listen on.
 */
const PORT = process.env.PORT || 3000;

/**
 * Server instance for the application.
 * @type {import('http').Server}
 */
export const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
