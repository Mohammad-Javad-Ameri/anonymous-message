import { AppContext } from "./appContext";
import { useEffect, useMemo, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../Api/Api";

export const useAuth = () => useContext(AppContext);
const ACCESS_TOKEN_EXPIRES_TIME = 1000 * 60;

export default function AuthProvider({ children }) {
  const [conversationIds, setConversationIds] = useState([]);
  const [conversationChangeCount, setConversationChangeCount] = useState(0);

  const changeConversation = useCallback((count = 1) => {
    setConversationChangeCount((prev) => prev + count);
  }, []);

  const getRefreshToken = () => {
    return JSON.parse(localStorage.getItem("user") || "{}")?.refreshToken;
  };

  const getAccessToken = () => {
    if (localStorage.getItem("user") === "null") {
      return new Error("Storage type not valid");
    }
    return JSON.parse(localStorage.getItem("user") || "{}")?.token;
  };

  const [refreshTokenn, setRefreshTokenn] = useState(getRefreshToken());
  useEffect(() => {
    if (refreshTokenn) {
      getRefreshToken();
    }
  }, [refreshTokenn]);

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

  const updateRefreshtoken = useCallback(() => {
    refreshToken(refreshTokenn)
      .then((response) => {
        if (response.status === 200) {
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
  }, [
    isFirstMounted,
    refreshTokenn,
    updateAccessToken,
    clearUserData,
    navigate,
  ]);

  useEffect(() => {
    if (refreshTokenn) {
      if (isFirstMounted) {
        updateRefreshtoken();
      }

      const intervalId = setInterval(() => {
        updateRefreshtoken();
      }, ACCESS_TOKEN_EXPIRES_TIME);
      return () => clearInterval(intervalId);
    }
    return undefined;
  }, [localAccessToken, isFirstMounted, refreshTokenn, updateRefreshtoken]);

  const value = useMemo(
    () => ({
      token: localAccessToken,
      conversationIds,
      setConversationIds,
      conversationChangeCount,
      changeConversation,
      updateAccessToken,
    }),
    [
      localAccessToken,
      conversationIds,
      setConversationIds,
      conversationChangeCount,
      changeConversation,
      updateAccessToken,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
