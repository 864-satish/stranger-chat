# Stranger Chat

A simple web application that connects two strangers randomly for anonymous chatting without any sign-in required.

## Domain
https://strangerchat.co.in/

## Project Structure

This is a **monorepo** containing two main applications:

- **stranger-chat-web/**: Frontend application built with Vue.js
- **stranger-chat-service/**: Backend service built with NestJS and TypeScript

**Root package.json**: Provides workspace commands for development and building both services.

## Workspace Commands

From the root directory, you can run:

```bash
# Install all dependencies
npm run install:all

# Build both services
npm run build

# Start both services in development mode
npm run dev

# Deploy individual services
npm run deploy:frontend  # Build and preview frontend
npm run deploy:backend   # Build and start backend
```

## Frontend (stranger-chat-web)

The frontend is a Vue.js application with a modern, responsive UI appealing to youth and teens. Features include:

- Age verification with Terms of Use acceptance
- Dark theme by default with light/dark toggle
- Responsive design with ad spaces for desktop and mobile
- Username input with styled background
- Real-time chat with partner usernames displayed
- Mobile-friendly chat interface
- **Live user count display** showing number of online users

### Features
- **Age Verification**: Must accept Terms of Use and confirm 18+ before connecting
- **Theme Toggle**: Switch between dark and light themes
- **Responsive Layout**: Ad spaces on desktop sides, mobile banners
- **Chat Interface**: Scrollable messages, partner usernames
- **User Input**: Styled input field with background
- **Skip Partner**: Disconnect and find new chat partner

### Tech Stack
- Vue.js 3
- Vite
- Socket.io-client
- CSS Grid/Flexbox for responsive design

### Environment Variables
Create a `.env` file in the root of the frontend project with:
```
VITE_SOCKET_URL=http://localhost:8080
```

For production deployment, update `VITE_SOCKET_URL` to your deployed backend URL (e.g., `https://strangerchat.co.in/`).

### Getting Started
1. Navigate to `stranger-chat-web/`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

**Deploy Command**: `npm run deploy` - Builds and starts a local preview server (port 4173)

## Backend (stranger-chat-service)

The backend is a WebSocket chat server written in NestJS with TypeScript. Its main job is to:
- Create WebSocket connections
- Randomly pair two users for chatting
- Facilitate message exchange between paired users
- **Track and broadcast live user count** to all connected clients

### Tech Stack
- NestJS
- TypeScript
- Socket.io for WebSocket implementation

### Getting Started
1. Navigate to `stranger-chat-service/`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start the server: `npm start`

**Deploy Command**: `npm run deploy` - Builds and starts the production server  
The server runs on port 8080.

## How It Works

1. User opens the web app and enters a username.
2. Frontend connects to the backend WebSocket server.
3. Backend adds the user to a waiting queue.
4. When two users are waiting, they are randomly paired.
5. Messages are relayed between the paired users in real-time.
6. When a user disconnects, the pair is broken, and the other user is returned to the waiting queue.

## Deployment

This application can be deployed to Railway in multiple ways:

### Option 1: Single Railway Project (Recommended)
Deploy both frontend and backend as services within one Railway project:
- Deploy from the root directory
- Railway automatically detects both services
- Services communicate via Railway's internal networking
- Use `VITE_SOCKET_URL=https://stranger-chat-service.railway.internal` for frontend

### Option 2: Separate Railway Projects
Deploy frontend and backend as separate Railway projects:
- Backend: Deploy from `stranger-chat-service/` folder
- Frontend: Deploy from `stranger-chat-web/` folder
- More isolation but requires managing two projects

### Option 3: Manual Deployment
Deploy to any hosting platform that supports:
- **Frontend**: Static site hosting (Netlify, Vercel, etc.)
- **Backend**: Node.js hosting (Railway, Render, etc.)

See `deployment.md` for detailed Railway deployment instructions.
