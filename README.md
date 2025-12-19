# Stranger Chat

A simple web application that connects two strangers randomly for anonymous chatting without any sign-in required.

## Domain
https://strangerchat.co.in/

## Project Structure

- **stranger-chat-web/**: Frontend application built with Vue.js
- **stranger-chat-service/**: Backend service built with NestJS and TypeScript

## Frontend (stranger-chat-web)

The frontend is a Vue.js application with a modern, responsive UI appealing to youth and teens. Features include:

- Age verification with Terms of Use acceptance
- Dark theme by default with light/dark toggle
- Responsive design with ad spaces for desktop and mobile
- Username input with styled background
- Real-time chat with partner usernames displayed
- Mobile-friendly chat interface

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

The Vue.js frontend is simple to host on static hosting services.
The NestJS backend can be deployed on cloud platforms supporting Node.js.
