<div align="center">
  <img src="public/images/wordol_logo.png" width="96" alt="Wordol logo">
  
  # Wordol
  *A modern Wordle clone built with React and Firebase*
  
  [![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat-square&logo=vite)](https://vite.dev)
  [![Firebase](https://img.shields.io/badge/Firebase-12.15.0-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

  ⭐ If you like this project, star it on GitHub!

  [Features](#features) • [Installation](#installation) • [Usage](#usage)

</div>

Wordol is a feature-rich clone of the popular word-guessing game. It brings the familiar mechanics of guessing a 5-letter word in 6 tries, enhanced with user accounts, progress synchronization across devices, and comprehensive statistics tracking.

## Features

- 🎯 **Classic Gameplay** - Guess the hidden 5-letter word in 6 attempts.
- 🔐 **User Accounts** - Secure sign-in and authentication powered by Firebase.
- ☁️ **Cloud Sync** - Your game progress and history are automatically saved and synced across all your devices.
- 📊 **Detailed Statistics** - Track your games played, win rate, current streak, and max streak.
- 🎨 **Beautiful UI** - A sleek, responsive design using Tailwind CSS, Shadcn UI, and Framer Motion animations.

> [!NOTE]
> This application uses Firebase for its backend. You will need to provide your own Firebase configuration to run the project locally.

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wordol.git

# Navigate to the project directory
cd wordol

# Install dependencies
npm install
```

## Usage

### Firebase Setup

Before running the application, you need to set up your Firebase environment.

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (e.g., Email/Password or Google Sign-in) and **Firestore Database**.
3. Create a `.env` file in the root of your project and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

> [!TIP]
> Use `npm run build` to create a production-ready optimized build in the `dist` folder.
