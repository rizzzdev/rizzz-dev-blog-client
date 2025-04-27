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

interface MutationArticle {
  onSuccess?: () => void;
  type: "create" | "update" | "delete";
}

type MutationArticleBody = Partial<{ id: string } & RequestArticleType>;

export const useMutationArticle = (args: MutationArticle) => {
  const createMutation = async (body: MutationArticleBody) => {
    const response = await axiosInstance.post<
      ApiResponseType<ArticleTypeExtends>
    >("/articles", {
      title: body.title,
      description: body.description,
      articleMarkdown: body.articleMarkdown,
      imageUrl: body.imageUrl,
      authorId: body.authorId,
    });
    return response.data.data;
  };

  const deleteMutation = async (body: MutationArticleBody) => {
    const response = await axiosInstance.delete<
      ApiResponseType<ArticleTypeExtends>
    >(`/articles/${body.id}`);
    return response.data.data;
  };

  const updateMutation = async (body: MutationArticleBody) => {
    const response = await axiosInstance.patch<
      ApiResponseType<ArticleTypeExtends>
    >(`/articles/${body.id}`, {
      title: body.title,
      description: body.description,
      authorId: body.authorId,
      imageUrl: body.imageUrl,
      articleMarkdown: body.articleMarkdown,
    });
    return response.data.data;
  };

  const mutationFn = (() => {
    switch (args.type) {
      case "create":
        return createMutation;
      case "delete":
        return deleteMutation;
      case "update":
        return updateMutation;
    }
  })();

  return useMutation({
    mutationFn,
    onSuccess: args.onSuccess,
  });
};
