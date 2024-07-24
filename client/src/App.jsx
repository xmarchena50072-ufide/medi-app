import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileFormPage from "./pages/ProfileFormPage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";
import { RecordsProvider } from "./context/RecordsContext";
import RecordsPage from "./pages/RecordsPage";
import RecordFormPage from "./pages/RecordFormPage";
import RecordsReportPage from "./pages/RecordsReportPage";
import PrescriptionFormPage from "./pages/PrescriptionFormPage";
import MedicalOpinionFormPage from "./pages/MedicalOpinionFormPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <RecordsProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/:id" element={<ProfileFormPage />} />
                  <Route path="/records" element={<RecordsPage />} />
                  <Route path="/add-records" element={<RecordFormPage />} />
                  <Route path="/reports" element={<RecordsReportPage />} />
                  <Route path="/medical-opinion" element={<MedicalOpinionFormPage />} />
                  <Route path="/add-prescription" element={<PrescriptionFormPage />} />
                  <Route path="/records/:id" element={<RecordFormPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </RecordsProvider>
      </TaskProvider>
    </AuthProvider>
  )
};

export default App;