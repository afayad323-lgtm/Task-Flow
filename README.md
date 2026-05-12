# TaskFlow API

TaskFlow API is a backend task management system built with Node.js, Express, and MongoDB.

The project follows the MVC architecture and includes authentication and authorization using JWT.

---

## 🚀 Features

### Authentication
- User Register
- User Login
- Password Hashing with bcrypt
- JWT Token Generation
- Protected Routes using Middleware

### Backend Architecture
- MVC Structure
- Express Routing
- MongoDB Integration
- Error Handling
- Middleware System

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- express-rate-limit

---

## 📂 Project Structure

taskFlow/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── .gitignore
├── index.js
└── package.json

---

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt
3. User logs in
4. JWT token is generated
5. Protected routes verify the token using middleware

---

## 📌 Current Progress

### Completed
- Register API
- Login API
- JWT Authentication
- Verify Token Middleware
- MongoDB Connection
- MVC Architecture

### Coming Next
- Task Model
- Task CRUD Operations
- User & Task Relationship
- Validation Improvements
- Deployment

---

## ▶️ Run The Project

Install dependencies:

npm install

Start server:

npm run start

---

## ⚙️ Environment Variables

Create a `.env` file and add:

PORT=3000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key

---

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

---

## 👨‍💻 Author

Ahmed Fayad
