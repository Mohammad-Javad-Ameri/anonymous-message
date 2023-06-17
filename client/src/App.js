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

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/ratings" element={<RatingsPage />} />
        <Route path="/polls" element={<PollsPage />} />
        <Route path="/sendmessage" element={<SendMessagePage />} />
        <Route path="/sendpoll" element={<SendPoll />} />
        <Route path="/sendrate" element={<SendRate />} />
      </Routes>
    </div>
  );
}

export default App;
