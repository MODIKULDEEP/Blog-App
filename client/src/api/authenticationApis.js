import axios from "axios";
const url = import.meta.env.VITE_BACKEND_APP_URI;

const jsonconfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Register a new user
export const CreateUserApi = async (userData) => {
  try {
    const { data } = await axios.post(
      `${url}/api/register`,
      userData,
      jsonconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// Authenticate user
export const loginApi = async (loginCred) => {
  try {
    const { data } = await axios.post(
      `${url}/api/login`,
      loginCred,
      jsonconfig
    );
    if (data.success) {
      localStorage.setItem("token", data.data.token);
    }
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// Logout Api
export const logoutApi = async () => {
  try {
    const { data } = await axios.get(`${url}/api/logout`, jsonconfig);
    if (data.success) {
      localStorage.setItem("token", "");
    }
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};
