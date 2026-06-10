import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";

import HomePage from "./pages/home/HomePage";
import { api } from "./api/axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/hooks";
import { setAuthenticated, setUnauthenticated } from "./store/slices/authSlice";
import { setLocation } from "./store/slices/locationSlice";

function App() {
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          dispatch(setAuthenticated());
          return;
        }

        // Later:
        const response = await api.post(
          "/projektpc/v1/auth/refresh",
          {},
          { withCredentials: true },
        );

        localStorage.setItem("accessToken", response.data.accessToken);

        dispatch(setAuthenticated());
      } catch {
        dispatch(setUnauthenticated());
      }
    };

    const getUserLocation = async () => {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("cordinated fetched", latitude, longitude);
            dispatch(setLocation({ latitude, longitude }));
          },
          (error) => {
            console.error("Error getting user location:", error);
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    initializeAuth();
    getUserLocation();
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
