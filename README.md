<div align="center">
  <img src="public/images/wordol_logo.png" width="96" alt="Wordol logo">
  
  # Wordol
  *A Cebuano Wordle Game*
  
  [![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat-square&logo=vite)](https://vite.dev)
  [![Firebase](https://img.shields.io/badge/Firebase-12.15.0-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

  ⭐ If you like this project, star it on GitHub!

  [About](#about) • [Features](#features) • [Installation](#installation) • [Usage](#usage)

</div>

Wordol is an engaging web-based word puzzle game specifically tailored for the Cebuano language. Inspired by the global phenomenon Wordle, it provides daily challenges to native speakers and language learners alike. The game aims to promote and preserve the Cebuano vocabulary through interactive gameplay, featuring streak tracking and progress saving via Firebase.

## Features

- 🎯 **Daily Cebuano Puzzles** - Guess the hidden five-letter Cebuano word with six attempts.
- ✨ **Real-Time Feedback** - Real-time letter position feedback and validation.
- 📊 **Player Statistics** - Player statistics and win streak tracking with Firebase.
- 💡 **Suggest a Word** - Authenticated users can suggest new Bisaya words to be added to the dictionary.
- 🎨 **Responsive & Dark Mode** - Responsive design with seamless dark mode support.

> [!NOTE]
> This application uses Firebase for its backend. You will need to provide your own Firebase configuration to run the project locally.

## Installation

```bash
# Clone the repository
git clone https://github.com/ryanestoque/wordol-web.git

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
