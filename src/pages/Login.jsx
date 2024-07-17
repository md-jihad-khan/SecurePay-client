import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    pin: "",
  });
  const [loading, setLoading] = useState(false);

  const { identifier, pin } = formData;

  // Function to update form data on input change
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        identifier,
        pin,
      });
      // Token received
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      // Store token in localStorage or session
      localStorage.setItem("token", res.data.token);
      navigate("/");

      // Redirect to dashboard or handle as needed
      // Example: history.push("/dashboard");
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
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-sky-500">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Login
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => onSubmit(e)}
          >
            <div>
              <label className="block mb-2 text-sm font-medium">
                Your email or mobile number
              </label>
              <input
                type="text"
                name="identifier"
                value={identifier}
                onChange={(e) => onChange(e)}
                className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@company.com or 1234567890"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">PIN</label>
              <input
                type="password"
                name="pin"
                value={pin}
                onChange={(e) => onChange(e)}
                className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                minLength={5} // Ensure minimum length of 5 characters for the pin
                required
              />
            </div>
            <button type="submit" className="w-full btn bg-sky-500 font-bold">
              {loading ? (
                <span className="loading text-center loading-spinner loading-lg "></span>
              ) : (
                "Sign in"
              )}
            </button>
            <p className="text-sm font-light">
              Don’t have an account yet?{" "}
              <Link
                to={"/register"}
                className="font-bold text-sky-500 underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
