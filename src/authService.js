import axios from "axios";
import {HOST} from "./commons/hosts";

const AUTH_URL = HOST.backend_api + "/auth";

const login = (username, password) => {
    return axios
        .post(AUTH_URL + "/signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {

                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const register = (username, password) => {
    return axios.post(AUTH_URL + "/signup", {
        username,
        password,
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    login,
    register,
    logout,
    getCurrentUser,
};
