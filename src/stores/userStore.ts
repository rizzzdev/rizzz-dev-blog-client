import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { atom, useAtom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { getCookie } from "~/libs/getCookie";
import { ApiResponseType } from "~/types/apiResponseType";
import { RequestUserType, UserTypeExtend } from "~/types/userType";

const initialUser: UserTypeExtend = {
  fullName: "",
  registeredAt: new Date(),
};

export const userAtom = atom<UserTypeExtend>(initialUser);

const getUserData = async () => {
  const cookie = await getCookie();
  const userId = cookie!.userId;

  if (!userId) {
    throw new AxiosError("User ID Not Found in Cookie!");
  }

  const response = await axiosInstance.get<ApiResponseType<UserTypeExtend>>(
    `/users/${userId}`
  );
  return response.data.data;
};

export const useQueryUser = () => {
  const [user, setUser] = useAtom(userAtom);

  return useQuery({
    initialData: user,
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUserData();
      setUser(response!);
      return response!;
    },
  });
};

export const useMutationUser = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: async (body: RequestUserType) => {
      const response = await axiosInstance.post<
        ApiResponseType<UserTypeExtend>
      >("/users", body);
      return response.data.data;
    },
    onSuccess,
  });
};
