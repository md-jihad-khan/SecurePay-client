import { useEffect } from "react";
import Profile from "../components/Profile";
import { useAuth } from "../providers/AuthProvider";

const Home = () => {
  const { userInfo, refresh } = useAuth();
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  useEffect(() => {
    refresh();
  }, []);
  return (
    <div>
      {userInfo?.role === "user" && <Profile />}
      {userInfo?.role === "agent" && <Profile />}
    </div>
  );
};

export default Home;
