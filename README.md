# 🎨 Artify Client

Artify is a creative web platform built with React, providing users with authentication, personalized favorites, and a modern responsive UI.  
This is the **client-side** of the project.

---

## 🚀 Features

- 🔐 **Authentication**
  - Email & Password login/signup (Firebase Auth)
  - Google Sign-In integration
  - Protected routes for logged-in users

- ❤️ **User Favorites**
  - Add or remove items from your favorites list
  - Favorites stored per user

- 🌗 **Dark/Light Mode**
  - User can toggle theme
  - Theme preference saved in localStorage and persists on reload

- 🧭 **Routing**
  - Private routes for authenticated users only
  - Error pages and loaders for better UX
  - React Router v6 used for navigation

- 🧩 **State Management**
  - React Context API for authentication and global state
  - Custom AuthProvider and AuthContext setup

- 📱 **Responsive Design**
  - Fully responsive layout for mobile, tablet, and desktop
  - Modern UI built with Tailwind CSS

---

## 🛠️ Tech Stack

- **React** (Vite)
- **React Router v6**
- **Firebase Authentication**
- **Tailwind CSS**
- **React Hot Toast** (for notifications)
- **Context API** for state management