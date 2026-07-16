import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({ checked: false, authenticated: false });
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:3000/auth/check", {
      credentials: "include", // sends the httpOnly cookie automatically
    })
      .then(res => res.json())
      .then(data => setAuthState({ checked: true, authenticated: data.authenticated }))
      .catch(() => setAuthState({ checked: true, authenticated: false }));
  }, []);

  if (!authState.checked) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!authState.authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;