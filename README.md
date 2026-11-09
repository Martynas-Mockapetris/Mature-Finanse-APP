# Mature Finance App

A budget tracking application in development using the MERN stack. It helps users
record income and expenses, organize transactions into categories, and view
financial statistics.

Currently, the frontend stores data in the browser's localStorage. Accounts
and MongoDB storage are planned but not connected yet.

## ✨ Current Features

- Record, edit, and delete income and expense transactions.
- Create, rename, and delete custom categories.
- View transaction history and financial statistics.
- Compare current month-to-date savings with the previous full month.

## 🔮 Planned Features

- User registration and login with JWT authentication.
- Store each user's categories and transactions in MongoDB.
- User profiles with a choice of avatar icons.
- Improve mobile responsiveness.
- Deploy the frontend and backend on Render.

## 🛠️ Technologies Used

- **React 19** — Component-based frontend development.
- **JavaScript (ES6+)** — Application logic and data handling.
- **Vite** — Frontend development server and production build tooling.
- **Node.js** — Backend JavaScript runtime.
- **Express.js** — REST API and server-side application framework.
- **MongoDB** — Database for storing user and financial information.
- **Mongoose** — Defines MongoDB models.
- **JWT** — Token-based user authentication.
- **React Icons** — Icons and visual elements.
- **Comfortaa & Dosis** — Typography and UI styling.
- **Git & GitHub** — Version control and source code hosting.

## 📁 Project Structure

```text
Mature-Finance-App/
├── frontend/
│   └── React application
│
└── backend/
    └── Express API server
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Martynas-Mockapetris/Mature-Finanse-APP.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Mature-Finance-APP
   ```

### Frontend Setup

3. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the frontend development server:

   ```bash
   npm run dev
   ```

### Backend Setup

6. Open a separate terminal and navigate to the backend directory:

   ```bash
   cd backend
   ```

7. Install the dependencies:

   ```bash
   npm install
   ```

8. Create a `backend\.env` file containing:

   ```env
   PORT=5000
   ```

9. Start the backend development server:

   ```bash
   npm start
   ```

**Note:** Configure the required environment variables for your backend, including your MongoDB connection string and JWT secret, before starting the server.

## 🧠 What I Practiced

This project focuses on developing full-stack application skills, including:

- Building a full-stack application using the MERN stack.
- Creating and managing a React frontend with Vite.
- Developing backend APIs using Node.js and Express.
- Working with MongoDB for data storage and management.
- Implementing user authentication with JWT.
- Managing income and expense records.
- Organizing financial data using custom categories.
- Connecting frontend components with backend API endpoints.

## 🔮 Future Improvements

- Add financial reports and spending statistics.
- Introduce interactive charts for income and expenses.
- Implement monthly and yearly budget summaries.
- Add transaction filtering and search functionality.
- Improve dashboard analytics and financial insights.

## 👨‍💻 Author

**Martynas Mockapetris**

- GitHub: [Martynas-Mockapetris](https://github.com/Martynas-Mockapetris)

## 📝 Project Status

<badge color="warning">Under Development — MVP Phase</badge>

The application is currently under development, with the initial MVP being built.

---

Built with React, Node.js, Express, and MongoDB.
