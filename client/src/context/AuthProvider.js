import { AppContext } from "./appContext";
import { useEffect, useMemo, useState, useContext,useCallback } from "react";
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
          console.log(response.data.token);
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
      if (isFirstMounted) {
        updateRefreshtoken();
      }

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
      conversationIds,
      setConversationIds,
      conversationChangeCount,
      changeConversation,
    }),
    [
      localAccessToken,
      conversationIds,
      setConversationIds,
      conversationChangeCount,
      changeConversation,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
