import { useEffect } from "react";
import Profile from "../components/Profile";
import { useAuth } from "../providers/AuthProvider";
import ManageUsers from "../components/ManageUsers";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userInfo, refresh } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    refresh();
  }, []);
  return (
    <div>
      {userInfo?.role === "user" && <Profile />}
      {userInfo?.role === "agent" && <Profile />}
      {userInfo?.role === "admin" && <ManageUsers />}
    </div>
  );
};

export default Home;
