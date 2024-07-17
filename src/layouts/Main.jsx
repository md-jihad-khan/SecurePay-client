import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../providers/AuthProvider";

const Main = () => {
  const { loading, error } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  if (error) {
    navigate("/login");
    return <div>Error: {error}</div>;
  }
  return (
    <div className="relative min-h-screen md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className="flex-1 font-poppins md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
