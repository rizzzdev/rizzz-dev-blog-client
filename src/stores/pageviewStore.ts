import { useMutation } from "@tanstack/react-query";
import { atom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { ApiResponseType } from "~/types/apiResponseType";
import { PageviewTypeExtends, RequestPageviewType } from "~/types/pageviewType";

const initialPageview: PageviewTypeExtends = {
  userId: "",
  createdAt: new Date(),
};

export const pageviewAtom = atom<PageviewTypeExtends>(initialPageview);

export const usePageviewMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: async (body: RequestPageviewType) => {
      const response = await axiosInstance.post<
        ApiResponseType<PageviewTypeExtends>
      >("/pageviews", body);
      return response.data.data;
    },
    onSuccess,
  });
};
