import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginHandler } from "../actions/userAction/userAction";
import FormAction from "./FormAction";
// import FormExtra from "./FormExtra";
import eyeOpen from "../assets/images/eyeOpen.svg";
import eyeClose from "../assets/images/eyeClose.svg";

export default function Login() {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    errors: {},
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(loginState);
    if (Object.keys(errors).length === 0) {
      authenticateUser();
    } else {
      setLoginState({ ...loginState, errors: errors });
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return errors;
  };

  const data = useSelector((state) => state.User);
  useEffect(() => {
    if (data.user !== null) {
      Navigate("/");
    } else {
      toast.error(data.error);
    }
  }, [data]);

  // Handle Login API Integration here
  const authenticateUser = async () => {
    await dispatch(loginHandler(loginState.email, loginState.password));
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          <div className="my-5">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              onChange={handleChange}
              value={loginState["email"]}
              id="email"
              name="email"
              type="email"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            {loginState.errors.email && (
              <p className="text-red-500">{loginState.errors.email}</p>
            )}
          </div>

          <div className="my-5">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                value={loginState["password"]}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="rounded-md appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img className="h-4 w-4" src={eyeOpen} alt="eyeOpen" />
                ) : (
                  <img className="h-4 w-4" src={eyeClose} alt="eyeClose" />
                )}
              </button>
            </div>
            {loginState.errors.password && (
              <p className="text-red-500">{loginState.errors.password}</p>
            )}
          </div>
        </div>
        {/* <FormExtra /> */}
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>
    </>
  );
}
