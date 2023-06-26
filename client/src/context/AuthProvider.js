import { AppContext } from "./appContext";
import { useEffect, useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../Api/Api";

export const useAuth = () => useContext(AppContext);
const ACCESS_TOKEN_EXPIRES_TIME = 1000 * 10;

export default function AuthProvider({ children }) {
  const getRefreshToken = () => {
    if (localStorage.getItem("user") === "null") return false;
    return JSON.parse(localStorage.getItem("user") || "{}")?.refreshToken;
  };

  const getAccessToken = () => {
    if (localStorage.getItem("user") === "null") {
      return new Error("Storage type not valid");
    }
    return JSON.parse(localStorage.getItem("user") || "{}")?.token;
  };

  const [refreshTokenn, setRefreshTokenn] = useState(getRefreshToken() || null);

  const updateAccessToken = (token, refreshToken) => {
    if (localStorage.getItem("user") === "null") return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    user.token = token;
    user.refreshToken = refreshToken;
    localStorage.setItem("user", JSON.stringify(user));
    setRefreshTokenn(refreshToken);
  };

  function clearUserData() {
    if (localStorage.getItem("user") === "null") return;
    localStorage.removeItem("user");
  }

  const localAccessToken = getAccessToken() || null;
  const navigate = useNavigate();
  const [isFirstMounted, setIsFirstMounted] = useState(true);

  function updateRefreshtoken() {
    refreshToken(refreshTokenn)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.refreshToken);
          updateAccessToken(response.data.token, response.data.refreshToken);

          if (isFirstMounted) {
            setIsFirstMounted(false);
          }
        } else {
          throw new Error("Refresh token request failed");
        }
      })
      .catch((error) => {
        clearUserData();
        navigate("/login");
      });
  }

  useEffect(() => {
    if (refreshTokenn) {
      // Check on the first render
      if (isFirstMounted) {
        updateRefreshtoken();
      }

      // Keep checking after a certain time
      const intervalId = setInterval(() => {
        updateRefreshtoken();
        console.log(refreshTokenn);
      }, ACCESS_TOKEN_EXPIRES_TIME);
      return () => clearInterval(intervalId);
    }
    return undefined;
  }, [localAccessToken]);

  const value = useMemo(
    () => ({
      token: localAccessToken,
    }),
    [localAccessToken]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
