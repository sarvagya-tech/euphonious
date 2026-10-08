# 🎨 SyncTune Frontend Client

> Modern React 19 + Vite frontend application for SyncTune (Euphonious).

For complete documentation including Backend APIs, WebSocket protocol, database models, and architecture diagrams, please refer to the [Root README](../README.md).

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server with Hot Module Replacement
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Frontend Technologies

- **React 19** & **Vite**
- **Tailwind CSS 3.4** (Cyberpunk/Dark glassmorphic theme)
- **Zustand 5** (Global state for audio player, live rooms, and persisted authentication)
- **Howler.js 2.2** (High-fidelity audio playback & seek management)
- **Socket.io Client** (Synchronized playback & real-time chat)
- **React Router DOM v7** (Client-side routing & route guards)
- **Lucide React** (Modern UI icons)
- **React Hot Toast** (Alerts & notifications)
- **Better-Auth React Client** (Social and session authentication)

---

## 🌐 Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Express REST API Base URL | `http://localhost:7000/api/v1` |
| `VITE_AUTH_BASE_URL` | Better-Auth Base URL | `http://localhost:7000` |
| `VITE_SOCKET_URL` | Socket.io Server URL | `http://localhost:7000` |
