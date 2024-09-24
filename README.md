# Appointment Booking API

This is a simple appointment booking API built with Express.js. It allows users to book, view, modify, and cancel appointments with doctors.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Starting the Server](#starting-the-server)

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
- **PUT** `/modify`: Modify an existing appointment.

### Request Validation

Each route includes validation middleware to ensure required fields are present and valid:

- `validateFields`: Ensures that required fields are included in the request body.
- `validateDoctor`: Checks if the specified doctor exists.
- `validateQueryParams`: Validates query parameters for GET requests.

## Middleware

- **Error Handling Middleware**: Catches errors throughout the application and responds with a standardized error format.

## Starting the Server

To start the server, run the following command:

```bash
npm start
```

The server will start on the specified port (default is `3000`).
