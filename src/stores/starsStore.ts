import { useMutation } from "@tanstack/react-query";
import { atom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { ApiResponseType } from "~/types/apiResponseType";
import { RequestStarType, StarTypeExtends } from "~/types/starType";

const initialStars: StarTypeExtends[] = [];

export const starsAtom = atom(initialStars);

export const useMutationStars = () => {
  return useMutation({
    mutationFn: async (body: RequestStarType) => {
      const response = await axiosInstance.post<
        ApiResponseType<StarTypeExtends>
      >("/stars", body);

      return response.data.data;
    },
  });
};
