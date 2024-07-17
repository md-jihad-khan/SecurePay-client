import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  const token = localStorage.getItem("token");

  const refresh = () => {
    setReload(!reload);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        setLoading(false);

        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
        localStorage.clear("token");
      }
    };

    fetchUserInfo();
  }, [token, reload]);

  return (
    <AuthContext.Provider value={{ userInfo, loading, error, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
