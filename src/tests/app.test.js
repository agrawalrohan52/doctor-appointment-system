import request from "supertest";
import { app, server } from "../index"; // Adjust the path as necessary

beforeEach(() => {
  global.appointments = [];
});

afterAll((done) => {
  server.close(done);
});
describe("Appointment API", () => {
  describe("POST /book", () => {
    it("should book an appointment successfully", async () => {
      const response = await request(app)
        .post("/api/v1/appointments/book")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          timeSlot: "10:00 AM - 11:00 AM",
          doctorName: "Dr. John Smith",
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Appointment booked");
      expect(response.body.appointment).toMatchObject({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/appointments/book")
        .send({ email: "john@example.com" });

      expect(response.status).toBe(400);
    });

    it("should return 409 if the time slot is already booked", async () => {
      await request(app).post("/api/v1/appointments/book").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });

      const response = await request(app)
        .post("/api/v1/appointments/book")
        .send({
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          timeSlot: "10:00 AM - 11:00 AM",
          doctorName: "Dr. John Smith",
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("Time slot already booked");
    });
  });

  describe("GET /appointment", () => {
    it("should return appointment details if found", async () => {
      await request(app).post("/api/v1/appointments/book").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });

      const response = await request(app)
        .get("/api/v1/appointments/appointment")
        .query({ email: "john@example.com" });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });
    });

    it("should return 404 if appointment is not found", async () => {
      const response = await request(app)
        .get("/api/v1/appointments/appointment")
        .query({ email: "nonexistent@example.com" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Appointment not found");
    });

    it("should return 400 if email is not passed", async () => {
      const response = await request(app).get(
        "/api/v1/appointments/appointment"
      );

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Missing query parameters: email");
    });
  });

  describe("GET /appointments/:doctorName", () => {
    it("should return appointments for the specified doctor", async () => {
      await request(app).post("/api/v1/appointments/book").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });

      await request(app).post("/api/v1/appointments/book").send({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        timeSlot: "11:00 AM - 12:00 PM",
        doctorName: "Dr. John Smith",
      });

      const response = await request(app).get(
        "/api/v1/appointments/Dr. John Smith"
      );

      expect(response.status).toBe(200);
      expect(response.body.appointments).toHaveLength(2);
    });

    it("should return 404 when doctor not found", async () => {
      const response = await request(app).get("/api/v1/appointments/test");
      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /cancel", () => {
    it("should cancel an appointment successfully", async () => {
      await request(app).post("/api/v1/appointments/book").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });

      const response = await request(app)
        .delete("/api/v1/appointments/cancel")
        .query({ email: "john@example.com", timeSlot: "10:00 AM - 11:00 AM" });

      expect(response.status).toBe(204);
    });

    it("should return 404 if no matching appointment is found", async () => {
      const response = await request(app)
        .delete("/api/v1/appointments/cancel")
        .query({
          email: "nonexistent@example.com",
          timeSlot: "10:00 AM - 11:00 AM",
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Appointment not found");
    });
  });

  describe("PATCH /modify", () => {
    it("should modify an appointment successfully", async () => {
      await request(app).post("/api/v1/appointments/book").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });

      const response = await request(app)
        .patch("/api/v1/appointments/modify")
        .send({
          email: "john@example.com",
          originalTimeSlot: "10:00 AM - 11:00 AM",
          newTimeSlot: "09:00 AM - 10:00 AM",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Appointment updated");
    });

    it("should return 404 if the original appointment is not found", async () => {
      const response = await request(app)
        .patch("/api/v1/appointments/modify")
        .send({
          email: "nonexistent@example.com",
          originalTimeSlot: "10:00 AM - 11:00 AM",
          newTimeSlot: "11:00 AM - 12:00 PM",
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Original appointment not found");
    });

    it("should return 409 if the new time slot is already booked", async () => {
      await request(app).post("/api/v1/appointments/book").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        timeSlot: "10:00 AM - 11:00 AM",
        doctorName: "Dr. John Smith",
      });

      await request(app).post("/api/v1/appointments/book").send({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        timeSlot: "11:00 AM - 12:00 PM",
        doctorName: "Dr. John Smith",
      });

      const response = await request(app)
        .patch("/api/v1/appointments/modify")
        .send({
          email: "john@example.com",
          originalTimeSlot: "10:00 AM - 11:00 AM",
          newTimeSlot: "11:00 AM - 12:00 PM",
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("New time slot already booked");
    });
  });
});
