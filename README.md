# 🎓 Student Management API

A simple REST API to manage college students using **Express.js** and **PostgreSQL**. Supports operations to create, read, update, and delete student records.

---

## 🚀 Features

- Add a new student
- Get all students
- Get a student by ID
- Update a student by ID
- Delete a student by ID
- Input validation with `Joi`
- PostgreSQL data persistence
- Environment-based configuration

---

## 🗂️ Project Structure

student-api/
├── db.js # PostgreSQL connection
├── server.js # Entry point
├── routes/
│ └── students.js # All student routes
├── sql/
│ ├── schema.sql # DB schema
│ └── seed.sql # Sample student data
├── .env # Environment variables
└── README.md # Project documentation



---

## ⚙️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Joi (validation)
- dotenv

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-api.git
cd student-api
```
## 📬 API Endpoints

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | `/students`      | Add a new student     |
| GET    | `/students`      | Get all students      |
| GET    | `/students/:id`  | Get a student by ID   |
| PUT    | `/students/:id`  | Update a student by ID|
| DELETE | `/students/:id`  | Delete a student by ID|


