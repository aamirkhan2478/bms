import axios from "@/utils";
import { useMutation, useQuery } from "react-query";

const login = (values) => {
  return axios.post("/user/login", values);
};

const currentUser = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.get("/user/current-user", config);
};

const userLogout = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.get("/user/logout", config);
};

export const useLogin = (onSuccess, onError) => {
  return useMutation(login, {
    onSuccess,
    onError,
  });
};

export const useCurrentUser = () => {
  return useQuery("current-user", currentUser, {
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.currentUser,
  });
};

export const useLogout = (onSuccess, onError) => {
  return useMutation(userLogout, {
    onSuccess,
    onError,
  });
};
