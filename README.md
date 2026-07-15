# DocConnect

DocConnect is a modern healthcare appointment platform built with Next.js and TypeScript. It helps patients discover doctors, view profiles, book appointments, and allows doctors to manage their services and availability in one simple experience.

## 🌟 Project Overview

This project is designed to connect patients and healthcare professionals in a smooth, user-friendly way. The app includes:

- A clean landing page for first-time visitors
- A doctor listing and exploration experience
- Doctor detail pages with service information
- Authentication for patients and doctors
- Protected pages for adding and managing services
- Appointment-related workflows

## 🧩 What the App Does

### For Patients
- Browse available doctors
- Search and filter doctors by specialty or preferences
- View doctor profiles and details
- Book appointments
- Manage their own appointments

### For Doctors
- Register and log in securely
- Add and manage their service profile
- Update availability and professional information
- Receive appointment-related visibility through the platform

## 🛠️ Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- shadcn/ui components
- Sonner for notifications

## 🏗️ How It Works

1. Users land on the home page and explore the platform.
2. Patients can visit the doctors listing page, search for specialists, and open a doctor’s profile.
3. On the details page, users can view information, fees, and other booking-related details.
4. Authenticated users can complete appointment-related actions.
5. Doctors can access protected pages to add or manage their listings.
6. The app uses server-side actions and API-based communication to interact with backend services.

## 📁 Main Structure

- app/ → Pages and layouts
- components/ → Reusable UI components
- lib/ → Authentication and shared logic
- server/ → Server actions and backend interaction logic
- public/ → Static assets

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the development server

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## 🔐 Environment Variables

Create a local environment file and configure the required values:

```env
MONGODB_URI=
SERVER_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_IMG_UPLOAD_API=
```

## ✅ Key Features

- Responsive and modern UI
- Protected routes for authenticated users
- Doctor listing with search and filtering
- Detailed doctor profiles
- Appointment workflow
- Secure login and registration
- Doctor service management

## 📌 Notes

This project is a full-stack web application focused on healthcare service discovery and appointment management. It is designed to be simple, polished, and easy to extend with future features such as payment integration, chat, and admin dashboards.

## 👨‍💻 Project Goal

The main goal of DocConnect is to make healthcare access faster, clearer, and more convenient for both patients and doctors.
