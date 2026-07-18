<h1 align="center">🩸 Blood.net</h1>

A full-stack emergency healthcare coordination platform designed to connect blood donors, patients, hospitals, blood banks, doctors, and ambulance services through a unified, real-time network.

Blood.net is my primary portfolio project and a genuine attempt at solving a real-world problem — enabling faster, more reliable emergency blood coordination in India, launching first in Rajasthan.

---

## 📖 About the Project

Blood.net connects the people and institutions involved in an emergency blood requirement in real time:

- Donor registration and eligibility tracking
- Patient/emergency blood requests
- Hospital and blood bank inventory visibility
- Doctor listings by city/hospital
- Appointment and donation coordination
- Authenticated, role-based access (donor / patient / hospital staff / admin)

The goal is a single connected network instead of the fragmented, manual coordination that currently happens over phone calls and word of mouth during medical emergencies.

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MONGOBD(Current)/MySQL(FUTURE) 

---

## 📂 Project Structure
 
```
Blood.Net/
└── version2/                        # Current active codebase
    ├── src/                         # React frontend
    │   ├── components/
    │   │   ├── common/              # Navbar, LightRays, Image
    │   │   ├── Story/               # Scroll-driven storytelling sections
    │   │   ├── comparison/
    │   │   ├── features/            # Auth_Login, Auth_SignUp, OurFeatures
    │   │   ├── hero/
    │   │   └── footer/
    │   ├── pages/                   # Home, Auth, DashBoard
    │   ├── hooks/                   # useTypewriter
    │   ├── data/                    # act1.js, act2.js
    │   └── assets/
    ├── blood_donor_backend/         # Express + MongoDB backend
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── lib/                     # db.js, utils.js
    └── UI DESIGN/                   # Design mockups (Knowledge Hub, Service pages)
```

*(Structure will evolve as the project grows — this reflects the current architecture.)*

---

## 🚀 Getting Started 🙂

### 1. Clone the repository

```bash
git clone <repository-url>
cd blood.net
```

### 2. Set up the database

```sql
CREATE DATABASE blood_net;
```

Import the schema:

```bash
mysql -u root -p blood_net < database/schema.sql
```

### 3. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Configure environment variables

Create a `.env` file in `server/` with your database credentials, JWT secret, and any other required config.

### 5. Run the application

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

## 📌 Project Status

Actively in development. Currently building out core frontend flows (auth, donor registration) and the REST API backend.

---

## 📜 Project History

Blood.net is not my first attempt at this idea. It's actually the second iteration of a concept I've cared about since Class 12.

### v1 — Blood Donor Database Management System (2023–24)

My original take on this idea was a terminal-based **Blood Donor Management System**, built with **Python and MySQL** as my Class 12 Computer Science practical project. It was developed entirely from scratch — no frameworks, no AI assistance — and let users register as donors, log in, browse donation bank and doctor information, and simulate appointments, all through a CLI backed by a MySQL database.

It taught me the fundamentals that everything since has built on: relational database design, SQL, CRUD operations, basic authentication, and modular code organization. That project is preserved as-is in its own repository as a historical snapshot of where this idea — and my programming journey — started.


### v2 — Blood.net (Current)

This repository is the modern, full-stack evolution of that original idea — rebuilt from the ground up with React, Node/Express, MySQL, and JWT auth, and scoped far beyond a CLI tool into a real multi-role platform meant to connect donors, patients, hospitals, and blood banks in real time.
