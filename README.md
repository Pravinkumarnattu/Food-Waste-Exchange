# Food Waste Exchange 🌱

A MERN stack platform that connects food donors (restaurants, bakeries, hotels, supermarkets, event organizers) with NGOs and volunteers to reduce food waste and fight hunger — in real time.

> Share Food. Reduce Waste. Feed Hope.

---

## 📖 About the Project

Every day, businesses throw away edible food while NGOs and shelters struggle to feed people in need. **Food Waste Exchange** closes that gap by giving donors a simple way to list surplus food, NGOs a way to reserve it, and volunteers a way to handle pickup and delivery — all tracked from donation to delivery.

---

## 🚀 Features

### 👤 Multi-Role Authentication
- Role-based registration (Donor / NGO / Volunteer) with dynamic form fields per role
- Secure JWT-based authentication with bcrypt password hashing
- Role-based route protection on both frontend and backend
- Admin accounts are never publicly self-registrable — provisioned only via a secure seed script

### 🏪 Donor
- Add food donations with type, quantity, expiry time, pickup address, and image
- View and track all donations posted (Active / Reserved / Completed)
- Dashboard overview with donation stats

### 🤝 NGO / Charity
- Browse all currently available food donations in real time
- Reserve donations before they expire
- Track all reservations and their current status
- Dashboard overview with reservation stats

### 🚴 Volunteer
- View open pickup requests (reserved donations awaiting a volunteer)
- Accept a pickup request
- Mark food as picked up, then as delivered
- Track all deliveries in progress and completed

### 🛡️ Admin *(in progress)*
- Verify NGO registrations
- Monitor all donations and platform activity
- View analytics: total meals donated, active NGOs/volunteers, donation trends

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router (nested routes + protected routes)
- Axios (with request interceptors for auth)
- js-cookie (session/token storage)
- Plain CSS (responsive layouts)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose (MVC architecture)
- JWT for authentication
- bcrypt for password hashing
- CORS

**Planned / Upcoming**
- Cloudinary (image uploads)
- Google Maps / Leaflet (live pickup tracking)
- Socket.IO (real-time notifications)

---

## 📁 Project Structure

```
food-waste-exchange/
├── client/                      # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js # Shared axios instance with auth interceptor
│   │   ├── Authentication/
│   │   │   ├── Register.jsx
│   │   │   └── Login.jsx
│   │   ├── ChooseYourGoal/
│   │   ├── LandingPage/
│   │   ├── ProtectedRoute/
│   │   ├── Donor/
│   │   │   ├── DonorLayout.jsx
│   │   │   ├── DonorSidebar.jsx
│   │   │   ├── DonorTopbar.jsx
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── AddFood.jsx
│   │   │   ├── MyDonations.jsx
│   │   │   └── DonorProfile.jsx
│   │   ├── Ngo/
│   │   │   ├── NgoLayout.jsx
│   │   │   ├── NgoSidebar.jsx
│   │   │   ├── NgoTopbar.jsx
│   │   │   ├── NgoDashboard.jsx
│   │   │   ├── AvailableFood.jsx
│   │   │   ├── MyReservations.jsx
│   │   │   └── NgoProfile.jsx
│   │   ├── Volunteer/
│   │   │   ├── VolunteerLayout.jsx
│   │   │   ├── PickupRequests.jsx
│   │   │   └── MyDeliveries.jsx
│   │   └── App.jsx
│   └── .env                     # VITE_SERVER_URL
│
└── server/                      # Express backend
    ├── src/
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Food.js
    │   │   └── Order.js
    │   ├── controllers/
    │   │   ├── auth/
    │   │   │   ├── register.js
    │   │   │   ├── login.js
    │   │   │   └── profile.js
    │   │   ├── donor/
    │   │   │   ├── addFood.js
    │   │   │   └── getMyDonations.js
    │   │   ├── ngo/
    │   │   │   ├── getAvailableFoods.js
    │   │   │   ├── reserveFood.js
    │   │   │   └── getMyReservations.js
    │   │   └── volunteer/
    │   │       ├── getPickupRequests.js
    │   │       └── getMyDeliveries.js
    │   ├── middleware/
    │   │   ├── authenticate.js
    │   │   └── requireRole.js
    │   └── routes/
    │       ├── auth.js
    │       └── dashboard.js
    ├── server.js
    └── .env                      # PORT, MONGO_URI, JWT_SECRET, CLIENT_URL
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/food-waste-exchange.git
cd food-waste-exchange
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_SERVER_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Authentication Flow

1. User selects a role (Donor / NGO / Volunteer) on the Choose Role page
2. Register page renders role-specific fields dynamically
3. Backend hashes the password, rejects any attempt to self-register as `admin`, and creates the account
4. On login, the backend issues a JWT (returned in the response body, not a cookie)
5. Frontend stores the token and role via `js-cookie`
6. An axios request interceptor automatically attaches the token as an `Authorization: Bearer <token>` header on every subsequent request
7. Protected backend routes use `authenticate` middleware to verify the token, and `requireRole([...])` middleware to enforce role-based access
8. Protected frontend routes use a `ProtectedRoute` wrapper that checks for a valid token and matching role before rendering

---

## 📦 Data Models (simplified)

**User**
```
email, password, phone, role,
donor: { businessName, businessType, donorAddress },
ngo: { organizationName, ngoRegistrationNumber, organizationAddress, areaOfOperation, verified },
volunteer: { fullName, volunteerAddress, modeOfTransport, availability }
```

**Food**
```
foodName, foodType, quantity, expiryTime,
pickupAddress, image, donorId, status
```

**Order**
```
foodId, ngoId, volunteerId,
status: reserved → accepted → pickedup → delivered,
pickupTime, deliveryTime
```

---

## 🗺️ Roadmap

- [x] Multi-role authentication (Register / Login / JWT)
- [x] Donor: Add Food, My Donations, Dashboard
- [x] NGO: Available Food, Reserve, My Reservations, Dashboard
- [ ] Volunteer: Pickup Requests, My Deliveries, Dashboard
- [ ] Cloudinary image uploads
- [ ] Live map tracking for pickups/deliveries
- [ ] Admin: NGO verification, analytics dashboard
- [ ] Real-time notifications (Socket.IO)
- [ ] Responsive polish and deployment

---

## 📄 License

This project is open source and available for educational and portfolio purposes.

---

## 🙌 Acknowledgements

Built as a full-stack learning project to explore role-based authentication, protected routing, and multi-actor workflows in a real-world-inspired MERN application.
