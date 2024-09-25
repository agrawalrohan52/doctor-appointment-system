/**
 * Global error handling middleware.
 * Logs the error stack and sends an error response with the appropriate status code and message.
 *
 * @function errorMiddleware
 * @param {Error} err - The error object containing the error details.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function (optional, but required by Express middleware signature).
 * @returns {void} Sends a JSON response with the error message and status code.
 */
export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message });
};
