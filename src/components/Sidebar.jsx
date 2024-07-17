import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import MenuItem from "./MenuItem";
import { GiPayMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useAuth } from "../providers/AuthProvider";

const Sidebar = () => {
  const { userInfo, setUserInfo } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const logout = () => {
    localStorage.clear("token");
    navigate("/login");
    setUserInfo(null);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-base-200  flex items-center justify-between md:hidden">
        <div>
          <div className="w-full mx-auto">
            <Link className="flex gap-2" to="/">
              <img src="/icon.png" alt="logo" className=" ml-3" />
              <p className="font-poppins text-xl flex items-center font-bold">
                <span className="text-sky-500">Secure</span> Pay
              </p>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none "
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-200 w-64  py-2 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full  md:flex   rounded-lg items-center  mx-auto">
              <Link className="flex gap-5 items-center justify-center" to="/">
                <img src="/icon.png" alt="logo" className="ml-4" />
                <p className="font-poppins text-xl flex items-center font-bold">
                  <span className="text-sky-500">Secure</span> Pay
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex mt-5 flex-col justify-between flex-1 ">
            {/*  Menu Items */}
            <nav>
              {userInfo?.role === "user" && (
                <>
                  <MenuItem label="My Profile" address="/" icon={FaRegUser} />
                  <MenuItem
                    label="Send Money"
                    address="/sendMoney"
                    icon={IoIosSend}
                  />
                  <MenuItem
                    label="Cash Out"
                    address="/cashOut"
                    icon={GiPayMoney}
                  />
                  <MenuItem
                    label="Cash In"
                    address="/cashIn"
                    icon={GiTakeMyMoney}
                  />
                  <MenuItem
                    label="Transactions History"
                    address="/history"
                    icon={FaHistory}
                  />
                </>
              )}
              {userInfo?.role === "agent" && (
                <>
                  <MenuItem label="My Profile" address="/" icon={FaRegUser} />
                  <MenuItem
                    label="Cash-Out Request"
                    address="/cashOut"
                    icon={GiPayMoney}
                  />
                  <MenuItem
                    label="Cash-In Request"
                    address="/cashIn"
                    icon={GiTakeMyMoney}
                  />
                  <MenuItem
                    label="Payment History"
                    address="/dashboard/paymentHistory"
                    icon={FaHistory}
                  />
                </>
              )}
              {userInfo?.role === "admin" && (
                <>
                  <MenuItem label="Manage Users" address="/" icon={FaUsers} />
                  <MenuItem
                    label="All Transaction History"
                    address="/dashboard/paymentHistory"
                    icon={FaHistory}
                  />
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}

          <button
            onClick={logout}
            className="flex w-full items-center px-4 py-2  text-gray-600 mt-2 hover:bg-sky-500   hover:text-white transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
