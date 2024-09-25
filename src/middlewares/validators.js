import { doctors } from "../utils/doctorsList.js";

/**
 * Middleware to validate if the doctor exists in the predefined list of doctors.
 * If the doctor is not found or the name is missing, it returns an error response.
 *
 * @function validateDoctor
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @returns {void} Sends a 400 status if the doctor name is missing or 404 if the doctor is not found.
 */
export const validateDoctor = (req, res, next) => {
  const doctorName = req.body.doctorName || req.params.doctorName;
  if (!doctorName) {
    return res.status(400).json({ message: "Doctor name is required" });
  }

  if (!doctors.includes(doctorName)) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  next();
};

/**
 * Middleware to validate the request body for required fields.
 * If any required field is missing, it returns a 400 error response.
 *
 * @function validateFields
 * @param {string[]} requiredFields - Array of required field names.
 * @returns {Function} A middleware function that checks for missing fields.
 */
export const validateFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      return res
        .status(400)
        .json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }
    next();
  };
};

/**
 * Middleware to validate the query parameters for required parameters.
 * If any required query parameter is missing, it returns a 400 error response.
 *
 * @function validateQueryParams
 * @param {string[]} requiredParams - Array of required query parameter names.
 * @returns {Function} A middleware function that checks for missing query parameters.
 */
export const validateQueryParams = (requiredParams) => {
  return (req, res, next) => {
    const missingParams = requiredParams.filter((param) => !req.query[param]);
    if (missingParams.length) {
      return res.status(400).json({
        message: `Missing query parameters: ${missingParams.join(", ")}`,
      });
    }
    next();
  };
};
