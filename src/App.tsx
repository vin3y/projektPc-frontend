import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import type { AuthState } from "./lib/types";
import HomePage from "./pages/home/HomePage";

function App() {
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
          setAuthState("authenticated");
          return;
        }

        // Later:
        // const response = await api.post(
        //   "/projektpc/v1/auth/refresh",
        //   {},
        //   { withCredentials: true }
        // );
        //
        // localStorage.setItem(
        //   "access_token",
        //   response.data.access_token
        // );
        //
        // setAuthState("authenticated");

        setAuthState("unauthenticated");
      } catch {
        setAuthState("unauthenticated");
      }
    };

    initializeAuth();
  }, []);

  if (authState === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            authState === "authenticated" ? (
              <HomePage />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            authState === "authenticated" ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
