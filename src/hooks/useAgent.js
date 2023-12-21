import { useMutation, useQuery } from "react-query";
import axios from "@/utils/axiosInstance";

const agent = (values) => {
  return axios.post("/agent/add", values);
};

const showAgents = () => {
  return axios.get("/agent/all");
};

export const useAddAgent = (onSuccess, onError) => {
  return useMutation(agent, {
    onSuccess,
    onError,
  });
};

export const useShowAgents = () => {
  return useQuery("show-agents", showAgents);
};
