# Bitespeed
This repository contains the code for a backend service developed for the Bitespeed Identity Reconciliation task. The service is built using Node.js with Express.js framework and PostgreSQL as the database.

# Bitespeed Backend Task: Identity Reconciliation

## Overview:
This backend service is developed to fulfill the requirements of the Bitespeed Identity Reconciliation task. It enables identifying and tracking a customer's identity across multiple purchases by integrating with an online store platform.

## Features:
- Provides an /identify endpoint to handle identification requests based on email and phone number.
- Allows linking multiple orders made with different contact information to the same person.
- Supports creating new contact records and retrieving existing ones from the database.
- Follows RESTful API conventions and returns responses in JSON format.

## Setup Instructions:
1. Install Node.js and npm on your system if not already installed.
2. Clone this repository to your local machine.
3. Install dependencies by running `npm install` in the project directory.
4. Set up a PostgreSQL database and configure the connection details in `database.js`.
5. Run the database migration scripts to create the necessary tables and schema.
6. Start the server by running `node server.js` or `npm start`.
7. Test the /identify endpoint using tools like Postman or curl.

## Endpoints:
### /identify (POST)
- **Description:** Identifies and tracks a customer's identity across multiple purchases.
- **Request Body:**
