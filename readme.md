# Project Shoishob

A modern web application for booking sports turfs and fields with an intuitive, user-friendly interface. Project Shoishob streamlines the process of finding and reserving sports facilities while providing comprehensive management tools for players, turf owners, and administrators.

## 📋 Table of Contents

| **Section**                                 | **Description**                                                                                                                                                                               |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Features](#features)                       | A concise overview of the key functionalities offered by the platform, such as turf booking, user registration, secure login, role-based dashboards, tournament creation, and more.           |
| [Technology Stack](#technology-stack)       | Detailed breakdown of the technologies used in frontend, backend, authentication, UI design, state management, and form handling.                                                             |
| [Prerequisites](#prerequisites)             | A list of software and configurations you need to have before running the project locally (Node.js, Firebase setup, etc.).                                                                    |
| [System Architecture](#system-architecture) | High-level explanation of how the app works behind the scenes, including the layout structure, private routing, role protection, Firebase Auth integration, and JWT-based session management. |
| [Installation](#installation)               | Instructions to clone the repository, install dependencies, and get the app running on your local development environment.                                                                    |
| [Environment Setup](#environment-setup)     | Steps to create and configure your `.env` files, Firebase project, and other third-party services for smooth functionality.                                                                   |
| [Project Structure](#project-structure)     | Clear directory-level breakdown of the codebase, describing how components, pages, routes, hooks, and services are organized.                                                                 |
| [Core Functionality](#core-functionality)   | Overview of major functional features like turf listing, booking flow, user profile management, turf management for owners, and admin approval workflows.                                     |
| [User Roles](#user-roles)                   | Detailed explanation of the 3-tier access structure — regular users, turf owners, and admins — each with their own permissions and dashboard capabilities.                                    |
| [API Endpoints](#api-endpoints)             | List of backend endpoints (with methods like GET, POST, PATCH, DELETE) used for authentication, booking, user management, payment processing, and turf/tournament control.                    |
| [Deployment](#deployment)                   | Guidelines to build and host the app on a production server (e.g., Vercel, Firebase Hosting, or custom VPS) with steps like build, environment setup, and domain linking.                     |
| [Contributing](#contributing)               | Guidelines and best practices for developers who want to contribute to the codebase — including branch naming conventions, commit structure, and PR workflow.                                 |
| [License](#license)                         | Legal information about what you're allowed to do with the source code, usage terms, and any disclaimers.                                                                                     |

---

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

| **Layer**            | **Technology Used**                                                        | **Purpose / Functionality**                                                                                                              |
| -------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**         | React, Vite, React Router, Tailwind CSS, DaisyUI, React Query, SweetAlert2 | Used to build a fast, reactive, and responsive interface with modern UI components and seamless navigation.                              |
| **Authentication**   | Firebase Authentication, JWT (JSON Web Token)                              | Ensures secure login/logout, registration (via email/password and Google), token generation and verification for protected route access. |
| **Form Handling**    | React Hook Form                                                            | Efficient, scalable form validation and state management with minimal re-renders.                                                        |
| **API Requests**     | Axios (with interceptor)                                                   | Handles HTTP requests to backend services with centralized token management and error handling.                                          |
| **State Management** | React Query                                                                | Fetching, caching, and syncing server state with client UI in real-time.                                                                 |
| **UI Design**        | Tailwind CSS, DaisyUI                                                      | Utility-first CSS framework with styled UI components for a clean and consistent layout.                                                 |
| **Alerts/Toasts**    | SweetAlert2, React Toastify                                                | Interactive alert boxes and toast notifications for user feedback on actions like booking, login, success, and error handling.           |

---

## System Architecture

### Project Overview

Project Shoishob follows a client-side rendered React application architecture with role-based access control. The application provides different views and functionalities based on three primary user roles: Regular User, Admin/Owner, and Super Admin.

![Project Overview](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob1.png)

### 1. Routing System

The application uses React Router to manage navigation between different views. Routes are organized into public routes (accessible to all) and protected routes (requiring authentication).

![Routing System](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob2.png)

### 2. Authentication and Authorization

The system implements a multi-layered authentication and authorization mechanism:

- **Authentication:** Users authenticate through Firebase
- **JWT Tokens:** Authenticated API requests use bearer tokens
- **Role-Based Authorization:** Different dashboards and capabilities based on user roles

![Authentication and Authorization](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob3.png)

### 3. Layout System

The application uses two primary layouts:

- **Main Layout (Main.jsx):** Used for public pages
- **Dashboard Layout (DashBoardLayout.jsx):** Used for authenticated user functionality

![Layout System](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob4.png)

### 4. Dashboard System

The dashboard renders different components and navigation options based on the user's role:

![Dashboard System](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob5.png)

### 5. Role-Based Access Control

The system implements three primary user roles, each with progressively more capabilities:

| **Role**          | **Responsibilities & Access**                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Regular User**  | - View turf listings with filters.<br>- Book available turfs by selecting date, time, and players.<br>- View and edit their profile and booking history.<br>- Cancel upcoming bookings (if allowed).<br>- Pay online for confirmed bookings via Stripe or similar (if implemented).                                                                                           |
| **Turf Owner**    | - All features of a Regular User.<br>- Add, update, or delete their own turf listings.<br>- Set availability and slot prices.<br>- Approve or reject booking requests manually or automate it.<br>- Monitor booking performance and earnings.<br>- Host and manage tournaments with bracket creation and team participation.                                                  |
| **Administrator** | - Full system access.<br>- View, approve, or ban users and turf owners.<br>- Add or remove turfs on behalf of owners (if needed).<br>- Oversee all bookings across the platform.<br>- Access earnings reports, platform statistics, and user analytics.<br>- Manage reported issues, disputes, and feedback from users.<br>- Moderate tournament content and public messages. |

---

The dashboard UI adapts to show only the relevant functionality for each role:

![Role-Based Access Control](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob6.png)

### 6. Booking System Architecture

The booking system is a core component of Project Shoishob, allowing users to reserve sports fields:

![Booking System Architecture](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob8.png)

### Code Organization

The project follows a feature-based code organization pattern:

![Code Organization](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob9.png)

### Component Relationships

The application is built using component composition and context-smd state management:

![Component Relationships](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob10.png)

### Protected Routes Implementation

Protected routes are implemented using wrapper components that check authentication status and user roles:

![Protected Routes Implementation](https://raw.githubusercontent.com/tareksabbir/Project-Shoishob/main/public/shoishob11.png)

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

   VITE_API_URL=
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

| Endpoint                   | Method | Description        |
| :------------------------- | :----- | :----------------- |
| `/api/auth/register`       | POST   | User registration  |
| `/api/auth/login`          | POST   | User login         |
| `/api/auth/verify-email`   | POST   | Email verification |
| `/api/auth/reset-password` | POST   | Password reset     |

### Turf Management

| Endpoint         | Method | Description                      |
| :--------------- | :----- | :------------------------------- |
| `/api/turfs`     | GET    | List all turfs                   |
| `/api/turfs/:id` | GET    | Get turf details                 |
| `/api/turfs`     | POST   | Add new turf (turf owner)        |
| `/api/turfs/:id` | PUT    | Update turf details (turf owner) |

### Booking

| Endpoint            | Method | Description           |
| :------------------ | :----- | :-------------------- |
| `/api/bookings`     | GET    | List user bookings    |
| `/api/bookings`     | POST   | Create new booking    |
| `/api/bookings/:id` | GET    | Get booking details   |
| `/api/bookings/:id` | PUT    | Update booking status |

### Tournament

| Endpoint                        | Method | Description             |
| :------------------------------ | :----- | :---------------------- |
| `/api/tournaments`              | GET    | List all tournaments    |
| `/api/tournaments`              | POST   | Create new tournament   |
| `/api/tournaments/:id/teams`    | GET    | Get tournament teams    |
| `/api/tournaments/:id/register` | POST   | Register for tournament |

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
