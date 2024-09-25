import { Router } from "express";
import {
  bookAppointment,
  viewAppointment,
  viewAppointmentsByDoctor,
  cancelAppointment,
  modifyAppointment,
} from "../controllers/appointmentController.js";
import {
  validateDoctor,
  validateFields,
  validateQueryParams,
} from "../middlewares/validators.js";

const router = Router();

/**
 * POST /book
 * Route to book a new appointment.
 * Middleware: Validates required fields and doctor availability.
 * @name bookAppointment
 * @function
 * @param {string} firstName - Patient's first name.
 * @param {string} lastName - Patient's last name.
 * @param {string} email - Patient's email address.
 * @param {string} timeSlot - Time slot for the appointment.
 * @param {string} doctorName - Name of the doctor.
 */
router.post(
  "/book",
  validateFields(["firstName", "lastName", "email", "timeSlot", "doctorName"]),
  validateDoctor,
  bookAppointment
);

/**
 * GET /appointment
 * Route to view a single appointment based on the patient's email.
 * Middleware: Validates the email query parameter.
 * @name viewAppointment
 * @function
 * @param {string} email - Patient's email address.
 */
router.get("/appointment", validateQueryParams(["email"]), viewAppointment);

/**
 * GET /:doctorName
 * Route to view all appointments for a specific doctor.
 * Middleware: Validates the doctor's name in the route parameter.
 * @name viewAppointmentsByDoctor
 * @function
 * @param {string} doctorName - Doctor's name.
 */
router.get("/:doctorName", validateDoctor, viewAppointmentsByDoctor);

/**
 * DELETE /cancel
 * Route to cancel an appointment.
 * Middleware: Validates the email and time slot query parameters.
 * @name cancelAppointment
 * @function
 * @param {string} email - Patient's email address.
 * @param {string} timeSlot - Time slot of the appointment to be canceled.
 */
router.delete(
  "/cancel",
  validateQueryParams(["email", "timeSlot"]),
  cancelAppointment
);

/**
 * PATCH /modify
 * Route to modify an existing appointment's time slot.
 * Middleware: Validates required fields for the modification.
 * @name modifyAppointment
 * @function
 * @param {string} email - Patient's email address.
 * @param {string} originalTimeSlot - Original time slot of the appointment.
 * @param {string} newTimeSlot - New time slot for the appointment.
 */
router.patch(
  "/modify",
  validateFields(["email", "originalTimeSlot", "newTimeSlot"]),
  modifyAppointment
);

export default router;
