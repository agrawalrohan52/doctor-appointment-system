import { doctors } from "../utils/doctorsList.js";

// Middleware to validate if the doctor exists in the predefined list
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

// Middleware to validate request body for required fields
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

// Middleware to validate query parameters
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
