import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path={"/register"} element={<RegisterPage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/loggedin/:username"} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={"profile"} element={<ProfilePage />} />
        <Route path={"create-post"} element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
