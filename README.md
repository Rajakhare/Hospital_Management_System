# Hospital Management System 🏥

A full-stack MERN application to manage hospital operations with role-based 
access control for Admin, Doctor, and Patient.

## Live Demo

- Frontend: https://hospital-management-system-frontend-y28u.onrender.com
- Backend API: https://hospital-management-system-backend-2kc2.onrender.com

## Features

### Admin
- Full dashboard with complete hospital overview
- Create and manage doctors and patients
- Book and manage appointments
- Generate patient reports and bills
- View all appointments across hospital

### Doctor
- Personal dashboard with assigned patients only
- View patient details and medical history
- Generate patient reports and prescriptions
- Accept or reject appointment requests
- Edit personal profile

### Patient
- Personal dashboard
- Book appointments with doctors
- View prescriptions and medical reports
- View and pay bills
- Edit personal profile

## Tech Stack

**Frontend**
- React.js
- Material UI
- JavaScript

**Backend**
- Node.js
- Express.js
- JWT Authentication
- REST API

**Database**
- MongoDB
- Mongoose

## Installation

1. Clone the repository
   git clone https://github.com/Rajakhare/Hospital_Management_System.git

2. Install backend dependencies
   cd backend
   npm install

3. Install frontend dependencies
   cd frontend
   npm install

4. Set up environment variables in backend .env file
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

5. Run backend
   cd backend
   npm start

6. Run frontend
   cd frontend
   npm start

## Project Structure

Hospital_Management_System/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
└── README.md

## Security

- JWT based authentication
- Role based access control
- Protected routes for each user type
- Password encryption