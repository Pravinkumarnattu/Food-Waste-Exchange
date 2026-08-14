# 🍽️ Food Waste Exchange

Food Waste Exchange is a **MERN stack platform** that connects food donors with NGOs and volunteers to reduce food waste and help people in need.

## 🌱 About the Project

Restaurants, hotels, bakeries, supermarkets, and other organizations often have surplus food that can still be consumed. This platform provides a simple way to donate that food and connect it with NGOs for collection and distribution.

## ✨ Features

- 🔐 Role-based authentication
- 👤 Separate dashboards for Donors and NGOs
- 🍱 Add and manage food donations
- 📋 View available food donations
- 📦 Reserve available food
- 🕐 Track donation and reservation status
- 👨‍💼 Donor profile management
- 🏢 NGO profile management
- 📊 Dashboard statistics
- 📱 Responsive design
- 🚪 Secure logout functionality

## 👥 User Roles

### 🏪 Donor
- Register as a donor
- Add surplus food
- View donated food
- Track donation status
- Manage profile

### 🏢 NGO
- Register as an NGO
- Browse available food
- Reserve food donations
- View reservations
- Track pickup and delivery status
- Manage profile

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- React Icons
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## 📂 Project Structure

```text
Food-Waste-Exchange/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
