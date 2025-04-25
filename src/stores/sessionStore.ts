import { useMutation } from "@tanstack/react-query";
import { atom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { ApiResponseType } from "~/types/apiResponseType";
import { RequestSessionType, SessionTypeExtend } from "~/types/sessionType";

const initialSession: SessionTypeExtend = {
  authorId: "",
  password: "",
  loggedInAt: new Date(),
};

export const sessionAtom = atom<SessionTypeExtend>(initialSession);

export const usePostSession = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (body: RequestSessionType) => {
      const response = await axiosInstance.post<
        ApiResponseType<SessionTypeExtend>
      >("/sessions", body);
      return response.data.data;
    },
    onSuccess,
  });
};
