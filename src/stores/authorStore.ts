import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { atom, useAtom } from "jotai";
import axiosInstance from "~/libs/axiosInstance";
import { getCookie } from "~/libs/getCookie";
import { ApiResponseType } from "~/types/apiResponseType";
import { AuthorTypeExtends, RequestAuthorType } from "~/types/authorType";

const initialAuthor: AuthorTypeExtends = {
  authorId: "",
  password: "",
  fullName: "",
  registeredAt: new Date(),
};

export const authorAtom = atom<AuthorTypeExtends>(initialAuthor);

const getAuthorData = async () => {
  const cookie = await getCookie();
  const authorId = cookie!.authorId;

  if (!authorId) {
    throw new AxiosError("Author ID Not Found in Cookie!");
  }

  const response = await axiosInstance.get<ApiResponseType<AuthorTypeExtends>>(
    `/authors/${authorId}`
  );
  return response.data.data;
};

export const useQueryAuthor = () => {
  const [author, setAuthor] = useAtom(authorAtom);

  return useQuery({
    initialData: author,
    queryKey: ["author"],
    queryFn: async () => {
      const response = await getAuthorData();
      setAuthor(response!);
      return response;
    },
  });
};

export const usePostAuthor = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (body: RequestAuthorType) => {
      const response = await axiosInstance.post<
        ApiResponseType<AuthorTypeExtends>
      >("/authors", body);
      return response.data;
    },
    onSuccess,
  });
};
