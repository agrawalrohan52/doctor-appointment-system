import createError from "http-errors";
import { appointments } from "../utils/inMemoryStore.js";

/**
 * Service to book a new appointment.
 * Checks if the time slot is available and adds the appointment to the in-memory store.
 *
 * @function bookAppointmentService
 * @param {Object} data - Appointment details.
 * @param {string} data.firstName - The first name of the patient.
 * @param {string} data.lastName - The last name of the patient.
 * @param {string} data.email - The email address of the patient.
 * @param {string} data.timeSlot - The requested time slot for the appointment.
 * @param {string} data.doctorName - The name of the doctor for the appointment.
 * @throws {Error} If the time slot is already booked.
 * @returns {Object} The booked appointment details and a success message.
 */
export const bookAppointmentService = ({
  firstName,
  lastName,
  email,
  timeSlot,
  doctorName,
}) => {
  // Check if the requested time slot is already booked
  if (
    appointments.some(
      (appt) => appt.doctorName === doctorName && appt.timeSlot === timeSlot
    )
  ) {
    throw createError(409, "Time slot already booked");
  }

  // Add appointment to in-memory data store
  const appointment = { firstName, lastName, email, timeSlot, doctorName };
  appointments.push(appointment);

  return { message: "Appointment booked", appointment };
};

/**
 * Service to view an appointment by email.
 * Retrieves the appointment details based on the email provided.
 *
 * @function viewAppointmentService
 * @param {Object} data - Query data.
 * @param {string} data.email - The email address of the patient.
 * @throws {Error} If no appointment is found.
 * @returns {Object} The appointment details.
 */
export const viewAppointmentService = ({ email }) => {
  const appointment = appointments.find((appt) => appt.email === email);
  if (!appointment) {
    throw createError(404, "Appointment not found");
  }

  return appointment;
};

/**
 * Service to view all appointments for a specific doctor.
 * Retrieves all appointments booked with the doctor.
 *
 * @function viewAppointmentsByDoctorService
 * @param {string} doctorName - The name of the doctor.
 * @returns {Object} An object containing an array of the doctor's appointments.
 */
export const viewAppointmentsByDoctorService = (doctorName) => {
  const doctorAppointments = appointments.filter(
    (appt) => appt.doctorName === doctorName
  );

  return { appointments: doctorAppointments };
};

/**
 * Service to cancel an appointment.
 * Removes the appointment from the in-memory store if it exists.
 *
 * @function cancelAppointmentService
 * @param {Object} data - Query data.
 * @param {string} data.email - The email address of the patient.
 * @param {string} data.timeSlot - The time slot of the appointment to be cancelled.
 * @throws {Error} If no appointment is found for the given email and time slot.
 * @returns {Object} A success message indicating the appointment has been cancelled.
 */
export const cancelAppointmentService = ({ email, timeSlot }) => {
  const index = appointments.findIndex(
    (appt) => appt.email === email && appt.timeSlot === timeSlot
  );
  if (index === -1) {
    throw createError(404, "Appointment not found");
  }

  appointments.splice(index, 1);
  return { message: "Appointment cancelled" };
};

/**
 * Service to modify an existing appointment's time slot.
 * Updates the appointment's time slot if the original appointment exists and the new time slot is available.
 *
 * @function modifyAppointmentService
 * @param {Object} data - Appointment modification details.
 * @param {string} data.email - The email address of the patient.
 * @param {string} data.originalTimeSlot - The original time slot of the appointment.
 * @param {string} data.newTimeSlot - The new requested time slot.
 * @throws {Error} If the original appointment is not found or the new time slot is already booked.
 * @returns {Object} A success message with the updated appointment details.
 */
export const modifyAppointmentService = ({
  email,
  originalTimeSlot,
  newTimeSlot,
}) => {
  const appointment = appointments.find(
    (appt) => appt.email === email && appt.timeSlot === originalTimeSlot
  );
  if (!appointment) {
    throw createError(404, "Original appointment not found");
  }

  if (
    appointments.some(
      (appt) =>
        appt.doctorName === appointment.doctorName &&
        appt.timeSlot === newTimeSlot
    )
  ) {
    throw createError(409, "New time slot already booked");
  }

  appointment.timeSlot = newTimeSlot;
  return { message: "Appointment updated", appointment };
};
