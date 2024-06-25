import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateUserApi } from "../api/authenticationApis";
import FormAction from "./FormAction";
import eyeOpen from "../assets/images/eyeOpen.svg";
import eyeClose from "../assets/images/eyeClose.svg";

export default function Signup() {
  const [signupState, setSignupState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };
  const Navigate = useNavigate();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(signupState);
    if (Object.keys(errors).length === 0) {
      createAccount();
    } else {
      setSignupState({ ...signupState, errors: errors });
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&^#~`|\\<>;:{}[\](),.?+_=\-]{8,}/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const createAccount = async () => {
    const result = await CreateUserApi(signupState);
    try {
      if (result.success) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      } else {
        toast.error(result.error.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="my-5">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            onChange={(e) => handleChange(e)}
            value={signupState["name"]}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          />
          {signupState.errors.name && (
            <p className="text-red-500">{signupState.errors.name}</p>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            onChange={(e) => handleChange(e)}
            value={signupState["email"]}
            id="email"
            name="email"
            type="email"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
          {signupState.errors.email && (
            <p className="text-red-500">{signupState.errors.email}</p>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              onChange={(e) => handleChange(e)}
              value={signupState["password"]}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
          {signupState.errors.password && (
            <p className="text-red-500">{signupState.errors.password}</p>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <div className="relative">
            <input
              onChange={(e) => handleChange(e)}
              value={signupState["confirmPassword"]}
              id="confirmPassword"
              name="confirmPassword"
              type={showConfPassword ? "text" : "password"}
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={toggleConfPasswordVisibility}
            >
              {showConfPassword ? (
                <img className="h-4 w-4" src={eyeOpen} alt="eyeOpen" />
              ) : (
                <img className="h-4 w-4" src={eyeClose} alt="eyeClose" />
              )}
            </button>
          </div>
          {signupState.errors.confirmPassword && (
            <p className="text-red-500">{signupState.errors.confirmPassword}</p>
          )}
        </div>

        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </form>
    </>
  );
}
