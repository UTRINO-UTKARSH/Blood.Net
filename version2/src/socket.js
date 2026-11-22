import { io } from 'socket.io-client';

const socketUrl = import.meta.env.DEV
  ? 'http://localhost:3000'
  : (import.meta.env.VITE_SOCKET_URL || 'https://bloodnet-backend-gbzw.onrender.com');

export const socket = io(socketUrl, { withCredentials: true });
