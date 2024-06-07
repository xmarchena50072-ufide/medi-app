import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/register" element={<RegisterPage></RegisterPage>} />
          <Route path="/tasks" element={<h1>Tasks page</h1>} />
          <Route path="/add-task" element={<h1>New task</h1>} />
          <Route path="/tasks/:id" element={<h1>Update task</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;