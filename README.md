# 🎵 SyncTune (Euphonious)

> **Synchronized Real-Time Music Streaming & Collaborative Listening Rooms**

SyncTune is a full-stack real-time music streaming platform and collaborative listening room application. It allows users to stream high-fidelity audio, upload music and album covers, create and manage custom playlists, and create live listening rooms where music playback and in-room chat are synchronized across all connected listeners in real time.

---

## 🌟 Key Features

- **🎧 High-Fidelity Audio Streaming**: Powered by [Howler.js](https://howlerjs.com/) and HTML5 Audio with precise seek scrubbing, volume/mute control, auto-advance, and background playback state handling.
- **📡 Real-Time Synchronized Listening Rooms**:
  - Live room creation with secure 6-character access codes.
  - Multi-user synchronized audio playback (`play`, `pause`, `seek`, `skip`) with timestamp latency correction (`startedAt = Date.now() - position`).
  - Dynamic host handover and room lifecycle management.
- **💬 Ephemeral Live Room Chat**: In-room real-time messaging with auto-expiring MongoDB TTL index (messages automatically purge after 30 minutes).
- **🔐 Hybrid Authentication System**:
  - **Custom JWT Authentication**: Access and refresh tokens with HTTP-only cookies and bcrypt password hashing.
  - **Better-Auth & OAuth 2.0**: Native MongoDB adapter integration with Google OAuth sign-in.
- **☁️ Cloud Media Uploads**: High-speed audio and album cover artwork uploads directly to **Cloudinary CDN** with disk-buffered Multer processing.
- **🎶 Custom Playlist Management**: Create playlists with custom cover artwork, multi-song search & selector, and instant playback queues.
- **🔍 Instant Music Discovery**: Search across track titles, artists, and music genres using case-insensitive regex indexing.
- **🎨 Glassmorphic Cyber-Dark UI**: Designed with Tailwind CSS featuring neon lime accents (`#c8f55a`), cyan highlights, glassmorphism backdrops, responsive sidebar navigation, and mobile-friendly views.

---

## 🏗️ Architecture Overview

```mermaid
flowchart TD
    subgraph Client["Frontend (React 19 + Vite + Tailwind CSS)"]
        UI["UI Layer / Pages & Components"]
        Zustand["State Management (Zustand: Auth, Player, Room)"]
        AudioEngine["Audio Engine (Howler.js)"]
        SocketClient["Socket.io Client"]
        APIClient["Axios HTTP Interceptor"]
    end

    subgraph Backend["Backend (Node.js + Express 5)"]
        ExpressApp["Express API Gateway"]
        AuthMiddleware["JWT & Better-Auth Middleware"]
        SocketServer["Socket.io Real-Time Hub"]
        Controllers["Controllers (Song, Room, Playlist, User)"]
    end

    subgraph Storage["Cloud & Database"]
        MongoDB[("MongoDB Database\n(Users, Songs, Rooms, Playlists, TTL Messages)")]
        Cloudinary[("Cloudinary Media CDN\n(Audio Tracks & Cover Art)")]
    end

    UI --> Zustand
    Zustand --> AudioEngine
    UI --> APIClient
    UI --> SocketClient

    APIClient -->|REST API Requests| ExpressApp
    SocketClient <-->|WebSockets (Sync, Chat, Rooms)| SocketServer

    ExpressApp --> AuthMiddleware
    AuthMiddleware --> Controllers
    Controllers --> MongoDB
    Controllers --> Cloudinary
    SocketServer <--> MongoDB
```

---

## 📁 Repository Structure

```text
music/
├── Backend/                      # Node.js / Express backend service
│   ├── public/temp/              # Local temp storage for multipart uploads
│   ├── src/
│   │   ├── controller/           # Business logic & route handlers
│   │   │   ├── chatRoom.controller.js  # Live room CRUD, join/leave logic
│   │   │   ├── liked.controller.js     # Liked songs controller
│   │   │   ├── playlist.controller.js  # Playlist management & track association
│   │   │   ├── song.controller.js      # Song upload & search handlers
│   │   │   └── user.controller.js      # Register, login, refresh token, logout
│   │   ├── db/
│   │   │   ├── index.js          # Mongoose database connection
│   │   │   └── mongoClient.js    # Native MongoDB client for Better-Auth adapter
│   │   ├── lib/
│   │   │   └── auth.js           # Better-Auth server configuration & OAuth setup
│   │   ├── middleware/
│   │   │   ├── Auth.middleware.js      # JWT verification middleware
│   │   │   └── mullter.middleware.js   # Multer storage configuration
│   │   ├── model/                # Mongoose database schemas
│   │   │   ├── chatRoom.model.js       # Room schema (code, members, active state)
│   │   │   ├── liked.model.js          # Liked tracks schema
│   │   │   ├── message.model.js        # Ephemeral room message schema (30-min TTL)
│   │   │   ├── playlist.model.js       # Playlist schema
│   │   │   ├── song.model.js           # Song schema (audio URL, cover, duration)
│   │   │   └── user.model.js           # User schema (password hash, tokens)
│   │   ├── routes/               # Express API route declarations
│   │   │   ├── cahtRoom.routes.js      # /api/v1/chatRoom endpoints
│   │   │   ├── playlist.routes.js      # /api/v1/playlists endpoints
│   │   │   ├── songs.routes.js         # /api/v1/songs endpoints
│   │   │   └── user.routes.js          # /api/v1/users endpoints
│   │   ├── socket/
│   │   │   └── socket.js         # Socket.io connection, room sync & chat events
│   │   ├── utils/
│   │   │   ├── apiError.js       # Standardized API error class
│   │   │   ├── apiResponse.js    # Standardized API response wrapper
│   │   │   ├── asynchandler.js   # Express async error handling wrapper
│   │   │   └── cloudinary.js     # Cloudinary media upload helper
│   │   ├── app.js                # Express app configuration & middleware
│   │   └── index.js              # Server entry point & HTTP/Socket listener
│   ├── .env                      # Backend environment variables
│   └── package.json              # Backend dependencies and scripts
│
└── frontend/                     # React + Vite frontend client
    ├── public/                   # Static assets & icons
    ├── src/
    │   ├── assets/               # Component assets and artwork
    │   ├── components/
    │   │   ├── common/           # Navbar, Sidebar, ProtectedRoute
    │   │   ├── player/           # MusicPlayer, ProgressBar, VolumeSlider
    │   │   ├── playlist/         # PlaylistSongRow
    │   │   ├── room/             # ChatBox, RoomPlayer
    │   │   └── songs/            # SongCard, SongRow
    │   ├── hooks/
    │   │   ├── useAuthCheck.js   # Auth verification trigger hook
    │   │   └── usePlayer.js      # Howler audio player integration hook
    │   ├── lib/
    │   │   └── auth-client.js    # Better-Auth client configuration
    │   ├── pages/
    │   │   ├── CreatePlaylist.jsx# Playlist creation & song picker
    │   │   ├── Home.jsx          # Discovery dashboard, hero player, recent tracks
    │   │   ├── Login.jsx         # Auth page (Email/Pass & Google OAuth)
    │   │   ├── Playlist.jsx      # Playlist detail & track player
    │   │   ├── Profile.jsx       # User profile, statistics & playlists
    │   │   ├── Room.jsx          # Synchronized listening room & chat
    │   │   ├── RoomSelection.jsx # Join or create room hub
    │   │   ├── Search.jsx        # Track search & genre filtering
    │   │   └── Upload.jsx        # Song & cover upload portal
    │   ├── services/             # Axios API service layers
    │   │   ├── api.js            # Axios client with bearer token interceptor
    │   │   ├── auth.service.js   # Auth API calls
    │   │   ├── playlist.service.js # Playlist API calls
    │   │   ├── room.service.js   # Room API calls
    │   │   └── song.service.js   # Song API calls
    │   ├── socket/
    │   │   └── socket.js         # Client-side Socket.io connector & dispatchers
    │   ├── store/                # Zustand global state stores
    │   │   ├── authStore.js      # Persisted auth state
    │   │   ├── playerStore.js    # Global audio track, queue & recently played
    │   │   ├── roomStore.js      # Live room details, member list & messages
    │   │   └── uiStore.js        # Global UI toggles
    │   ├── App.jsx               # Route definitions & session sync
    │   ├── index.css             # Tailwind base styles, scrollbars & glow effects
    │   └── main.jsx              # Application root mount
    ├── .env.example              # Frontend environment variables template
    ├── tailwind.config.js        # Tailwind CSS theme extension
    ├── vite.config.js            # Vite configuration
    └── package.json              # Frontend dependencies and scripts
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism and cyberpunk palettes
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with local storage persistence)
- **Audio Engine**: [Howler.js](https://howlerjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Real-Time Client**: [Socket.io Client](https://socket.io/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express 5](https://expressjs.com/)
- **Real-Time Engine**: [Socket.io](https://socket.io/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Better Auth](https://better-auth.com/) + Custom JWT ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Cloud Media Storage**: [Cloudinary SDK](https://cloudinary.com/)
- **Multipart Uploads**: [Multer](https://github.com/expressjs/multer)

---

## 🔌 API Reference

### User & Authentication (`/api/v1/users`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users/register` | No | Register new user with avatar upload (`multipart/form-data`) |
| `POST` | `/api/v1/users/login` | No | Login with email & password, sets JWT cookies |
| `POST` | `/api/v1/users/logout` | Yes | Invalidate session & clear auth cookies |
| `GET` | `/api/v1/users/me` | Yes | Get authenticated user profile details |

### Better Auth & OAuth (`/api/auth/*`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `ALL` | `/api/auth/*` | Optional | Better-Auth handler for OAuth 2.0 (Google) and session sync |

### Songs & Music Catalog (`/api/v1/songs`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/songs/upload-song` | No / Yes | Upload song audio + cover image to Cloudinary |
| `GET` | `/api/v1/songs/all-songs` | No | Retrieve list of all available songs |
| `GET` | `/api/v1/songs/search` | No | Search songs by `title`, `artist`, or `genre` query params |

### Collaborative Rooms (`/api/v1/chatRoom`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/chatRoom/create` | Yes | Create room with 6-char UUID code & optional initial song |
| `POST` | `/api/v1/chatRoom/:roomId/join`| Yes | Join room using 6-character room access code |
| `POST` | `/api/v1/chatRoom/:roomId/leave`| Yes | Leave room (auto-reassigns host or deletes if empty) |
| `DELETE`| `/api/v1/chatRoom/:roomId` | Yes | Delete room (Host privilege only) |
| `GET` | `/api/v1/chatRoom/:roomId` | Yes | Fetch room data, populated members, host & song queue |

### Playlists (`/api/v1/playlists`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/playlists/create` | Yes | Create playlist with cover art and songs array |
| `GET` | `/api/v1/playlists/get` | Yes | Fetch all playlists created by authenticated user |
| `GET` | `/api/v1/playlists/get/:playlistId` | Yes | Get single playlist with populated song details |
| `POST` | `/api/v1/playlists/add/:playlistId/:songId` | Yes | Add track to playlist |
| `PATCH` | `/api/v1/playlists/remove/:playlistId/:songId` | Yes | Remove track from playlist |
| `DELETE`| `/api/v1/playlists/:playlistId` | Yes | Delete playlist (Owner only) |

---

## ⚡ WebSocket Events (Socket.io)

### Client ➡️ Server Emitters
| Event Name | Payload | Description |
| :--- | :--- | :--- |
| `joinRoom` | `{ roomId, userId, code }` | Joins client to the specified room after code verification |
| `leaveRoom` | `none` | Disconnects client from current room session |
| `sendMessage` | `{ roomId, userId, message }` | Broadcasts new message to room and saves to DB (30-min TTL) |
| `playSong` | `{ roomId, songUrl, position }` | Broadcasts playback start with position offset |
| `pauseSong` | `{ roomId, position }` | Broadcasts pause signal at current timestamp |
| `seekSong` | `{ roomId, position }` | Broadcasts seek scrubbing to exact timestamp |
| `skipSong` | `{ roomId, songUrl }` | Broadcasts song track advance to next queued song |

### Server ➡️ Client Listeners
| Event Name | Payload | Description |
| :--- | :--- | :--- |
| `userJoined` | `{ userId, message }` | Notifies room members of a new member joining |
| `userLeft` | `{ userId }` | Notifies room members of a user departure |
| `newMessage` | `{ userId, senderName, message, time }` | Receives live chat message |
| `playSong` | `{ songUrl, startedAt }` | Syncs playback start time across listeners |
| `pauseSong` | `{ position }` | Syncs playback pause position |
| `seekSong` | `{ position }` | Syncs scrub position |
| `skipSong` | `{ songUrl }` | Advances track for all room participants |
| `joinError` | `{ message }` | Triggered if room is invalid, full, or code is wrong |

---

## ⚙️ Environment Variables

### Backend Configuration (`Backend/.env`)
Create a `.env` file in the `Backend/` directory:

```env
# Server Port & Database
PORT=7000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# CORS Allowed Client Origins (comma separated)
CLIENT_URLS=http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://localhost:3000

# Cloudinary CDN Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Token Secrets & Expirations
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here
REFRESH_TOKEN_EXPIRY=7d
JWT_SECRET=your_jwt_fallback_secret

# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_32_chars
BETTER_AUTH_URL=http://localhost:7000

# Google OAuth 2.0 (Optional / Social Logins)
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### Frontend Configuration (`frontend/.env`)
Create a `.env` file in the `frontend/` directory:

```env
# API & WebSocket Endpoints
VITE_API_BASE_URL=http://localhost:7000/api/v1
VITE_AUTH_BASE_URL=http://localhost:7000
VITE_SOCKET_URL=http://localhost:7000
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- [Cloudinary](https://cloudinary.com/) free account for asset uploads

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/sarvagya-tech/euphonious.git
cd euphonious
```

---

### Step 2: Setup and Run the Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration:
   ```bash
   # Create .env and populate with required variables as documented above
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend server will start on `http://localhost:7000`.

---

### Step 3: Setup and Run the Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will start on `http://localhost:5173`.

---

## 🚢 Deployment Guide

### Deploying Backend (e.g., Render, Railway, VPS)
1. Set the build command: `npm install`
2. Set the start command: `npm start` (or `node -r dotenv/config src/index.js`)
3. Add all environment variables from `Backend/.env` to the host provider's dashboard.
4. Set `CLIENT_URLS` to include your production frontend URL (e.g. `https://synctune.vercel.app`).

### Deploying Frontend (e.g., Vercel, Netlify)
1. Set the root directory to `frontend`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variables:
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api/v1`
   - `VITE_AUTH_BASE_URL`: `https://your-backend.onrender.com`
   - `VITE_SOCKET_URL`: `https://your-backend.onrender.com`

---

## 🛡️ Security & Best Practices

- **Strict CORS Policy**: Whitelists authorized frontend clients and production deployment domains.
- **JWT in HTTP-Only Cookies**: Minimizes XSS vulnerabilities by setting `httpOnly`, `secure`, and `sameSite` flags.
- **Auto-Expiring Ephemeral Messages**: Protects database bloat and chat privacy with MongoDB native TTL expiration (`expireAfterSeconds: 1800`).
- **Input Validation & Protected Routes**: Unauthenticated users are safely redirected to `/login` when attempting to access private routes or create rooms.

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
