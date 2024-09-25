import {
  bookAppointmentService,
  viewAppointmentService,
  viewAppointmentsByDoctorService,
  cancelAppointmentService,
  modifyAppointmentService,
} from "../services/appointmentService.js";

export const bookAppointment = (req, res, next) => {
  try {
    const result = bookAppointmentService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error); // Pass to error middleware
  }
};

export const viewAppointment = (req, res, next) => {
  try {
    const result = viewAppointmentService(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const viewAppointmentsByDoctor = (req, res, next) => {
  try {
    const result = viewAppointmentsByDoctorService(req.params.doctorName);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = (req, res, next) => {
  try {
    const result = cancelAppointmentService(req.query);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const modifyAppointment = async (req, res, next) => {
  try {
    const result = modifyAppointmentService(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
