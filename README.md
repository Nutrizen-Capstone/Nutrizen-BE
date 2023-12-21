# Nutrizen Backend

## Description

This repository contains the backend source code for Nutrizen.app, a capstone project developed by our team as part of the Bangkit Academy program. Nutrizen.app is an application designed to empower users to scan food items for caloric information and track their calorie intake. The backend is implemented using Node.js and Express.js.

## Environment

Nutrizen Backend runs with:
1. Express JS
2. GCP Cloud Run
3. GCP Cloud SQL
4. Cloud Build
5. JWT Authentication

## System Requirements

Ensure you have the following software installed before running the Nutrizen backend:

- [Node.js](https://nodejs.org/) (version 14 or newer)
- [npm](https://www.npmjs.com/) (usually installed with Node.js)

## How to Use

1. Clone this repository:

   ```bash
   git clone https://github.com/Nutrizen-Capstone/Nutrizen-BE.git
   
2. Navigate to the project directory:

   ```bash
   cd Nutrizen-BE
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Configure the application. You can find the configuration file at config/config.js. Adjust the configuration as needed, including integration with calorie scanning services or nutrition data providers.

5. Run the application:

   ```bash
   npm start
   ```
The application will run on http://localhost:3000 by default. You can change the port through the configuration.

## API Endpoints

Here are some available API endpoints:

### User Routes

- **GET /api/welcome**: Welcome message.
- **POST /api/register**: Register a new user.
- **POST /api/login**: User login.
- **GET /api/token**: Refresh token.
- **DELETE /api/logout**: User logout.
- **GET /api/users**: Get a list of users.
- **GET /api/users/:id**: Get user details.
- **PUT /api/profile/:id**: Edit user profile.

### Scan Routes

- **POST /api/scan**: Add scan history.
- **POST /api/scanHistory**: Get scan history.

## API URL

http://auth-service-test-jsg4j2mima-uc.a.run.app/



---

**Nutrizen Backend** was created by CH2-PS076 as the capstone project for the Bangkit Academy program. Thank you for using Nutrizen!


