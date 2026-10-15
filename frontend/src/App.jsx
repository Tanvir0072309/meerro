// App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Livescreen from "./pages/Livescreen/Livescreen.jsx";
import Screenshots from "./pages/Screenshots/Screenshots.jsx";
import Activity from "./pages/Activity/Activity.jsx";
import WorkTracking from "./pages/Worktracking/Worktracking.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import Employees from "./pages/Employees/Employees.jsx";
import Attendance from "./pages/Attendance/Attendance.jsx";
import AddTask from "./pages/AddTask/AddTask.jsx";
import Livechat from "./pages/Livechat/Livechat.jsx";
import Newannouncement from "./pages/Newannouncement/Newannouncement.jsx";
import Upgrade from "./pages/Upgrade/Upgrade.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import DailyAnalysis from "./pages/Dailyanalysis/Dailyanalysis.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import AddEmployee from "./pages/Addemployee/Addemployee.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AddProject from "./pages/Addproject/Addproject.jsx";
import Welcomepage from "./pages/Welcomepage/Welcomepage.jsx";

// Pages jinpe sidebar + topbar NAHI dikhna chahiye
const FULLSCREEN_ROUTES = ["/welcome"];

function Layout() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);

  // Welcome page — sirf content, koi sidebar/topbar nahi
  if (isFullscreen) {
    return (
      <Routes>
        <Route path="/welcome" element={<Welcomepage />} />
      </Routes>
    );
  }

  // Baki sab pages — sidebar + topbar ke saath
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#fdf6fd",
        }}
      >
        {/* Topbar — ek baar yahan, sab pages pe dikhega */}
        <Topbar />

        {/* Page content — sirf yeh scroll hoga */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-screen" element={<Livescreen />} />
            <Route path="/screenshots" element={<Screenshots />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/work-tracking" element={<WorkTracking />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/tasks" element={<AddTask />} />
            <Route path="/live-chat" element={<Livechat />} />
            <Route path="/announcements" element={<Newannouncement />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/daily-analysis" element={<DailyAnalysis />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-project" element={<AddProject />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;