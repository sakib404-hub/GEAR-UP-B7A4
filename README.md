# 🚀 Gear Rental Management System API

> **A modern, secure, and scalable REST API for managing an online gear rental platform.**
> Built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Stripe**.

Whether you're building a marketplace for cameras, camping equipment, sports gear, or any rentable inventory, this API provides a complete backend solution with authentication, payments, order management, reviews, and role-based dashboards.

---

## ✨ Highlights

* 🔐 JWT Authentication & Authorization
* 👥 Role-Based Access Control (Admin, Provider, Customer)
* 🛒 Complete Rental Order Workflow
* 💳 Secure Stripe Payment Integration
* 🎯 Powerful Search, Filtering & Pagination
* ⭐ Review & Rating System
* 📊 Admin Dashboard & Analytics
* 🏕️ Provider Dashboard
* ⚡ Built with TypeScript & Prisma
* 🛡️ Centralized Error Handling
* 📦 Production Ready
* 🚀 Easy Deployment on Vercel

---

# 🛠️ Tech Stack

| Category       | Technology   |
| -------------- | ------------ |
| Runtime        | Node.js      |
| Framework      | Express.js   |
| Language       | TypeScript   |
| Database       | PostgreSQL   |
| ORM            | Prisma       |
| Authentication | JWT + bcrypt |
| Payment        | Stripe       |
| Deployment     | Vercel       |

---

# 📂 Project Structure

```text
.
├── prisma
│   ├── schema.prisma
│   └── migrations
│
├── src
│   ├── config
│   ├── lib
│   │   ├── prisma.ts
│   │   └── stripe.ts
│   │
│   ├── middlewares
│   │   ├── auth.ts
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   │
│   ├── modules
│   │   ├── Authentication
│   │   ├── Admin
│   │   ├── Provider
│   │   ├── Gears
│   │   ├── Orders
│   │   ├── Category
│   │   ├── Payment
│   │   └── Reviews
│   │
│   ├── types
│   ├── utility
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── vercel.json
```

---

# 🌟 Core Features

## 🔐 Authentication

* Register new users
* Secure Login
* JWT Authentication
* Password Encryption
* Protected Routes
* User Profile

---

## 👥 Role-Based Access

### 👑 Admin

* Manage Users
* Manage Providers
* Monitor Orders
* Dashboard Statistics
* Platform Management

### 🏕️ Provider

* Manage Rental Gears
* Track Orders
* Update Order Status
* Provider Dashboard

### 🙋 Customer

* Browse Available Gears
* Place Rental Orders
* Secure Online Payment
* Review Rental Experience
* Track Rental History

---

## 🎒 Gear Management

* Create Gear
* Update Gear
* Delete Gear
* View Gear Details
* Search by Name
* Filter by Category
* Filter by Brand
* Filter by Price
* Availability Status
* Pagination
* Sorting

---

## 📂 Category Management

* Create Categories
* Update Categories
* Delete Categories
* View Categories

---

## 📦 Rental Orders

* Place Rental Orders
* Manage Rental Status
* Provider Approval
* Cancel Orders
* Rental History

---

## 💳 Stripe Payment

* Stripe Checkout
* Secure Payment Verification
* Stripe Webhooks
* Payment History

---

## ⭐ Reviews

* Add Reviews
* View Reviews
* Rating System

---

# 🔍 API Capabilities

✔ Search

✔ Filtering

✔ Sorting

✔ Pagination

✔ Validation

✔ Authorization

✔ Authentication

✔ Secure Payments

✔ Error Handling

---

# ⚙️ Environment Variables

Create a **.env** file.

```env
DATABASE_URL=

PORT=5000

JWT_SECRET=

JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

CLIENT_URL=
```

---

# 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

### Install Dependencies

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Migrations

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

---

# 📦 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the project.

```bash
npm start
```

Runs the production build.

```bash
npm run lint
```

Runs ESLint.

---

# 🗄️ Prisma Commands

Generate Client

```bash
npx prisma generate
```

Create Migration

```bash
npx prisma migrate dev --name init
```

Deploy Migration

```bash
npx prisma migrate deploy
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# 🔒 Security Features

* 🔐 JWT Authentication
* 🔑 Password Hashing with bcrypt
* 🛡️ Protected Routes
* 🚫 Role-Based Authorization
* 🔒 Secure Environment Variables
* 💳 Stripe Secure Checkout
* ⚡ Prisma ORM for Safe Database Queries
* ❌ Centralized Error Handling

---

# 📄 Sample Success Response

```json
{
  "success": true,
  "message": "Request Successful",
  "data": {}
}
```

---

# ❌ Sample Error Response

```json
{
  "success": false,
  "message": "Unauthorized Access",
  "error": {
    "details": "Invalid or Expired Token"
  }
}
```

---

# 🚀 Deployment

This project can be deployed on:

* ▲ Vercel
* 🚂 Railway
* 🎨 Render
* 🐳 Docker
* ☁️ Any VPS or Cloud Server

---

# 💡 Future Improvements

* 📧 Email Notifications
* 📱 SMS Alerts
* ❤️ Wishlist
* 📍 Live Order Tracking
* 📈 Advanced Analytics
* 📄 Invoice Generation
* 🔔 Push Notifications

---

## 👨‍💻 Author

<div align="center">

# Md. Shakib Hossen

💻 Backend Developer in Progress

🚀 Passionate about Backend Engineering

🏗️ Building Scalable Applications

📚 Learning Every Day

<a href="https://github.com/sakib404-hub">
<img src="https://img.shields.io/badge/GitHub-@sakib404--hub-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/sakibhossen-dev7011">
<img src="https://img.shields.io/badge/LinkedIn-Md.%20Shakib%20Hossen-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

</div>

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

🚀 Happy Coding 🚀

</div>
