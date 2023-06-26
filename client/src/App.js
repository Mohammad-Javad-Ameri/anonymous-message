import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import MessagesPage from "./pages/Massages";
import RatingsPage from "./pages/Ratings";
import PollsPage from "./pages/Polls";
import SendMessagePage from "./pages/SendMessagePage";
import SendPoll from "./components/send/SendPoll";
import SendRate from "./components/send/SendRate";
import HomePage from "./pages/HomePage";
import AuthProvider from "./context/AuthProvider";
import { useState } from "react";
import ProtectedRoute from "./Api/ProtectedRoute";

function App() {
  const token = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(token);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute token={token.token} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/ratings" element={<RatingsPage />} />
        <Route path="/polls" element={<PollsPage />} />
        <Route path="/sendmessage" element={<SendMessagePage />} />
        <Route path="/sendpoll" element={<SendPoll />} />
        <Route path="/sendrate" element={<SendRate />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
