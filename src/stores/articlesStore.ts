import { useMutation, useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { ApiResponseType } from "../types/apiResponseType";
import { ArticleTypeExtends, RequestArticleType } from "../types/articleType";

const initialArticles: ArticleTypeExtends[] = [];

export const articlesAtom = atom<ArticleTypeExtends[]>(initialArticles);

export const useQueryArticles = (searchQuery: string = "") => {
  const [articles, setArticles] = useAtom(articlesAtom);

  return useQuery({
    initialData: articles,
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseType<ArticleTypeExtends[]>
      >(`/articles?search=${searchQuery}`);
      setArticles(response.data.data);
      return response.data.data;
    },
  });
};

export const useMutationArticles = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  return useMutation({
    mutationFn: async (body: RequestArticleType) => {
      const response = await axiosInstance.post<
        ApiResponseType<ArticleTypeExtends>
      >("/articles", body);
      return response.data.data;
    },
    onSuccess,
  });
};
