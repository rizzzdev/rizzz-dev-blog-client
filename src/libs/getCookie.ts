import { ApiResponseType } from "~/types/apiResponseType";
import axiosInstance from "./axiosInstance";
import { RequestCookieType } from "~/types/cookieType";

export const getCookie = async () => {
  const response = await axiosInstance.get<ApiResponseType<RequestCookieType>>(
    "/cookies"
  );
  return response.data.data;
};
