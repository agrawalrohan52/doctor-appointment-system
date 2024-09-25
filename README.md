# Appointment Booking API

This is a simple appointment booking API built with Express.js. It allows users to book, view, modify, and cancel appointments with doctors.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)
- [Middleware](#middleware)
- [Starting the Server](#starting-the-server)
- [Unit Testing](#unit-testing)

## Installation

To get started, clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Usage

This API allows users to perform the following actions:

1. **Book an Appointment**
2. **View an Appointment**
3. **View Appointments by Doctor**
4. **Cancel an Appointment**
5. **Modify an Appointment**

## API Endpoints

### Base URL

```
/api/v1/appointments
```

### Routes

- **POST** `/book`: Book a new appointment.
- **GET** `/appointment`: View an appointment by email.
- **GET** `/:doctorName`: View appointments by doctor name.
- **DELETE** `/cancel`: Cancel an appointment.
- **PATCH** `/modify`: Modify an existing appointment.

### Request Validation

Each route includes validation middleware to ensure that the required fields are present and valid:

- `validateFields`: Ensures that required fields are included in the request body.
- `validateDoctor`: Checks if the specified doctor exists.
- `validateQueryParams`: Validates query parameters for GET requests.

## Postman Collection

You can use the provided Postman collection to test the API. Below are example requests for each endpoint:

- **Book Appointment** (POST `/book`):
```json
{
  "firstName": "Rohan",
  "lastName": "Agrawal",
  "email": "rohan@example.com",
  "timeSlot": "09:00 AM - 10:00 AM",
  "doctorName": "Dr. John Smith"
}
```
- **View Appointment** (GET `/appointment?email=rohan@example.com`):
```json
{
  "email": "rohan@example.com"
}
```
- **Cancel Appointment** (DELETE `/cancel`):
```json
{
  "email": "rohan@example.com",
  "timeSlot": "08:00 AM - 09:00 AM"
}
```
- **View All Appointments by Doctor** (GET `/Dr. John Smith`):
```json
{
  "doctorName": "Dr. John Smith"
}
```
- **Modify Appointment** (PATCH `/modify`):
```json
{
  "email": "rohan@example.com",
  "originalTimeSlot": "09:00 AM - 10:00 AM",
  "newTimeSlot": "10:00 AM - 11:00 AM"
}
```

The full Postman collection is available for import to test the API.

## Middleware

- **Error Handling Middleware**: Catches errors throughout the application and responds with a standardized error format.

## Starting the Server

To start the server, run the following command:

```bash
npm start or npm run start
```

The server will start on the specified port (default is `3000`).

## Unit Testing

To run the tests for this project, use the following commands:

- Run tests only:
  ```bash
  npm run test
  ```

- Run tests with coverage report:
  ```bash
  npm run test:coverage
  ```

  The test coverage results will be saved in the `coverage` folder.

