const deployedApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

export const API_URL = deployedApiUrl || (import.meta.env.DEV ? 'http://localhost:3000' : '');

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL?.replace(/\/$/, '') || API_URL;
