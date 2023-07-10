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
import ProtectedRoute from "./Api/ProtectedRoute";
import ForgetPassword from "./components/Login/ForgetPassword";
import ResetPassword from "./components/Login/ResetPassword";

function App() {


  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/polls" element={<PollsPage />} />
        </Route>
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/sendmessage" element={<SendMessagePage />} />
        <Route path="/sendpoll" element={<SendPoll />} />
        <Route path="/sendrate" element={<SendRate />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
