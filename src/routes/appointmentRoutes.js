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

// Define routes
router.post(
  "/book",
  validateFields(["firstName", "lastName", "email", "timeSlot", "doctorName"]),
  validateDoctor,
  bookAppointment
);

router.get("/appointment", validateQueryParams(["email"]), viewAppointment);

router.get("/:doctorName", validateDoctor, viewAppointmentsByDoctor);

router.delete(
  "/cancel",
  validateQueryParams(["email", "timeSlot"]),
  cancelAppointment
);

router.patch(
  "/modify",
  validateFields(["email", "originalTimeSlot", "newTimeSlot"]),
  modifyAppointment
);

export default router;
