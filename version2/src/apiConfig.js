const getEnvApiUrl = () => {
  const envValue = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  return envValue?.trim();
};

export const getApiBaseUrl = () => {
  const envApiUrl = getEnvApiUrl();

  if (envApiUrl) {
    return envApiUrl.replace(/\/$/, "");
  }

  return "http://localhost:3000";
};

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};
