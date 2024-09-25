Here is the Postman collection converted into the README format:

# Appointment Booking API

This is a simple appointment booking API built with Express.js. It allows users to book, view, modify, and cancel appointments with doctors.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Example API Requests](#example-api-requests)
- [Middleware](#middleware)
- [Starting the Server](#starting-the-server)
- [Unit Testing](#unit-testing)
- [Code Coverage](#code-coverage)

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

## Example API Requests

Here are some example API requests for testing the API:

### Book Appointment (POST `/book`)

```json
POST /api/v1/appointments/book
Host: localhost:3000

{
  "firstName": "Rohan",
  "lastName": "Agrawal",
  "email": "rohan@example.com",
  "timeSlot": "09:00 AM - 10:00 AM",
  "doctorName": "Dr. John Smith"
}
```

### View Appointment (GET `/appointment`)

```json
GET /api/v1/appointments/appointment?email=rohan@example.com
Host: localhost:3000
```

### Cancel Appointment (DELETE `/cancel`)

```json
DELETE /api/v1/appointments/cancel?email=rohan@example.com&timeSlot=09:00 AM - 10:00 AM
Host: localhost:3000
```

### View All Appointments by Doctor (GET `/:doctorName`)

```json
GET /api/v1/appointments/Dr. John Smith
Host: localhost:3000
```

### Modify Appointment (PATCH `/modify`)

```json
PATCH /api/v1/appointments/modify
Host: localhost:3000

{
  "email": "rohan@example.com",
  "originalTimeSlot": "09:00 AM - 10:00 AM",
  "newTimeSlot": "10:00 AM - 11:00 AM"
}
```

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

## Code Coverage

This project has the following code coverage:

- **Statements Covered**: 97.95%
- **Branches Covered**: 93.75%
- **Functions Covered**: 100%
- **Lines Covered**: 97.89%

For more detailed coverage information, please check the [HTML Coverage Report](https://agrawalrohan52.github.io/doctor-appointment-system/).

