# Brainly 🧠

A full-stack content management dashboard that acts as a "second brain." It allows users to securely sign up, log in, and save various types of web content (videos, articles, audio, etc.) to a personalized dashboard for easy access and organization.

## 🚀 Features

- **User Authentication:** Secure signup and login functionality using JSON Web Tokens (JWT).
- **Content Management:** Add, view, and organize links with metadata (titles, types, and URLs).
- **Personalized Dashboard:** A clean, responsive grid layout for browsing saved content cards.
- **Type-Safe:** End-to-end type safety using TypeScript.

## 🛠️ Tech Stack

**Frontend:**
- React (with Vite)
- TypeScript
- Tailwind CSS
- Axios (for API requests)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication

---

## 💻 Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/compass) installed on your machine.

### 1. Clone the repository
```bash```
git clone [https://github.com/ineverydomain/brainly.git](https://github.com/ineverydomain/brainly.git)
cd brainly 

## 2. Backend Setup
Navigate to your backend folder, install dependencies, and set up your environment variables.

Bash
cd backend
npm install
Create a .env file in the backend directory and add the following:

Code snippet
PORT=3000
MONGO_URI=mongodb://localhost:27017/brainly
JWT_SECRET=your_super_secret_jwt_key
Start the backend server:

Bash
npm start
# or if using nodemon: npm run dev
3. Frontend Setup
Open a new terminal window, navigate to your frontend folder, and install dependencies.

Bash
cd frontend
npm install
Create a .env file in the frontend directory and add your local backend URL:

Code snippet
VITE_BACKEND_URL=http://localhost:3000
Start the frontend development server:

Bash
npm run dev
🔗 API Endpoints
POST /api/v1/signup - Register a new user

POST /api/v1/signin - Authenticate a user and receive a token

POST /api/v1/content - Add a new content link (requires Auth header)

GET /api/v1/content - Retrieve all saved content for the logged-in user
