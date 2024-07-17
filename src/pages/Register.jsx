import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    mobileNumber: "",
    email: "",
    role: "user", // Default role is user
  });
  const [loading, setLoading] = useState(false);
  const { name, pin, mobileNumber, email, role } = formData;
  const navigate = useNavigate();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (pin.length !== 5) {
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "PIN must be exactly 5 digits",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        pin,
        mobileNumber,
        email,
        role, // Include role in registration data
      });
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.data,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      // Redirect to login page or handle as needed
    } catch (err) {
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response.data,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 my-10 mx-auto md:h-screen lg:py-0">
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-sky-500">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Register
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => onSubmit(e)}
          >
            <div>
              <label className="block mb-2 text-sm font-medium">
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Pin</label>
              <input
                type="number"
                name="pin"
                value={pin}
                onChange={(e) => onChange(e)}
                minLength={5} // Ensure minimum length of 5 characters for the pin
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(e) => onChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123-456-7890"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Role</label>
              <select
                name="role"
                value={role}
                onChange={(e) => onChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full btn font-bold bg-sky-500 text-center"
            >
              {loading ? (
                <span className="loading loading-spinner loading-lg "></span>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-sm font-light">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium underline text-sky-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
