import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/users/search?name=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserStatus = async (id, status) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Refresh user list
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex flex-col sm:flex-row sm:items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
          className="border p-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 mb-4 sm:mb-0"
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.mobileNumber}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">{user.status}</td>
                <td className="border p-2">
                  {user.status === "active" ? (
                    <button
                      onClick={() => updateUserStatus(user._id, "blocked")}
                      className="bg-red-500 btn text-white px-2 py-1"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => updateUserStatus(user._id, "active")}
                      className="bg-green-500 btn text-white px-2 py-1 mr-2"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
