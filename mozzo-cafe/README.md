# Mozzo Cafe Website

A modern, elegant, and minimal website for Mozzo Cafe (Biratnagar, Nepal), built with React, Tailwind CSS, and Supabase.

## Features

- **Modern & Elegant Design**: Minimal aesthetic with a coffee-inspired color palette.
- **CMS Integration**: Secure admin panel to update menu items via Supabase Authentication.
- **Supabase Backend**: Stores menu data and handles content management.
- **Responsive**: Fully responsive design for all devices.
- **Animations**: Uses Framer Motion and Lottie for smooth transitions and interactions.

## Getting Started

### Prerequisites

To run this project locally, you will need:

1.  **Node.js (v18+)**: [Download and install](https://nodejs.org/) the latest LTS version.
2.  **Git** (Optional): To clone the repository.
3.  **Terminal/Command Prompt**: Basic command line interface.

### Quick Start (Recommended)

We provide a script to get you up and running instantly.

1.  **Run the script from the root directory:**

    ```bash
    ./start_mozzo.sh
    ```

    This script will:
    - Navigate to the `mozzo-cafe` directory.
    - Install necessary dependencies (`npm install`).
    - Start the development server (`npm run dev`).

2.  **Open your browser:**
    Navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Manual Installation

If you prefer to run commands manually:

1.  Clone the repository.
2.  Navigate to the project directory:
    ```bash
    cd mozzo-cafe
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### Supabase Setup (Optional)

By default, the app runs in **Mock Mode** using local data. To connect a live backend:

1.  Create a new project on [Supabase](https://supabase.com/).
2.  Go to the SQL Editor and run the content of `schema.sql` to create the `menu_items` table and set up RLS policies.
3.  Get your project URL and Anon Key from Project Settings > API.
4.  Create a `.env` file in the root of `mozzo-cafe` directory by copying `.env.example`:
    ```bash
    cp .env.example .env
    ```
5.  Fill in your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the `.env` file.

The app will start at `http://localhost:5173`.

## CMS Access

Navigate to `/admin` to access the CMS.
- If connected to Supabase, log in with your authenticated user credentials (you can create users in the Supabase Authentication dashboard).
- If running in **Mock Mode** (no Supabase credentials), use:
  - **Email:** `admin@mozzo.com`
  - **Password:** `admin`

## Mock Data

If Supabase credentials are not provided or the connection fails, the app will gracefully fallback to using mock data from `src/lib/mockData.js`.
