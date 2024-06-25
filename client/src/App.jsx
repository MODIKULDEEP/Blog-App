import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { loadUser } from "./actions/userAction/userAction";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import Page404 from "./pages/Page404";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/Dashboard";
import BlogPage from "./pages/Blog";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.User);

  const loadUsers = async () => {
    await dispatch(loadUser());
  };
  useEffect(() => {
    if (!user) {
      loadUsers();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <LoginPage />
              </div>
            </div>
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route
          path="/signup"
          element={
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <SignupPage />
              </div>
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <Page404 />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
