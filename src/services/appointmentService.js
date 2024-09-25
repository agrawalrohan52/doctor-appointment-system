import createError from "http-errors";
import { appointments } from "../utils/inMemoryStore.js";

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

export const viewAppointmentService = ({ email }) => {
  const appointment = appointments.find((appt) => appt.email === email);
  if (!appointment) {
    throw createError(404, "Appointment not found");
  }

  return appointment;
};

export const viewAppointmentsByDoctorService = (doctorName) => {
  const doctorAppointments = appointments.filter(
    (appt) => appt.doctorName === doctorName
  );

  return { appointments: doctorAppointments };
};

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
