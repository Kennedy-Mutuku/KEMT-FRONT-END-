# Kingdom Enlightenment Missions Team (KEMT) - Frontend

Modern React application built with Vite for the Kingdom Enlightenment Missions Team (KEMT).

## Features

- 🌐 **Public Website**: Home, About Us, Departments, Programs & Crusades, Events, Media Gallery, Contact Us, and Donation pages.
- 📬 **Contact Form Integration**: Submits inquiries to the backend API (`/api/contact`), which forwards emails to `info@kingdomenlightenment.org` and saves records to the Admin Dashboard.
- 🔐 **Admin Portal**: Accessible at `/login` with credentials.
- 📅 **Events Management**: Administrators can upload posters and schedule upcoming crusade & mission dates via `/admin/events`.
- 💬 **Messages Management**: Administrators can view, filter, mark read, reply to, and delete website inquiries via `/admin/messages`.

## Getting Started

1. Navigate to the frontend directory:
   ```bash
   cd KEMT-FRONT-END-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173`.

> [!NOTE]
> Make sure the backend server (`KEMT-BACK-END-`) is running on `http://localhost:5000` so that contact forms, event listings, and admin logins work seamlessly via the Vite proxy.
