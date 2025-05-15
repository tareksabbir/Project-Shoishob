# Project Shoishob

![Project Shoishob Banner](https://via.placeholder.com/800x200?text=Project+Shoishob)

A modern web application for booking sports turfs and fields with an intuitive, user-friendly interface. Project Shoishob streamlines the process of finding and reserving sports facilities while providing comprehensive management tools for players, turf owners, and administrators.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Core Functionality](#core-functionality)
- [User Roles](#user-roles)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Authentication System

- **Email/Password Authentication** with email verification
- **Social Login Integration** with Google
- **Secure Password Reset** functionality
- **Role-based Access Control** for users, turf owners, and administrators

### Turf Booking System

- **Browse Available Turfs** with detailed information (location, amenities, pricing)
- **Interactive Calendar** for date-based slot selection
- **Real-time Availability Checking** to prevent double bookings
- **Booking Confirmation** with email notifications

### Interactive Dashboard

- **Customized Views** for regular users, turf owners, and administrators
- **User Profile Management** with personal information and preferences
- **Comprehensive Booking History** with status tracking
- **Analytics and Reports** for turf owners and administrators

### Payment Integration

- **Secure Payment Processing** for bookings
- **Multiple Payment Options** (credit card, mobile banking)
- **Detailed Transaction History** and receipts
- **Refund Processing** for cancellations

### Tournament Management

- **Tournament Registration** and team creation
- **Team Management** with player rosters
- **Fixture Generation** and scheduling
- **Real-time Leaderboard** functionality and statistics

## 🛠️ Technology Stack

### Frontend

- **React.js** with Vite as build tool for fast development
- **React Router** for seamless navigation and routing
- **Tailwind CSS** with DaisyUI for responsive and modern UI
- **React Query** for efficient data fetching, caching, and state management
- **SweetAlert2** for interactive notifications

### Authentication

- **Firebase Authentication** for secure user management
- **JWT** (JSON Web Tokens) implementation for protected routes

### API & Data Management

- **Axios** for API requests with interceptors
- **React Hook Form** for form validations and submissions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git

## System Architecture

### Project Overview

Project Shoishob follows a client-side rendered React application architecture with role-based access control. The application provides different views and functionalities based on three primary user roles: Regular User, Admin/Owner, and Super Admin.

![Project Overview](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob1.png)

## 🚀 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tareksabbir/Project-Shoishob.git
   cd Project-Shoishob
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🔧 Environment Setup

1. Create a `.env` file in the root directory
2. Add the following configurations:

   ```
   VITE_APIKEY=your_firebase_api_key
   VITE_AUTHDOMAIN=your_firebase_auth_domain
   VITE_PROJECTID=your_firebase_project_id
   VITE_STORAGEBUCKET=your_firebase_storage_bucket
   VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
   VITE_APPID=your_firebase_app_id

   VITE_API_URL=http://localhost:5000
   ```

## 📁 Project Structure

```
/src
  /assets         # Static assets like images and icons
  /components     # Reusable UI components
  /Context        # Context providers including authentication
  /firebase       # Firebase configuration and utility functions
  /hooks          # Custom React hooks
  /Layoute        # Layout components (headers, footers, etc.)
  /page           # Page components
    /Home         # Home page components
    /Dashboard    # Dashboard views for different user roles
    /Booking      # Booking related components
    /Auth         # Authentication pages (login, register)
    /Tournament   # Tournament management pages
  /Routes         # Application routing definitions
  /shared         # Shared components and utilities
  /utils          # Utility functions and helpers
  main.jsx        # Application entry point
```

## 💻 Core Functionality

### Turf Display and Selection

The application showcases available turfs with essential details including name, location, amenities, and pricing. Users can filter and search for turfs based on various criteria such as location, sport type, and availability.

### Turf Details and Booking

Each turf has a dedicated page with comprehensive information:

- High-quality images of the facility
- Location with map integration
- Available amenities
- Pricing structure
- Reviews and ratings
- Available time slots

Users can select a date, view available time slots, and proceed with booking.

### User Authentication

The authentication system provides:

- User registration with email verification
- Login with email/password or Google account
- Secure password reset functionality
- Profile management with personal details and preferences
- History of bookings and transactions

### Dashboard Functionality

#### User Dashboard

- View and manage profile
- Browse and book turfs
- Track booking history and status
- Manage payments and receipts
- Join tournaments and teams

#### Turf Owner Dashboard

- Manage turf details and availability
- View booking requests and confirmations
- Track earnings and transactions
- Generate reports and analytics
- Host and manage tournaments

#### Admin Dashboard

- Manage users and turf owners
- Monitor system activity and bookings
- Handle payment disputes and refunds
- Generate platform-wide reports
- Configure system settings

### Tournament Management

Users can:

- Create and register teams for tournaments
- Manage team roster and player information
- View tournament fixtures and schedules
- Track team performance and statistics
- Access real-time leaderboards and results

## 👥 User Roles

### Regular User

- Browse and book turfs
- Join tournaments
- Manage personal profile
- View booking history

### Turf Owner

- Manage turf listings and details
- Control availability and pricing
- Process booking requests
- Host tournaments

### Administrator

- User management
- System configuration
- Payment oversight
- Content moderation

## 🔌 API Endpoints

The application communicates with a backend server for data management. Key API endpoints include:

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/reset-password` - Password reset

### Turf Management

- `GET /api/turfs` - List all turfs
- `GET /api/turfs/:id` - Get turf details
- `POST /api/turfs` - Add new turf (turf owner)
- `PUT /api/turfs/:id` - Update turf details (turf owner)

### Booking

- `GET /api/bookings` - List user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking status

### Tournament

- `GET /api/tournaments` - List all tournaments
- `POST /api/tournaments` - Create new tournament
- `GET /api/tournaments/:id/teams` - Get tournament teams
- `POST /api/tournaments/:id/register` - Register for tournament

## 📦 Deployment

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to your hosting provider of choice.

### Recommended Hosting Options

- Vercel
- Netlify
- Firebase Hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ by [Tarek Sabbir](https://github.com/tareksabbir)
