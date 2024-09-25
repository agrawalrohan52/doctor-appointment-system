import {
  bookAppointmentService,
  viewAppointmentService,
  viewAppointmentsByDoctorService,
  cancelAppointmentService,
  modifyAppointmentService,
} from "../services/appointmentService.js";

/**
 * Controller to handle booking a new appointment.
 * Calls the booking service and returns the result.
 *
 * @function bookAppointment
 * @param {import('express').Request} req - The request object, containing appointment data in the body.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function for error handling.
 * @returns {void} Sends a 201 status with the booking result or passes error to middleware.
 */
export const bookAppointment = (req, res, next) => {
  try {
    const result = bookAppointmentService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error); // Pass to error middleware
  }
};

/**
 * Controller to view a specific appointment based on query parameters.
 * Calls the service to fetch the appointment and returns the result.
 *
 * @function viewAppointment
 * @param {import('express').Request} req - The request object, containing query parameters.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function for error handling.
 * @returns {void} Sends a 200 status with the appointment result or passes error to middleware.
 */
export const viewAppointment = (req, res, next) => {
  try {
    const result = viewAppointmentService(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to view all appointments for a specific doctor.
 * Calls the service to fetch appointments for the doctor and returns the result.
 *
 * @function viewAppointmentsByDoctor
 * @param {import('express').Request} req - The request object, containing the doctor's name in the params.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function for error handling.
 * @returns {void} Sends a 200 status with the doctor's appointments or passes error to middleware.
 */
export const viewAppointmentsByDoctor = (req, res, next) => {
  try {
    const result = viewAppointmentsByDoctorService(req.params.doctorName);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to cancel an appointment based on query parameters.
 * Calls the cancellation service and returns a 204 (No Content) status if successful.
 *
 * @function cancelAppointment
 * @param {import('express').Request} req - The request object, containing the email and timeSlot in query parameters.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function for error handling.
 * @returns {void} Sends a 204 status on successful cancellation or passes error to middleware.
 */
export const cancelAppointment = (req, res, next) => {
  try {
    const result = cancelAppointmentService(req.query);
    res.status(204).send(); // No content on success
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to modify an existing appointment's time slot.
 * Calls the modification service and returns the updated appointment result.
 *
 * @async
 * @function modifyAppointment
 * @param {import('express').Request} req - The request object, containing the appointment details in the body.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function for error handling.
 * @returns {Promise<void>} Sends a 200 status with the modified appointment or passes error to middleware.
 */
export const modifyAppointment = async (req, res, next) => {
  try {
    const result = modifyAppointmentService(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
