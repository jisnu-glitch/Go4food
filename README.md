# Go4food

Go4food is a premium, full-stack food ordering application built with the MERN stack. It features a minimalist, responsive design with smooth animations and a robust backend for managing food items, orders, and user authentication.

> **Note**: This project is optimized for modern web standards and follows a clean, component-based architecture.

---

## Features

- **Secure Authentication**: User registration and login using JWT and Bcryptjs.
- **Admin Dashboard**: Comprehensive management interface for adding, editing, and deleting food items.
- **Dynamic Cart**: Real-time cart management with integrated price calculations.
- **Order Tracking**: Seamless order placement and status monitoring.
- **Image Management**: Integrated with Cloudinary for efficient food image preservation and delivery.
- **Modern UI/UX**: Built with Tailwind CSS 4.0 and Framer Motion for a fluid, professional experience.
- **Fully Responsive**: Optimized for all screen sizes, from mobile devices to large desktops.

---

## Live Demo

Frontend: https://go4food.vercel.app  
Backend API: https://go4food-api.vercel.app

---

## Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **Routing**: React Router 7

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5 (Alpha)
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & Bcryptjs
- **File Uploads**: Multer & Cloudinary
- **Deployment Support**: Vercel ready

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (Atlas)
- Cloudinary account for media storage

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jisnu-glitch/Go4food.git
   cd Go4food
   ```

2. **Backend Configuration**
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     npm install
     ```
   - Create a `.env` file in the `backend` folder with the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

3. **Frontend Configuration**
   - Open a separate terminal and navigate to the `frontend` directory:
     ```bash
     cd frontend
     npm install
     ```
   - Create a `.env` file in the `frontend` folder:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - Start the Vite development server:
     ```bash
     npm run dev
     ```

---

## Project Structure

```text
Go4food/
├── backend/            # Express server and API logic
│   ├── config/         # Database and middleware configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose data models
│   ├── routes/         # Express API routes
│   └── server.js       # Main entry point
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Shared UI components
│   │   ├── context/    # Application state management
│   │   ├── pages/      # Top-level views
│   │   └── services/   # Data fetching and API calls
│   └── public/         # Static assets
└── README.md
```

---

## License

Distributed under the ISC License.

---

## Maintainer

**Jishnu**
[GitHub Profile](https://github.com/jisnu-glitch)

---

If you find this project useful, please consider giving it a star on GitHub.
  

