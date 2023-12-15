import axios from "@/utils/axiosInstance";
import { useMutation } from "react-query";

const owner = (values) => {
  return axios.post("/owner/add", values);
};

export const useAddOwner = (onSuccess, onError) => {
  return useMutation(owner, {
    onSuccess,
    onError,
  });
};
