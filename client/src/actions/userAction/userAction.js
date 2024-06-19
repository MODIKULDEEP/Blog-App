import axios from "axios";
const url = import.meta.env.VITE_BACKEND_APP_URI;

const jsonconfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const loginHandler = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const { data } = await axios.post(
      `${url}/api/login`,
      { email, password },
      jsonconfig
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });
    const { data } = await axios.get(`${url}/api/user`, {
      withCredentials: true,
    });
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAIL", payload: error });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });
    const { data } = await axios.get(`${url}/api/logout`, {
      withCredentials: true,
    });
    dispatch({ type: "LOGOUT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOAD_FAIL", payload: error });
  }
};
