import axios from "@/utils/axiosInstance";
import { useMutation } from "react-query";

const login = (values) => {
  return axios.post("/user/login", values);
};

const userLogout = () => {
  return axios.post("/user/logout");
};

export const useLogin = (onSuccess, onError) => {
  return useMutation(login, {
    onSuccess,
    onError,
  });
};

export const useLogout = (onSuccess, onError) => {
  return useMutation(userLogout, {
    onSuccess,
    onError,
  });
};
