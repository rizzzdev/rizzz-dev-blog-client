import { useMutation } from "@tanstack/react-query";
import { atom, useSetAtom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { ApiResponseType } from "~/types/apiResponseType";
import { ReactionTypeExtends, RequestReactionType } from "~/types/reactionType";

const initialReactions: ReactionTypeExtends[] = [];

export const reactionsAtom = atom(initialReactions);

export const useMutationReactions = () => {
  const setReactions = useSetAtom(reactionsAtom);

  return useMutation({
    mutationFn: async (body: RequestReactionType) => {
      const response = await axiosInstance.post<
        ApiResponseType<ReactionTypeExtends>
      >("/reactions", body);

      setReactions((state) => [...state, response.data.data!]);
      return response.data.data;
    },
  });
};
