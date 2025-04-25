import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { ApiResponseType } from "~/types/apiResponseType";
import { ArticleTypeExtends } from "~/types/articleType";

const initialArticle: ArticleTypeExtends = {
  title: "",
  description: "",
  authorId: "",
  articleMarkdown: "",
  createdAt: new Date(),
};

export const articleAtom = atom<ArticleTypeExtends>(initialArticle);

export const useQueryArticle = (articleId: string) => {
  const [article, setArticle] = useAtom(articleAtom);

  return useQuery({
    initialData: article,
    queryKey: ["article"],
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponseType<ArticleTypeExtends>
      >(`/articles/${articleId}`);
      setArticle(response.data.data!);
      return response.data.data;
    },
  });
};
